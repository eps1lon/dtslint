import * as Lint from "tslint";
import * as ts from "typescript";

// Based on https://github.com/danvk/typings-checker

export class Rule extends Lint.Rules.TypedRule {
	/* tslint:disable:object-literal-sort-keys */
	static metadata: Lint.IRuleMetadata = {
		ruleName: "expect",
		description: "Asserts types with $ExpectType and presence of errors with $ExpectError.",
		optionsDescription: "Not configurable.",
		options: null,
		type: "functionality",
		typescriptOnly: true,
		requiresTypeInfo: true,
	};
	/* tslint:enable:object-literal-sort-keys */

	static FAILURE_STRING_DUPLICATE_ASSERTION = "This line has 2 $ExpectType assertions.";
	static FAILURE_STRING_ASSERTION_MISSING_NODE = "Can not match a node to this assertion.";
	static FAILURE_STRING_EXPECTED_ERROR = "Expected an error on this line, but found none.";

	static FAILURE_STRING(expectedType: string, actualType: string): string {
		return `Expected type to be:\n  ${expectedType}\ngot:\n  ${actualType}`;
	}

	applyWithProgram(sourceFile: ts.SourceFile, lintProgram: ts.Program): Lint.RuleFailure[] {
		return this.applyWithFunction(sourceFile, ctx => walk(ctx, lintProgram));
	}
}

function walk(
		ctx: Lint.WalkContext<void>,
		program: ts.Program): void {
	const sourceFile = program.getSourceFile(ctx.sourceFile.fileName)!;

	const checker = program.getTypeChecker();
	// Don't care about emit errors.
	const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

	if (sourceFile.isDeclarationFile || !/\$Expect(Type|Error)/.test(sourceFile.text)) {
		// Normal file.
		for (const diagnostic of diagnostics) {
			addDiagnosticFailure(diagnostic);
		}
		return;
	}

	const { errorLines, typeAssertions, duplicates } = parseAssertions(sourceFile);

	for (const line of duplicates) {
		addFailureAtLine(line, Rule.FAILURE_STRING_DUPLICATE_ASSERTION);
	}

	const seenDiagnosticsOnLine = new Set<number>();

	for (const diagnostic of diagnostics) {
		const line = lineOfPosition(diagnostic.start!, sourceFile);
		seenDiagnosticsOnLine.add(line);
		if (!errorLines.has(line)) {
			addDiagnosticFailure(diagnostic);
		}
	}

	for (const line of errorLines) {
		if (!seenDiagnosticsOnLine.has(line)) {
			addFailureAtLine(line, Rule.FAILURE_STRING_EXPECTED_ERROR);
		}
	}

	const { unmetExpectations, unusedAssertions } = getExpectTypeFailures(sourceFile, typeAssertions, checker);
	for (const { node, expected, actual } of unmetExpectations) {
		ctx.addFailureAtNode(node, Rule.FAILURE_STRING(expected, actual));
	}
	for (const line of unusedAssertions) {
		addFailureAtLine(line, Rule.FAILURE_STRING_ASSERTION_MISSING_NODE);
	}

	function addDiagnosticFailure(diagnostic: ts.Diagnostic): void {
		const intro = getIntro();
		if (diagnostic.file === sourceFile) {
			const msg = `${intro}\n${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`;
			ctx.addFailureAt(diagnostic.start!, diagnostic.length!, msg);
		} else {
			const fileName = diagnostic.file ? `${diagnostic.file.fileName}: ` : "";
			ctx.addFailureAt(0, 0, `${intro}\n${fileName}${diagnostic.messageText}`);
		}
	}

	function getIntro(): string {
		return `TypeScript@${ts.version} compile error: `;
	}

	function addFailureAtLine(line: number, failure: string): void {
		const start = sourceFile.getPositionOfLineAndCharacter(line, 0);
		let end = start + sourceFile.text.split("\n")[line].length;
		if (sourceFile.text[end - 1] === "\r") {
			end--;
		}
		ctx.addFailure(start, end, failure);
	}
}

interface Assertions {
	/** Lines with an $ExpectError. */
	readonly errorLines: ReadonlySet<number>;
	/** Map from a line number to the expected type at that line. */
	readonly typeAssertions: Map<number, string>;
	/** Lines with more than one assertion (these are errors). */
	readonly duplicates: ReadonlyArray<number>;
}

function parseAssertions(sourceFile: ts.SourceFile): Assertions {
	const errorLines = new Set<number>();
	const typeAssertions = new Map<number, string>();
	const duplicates: number[] = [];

	const { text } = sourceFile;
	const commentRegexp = /\/\/(.*)/g;
	const lineStarts = sourceFile.getLineStarts();
	let curLine = 0;

	while (true) {
		const commentMatch = commentRegexp.exec(text);
		if (commentMatch === null) {
			break;
		}
		// Match on the contents of that comment so we do nothing in a commented-out assertion,
		// i.e. `// foo; // $ExpectType number`
		const match = /^ \$Expect((Type (.*))|Error)$/.exec(commentMatch[1]);
		if (match === null) {
			continue;
		}
		const line = getLine(commentMatch.index);
		if (match[1] === "Error") {
			if (errorLines.has(line)) {
				duplicates.push(line);
			}
			errorLines.add(line);
		} else {
			const expectedType = match[3];
			// Don't bother with the assertion if there are 2 assertions on 1 line. Just fail for the duplicate.
			if (typeAssertions.delete(line)) {
				duplicates.push(line);
			} else {
				typeAssertions.set(line, expectedType);
			}
		}
	}

	return { errorLines, typeAssertions, duplicates };

	function getLine(pos: number): number {
		// advance curLine to be the line preceding 'pos'
		while (lineStarts[curLine + 1] <= pos) {
			curLine++;
		}
		// If this is the first token on the line, it applies to the next line.
		// Otherwise, it applies to the text to the left of it.
		return isFirstOnLine(text, lineStarts[curLine], pos) ? curLine + 1 : curLine;
	}
}

function isFirstOnLine(text: string, lineStart: number, pos: number): boolean {
	for (let i = lineStart; i < pos; i++) {
		if (text[i] !== " ") {
			return false;
		}
	}
	return true;
}

interface ExpectTypeFailures {
	/** Lines with an $ExpectType, but a different type was there. */
	readonly unmetExpectations: ReadonlyArray<{ node: ts.Node, expected: string, actual: string }>;
	/** Lines with an $ExpectType, but no node could be found. */
	readonly unusedAssertions: Iterable<number>;
}

function getExpectTypeFailures(
		sourceFile: ts.SourceFile,
		typeAssertions: Map<number, string>,
		checker: ts.TypeChecker,
		): ExpectTypeFailures {
	const unmetExpectations: Array<{ node: ts.Node, expected: string, actual: string }> = [];
	// Match assertions to the first node that appears on the line they apply to.
	sourceFile.forEachChild(node => {
		const line = lineOfPosition(node.getStart(sourceFile), sourceFile);
		const expected = typeAssertions.get(line);
		if (expected !== undefined) {
			// https://github.com/Microsoft/TypeScript/issues/14077
			if (ts.isExpressionStatement(node)) {
				node = node.expression;
			}

			const type = checker.getTypeAtLocation(getNodeForExpectType(node));

			const actual = type
				? checker.typeToString(type, /*enclosingDeclaration*/ undefined, ts.TypeFormatFlags.NoTruncation)
				: "";
			if (actual !== expected) {
				unmetExpectations.push({ node, expected, actual });
			}

			typeAssertions.delete(line);
		}
	});
	return { unmetExpectations, unusedAssertions: typeAssertions.keys() };
}

function getNodeForExpectType(node: ts.Node): ts.Node {
	if (ts.isVariableStatement(node)) {
		const { declarationList: { declarations } } = node;
		if (declarations.length === 1) {
			const { initializer } = declarations[0];
			if (initializer) {
				return initializer;
			}
		}
	}
	return node;
}

function lineOfPosition(pos: number, sourceFile: ts.SourceFile): number {
	return sourceFile.getLineAndCharacterOfPosition(pos).line;
}
