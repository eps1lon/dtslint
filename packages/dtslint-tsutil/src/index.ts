import { basename, dirname } from "path";
import * as ts from "typescript";

export function getCommonDirectoryName(files: ReadonlyArray<string>): string {
	let minLen = 999;
	let minDir = "";
	for (const file of files) {
		const dir = dirname(file);
		if (dir.length < minLen) {
			minDir = dir;
			minLen = dir.length;
		}
	}
	return basename(minDir);
}

export function eachModuleStatement(sourceFile: ts.SourceFile, action: (statement: ts.Statement) => void): void {
	if (!sourceFile.isDeclarationFile) {
		return;
	}

	for (const node of sourceFile.statements) {
		if (ts.isModuleDeclaration(node)) {
			const statements = getModuleDeclarationStatements(node);
			if (statements) {
				for (const statement of statements) {
					action(statement);
				}
			}
		} else {
			action(node);
		}
	}
}

export function getModuleDeclarationStatements(node: ts.ModuleDeclaration): ReadonlyArray<ts.Statement> | undefined {
	let { body } = node;
	while (body && body.kind === ts.SyntaxKind.ModuleDeclaration) {
		body = body.body;
	}
	return body && ts.isModuleBlock(body) ? body.statements : undefined;
}
