# tslint-rule-no-redundant-jsdoc
TSLint rule to forbid JSDoc which duplicates TypeScript functionality.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-redundant-jsdoc
```

### Rule Access
Add `tslint-rule-no-redundant-jsdoc` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-redundant-jsdoc",
    "rules": {
      "no-redundant-jsdoc": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-redundant-jsdoc/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-redundant-jsdoc/tslint-config"
}
```

## Examples
Missing

## Typescript version
Unknown which typescript version emits correct files since no tests exist.