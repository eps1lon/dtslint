# tslint-rule-no-single-element-tuple-type
TSLint rule to check for mistaken tuple.
Some users mistakenly write `[T]` when then intend to write an array type `T[]`.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-single-element-tuple-type
```

### Rule Access
Add `tslint-rule-no-single-element-tuple-type` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-single-element-tuple-type"],
    "rules": {
      "no-single-element-tuple-type": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-single-element-tuple-type` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-single-element-tuple-type"
}
```

## Examples
**Bad**:

```ts
export const x: [T];
```

**Good**:

```ts
export const x: T[];
```

## Typescript version
Emitted javascript passes all tests with `typescript@~2.8.0` but fails to emit
declarations so we use a higher version in development.