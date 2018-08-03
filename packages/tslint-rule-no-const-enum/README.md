# tslint-rule-no-const-enum
TSLint rule to avoid using const enums.
These can't be used by JavaScript users or by TypeScript users with [`--isolatedModules`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) enabled.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-const-enum
```

### Rule Access
Add `tslint-rule-no-const-enum` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-const-enum",
    "rules": {
      "no-const-enum": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-const-enum/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-const-enum/tslint-config"
}
```

## Documentation

**Bad**:

```ts
const enum Bit { Off, On }
export function f(b: Bit): void;
```

**Good**:

```ts
export function f(b: 0 | 1): void;
```
