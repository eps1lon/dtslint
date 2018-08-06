# tslint-rule-trim-file
TSLint rule to check for blank lines at beginning or end of a file.

## Usage
```bash
$ npm install --save-dev tslint-rule-trim-file
```

### Rule Access
Add `tslint-rule-trim-file` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-trim-file"],
    "rules": {
      "trim-file": true
    }
}
```

### Recommended Config
Adding `tslint-rule-trim-file` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-trim-file"
}
```

## Examples
**Bad**:

```ts

export function f(): number;

```

**Good**:

```ts
export function f(): number;
```

## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations so we use a higher version in development.