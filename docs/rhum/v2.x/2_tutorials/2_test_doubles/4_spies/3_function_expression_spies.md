# Function Expression Spies

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

```ts
import { Spy } from "./deps.ts";

// Create the function expressions that will be spied on
const someFunc = () => {
  return "Hello!";
};

// Create a spy out of the function expression
const spy = Spy(someFunc);

// Or you can provide a different return value other than `"spy-stubbed"`:
//
//     const spy = Spy(someFunc, "some return value");
```

## Verifying Calls

When you spy on a function expression, all calls to it will be recorded so you
can verify the following:

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

In the below example, we are verifying that `doSomething()` was called at least
once. This is done by calling `.toBeCalled()` without passing in a number arg.

```ts
import { Spy } from "./deps.ts";

const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise `someFunc` -- simulating a more
// real world use case
function higherOrderFunction(callback: () => unknown): void {
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that it was
// called later
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
  console.log(error.message); // Outputs => Function "someFunc" was not called 5 time(s).
}
```

#### Verifying a Specific Number of Calls

In the below example, we are verifying that `.doSomething()` was called a
specific number of times. This is done by calling `.toBeCalled(3)`. Notice we
are now passing in `3` to `.toBeCalled()` to verify that `.doSomething()` was
called 3 times.

```ts
import { Spy } from "./deps.ts";

const someFunc = () => {
  return "Hello!";
};

// Create a higher order function to exercise `someFunc` -- simulating a more
// real world use case
function higherOrderFunction(callback: () => unknown): void {
  callback();
  callback();
  callback();
}

// Spy on the function expression
const spy = Spy(someFunc);

// Call the higher order function -- passing in the spy -- to verify that it was
// called later
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
  console.log(error.message); // Outputs => Function "someFunc" was not called 5 time(s).
}
```

### Using .verify().toBeCalledWithArgs(...)

The `.toBeCalledWithArgs(...)` verification method can be used to verify the
following:

- The function was called at least once;
- The function was called with a specific number of args; and
- The function was called with a specific set of args

In the below example, we are verifying that `.doSomething(...)` was called with
the given args: `"hello", true, ["world"]`.

```ts
import { Spy } from "./deps.ts";

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
// error message -- seeing that `doSomething()` was called with 3 args, not 2.
try {
  spy.verify().toBeCalledWithArgs("hello", true);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was called with 3 arg(s) instead of 2.
}

// Furthermore, we can see what happens if we verify that the `doSomething()`
// method was called with 3 args, but one of them is incorrect. As you can see,
// we have to wrap it in a try-catch because it will throw an error. In the
// `catch` block, we log the error message -- seeing that `doSomething()` should
// not have received the `false` arg at parameter position 2.
try {
  spy.verify().toBeCalledWithArgs("hello", false, ["world"]);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" received unexpected arg `false<boolean>` at parameter position 2.
}
```

### Using .verify().toBeCalledWithoutArgs()

The `.toBeCalledWithoutArgs()` verification method can be used to verify the
following:

- The function was called at least once; and
- The function was called without args

In the below example, we are verifying that `.doSomething()` was called without
args.

```ts
import { Spy } from "./deps.ts";

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
// block, we log the error message -- seeing that `doSomething()` was expected
// to be called without args.
try {
  myObj.doSomething("hello"); // Call it with args
  spy.verify().toBeCalledWithoutArgs(); // Verify that it was not called with args
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was called with args when expected to receive no args.
}
```
