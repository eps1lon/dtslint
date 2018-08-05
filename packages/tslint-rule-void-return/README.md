# tslint-rule-void-return
TSLint rule to check for void in return but not parameter types.

## Usage
```bash
$ npm install --save-dev tslint-rule-void-return
```

### Rule Access
Add `tslint-rule-void-return` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-void-return",
    "rules": {
      "void-return": true
    }
}
```

### Recommended Config
Adding `tslint-rule-void-return/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-void-return/tslint-config"
}
```

## Examples
**Bad**:

```ts
export function f(x: string | void): undefined;
```

**Good**:

```ts
export function f(x: string | undefined): void;
```