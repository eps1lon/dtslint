# tslint-config-dtslint
TSLint ruleset for testing Typescript declarations.

## Usage
```bash
$ npm install --save-dev tslint-config-dtslint
```

Add the following to your TSLint config.
```json
{
  "extends": "tslint-config-dtslint"
}
```

### In DefinitelyTyped
```json
{
  "extends": "tslint-config-dtslint/tslint-config-dt"
}
```

### Example test
```ts
import { f } from "my-lib"; // f is(n: number) => void

// $ExpectType void
f(1);

// Can also write the assertion on the same line.
f(2); // $ExpectType void

// $ExpectError
f("one");
```