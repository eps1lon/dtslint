# tslint-rule-strict-export-declare-modifiers
TSLint rule to avoid unnecessary declare keyword.

## Usage
```bash
$ npm install --save-dev tslint-rule-strict-export-declare-modifiers
```

### Rule Access
Add `tslint-rule-strict-export-declare-modifiers` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-strict-export-declare-modifiers"],
    "rules": {
      "strict-export-declare-modifiers": true
    }
}
```

### Recommended Config
Adding `tslint-rule-strict-export-declare-modifiers` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-strict-export-declare-modifiers"
}
```

## Examples
**Bad**:

```ts
export declare function f(): void;
declare function g(): void;
interface I {}
```


**Good**:

```ts
export function f(): void;
export function g(): void;
export interface I {}
```

## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations so we use a higher version in development.