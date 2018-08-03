# tslint-rule-template
TSLint rule to {template-description}

## Usage
```bash
$ npm install --save-dev tslint-rule-template
```

### Rule Access
Add `tslint-rule-template` to the `extends` property of your `tslint.json` to be 
able to configure the rule.
```json
{
    "extends": "tslint-rule-template",
    "rules": {
      "template": true
    }
}
```

### Recommended Config
Adding `tslint-rule-template/tslint-config` to the `extends` property of your `tslint.json`
enables the rule and applies a configuration that is recommended by the maintainer of this package.
```json
{
    "extends": "tslint-rule-template/tslint-config"
}
```

## Documentation
