# Function Expression Spies

{{ note_since: v2.1.0 }}

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Function Expression Spy](#creating-a-function-expression-spy)
- [Verifying Calls](#verifying-calls)
  - [Using .verify().toBeCalled(...)](#using-verify-tobecalled)
    - [Verifying at Least One Call](#verifying-at-least-one-call)
    - [Verifying a Specific Number of Calls](#verifying-a-specific-number-of-calls)
  - [Using .verify().toBeCalledWithArgs(...)](#using-verify-tobecalledwithargs)
  - [Using .verify().toBeCalledWithoutArgs()](#using-verify-tobecalledwithoutargs)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Spies are stubs that also record some information based on how they were
> called. One form of this might be an email service that records how many
> messages it was sent.

In this tutorial, you will learn how to create one of the three types of spies:
function expression spies.

Function expression spies are spies that wrap around a function expression --
stubbing the function with a `"spy-stubbed"` return value. Optionally, you can
make it return a different value. Function expression spies are useful if:

- You do not need a function to have a working implementation
- You just want to know how the function was called (e.g., what args were used)

_Note: This only works for
[function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
(e.g., `const hello = fn() { }` or `const hello = () => { }`) and NOT
[declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
(e.g., `function hello() { }`)._

## Creating a Function Expression Spy

Creating a function expression spy can be done as follows:

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the function expression that will be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a spy out of the function expression
const spy = Spy(someFunc);

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someFunc, "some return value");

console.log(spy()); // "spy-stubbed"

// @Tab Node - TypeScript (ESM)
import { Spy } from "@drashland/rhum";

// Create the function expression that will be spied on
const someFunc = (): string => {
  return "Hello!";
};

// Create a spy out of the function expression
const spy = Spy(someFunc);

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someFunc, "some return value");

console.log(spy()); // "spy-stubbed"

// @Tab Node - JavaScript (ESM)
import { Spy } from "@drashland/rhum";

// Create the function expression that will be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a spy out of the function expression
const spy = Spy(someFunc);

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someFunc, "some return value");

console.log(spy()); // "spy-stubbed"

// @Tab Node - CommonJS
const { Spy } = require("@drashland/rhum");

// Create the function expression that will be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a spy out of the function expression
const spy = Spy(someFunc);

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someFunc, "some return value");

console.log(spy()); // "spy-stubbed"
```

## Verifying Calls

Since spies record information on how they were called, function expression
spies will record all calls to itself. This allows you to verify the following:

- The function was called at least once
- The function was called a specific number of times
- The function was called with specific args
- The function was called without args

In order to do verification on a function expression spy, you can call
`.verify()` on it. From there, you can chain one of the following verification
methods:

- `.toBeCalled(...)`
- `.toBeCalledWithArgs(...)`
- `.toBeCalledWithoutArgs()`

_Note: Verification methods throw errors if expected results do not match actual
results. They do not "fail" tests. This means when you see an error occur from
Rhum during your test runs, this is the expected behavior._

More in-depth examples of each verification method are below.

### Using .verify().toBeCalled(...)

The `.toBeCalled(...)` verification method can be used to verify the following:

- The function was called at least once; or
- The function was called a specific number of times

#### Verifying at Least One Call

In the below example, we are verifying that `someFunc()` was called at least
once. This is done by calling `.toBeCalled()` without passing in a number arg.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: () => unknown): void {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that the
// spy gets called
higherOrderFunction(spy);

// Verify that `someFunc()` was called at least once. Calling `.toBeCalled()`
// will throw an error if the `someFunc()` function was not called. Here, we are
// verifying that it was called at least once. Since we called
// `higherOrderFunction()` and it called `callback()` (the spy) once, this does
// not throw an error.
spy.verify().toBeCalled();

// Here, we can see what happens if we verify that `someFunc()` was called 5
// times as opposed to 1. As you can see, we have to wrap it in a try-catch
// because it will throw an error. In the `catch` block, we log the error
// message -- seeing that `someFunc()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Function "someFunc" was not called 5 time(s).
  //         at file:///some_test.ts:35:16
  //
  //     Verification Results:
  //         Actual calls   -> 1
  //         Expected calls -> 5
  //
  //     Check the above "some_test.ts" file at/around line 35 for code like the following to fix this error:
  //         .verify().toBeCalled(5)
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: () => unknown): void {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called at least once. Calling `.toBeCalled()`
    // will throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called at least once. Since we called
    // `higherOrderFunction()` and it called `callback()` (the spy) once, this does
    // not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 1. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.ts:35:16
      //
      //     Verification Results:
      //         Actual calls   -> 1
      //         Expected calls -> 5
      //
      //     Check the above "some.test.ts" file at/around line 35 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called at least once. Calling `.toBeCalled()`
    // will throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called at least once. Since we called
    // `higherOrderFunction()` and it called `callback()` (the spy) once, this does
    // not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 1. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.js:35:16
      //
      //     Verification Results:
      //         Actual calls   -> 1
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 35 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called at least once. Calling `.toBeCalled()`
    // will throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called at least once. Since we called
    // `higherOrderFunction()` and it called `callback()` (the spy) once, this does
    // not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 1. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.js:35:16
      //
      //     Verification Results:
      //         Actual calls   -> 1
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 35 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});
```

#### Verifying a Specific Number of Calls

In the below example, we are verifying that `someFunc()` was called a specific
number of times. This is done by calling `.toBeCalled(3)`. Notice we are now
passing in `3` to `.toBeCalled()` to verify that `someFunc()` was called 3
times.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: () => unknown): void {
  callback();
  callback();
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that the
// spy gets called
higherOrderFunction(spy);

// Verify that `someFunc()` was called 3 times. Calling `.toBeCalled()` will
// throw an error if the `someFunc()` function was not called. Here, we are
// verifying that it was called 3 times. Since we called `higherOrderFunction()`
// and it called `callback()` (the spy) 3 times, this does not throw an error.
spy.verify().toBeCalled(3);

// Here, we can see what happens if we verify that `someFunc()` was called 5
// times as opposed to 3. As you can see, we have to wrap it in a try-catch
// because it will throw an error. In the `catch` block, we log the error
// message -- seeing that `someFunc()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Function "someFunc" was not called 5 time(s).
  //         at file:///some_test.ts:37:16
  //
  //     Verification Results:
  //         Actual calls   -> 3
  //         Expected calls -> 5
  //
  //     Check the above "some_test.ts" file at/around line 37 for code like the following to fix this error:
  //         .verify().toBeCalled(5)
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: () => unknown): void {
  callback();
  callback();
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called 3 times. Calling `.toBeCalled()` will
    // throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called 3 times. Since we called `higherOrderFunction()`
    // and it called `callback()` (the spy) 3 times, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 3. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.ts:37:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.ts" file at/around line 37 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
  callback();
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called 3 times. Calling `.toBeCalled()` will
    // throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called 3 times. Since we called `higherOrderFunction()`
    // and it called `callback()` (the spy) 3 times, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 3. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.js:37:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 37 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the function expression to be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
  callback();
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that `someFunc()` was called 3 times. Calling `.toBeCalled()` will
    // throw an error if the `someFunc()` function was not called. Here, we are
    // verifying that it was called 3 times. Since we called `higherOrderFunction()`
    // and it called `callback()` (the spy) 3 times, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that `someFunc()` was called 5
    // times as opposed to 3. As you can see, we have to wrap it in a try-catch
    // because it will throw an error. In the `catch` block, we log the error
    // message -- seeing that `someFunc()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was not called 5 time(s).
      //         at file:///some.test.js:37:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 37 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
      //
    }
  });
});
```

### Using .verify().toBeCalledWithArgs(...)

The `.toBeCalledWithArgs(...)` verification method can be used to verify the
following:

- The function was called with a specific set of args in a specific order

In the below example, we are verifying that `someFunc(...)` was called with the
given args: `"hello", true, ["world"]`.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the function expression to be spied on
const someFunc = (arg1: string, arg2: boolean, arg3: string[]) => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: (...args: any[]) => unknown): void {
  callback("hello", true, ["world"]);
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that the
// spy gets called
higherOrderFunction(spy);

// Verify that the spy was called with a specific set of args.  Calling
// `.toBeCalledWithArgs(...)` will throw an error if the spy was not called with
// the given args. Here, we are verifying that it was called with "hello", true,
// and ["world"]. Since we called it with these args in the higher order
// function, this does not throw an error.
spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

// Here, we can see what happens if we verify that the spy was called with only
// 2 args. As you can see, we have to wrap it in a try-catch because it will
// throw an error. In the `catch` block, we log the error -- seeing that the spy
// was called with 3 args, not 2.
try {
  spy.verify().toBeCalledWithArgs("hello", true);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Function "someFunc" was called with 3 arg(s) instead of 2.
  //         at file:///some_test.ts:36:16
  //
  //     Verification Results:
  //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
  //         Expected call -> ("hello"<string>, true<boolean>)
  //
  //     Check the above "some_test.ts" file at/around line 36 for code like the following to fix this error:
  //         .verify().toBeCalledWithArgs("hello", true)
  //
}

// Furthermore, we can see what happens if we verify that the spy
// was called with 3 args, but one of them is incorrect. As you can see,
// we have to wrap it in a try-catch because it will throw an error. In the
// `catch` block, we log the error -- seeing that the spy should
// not have received the `true` arg at parameter position 2.
try {
  spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Function "someFunc" received unexpected arg `true<boolean>` at parameter position 2.
  //         at file:///some_test.ts:58:16
  //
  //     Verification Results:
  //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
  //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
  //
  //     Check the above "some_test.ts" file at/around line 58 for code like the following to fix this error:
  //         .verify().toBeCalledWithArgs("hello", false, ["world"])
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (arg1: string, arg2: boolean, arg3: string[]): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: (...args: any[]) => unknown): void {
  callback("hello", true, ["world"]);
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called with a specific set of args.  Calling
    // `.toBeCalledWithArgs(...)` will throw an error if the spy was not called with
    // the given args. Here, we are verifying that it was called with "hello", true,
    // and ["world"]. Since we called it with these args in the higher order
    // function, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the spy was called with only
    // 2 args. As you can see, we have to wrap it in a try-catch because it will
    // throw an error. In the `catch` block, we log the error -- seeing that the spy
    // was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.ts:36:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.ts" file at/around line 36 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the spy
    // was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that the spy should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.ts:58:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.ts" file at/around line 58 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (arg1, arg2, arg3) => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback("hello", true, ["world"]);
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called with a specific set of args.  Calling
    // `.toBeCalledWithArgs(...)` will throw an error if the spy was not called with
    // the given args. Here, we are verifying that it was called with "hello", true,
    // and ["world"]. Since we called it with these args in the higher order
    // function, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the spy was called with only
    // 2 args. As you can see, we have to wrap it in a try-catch because it will
    // throw an error. In the `catch` block, we log the error -- seeing that the spy
    // was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.js:36:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.js" file at/around line 36 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the spy
    // was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that the spy should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.js:58:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.js" file at/around line 58 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the function expression to be spied on
const someFunc = (arg1, arg2, arg3) => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback("hello", true, ["world"]);
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called with a specific set of args.  Calling
    // `.toBeCalledWithArgs(...)` will throw an error if the spy was not called with
    // the given args. Here, we are verifying that it was called with "hello", true,
    // and ["world"]. Since we called it with these args in the higher order
    // function, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the spy was called with only
    // 2 args. As you can see, we have to wrap it in a try-catch because it will
    // throw an error. In the `catch` block, we log the error -- seeing that the spy
    // was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.js:36:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.js" file at/around line 36 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the spy
    // was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that the spy should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.js:58:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.js" file at/around line 58 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});
```

### Using .verify().toBeCalledWithoutArgs()

The `.toBeCalledWithoutArgs()` verification method can be used to verify the
following:

- The function was called without args

In the below example, we are verifying that `someFunc()` was called without
args.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the function expression to be spied on
const someFunc = (arg1?: string) => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: (...args: any[]) => unknown): void {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that the
// spy gets called
higherOrderFunction(spy);

// Verify that the spy was called without args. Calling
// `.toBeCalledWithoutArgs()` will throw an error if the spy was called with
// args. Here, we are verifying that it was not called with args. Since it was
// called in the higher order function without args above, this does not throw
// an error.
spy.verify().toBeCalledWithoutArgs();

// Here, we can see what happens if we verify that the spy was called without
// args when it was called with 1 arg. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error -- seeing that the spy was expected to be called without args.
try {
  // Also, instead of using the higher order function, let's call the spy
  // directly and pass in the optional arg that it takes
  spy("Woop woop!");
  spy.verify().toBeCalledWithoutArgs();
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Function "someFunc" was called with args when expected to receive no args.
  //         at file:///some_test.ts:39:16
  //
  //     Verification Results:
  //         Actual args   -> ("Woop woop!")
  //         Expected args -> (no args)
  //
  //     Check the above "some_test.ts" file at/around line 39 for code like the following to fix this error:
  //         .verify().toBeCalledWithoutArgs()
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (arg1?: string): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback: (...args: any[]) => unknown): void {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verififies call was made without args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the spy was called with
    // args. Here, we are verifying that it was not called with args. Since it was
    // called in the higher order function without args above, this does not throw
    // an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the spy was called without
    // args when it was called with 1 arg. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that the spy was expected to be called without args.
    try {
      // Also, instead of using the higher order function, let's call the spy
      // directly and pass in the optional arg that it takes
      spy("Woop woop!");
      spy.verify().toBeCalledWithoutArgs();
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with args when expected to receive no args.
      //         at file:///some.test.ts:39:16
      //
      //     Verification Results:
      //         Actual args   -> ("Woop woop!")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.ts" file at/around line 39 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (arg1): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verififies call was made without args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the spy was called with
    // args. Here, we are verifying that it was not called with args. Since it was
    // called in the higher order function without args above, this does not throw
    // an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the spy was called without
    // args when it was called with 1 arg. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that the spy was expected to be called without args.
    try {
      // Also, instead of using the higher order function, let's call the spy
      // directly and pass in the optional arg that it takes
      spy("Woop woop!");
      spy.verify().toBeCalledWithoutArgs();
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with args when expected to receive no args.
      //         at file:///some.test.js:39:16
      //
      //     Verification Results:
      //         Actual args   -> ("Woop woop!")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.js" file at/around line 39 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the function expression to be spied on
const someFunc = (arg1): string => {
  return "Hello!";
};

// Create a higher order function to exercise the `someFunc` spy -- simulating a
// more real world use case that a function expression spy can be called
// indirectly
function higherOrderFunction(callback) {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

describe("Spy", () => {
  test("verififies call was made without args", () => {
    // Call the higher order function -- passing in the spy -- to verify that the
    // spy gets called
    higherOrderFunction(spy);

    // Verify that the spy was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the spy was called with
    // args. Here, we are verifying that it was not called with args. Since it was
    // called in the higher order function without args above, this does not throw
    // an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the spy was called without
    // args when it was called with 1 arg. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that the spy was expected to be called without args.
    try {
      // Also, instead of using the higher order function, let's call the spy
      // directly and pass in the optional arg that it takes
      spy("Woop woop!");
      spy.verify().toBeCalledWithoutArgs();
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Function "someFunc" was called with args when expected to receive no args.
      //         at file:///some.test.js:39:16
      //
      //     Verification Results:
      //         Actual args   -> ("Woop woop!")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.js" file at/around line 39 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});
```
