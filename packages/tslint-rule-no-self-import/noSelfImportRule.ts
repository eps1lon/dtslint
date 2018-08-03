import { getCommonDirectoryName } from "dtslint-tsutil";
import { failure } from "dtslint-util";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.TypedRule {
	static metadata: Lint.IRuleMetadata = {
		ruleName: "no-self-import",
		description: "Forbids declaration files to import the current package using a global import.",
		optionsDescription: "Not configurable.",
		options: null,
		type: "functionality",
		typescriptOnly: false,
	};

	applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
		if (!sourceFile.isDeclarationFile) {
			return [];
		}

		const name = getCommonDirectoryName(program.getRootFileNames());
		return this.applyWithFunction(sourceFile, ctx => walk(ctx, name));
	}
}

const FAILURE_STRING = failure(
	Rule.metadata.ruleName,
	"Declaration file should not use a global import of itself. Use a relative import.");

function walk(ctx: Lint.WalkContext<void>, packageName: string): void {
	/**
	 * usage of internal property imports
	 * https://github.com/Microsoft/TypeScript/blob/fefc47fae387342c8a44d7eb3ae12005187410fa/src/compiler/types.ts#L2620
	 */
	// @ts-ignore
	for (const i of ctx.sourceFile.imports) {
		if (i.text === packageName || i.text.startsWith(packageName + "/")) {
			ctx.addFailureAtNode(i, FAILURE_STRING);
		}
	}
}
