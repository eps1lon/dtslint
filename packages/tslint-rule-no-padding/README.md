# tslint-rule-no-padding
TSLint rule to avoid blank lines before opening tokens or after closing tokens.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-padding
```

### Rule Access
Add `tslint-rule-no-padding` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-padding"],
    "rules": {
      "no-padding": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-padding` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-padding"
}
```

## Examples

**Bad**:

```ts
function f() {

    return [

        g(

            0

        )

    ];

}
```

**Good**:

```ts
function f() {
    return [
        g(
            0
        )
    ];
}
```
