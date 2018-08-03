# tslint-rule-no-relative-import-in-test
TSLint rule to avoid relative imports in test files.
A test file should not contain relative imports; it should use a global import of the library using [module resolution](http://www.typescriptlang.org/docs/handbook/module-resolution.html).

## Usage
```bash
$ npm install --save-dev tslint-rule-no-relative-import-in-test
```

### Rule Access
Add `tslint-rule-no-relative-import-in-test` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-relative-import-in-test",
    "rules": {
      "no-relative-import-in-test": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-relative-import-in-test/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-relative-import-in-test/tslint-config"
}
```

## Examples
**Bad**:

```ts
import foo from "./index.d.ts";
```

**Good**:

```ts
import foo from "foo";
```
