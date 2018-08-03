# tslint-rule-no-redundant-undefined
TSLint rule to avoid redundant undefined typings.
Avoid explicitly specifying `undefined` as a type for a parameter or property which is already optional.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-redundant-undefined
```

### Rule Access
Add `tslint-rule-no-redundant-undefined` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-redundant-undefined",
    "rules": {
      "no-redundant-undefined": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-redundant-undefined/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-redundant-undefined/tslint-config"
}
```

## Examples

**Bad**:

```ts
function f(s?: string | undefined): void {}
```

**Good**:

```ts
function f(s?: string): void {}
```

**Bad**:

```ts
interface I {
    s?: string | undefined;
}
```

**Good**:

```ts
interface I {
    s?: string;
}
```
## Typescript version
Emitted javascript passes all tests with `typescript@~2.8.0` but fails to emit
declarations so we use a higher version in development.