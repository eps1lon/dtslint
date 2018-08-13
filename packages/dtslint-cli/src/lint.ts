import { readJson } from "dtslint-util";
import { pathExists } from "fs-extra";
import { Configuration, ILinterOptions, Linter } from "tslint";

import { getTsconfigPath, getTslintConfigPath } from "./path";

export async function lint(dirPath: string): Promise<string | undefined> {
	const lintOptions: ILinterOptions = {
		fix: false,
		formatter: "stylish",
	};
	const tslintConfigPath = getTslintConfigPath(dirPath);
	const configuration = Configuration.findConfiguration(tslintConfigPath).results;
	if (configuration == null) {
		throw new Error(`Could not find tslint configuration at '${tslintConfigPath}'`);
	}

	const tsconfigPath = getTsconfigPath(dirPath);
	const program = Linter.createProgram(tsconfigPath, dirPath);
	const linter = new Linter(lintOptions, program);

	const files = Linter.getFileNames(program);
	files.forEach(file => {
		const sourceFile = program.getSourceFile(file);
		if (sourceFile == null) {
			throw new Error(`Could not get source file '${file}'`);
		}

		const fileContents = sourceFile.getFullText();
		linter.lint(file, fileContents, configuration);
	});

	const result = linter.getResult();
	return result.failures.length ? result.output : undefined;
}

export async function checkTslintJson(dirPath: string, dt: boolean): Promise<void> {
	const configPath = getTslintConfigPath(dirPath);
	const shouldExtend = `tslint-config-dtslint${dt ? "/tslint-config-dt.json" : ""}`;
	if (!await pathExists(configPath)) {
		if (dt) {
			throw new Error(
				`On DefinitelyTyped, must include \`tslint.json\` containing \`{ "extends": "${shouldExtend}" }\`.\n` +
				"This was inferred as a DefinitelyTyped package because it contains a `// Type definitions for` header.");
		}
		return;
	}

	const tslintJson = await readJson(configPath);
	if (tslintJson.extends !== shouldExtend) {
		throw new Error(`If 'tslint.json' is present, it should extend "${shouldExtend}"`);
	}
}
