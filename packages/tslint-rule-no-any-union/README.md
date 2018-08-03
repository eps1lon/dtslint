# tslint-rule-no-any-union
TSLint rule to check that any is not included in a union type.
When `any` is used in a union type, the resulting type is still `any`.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-any-union
```

### Rule Access
Add `tslint-rule-no-any-union` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-any-union",
    "rules": {
      "no-any-union": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-any-union/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-any-union/tslint-config"
}
```

## Documentation

**Bad**:

```ts
function f(x: string | any): void;
```

**Good**:

```ts
function f(x: string): void;
```

Or:
```ts
function f(x: any): void;
```

Or:
```ts
function f(x: string | object): void;
```

While the `string` portion of this type annotation may _look_ useful, it in fact offers no additional typechecking over simply using `any`.

## Typescript version
Emitted javascript passes all tests with `typescript@~2.8.0` but fails to emit
declarations so we use a higher version in development.