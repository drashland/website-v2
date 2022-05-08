# Class Spies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Class Spy](#creating-a-class-spy)
- [Verifying Calls](#verifying-calls)
  - [Using .verify("theMethodName").toBeCalled(...)](#using-verify-themethodname-tobecalled)
    - [Verifying at Least One Call](#verifying-at-least-one-call)
    - [Verifying a Specific Number of Calls](#verifying-a-specific-number-of-calls)
  - [Using .verify("theMethodName").toBeCalledWithArgs(...)](#using-verify-themethodname-tobecalledwithargs)
  - [Using .verify("theMethodName").toBeCalledWithoutArgs()](#using-verify-themethodname-tobecalledwithoutargs)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Spies are stubs that also record some information based on how they were
> called. One form of this might be an email service that records how many
> messages it was sent.

In this tutorial, you will learn how to create one of the three types of spies:
class spies.

Class spies are spies that wrap around classes -- stubbing all of its data
members with `"spy-stubbed"` (e.g., calling a method on the spy will result in a
`"spy-stubbed"` return value). Class spies are useful if:

- You do not need a class with working implementations
- You just want to know how the class was used (e.g., what args were used when
  one of its methods were called or how many times one of its methods was
  called)

## Creating a Class Spy

Creating a class spy can be done as follows:

```ts
import { Spy } from "./deps.ts";

// Create the class that will be spied on
class SomeClass {
  public greet() {
    return "Hello";
  }
}

// Create the spy from the class
const spy = Spy(SomeClass);

console.log(spy instanceof SomeClass); // true
console.log(spy.is_spy); // true
console.log(spy.greet()); // "spy-stubbed"
```

Unlike mocks and fakes, you cannot pass in constructor args when creating a spy.
Since all spies are stubs, Rhum stubs all data members in a spy class during
construction. This includes its constructor args.

## Verifying Calls

Since spies record information on how they were called, spies will record all
calls to all of its methods. This allows you to verify the following:

- Methods were called at least once
- Methods were called a specific number of times
- Methods were called with specific args
- Methods were called without args

In order to do verification on a class spy's method, you can call
`.verify("theMethodName")`. From there, you can chain one of the following
verification methods:

- `.toBeCalled(...)`
- `.toBeCalledWithArgs(...)`
- `.toBeCalledWithoutArgs()`

_Note: Verification methods throw errors if expected results do not match actual
results. They do not "fail" tests. This means when you see an error occur from
Rhum during your test runs, this is the expected behavior._

More in-depth examples of each verification method are below.

### Using .verify("theMethodName").toBeCalled(...)

The `.toBeCalled(...)` verification method can be used to verify the following:

- The method was called at least once; or
- The method was called a specific number of times

#### Verifying at Least One Call

In the below example, we are verifying that `.doSomething()` was called at least
once. This is done by calling `.toBeCalled()` without passing in a number arg.

```ts
// some_test.ts

import { Spy } from "./deps.ts";

// Create the class that will be spied on
class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Spy on the class
const spy = Spy(MyClass);

// Call its method 3 times
spy.doSomething();
spy.doSomething();
spy.doSomething();

// Verify that the spy's `doSomething()` method was called at least once.
// Calling `.toBeCalled()` will throw an error if the `doSomething()` method was
// not called. Here, we are verifying that it was called at least once. Since we
// called it 3 times above, this does not throw an error.
spy.verify("doSomething").toBeCalled();

// Here, we can see what happens if we verify that the `doSomething()` method
// was called 5 times as opposed to 3. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error message -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify("doSomething").toBeCalled(5);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was not called 5 time(s).

  // ... or to see the full error:
  console.log(error);
  //
  //     VerificationError: Method "doSomething" was not called 5 time(s).
  //         at file:///some_test.ts:31:29
  //
  //     Verification Results:
  //         Actual calls   -> 3
  //         Expected calls -> 5
  //
  //     Check the above "some_test.ts" file at/around line 31 for code like the following to fix this error:
  //         .verify("doSomething").toBeCalled(5)
  //
}
```

#### Verifying a Specific Number of Calls

In the below example, we are verifying that `.doSomething()` was called a
specific number of times. This is done by calling `.toBeCalled(3)`. Notice we
are now passing in `3` to `.toBeCalled()` to verify that `.doSomething()` was
called 3 times.

```ts
import { Spy } from "./deps.ts";

// Create the class that will be spied on
class MyClass {
  public doSomething() {
    return "I did something!";
  }
}

// Spy on the class
const spy = Spy(MyClass);

// Call its method 3 times
spy.doSomething();
spy.doSomething();
spy.doSomething();

// Verify that the spy's `doSomething()` method was called exactly 3 times.
// Calling `.toBeCalled(3)` will throw an error if the `doSomething()` method
// was not called exactly 3 times. Here, we are verifying that it was called
// exactly 3 times. Since we called it 3 times above, this does not throw an
// error.
spy.verify("doSomething").toBeCalled(3);

// Here, we can see what happens if we verify that the `doSomething()` method
// was called 5 times as opposed to 3. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error message -- seeing that `doSomething()` was not called 5 times.
try {
  spy.verify("doSomething").toBeCalled(5);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was not called 5 time(s).
}
```

### Using .verify("theMethodName").toBeCalledWithArgs(...)

The `.toBeCalledWithArgs(...)` verification method can be used to verify the
following:

- The method was called with a specific set of args in a specific order

In the below example, we are verifying that `.doSomething(...)` was called with
the given args: `"hello", true, ["world"]`. Also, we are verifying the
following:

- The first arg is `"hello"`
- The second arg is `true`; and
- The third arg is `["world"]`

```ts
import { Spy } from "./deps.ts";

// Create that class that will be spied on
class MyClass {
  public doSomething(arg1: string, arg2: boolean, arg3: string[]) {
    return "I did something!";
  }
}

// Spy on the class
const spy = Spy(MyClass);

// Call its method with a specific set of args
spy.doSomething("hello", true, ["world"]);

// Verify that the spy's `doSomething()` method was called with a specific set
// of args. Calling `.toBeCalledWithArgs(...)` will throw an error if the
// `doSomething()` method was not called with the given args in the given order.
// Here, we are verifying that it was called with "hello", true, and ["world"].
// Since we called it with these args above, this does not throw an error.
spy.verify("doSomething").toBeCalledWithArgs("hello", true, ["world"]);

// Here, we can see what happens if we verify that the `doSomething()` method
// was called with only 2 args. As you can see, we have to wrap it in a
// try-catch because it will throw an error. In the `catch` block, we log the
// error message -- seeing that `doSomething()` was called with 3 args, not 2.
try {
  spy.verify("doSomething").toBeCalledWithArgs("hello", true);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was called with 3 arg(s) instead of 2.
}

// Furthermore, we can see what happens if we verify that the `doSomething()`
// method was called with 3 args, but one of them is incorrect. As you can see,
// we have to wrap it in a try-catch because it will throw an error. In the
// `catch` block, we log the error message -- seeing that `doSomething()` should
// not have received the `false` arg at parameter position 2.
try {
  spy.verify("doSomething").toBeCalledWithArgs("hello", false, ["world"]);
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" received unexpected arg `false<boolean>` at parameter position 2.
}
```

### Using .verify("theMethodName").toBeCalledWithoutArgs()

The `.toBeCalledWithoutArgs()` verification method can be used to verify the
following:

- The method was called without args

In the below example, we are verifying that `.doSomething()` was called without
args.

```ts
import { Spy } from "./deps.ts";

// Create the class to be spied on
class MyClass {
  public doSomething(arg1?: string) {
    return "I did something!";
  }
}

// Spy on the class
const spy = Spy(MyClass);

// Call its method without args
spy.doSomething();

// Verify that the spy's `doSomething()` method was called without args. Calling
// `.toBeCalledWithoutArgs()` will throw an error if the `doSomething()` method
// was called with args. Here, we are verifying that it was not called with
// args. Since we called it without args above, this does not throw an error.
spy.verify("doSomething").toBeCalledWithoutArgs();

// Here, we can see what happens if we verify that the `doSomething()` method
// was called without args when it was called with 1 arg. As you can see, we
// have to wrap it in a try-catch because it will throw an error. In the `catch`
// block, we log the error message -- seeing that `doSomething()` was expected
// to be called without args.
try {
  spy.doSomething("hello"); // Call it with args
  spy.verify("doSomething").toBeCalledWithoutArgs(); // Verify that it was not called with args
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" was called with args when expected to receive no args.
}
```
