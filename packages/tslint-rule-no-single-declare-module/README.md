# tslint-rule-no-single-declare-module
TSLint rule to avoid single declare module.
Instead, the file itself should be used as the declaration for the module.
TypeScript uses [module resolution](http://www.typescriptlang.org/docs/handbook/module-resolution.html) to determine what files are associated with what modules.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-single-declare-module
```

### Rule Access
Add `tslint-rule-no-single-declare-module` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-single-declare-module"],
    "rules": {
      "no-single-declare-module": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-single-declare-module` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-single-declare-module"
}
```

## Examples
**Bad**:

```ts
declare module "mylib" {
    function foo(): number;
}
```

**Good**:

```ts
export function foo(): number;
```
