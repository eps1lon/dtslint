import { Foo } from 'some-package';

const foo: Foo = {
  bar: 1
};

// $ExpectError
const bar: string = foo.bar;
