# Object Method Spies

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

```ts
import { Spy } from "./deps.ts";

class SomeClass {
  public doSomething() {
    return "Hello";
  }
}

// Create a real object
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

When you spy on an object's method, all calls to it will be recorded so you can
verify the following:

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
create an object method spy using `const spy = Spy(obj, "methodName")`. Here,
`methodName` is what Rhum keeps track of so when you call `spy.verify()`, Rhum
calls `spy.verify("methodName")` under the hood.

_Note: Verification methods throw errors if expected results do not match actual
results. They do not "fail" tests. This means when you see an error occur during
your test runs, this is the expected behavior._

More in-depth examples of each verification method are below.

### Using .verify().toBeCalled(...)

The `.toBeCalled(...)` verification method can be used to verify the following:

- The method was called at least once; or
- The method was called a specific number of times

#### Verifying at Least One Call

In the below example, we are verifying that `myObj.doSomething()` was called at
least once. This is done by calling `.toBeCalled()` without passing in a number
arg.

```ts
import { Spy } from "./deps.ts";

class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method a few times
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
// error message -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was not called 5 time(s).
}
```

#### Verifying a Specific Number of Calls

In the below example, we are verifying that `.doSomething()` was called a
specific number of times. This is done by calling `.toBeCalled(3)`. Notice we
are now passing in `3` to `.toBeCalled()` to verify that `.doSomething()` was
called 3 times.

```ts
import { Spy } from "./deps.ts";

class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Create the real object
const myObj = new MyClass();

// Spy on the object's method
const spy = Spy(myObj, "doSomething");

// Call the method a few times
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
// error message -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify().toBeCalled(5);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was not called 5 time(s).
}
```

### Using .verify().toBeCalledWithArgs(...)

The `.toBeCalledWithArgs(...)` verification method can be used to verify the
following:

- The method was called at least once;
- The method was called with a specific number of args; and
- The method was called with a specific set of args

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

### Using .verify("theMethodName").toBeCalledWithoutArgs()

The `.toBeCalledWithoutArgs()` verification method can be used to verify the
following:

- The method was called at least once; and
- The method was called without args

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
