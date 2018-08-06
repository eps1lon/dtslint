# tslint-rule-no-import-default-of-export-equals
TSLint rule to avoid default import of module with export = syntax.
Users who do not have `--allowSyntheticDefaultExports` or `--esModuleInterop` will get different behavior.
This rule only applies to definition files -- for test files you can use a default import if you prefer.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-import-default-of-export-equals
```

### Rule Access
Add `tslint-rule-no-import-default-of-export-equals` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-import-default-of-export-equals"],
    "rules": {
      "no-import-default-of-export-equals": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-import-default-of-export-equals` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-import-default-of-export-equals"
}
```

## Examples

```ts
// foo/index.d.ts
declare interface I {}
export = I;

// bar/index.d.ts
import I from "foo";
```

**Good**:

```ts
import I = require("foo");
```
