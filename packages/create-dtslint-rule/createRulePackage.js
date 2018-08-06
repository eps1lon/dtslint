#! /usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const { camelize, isKebabCase } = require('./utils');

const ruleName = process.argv[2];
if (!isKebabCase(ruleName)) {
  throw new Error('rule name has to be in kebap-case');
}
const description = process.argv[3] || 'no description provided';

const packageName = `tslint-rule-${ruleName}`;

const templatePath = path.join(__dirname, 'template')
const packagePath = path.join(process.cwd(), 'packages', packageName);

if (fs.pathExistsSync(packagePath)) {
  throw new Error(`${ruleName} already exists as ${packageName}`);
}

fs.copySync(templatePath, packagePath);
const ruleFileName = `${camelize(ruleName)}Rule.ts`;

// fill in rule name where necessary
fs.move(
  path.join(packagePath, 'templateRule.ts'),
  path.join(packagePath, ruleFileName)
)

// fill package.json template
const packageJsonPath = path.join(packagePath, 'package.json');
const templatePackageJson = fs.readJSONSync(packageJsonPath);
const packagePackageJson = {
  ...templatePackageJson,
  description: templatePackageJson.description.replace('{description}', description),
  name: packageName
}
fs.writeJSONSync(packageJsonPath, packagePackageJson, { spaces: 2 });

// fill README.md
const readmePath = path.join(packagePath, 'README.md');
const templateReadme = fs.readFileSync(readmePath, 'utf8');
const packageReadme = [
  readme => readme.replace(new RegExp('tslint-rule-template', 'g'), packageName),
  readme => readme.replace('{template-description}', description),
  // tslint rules property for the rule name
  readme => readme.replace('"template"', `"${ruleName}"`)
].reduce((partialReadme, fn) => fn(partialReadme), templateReadme);
fs.writeFileSync(readmePath, packageReadme, { spaces: 2 });