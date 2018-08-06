# tslint-rule-no-unnecessary-generics
TSLint rule to forbid single usage of generic type parameters.
Generic type parameters allow you to relate the type of one thing to another;
if they are used only once, they can be replaced with their type constraint.

## Usage
```bash
$ npm install --save-dev tslint-rule-no-unnecessary-generics
```

### Rule Access
Add `tslint-rule-no-unnecessary-generics` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-no-unnecessary-generics"],
    "rules": {
      "no-unnecessary-generics": true
    }
}
```

### Recommended Config
Adding `tslint-rule-no-unnecessary-generics` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-no-unnecessary-generics"
}
```

## Examples
**Bad**:

```ts
function logAnything<T>(x: T): void;
```

**Good**:

```ts
function logAnything(x: any): void;
```

---

**Bad**:

```ts
function useLogger<T extends Logger>(logger: T): void;
```

**Good**:

```ts
function useLogger(logger: Logger): void;
```

---

**Bad**:

```ts
function clear<T>(array: T[]): void;
```

**Good**:

```ts
function clear(array: any[]): void;
```

---

**Bad**:

```ts
function parse<T>(): T;
const x = parse<number>();
```

**Good**:


```ts
function parse(): {};
const x = parse() as number;
```
