import { readFile } from "fs-extra";
import { basename, dirname, join as joinPaths } from "path";

import { checkPackageJson, checkTsconfig } from "./checks";
import { checkTslintJson, lint } from "./lint";

export async function main(): Promise<void> {
	const args = process.argv.slice(2);
	let dirPath = process.cwd();
	let shouldListen = false;

	for (const arg of args) {
		switch (arg) {
			case "--version":
				console.log(require("../package.json").version);
				return;

			case "--listen":
				shouldListen = true;
				break;

			default:
				if (arg.startsWith("--")) {
					console.error(`Unknown option '${arg}'`);
					usage();
					process.exit(1);
				}

				const path = arg.indexOf("@") === 0 && arg.indexOf("/") !== -1
					// we have a scoped module, e.g. @bla/foo
					// which should be converted to   bla__foo
					? arg.substr(1).replace("/", "__")
					: arg;
				dirPath = joinPaths(dirPath, path);
		}
	}

	if (shouldListen) {
		listen(dirPath);
	} else {
		await runTests(dirPath);
	}
}

function usage(): void {
	console.error("Usage: dtslint [--version] [--installAll]");
	console.error("Args:");
	console.error("  --version        Print version and exit.");
}

function listen(dirPath: string): void {
	process.on("message", (message: {}) => {
		const { path } = message as { path: string };
		runTests(joinPaths(dirPath, path))
			.catch(e => e.stack)
			.then(maybeError => {
				process.send!({ path, status: maybeError === undefined ? "OK" : maybeError });
			})
			.catch(e => console.error(e.stack));
	});
}

async function runTests(dirPath: string): Promise<void> {
	const text = await readFile(joinPaths(dirPath, "index.d.ts"), "utf-8");
	// If this *is* on DefinitelyTyped, types-publisher will fail if it can't parse the header.
	const dt = text.includes("// Type definitions for");
	if (dt) {
		// Someone may have copied text from DefinitelyTyped to their type definition and included a header,
		// so assert that we're really on DefinitelyTyped.
		assertPathIsInDefinitelyTyped(dirPath);
	}

	await checkTslintJson(dirPath, dt);
	if (dt) {
		await checkPackageJson(dirPath);
	}
	await checkTsconfig(dirPath, dt);
	const err = await lint(dirPath);
	if (err) {
		throw new Error(err);
	}
}

function assertPathIsInDefinitelyTyped(dirPath: string): void {
	const parent = dirname(dirPath);
	const types = /^v\d+$/.test(basename(dirPath)) ? dirname(parent) : parent;
	const dt = dirname(types);
	if (basename(dt) !== "DefinitelyTyped" || basename(types) !== "types") {
		throw new Error("Since this type definition includes a header (a comment starting with `// Type definitions for`), "
			+ "assumed this was a DefinitelyTyped package.\n"
			+ "But it is not in a `DefinitelyTyped/types/xxx` directory.");
	}
}
