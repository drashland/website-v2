# Class Spies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating an Object Method Spy](#creating-an-object-method-spy)
- [Verifying Calls](#verifying-calls)
  - [Using .verify().toBeCalled(...)](#using-verify-tobecalled)
  - [Using .verify().toBeCalledWithArgs(...)](#using-verify-tobecalledwithArgs)
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
return a different value.

Object method spies are useful when you want to turn an object's method into a
stubbed method and just have its calls recorded so you can verify them.

### Creating an Object Method Spy

Creating an object method spy can be done as follows:

```ts
import { Spy } from "./deps.ts";

class SomeClass {
  public doSomething() {
    return "Hello";
  }
}

const someObj = new SomeClass();

const spy = Spy(someObj, "doSomething");

// Or the following if you want to provide a return value:
//
//     const spy = Spy(someObj, "doSomething", "some return value");
```

## Verifying Calls

When you spy on an object's method, its calls will be recorded so you can verify
them in your tests. You can verify that the method was called, what args it was
called with, or if it was called without any args.

In order to do verification on an object's method, it must first be a spy and
you have to call `.verify("theMethodName")`. From there, you can chain one of
the following verification methods:

- `.toBeCalled(...)`
- `.toBeCalledWithArgs(...)`
- `.toBeCalledWithoutArgs()`

More in-depth examples of each verification method are below.

### .verify(...).toBeCalled(...)

The `.toBeCalled()` verification method can be used to verify that the object's
method was called or was called a specific number of times.

In the below example, we are verifying that `myObj.doSomething()` was called at
least once.

```ts
import { Spy } from "./deps.ts";

class MyClass {
  public doSomething() {
    return "I did someting!";
  }
}

const myObj = new MyClass();

// Turn the object's method into a spy. The return value from this `Spy()` call
// is the spy itself that can be used to verify `doSomething()` calls.
const doSomethingSpy = Spy(myObj, "doSomething");

// Call the real method a few times
myObj.doSomething();
myObj.doSomething();
myObj.doSomething();

// Now verify that the method was called at least once
console.log(doSomethingSpy.verify().toBeCalled() === true); // true
```

If you want to verify that `myObj.doSomething()` was called a specific number of
times, then pass in a number to the `.toBeCalled()` method. For example:

```ts
import { Spy } from "./deps.ts";

class MyClass {
  public doSomething() {
    return "I did someting!";
  }
}

const myObj = new MyClass();

// Turn the object's method into a spy. The return value from this `Spy()` call
// is the spy itself that can be used to verify `doSomething()` calls.
const doSomethingSpy = Spy(myObj, "doSomething");

// Call the real method a few times
myObj.doSomething();
myObj.doSomething();
myObj.doSomething();

// Now verify that the method was called 3 times
console.log(doSomethingSpy.verify().toBeCalled(3) === true); // true
```
