# tslint-rule-no-outside-dependencies
TSLint rule to check if dependencies provided by package not parent.
Don't import from `DefinitelyTyped/node_modules`.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-outside-dependencies
```

### Rule Access
Add `tslint-rule-no-outside-dependencies` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-outside-dependencies",
    "rules": {
      "no-outside-dependencies": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-outside-dependencies/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-outside-dependencies/tslint-config"
}
```

## Examples
**Bad**:

```ts
import * as x from "x";
// where 'x' is defined only in `DefinitelyTyped/node_modules`
```

**Good**:

Add a `package.json`:

```ts
{
    "private": true,
    "dependencies": {
        "x": "^1.2.3"
    }
}
```
## Typescript version
Unknown which typescript version emits correct files since no tests exist.