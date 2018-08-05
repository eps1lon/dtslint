# tslint-rule-no-useless-files
TSLint rule to check for useless files.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-useless-files
```

### Rule Access
Add `tslint-rule-no-useless-files` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-useless-files",
    "rules": {
      "no-useless-files": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-useless-files/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-useless-files/tslint-config"
}
```

## Examples
**Bad**:

```ts
```

**Good**:

```ts
export function something(): void;
```
## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations so we use a higher version in development.