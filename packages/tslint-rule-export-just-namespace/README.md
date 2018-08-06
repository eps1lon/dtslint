# tslint-rule-export-just-namespace
Declaring a namespace is unnecessary if that is the module's only content; just use ES6 export syntax instead.

## Usage
```bash
$ npm install --save-dev tslint-rule-export-just-namespace
```

### Rule Access
Add `tslint-rule-export-just-namespace` to the `rulesDirectory` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "rulesDirectory": ["tslint-rule-export-just-namespace"],
    "rules": {
      "export-just-namespace": true
    }
}
```

### Recommended Config
Adding `tslint-rule-export-just-namespace` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-export-just-namespace"
}
```

## Examples

**Bad**:

```ts
namespace MyLib {
    export function f(): number;
}
export = MyLib;
```

**Good**:

```ts
export function f(): number;
```

**Also good**:

```ts
namespace MyLib {
    export function f(): number;
}
function MyLib(): number;
export = MyLib;
```
