# Object Method Spies

{{ note_since: v2.1.0 }}

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating an Object Method Spy](#creating-an-object-method-spy)
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
object method spies.

Object method spies are spies that wrap around an object's method -- stubbing
the method with a `"spy-stubbed"` return value. Optionally, you can make it
return a different value. Object method spies are useful if:

- You do not need a method to have a working implementation
- You just want to know how the method was called (e.g., what args were used)

## Creating an Object Method Spy

Creating an object method spy can be done as follows:

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the class that contains the method the will be spied on
class SomeClass {
  public doSomething() {
    return "Hello";
  }
}

// Create a real object (can also be a Mock or Fake)
const someObj = new SomeClass();

// Create a spy out of the object's `doSomething()` method. The method will now
// be stubbed with a return value of `"spy-stubbed"`. The `spy` constant
// variable is what you use to do verification (e.g., `spy.verify()`).
const spy = Spy(someObj, "doSomething");

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someObj, "doSomething", "some return value");

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the class that contains the method the will be spied on
class SomeClass {
  public doSomething() {
    return "Hello";
  }
}

// Create a real object (can also be a Mock or Fake)
const someObj = new SomeClass();

// Create a spy out of the object's `doSomething()` method. The method will now
// be stubbed with a return value of `"spy-stubbed"`. The `spy` constant
// variable is what you use to do verification (e.g., `spy.verify()`).
const spy = Spy(someObj, "doSomething");

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someObj, "doSomething", "some return value");

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the class that contains the method the will be spied on
class SomeClass {
  doSomething() {
    return "Hello";
  }
}

// Create a real object (can also be a Mock or Fake)
const someObj = new SomeClass();

// Create a spy out of the object's `doSomething()` method. The method will now
// be stubbed with a return value of `"spy-stubbed"`. The `spy` constant
// variable is what you use to do verification (e.g., `spy.verify()`).
const spy = Spy(someObj, "doSomething");

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someObj, "doSomething", "some return value");

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the class that contains the method the will be spied on
class SomeClass {
  doSomething() {
    return "Hello";
  }
}

// Create a real object (can also be a Mock or Fake)
const someObj = new SomeClass();

// Create a spy out of the object's `doSomething()` method. The method will now
// be stubbed with a return value of `"spy-stubbed"`. The `spy` constant
// variable is what you use to do verification (e.g., `spy.verify()`).
const spy = Spy(someObj, "doSomething");

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someObj, "doSomething", "some return value");
```

## Verifying Calls

Since spies record information on how they were called, object method spies will
record all calls to itself. This allows you to verify the following:

- The method was called at least once
- The method was called a specific number of times
- The method was called with specific args
- The method was called without args

In order to do verification on an object method spy, you can call `.verify()` on
it. From there, you can chain one of the following verification methods:

- `.toBeCalled(...)`
- `.toBeCalledWithArgs(...)`
- `.toBeCalledWithoutArgs()`

Unlike class spies, you do not need to pass in the method name to the
`.verify()` call. Rhum already knows what method is being referred to when you
create an object method spy using `const spy = Spy(obj, "methodName")`. When
Rhum performs `Spy(obj, "methodName")`, `"methodName"` is what Rhum keeps track
of under the hood so when you call `spy.verify()`, Rhum ends up calling
`spy.verify("methodName")`.

_Note: Verification methods throw errors if expected results do not match actual
results. They do not "fail" tests. This means when you see an error occur from
Rhum during your test runs, this is the expected behavior._

More in-depth examples of each verification method are below.

### Using .verify().toBeCalled(...)

The `.toBeCalled(...)` verification method can be used to verify the following:

- The method was called at least once; or
- The method was called a specific number of times

#### Verifying at Least One Call

In the below example, we are verifying that `myObj.doSomething()` was called at
least once. This is done by calling `.toBeCalled()` without passing in a number
arg.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method 3 times
myObj.doSomething();
myObj.doSomething();
myObj.doSomething();

// Verify that the `doSomething()` method was called at least once.
// Calling `.toBeCalled()` will throw an error if the `doSomething()` method was
// not called. Here, we are verifying that it was called at least once. Since we
// called it 3 times above, this does not throw an error.
spy.verify().toBeCalled();

// Here, we can see what happens if we verify that the `doSomething()` method
// was called 5 times as opposed to 3. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error); // Outputs => Method "doSomething" was not called 5 time(s).
  // Outputs the following:
  //
  //     VerificationError: Method "doSomething" was not called 5 time(s).
  //         at file:///some_test.ts:33:16
  //
  //     Verification Results:
  //         Actual calls   -> 3
  //         Expected calls -> 5
  //
  //     Check the above "some_test.ts" file at/around line 33 for code like the following to fix this error:
  //         .verify().toBeCalled(5)
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called at least once.
    // Calling `.toBeCalled()` will throw an error if the `doSomething()` method was
    // not called. Here, we are verifying that it was called at least once. Since we
    // called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error); // Outputs => Method "doSomething" was not called 5 time(s).
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.ts:33:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.ts" file at/around line 33 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

class MyClass {
  doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called at least once.
    // Calling `.toBeCalled()` will throw an error if the `doSomething()` method was
    // not called. Here, we are verifying that it was called at least once. Since we
    // called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error); // Outputs => Method "doSomething" was not called 5 time(s).
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.js:33:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 33 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

class MyClass {
  doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies at least one call was made", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called at least once.
    // Calling `.toBeCalled()` will throw an error if the `doSomething()` method was
    // not called. Here, we are verifying that it was called at least once. Since we
    // called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error); // Outputs => Method "doSomething" was not called 5 time(s).
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.js:33:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 33 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});
```

#### Verifying a Specific Number of Calls

In the below example, we are verifying that `.doSomething()` was called a
specific number of times. This is done by calling `.toBeCalled(3)`. Notice we
are now passing in `3` to `.toBeCalled()` to verify that `.doSomething()` was
called 3 times.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the class that will be spied on
class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method 3 times
myObj.doSomething();
myObj.doSomething();
myObj.doSomething();

// Verify that the `doSomething()` method was called exactly 3 times.  Calling
// `.toBeCalled(3)` will throw an error if the `doSomething()` method was not
// called exactly 3 times. Here, we are verifying that it was called exactly 3
// times. Since we called it 3 times above, this does not throw an error.
spy.verify().toBeCalled(3);

// Here, we can see what happens if we verify that the `doSomething()` method
// was called 5 times as opposed to 3. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Method "doSomething" was not called 5 time(s).
  //         at file:///some_test.ts:34:16
  //
  //     Verification Results:
  //         Actual calls   -> 3
  //         Expected calls -> 5
  //
  //     Check the above "some_test.ts" file at/around line 34 for code like the following to fix this error:
  //         .verify().toBeCalled(5)
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the class that will be spied on
class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called exactly 3 times.  Calling
    // `.toBeCalled(3)` will throw an error if the `doSomething()` method was not
    // called exactly 3 times. Here, we are verifying that it was called exactly 3
    // times. Since we called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.ts:34:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.ts" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the class that will be spied on
class MyClass {
  doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called exactly 3 times.  Calling
    // `.toBeCalled(3)` will throw an error if the `doSomething()` method was not
    // called exactly 3 times. Here, we are verifying that it was called exactly 3
    // times. Since we called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.js:34:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the class that will be spied on
class MyClass {
  doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies specific number of calls", () => {
    // Call the method 3 times
    myObj.doSomething();
    myObj.doSomething();
    myObj.doSomething();

    // Verify that the `doSomething()` method was called exactly 3 times.  Calling
    // `.toBeCalled(3)` will throw an error if the `doSomething()` method was not
    // called exactly 3 times. Here, we are verifying that it was called exactly 3
    // times. Since we called it 3 times above, this does not throw an error.
    spy.verify().toBeCalled(3);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called 5 times as opposed to 3. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was not called 5 times.
    try {
      spy.verify().toBeCalled(5);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was not called 5 time(s).
      //         at file:///some.test.js:34:16
      //
      //     Verification Results:
      //         Actual calls   -> 3
      //         Expected calls -> 5
      //
      //     Check the above "some.test.js" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalled(5)
    }
  });
});
```

### Using .verify().toBeCalledWithArgs(...)

The `.toBeCalledWithArgs(...)` verification method can be used to verify the
following:

- The method was called with a specific set of args in a specific order

In the below example, we are verifying that `.doSomething(...)` was called with
the given args: `"hello", true, ["world"]`.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the class containing the method to be spied on
class MyClass {
  public doSomething(arg1: string, arg2: boolean, arg3: string[]) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method with a specific set of args
myObj.doSomething("hello", true, ["world"]);

// Verify that the `doSomething()` method was called with a specific set of
// args.  Calling `.toBeCalledWithArgs(...)` will throw an error if the
// `doSomething()` method was not called with the given args. Here, we are
// verifying that it was called with "hello", true, and ["world"]. Since we
// called it with these args above, this does not throw an error.
spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

// Here, we can see what happens if we verify that the `doSomething()` method
// was called with only 2 args. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error -- seeing that `doSomething()` was called with 3 args, not 2.
try {
  spy.verify().toBeCalledWithArgs("hello", true);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Method "doSomething" was called with 3 arg(s) instead of 2.
  //         at file:///some_test.ts:32:16
  //
  //     Verification Results:
  //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
  //         Expected call -> ("hello"<string>, true<boolean>)
  //
  //     Check the above "some_test.ts" file at/around line 32 for code like the following to fix this error:
  //         .verify().toBeCalledWithArgs("hello", true)
  //
}

// Furthermore, we can see what happens if we verify that the `doSomething()`
// method was called with 3 args, but one of them is incorrect. As you can see,
// we have to wrap it in a try-catch because it will throw an error. In the
// `catch` block, we log the error -- seeing that `doSomething()` should
// not have received the `true` arg at parameter position 2.
try {
  spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Method "doSomething" received unexpected arg `true<boolean>` at parameter position 2.
  //         at file:///some_test.ts:43:16
  //
  //     Verification Results:
  //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
  //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
  //
  //     Check the above "some_test.ts" file at/around line 43 for code like the following to fix this error:
  //         .verify().toBeCalledWithArgs("hello", false, ["world"])
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the class containing the method to be spied on
class MyClass {
  public doSomething(arg1: string, arg2: boolean, arg3: string[]) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the method with a specific set of args
    myObj.doSomething("hello", true, ["world"]);

    // Verify that the `doSomething()` method was called with a specific set of
    // args.  Calling `.toBeCalledWithArgs(...)` will throw an error if the
    // `doSomething()` method was not called with the given args. Here, we are
    // verifying that it was called with "hello", true, and ["world"]. Since we
    // called it with these args above, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called with only 2 args. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.ts:32:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.ts" file at/around line 32 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the `doSomething()`
    // method was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that `doSomething()` should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.ts:43:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.ts" file at/around line 43 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the class containing the method to be spied on
class MyClass {
  doSomething(arg1, arg2, arg3) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the method with a specific set of args
    myObj.doSomething("hello", true, ["world"]);

    // Verify that the `doSomething()` method was called with a specific set of
    // args.  Calling `.toBeCalledWithArgs(...)` will throw an error if the
    // `doSomething()` method was not called with the given args. Here, we are
    // verifying that it was called with "hello", true, and ["world"]. Since we
    // called it with these args above, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called with only 2 args. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.js:32:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.js" file at/around line 32 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the `doSomething()`
    // method was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that `doSomething()` should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.js:43:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.js" file at/around line 43 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the class containing the method to be spied on
class MyClass {
  doSomething(arg1, arg2, arg3) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made with args", () => {
    // Call the method with a specific set of args
    myObj.doSomething("hello", true, ["world"]);

    // Verify that the `doSomething()` method was called with a specific set of
    // args.  Calling `.toBeCalledWithArgs(...)` will throw an error if the
    // `doSomething()` method was not called with the given args. Here, we are
    // verifying that it was called with "hello", true, and ["world"]. Since we
    // called it with these args above, this does not throw an error.
    spy.verify().toBeCalledWithArgs("hello", true, ["world"]);

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called with only 2 args. As you can see, we have to wrap it in a
    // try-catch because it will throw an error. In the `catch` block, we log the
    // error -- seeing that `doSomething()` was called with 3 args, not 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", true);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with 3 arg(s) instead of 2.
      //         at file:///some.test.js:32:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, true<boolean>)
      //
      //     Check the above "some.test.js" file at/around line 32 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", true)
      //
    }

    // Furthermore, we can see what happens if we verify that the `doSomething()`
    // method was called with 3 args, but one of them is incorrect. As you can see,
    // we have to wrap it in a try-catch because it will throw an error. In the
    // `catch` block, we log the error -- seeing that `doSomething()` should
    // not have received the `true` arg at parameter position 2.
    try {
      spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" received unexpected arg `true<boolean>` at parameter position 2.
      //         at file:///some.test.js:43:16
      //
      //     Verification Results:
      //         Actual call   -> ("hello"<string>, true<boolean>, ["world"]<object>)
      //         Expected call -> ("hello"<string>, false<boolean>, ["world"]<object>)
      //
      //     Check the above "some.test.js" file at/around line 43 for code like the following to fix this error:
      //         .verify().toBeCalledWithArgs("hello", false, ["world"])
      //
    }
  });
});
```

### Using .verify().toBeCalledWithoutArgs()

The `.toBeCalledWithoutArgs()` verification method can be used to verify the
following:

- The method was called without args

In the below example, we are verifying that `.doSomething()` was called without
args.

```typescript
// @Tab Deno
// some_test.ts

// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Spy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Create the class containing the method to be spied on
class MyClass {
  public doSomething(arg1?: string) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method without args
myObj.doSomething();

// Verify that the `doSomething()` method was called without args. Calling
// `.toBeCalledWithoutArgs()` will throw an error if the `doSomething()` method
// was called with args. Here, we are verifying that it was not called with
// args. Since we called it without args above, this does not throw an error.
spy.verify().toBeCalledWithoutArgs();

// Here, we can see what happens if we verify that the `doSomething()` method
// was called without args when it was called with 1 arg. As you can see, we
// have to wrap it in a try-catch because it will throw an error. In the `catch`
// block, we log the error -- seeing that `doSomething()` was expected to be
// called without args.
try {
  myObj.doSomething("hello"); // Call it with args
  spy.verify().toBeCalledWithoutArgs(); // Verify that it was not called with args
} catch (error) {
  console.log(error);
  // Outputs the following:
  //
  //     VerificationError: Method "doSomething" was called with args when expected to receive no args.
  //         at file:///some_test.ts:34:16
  //
  //     Verification Results:
  //         Actual args   -> ("hello")
  //         Expected args -> (no args)
  //
  //     Check the above "some_test.ts" file at/around line 34 for code like the following to fix this error:
  //         .verify().toBeCalledWithoutArgs()
  //
}

// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Spy } from "@drashland/rhum";

// Create the class containing the method to be spied on
class MyClass {
  public doSomething(arg1?: string) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made without args", () => {
    // Call the method without args
    myObj.doSomething();

    // Verify that the `doSomething()` method was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the `doSomething()` method
    // was called with args. Here, we are verifying that it was not called with
    // args. Since we called it without args above, this does not throw an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called without args when it was called with 1 arg. As you can see, we
    // have to wrap it in a try-catch because it will throw an error. In the `catch`
    // block, we log the error -- seeing that `doSomething()` was expected to be
    // called without args.
    try {
      myObj.doSomething("hello"); // Call it with args
      spy.verify().toBeCalledWithoutArgs(); // Verify that it was not called with args
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with args when expected to receive no args.
      //         at file:///some.test.ts:34:16
      //
      //     Verification Results:
      //         Actual args   -> ("hello")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.ts" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Spy } from "@drashland/rhum";

// Create the class containing the method to be spied on
class MyClass {
  doSomething(arg1) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made without args", () => {
    // Call the method without args
    myObj.doSomething();

    // Verify that the `doSomething()` method was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the `doSomething()` method
    // was called with args. Here, we are verifying that it was not called with
    // args. Since we called it without args above, this does not throw an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called without args when it was called with 1 arg. As you can see, we
    // have to wrap it in a try-catch because it will throw an error. In the `catch`
    // block, we log the error -- seeing that `doSomething()` was expected to be
    // called without args.
    try {
      myObj.doSomething("hello"); // Call it with args
      spy.verify().toBeCalledWithoutArgs(); // Verify that it was not called with args
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with args when expected to receive no args.
      //         at file:///some.test.js:34:16
      //
      //     Verification Results:
      //         Actual args   -> ("hello")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.js" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});

// @Tab Node - CommonJS
// some.test.js

const { Spy } = require("@drashland/rhum");

// Create the class containing the method to be spied on
class MyClass {
  doSomething(arg1) {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

describe("Spy", () => {
  test("verifies call was made without args", () => {
    // Call the method without args
    myObj.doSomething();

    // Verify that the `doSomething()` method was called without args. Calling
    // `.toBeCalledWithoutArgs()` will throw an error if the `doSomething()` method
    // was called with args. Here, we are verifying that it was not called with
    // args. Since we called it without args above, this does not throw an error.
    spy.verify().toBeCalledWithoutArgs();

    // Here, we can see what happens if we verify that the `doSomething()` method
    // was called without args when it was called with 1 arg. As you can see, we
    // have to wrap it in a try-catch because it will throw an error. In the `catch`
    // block, we log the error -- seeing that `doSomething()` was expected to be
    // called without args.
    try {
      myObj.doSomething("hello"); // Call it with args
      spy.verify().toBeCalledWithoutArgs(); // Verify that it was not called with args
    } catch (error) {
      console.log(error);
      // Outputs the following:
      //
      //     VerificationError: Method "doSomething" was called with args when expected to receive no args.
      //         at file:///some.test.js:34:16
      //
      //     Verification Results:
      //         Actual args   -> ("hello")
      //         Expected args -> (no args)
      //
      //     Check the above "some.test.js" file at/around line 34 for code like the following to fix this error:
      //         .verify().toBeCalledWithoutArgs()
      //
    }
  });
});
```
