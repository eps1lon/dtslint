import * as path from "path";

import { main } from "../src/main";

const packagesPath = path.join(__dirname, "__fixtures__");

const packages: Array<[string, boolean]> = [
	["some-package", false],
];

packages.forEach(async ([packageName, expectError]) => {
	// mock cli call dtslint-cli package
	const packagePath = path.join(packagesPath, packageName);
	process.argv[2] = path.relative(process.cwd(), packagePath);

	let errorMessage: string | undefined;
	try {
		await main();
	} catch (err) {
		errorMessage = err.toString();
	}

	if (errorMessage === undefined && expectError) {
		throw new Error("Expected an error but got none.");
	}
	if (errorMessage !== undefined && !expectError) {
		throw new Error(`Expected no error but got:\n\n${errorMessage}`);
	}
	console.log(`'${packageName}' passed`);
});
