# tslint-rule-dt-header
TSLint rule to check the format of DefinitelyTyped header comments.

(This rule is specific to DefinitelyTyped.)

## Usage
```bash
$ npm install --save-dev tslint-rule-dt-header
```

### Rule Access
Add `tslint-rule-dt-header` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-dt-header",
    "rules": {
      "dt-header": true
    }
}
```

### Recommended Config
Adding `tslint-rule-dt-header/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-dt-header/tslint-config"
}
```

## Examples

---

**Bad**:

```ts
// Type definitions for foo v1.2.3
```

* Don't include `v`
* Don't include a patch version

**Good**:

```ts
// Type definitions for foo 1.2
```

---

**Bad**:

```ts
// Definitions by: My Name <http://geocities.com/myname>
```

**Good**:

```ts
// Definitions by: My Name <https://github.com/myname>
```

* Prefer a GitHub username, not a personal web site.

---

**Bad**:

`foo/index.d.ts`:

```ts
// Type definitions for abs 1.2
// Project: https://github.com/foo/foo
// Definitions by: My Name <https://github.com/myname>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
export { f } from "./subModule";
```

`foo/subModule.d.ts`:

```ts
// Type definitions for abs 1.2
// Project: https://github.com/foo/foo
// Definitions by: My Name <https://github.com/myname>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
export function f(): number;
```

**Good**:

`foo/index.d.ts`: Same

`foo/subModule.d.ts`:
```ts
export function f(): number;
```

Don't use a header twice -- only do it in the index.

## Typescript version
Emitted javascript passes all tests with `typescript@~2.1.0` but fails to emit
declarations (cause: `@types/parsimmon` syntax) so we use a higher version in
development.