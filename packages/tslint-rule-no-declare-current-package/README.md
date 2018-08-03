# tslint-rule-no-declare-current-package
TSLint rule to avoid declare module, and prefer to declare module contents in a file.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-declare-current-package
```

### Rule Access
Add `tslint-rule-no-declare-current-package` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-declare-current-package",
    "rules": {
      "no-declare-current-package": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-declare-current-package/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-declare-current-package/tslint-config"
}
```

## Examples

**Bad**:

```ts
// foo/index.d.ts
declare module "foo" {
    export const x = 0;
}
```

**Good**:

```ts
// foo/index.d.ts
export const x = 0;
```

**Bad**:

```ts
// foo/index.d.ts
declare module "foo/bar" {
    export const x = 0;
}
```

**Good**:

```ts
// foo/bar.d.ts
export const x = 0;
```
