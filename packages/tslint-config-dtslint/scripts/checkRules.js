/** 
 * collects all used rules from this monorepo
 * WARNs about unused rules
 * ERRORs on used rules that are no specified in dependencies
 */
const glob = require('glob');
const path = require('path');
const { Configuration: TslintConfiguration } = require('tslint');

const packageDir = path.join(__dirname, '../');

const packageJson = loadPackageJson(packageDir);
const configDependencies = packageJson.dependencies;

const packagesDir = path.join(packageDir, '../');
const rulePackageGlob = path.join(packagesDir, './tslint-rule-*');

const rules = glob.sync(rulePackageGlob).map(rulePackageDir => {
  const rulePackageJson = loadPackageJson(rulePackageDir);

  if (typeof rulePackageJson.name !== 'string') {
    throw new Error(`no package name given for '${match}'`);
  }

  return rulePackageJson.name;
});

const tslintConfigFiles = ['../tslint-config.json', '../tslint-config-dt.json'];
const usedConfigs = tslintConfigFiles.reduce(
  (accumulatedConfigs, tslintConfigFile) => {
    const tslintConfigPath = path.join(__dirname, tslintConfigFile)
    const tslintConfig = TslintConfiguration.readConfigurationFile(tslintConfigPath);
    const configs = tslintConfig.extends || [];

    return accumulatedConfigs.concat(configs);
  }, 
  []
);

const usedRules = rules.filter(rule => usedConfigs.includes(rule));
const unusedRules = rules.filter(rule => !usedConfigs.includes(rule));
if (unusedRules.length > 0) {
  console.warn(`the following rules are not used in any config:\n${unusedRules.join('\n')}`);
}

const missingDependencyRules = usedRules.filter(rule => {
  return configDependencies[rule] === undefined;
});

if (missingDependencyRules.length > 0) {
  throw new Error(`the following rules are not included in the dependencies: \n${missingDependencyRules.join('\n')}`);
}

function loadPackageJson(dir) {
  const packageJsonPath = path.join(dir, './package.json');
  return require(packageJsonPath);
}
