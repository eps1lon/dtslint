import * as path from "path";

/**
 * finds the path of tslint.json passable to tslint -c tslintConfigPath
 * @param dirPath the directory of the typings
 */
export function getTslintConfigPath(dirPath: string): string {
	return path.join(dirPath, "tslint.json");
}

export function getTsconfigPath(dirPath: string): string {
	return path.join(dirPath, "tsconfig.json");
}
