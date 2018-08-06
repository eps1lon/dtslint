# tslint-rule-no-dead-reference
TSLint rule to check for dead references.
A `<reference>` comment should go at the top of a file -- otherwise it is just a normal comment.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-dead-reference
```

### Rule Access
Add `tslint-rule-no-dead-reference` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-dead-reference"],
    "rules": {
      "no-dead-reference": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-dead-reference` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-dead-reference"
}
```

## Examples
**Bad**:

```ts
console.log("Hello world!");
/// <reference types="jquery" />
```

**Good**:

```ts
/// <reference types="jquery" />
console.log("Hello world!");
```
## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations so we use a higher version in development.