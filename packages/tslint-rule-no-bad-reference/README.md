# tslint-rule-no-bad-reference
TSLint rule to avoid <reference path>.

(This rule is specific to DefinitelyTyped.)

## Usage
```bash
$ npm install --save-dev tslint-rule-no-bad-reference
```

### Rule Access
Add `tslint-rule-no-bad-reference` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-no-bad-reference",
    "rules": {
      "no-bad-reference": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-bad-reference/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-bad-reference/tslint-config"
}
```

## Examples

**Bad**:

```ts
/// <reference path="../node_modules/@types/foo/index.d.ts" />
import * as foo from "foo";
```

**Good**:

If "foo" is written in external module style (see `no-single-declare-module`), the import alone should work thanks to [module resolution](http://www.typescriptlang.org/docs/handbook/module-resolution.html):

```ts
// TypeScript will look for a definition for "foo" using module resolution
import * as foo from "foo";
```

If not, use `<reference types>` instead:

```ts
/// <reference types="foo" />
```

The only time `<reference path>` should be necessary if for global (not module) libraries that are separated into multiple files; the index file must include references to the others to bring them into the compilation.

## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations so we use a higher version in development.