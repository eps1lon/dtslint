# tslint-rule-prefer-declare-function
TSLint rule to prefer declare function.

## Usage
```bash
$ npm install --save-dev tslint-rule-prefer-declare-function
```

### Rule Access
Add `tslint-rule-prefer-declare-function` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-prefer-declare-function",
    "rules": {
      "prefer-declare-function": true
    }
}
```

### Recommended Config
Adding `tslint-rule-prefer-declare-function/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-prefer-declare-function/tslint-config"
}
```

## Examples
**Bad**:

```ts
export const f: () => number;
```

**Good**:

```ts
export function f(): number;
```

