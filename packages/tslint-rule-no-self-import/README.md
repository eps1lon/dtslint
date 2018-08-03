# tslint-rule-no-self-import
TSLint rule to avoid self import.
A package should not import components of itself using a globally-qualified name; it should use relative imports instead.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-self-import
```

### Rule Access
Add `tslint-rule-no-self-import` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-self-import",
    "rules": {
      "no-self-import": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-self-import/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-self-import/tslint-config"
}
```

## Examples

**Bad**:

```ts
import foo from "this-package/foo.d.ts";
```

**Good**:

```ts
import foo from "./foo.d.ts";
```

**Bad**:

```ts
import myself from "this-package";
```

**Good**:

```ts
import myself from ".";
```
