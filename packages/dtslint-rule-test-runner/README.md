A zero-config internal test runner used to test tslint rules.

# Usage
```bash
$ npm install --save-dev dtslint-rul-test-runner
```
The dependency has to be listed in the `devDependency` to be accessible from
a command line in the package (see [lerna/lerna#470](https://github.com/lerna/lerna/issues/470#issuecomment-273030206)).

The tests have to be located in the root of the package in a folder named `test`.
The runner is simply called with `dtslint-rule-test-runner` in a command line.
For examples look at the `tslint-rule-*` packages in [eps1lon/dtslint](https://github.com/eps1lon/dtslint)

