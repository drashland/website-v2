# Mocks

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating A Mock](#creating-a-mock)
  - [Without Constructor Arguments](#without-constructor-arguments)
  - [With Constructor Arguments](#with-constructor-arguments)
- [Pre-programming](#pre-programming)
  - [.method(...).willReturn(...)](#taking-a-shortcut-method-willreturn)
  - [.method(...).willThrow(...)](#taking-a-shortcut-method-willthrow)
  - [.expects(...).toBeCalled(...)](#expects-tobecalled)
- [Verifying Calls](#checking-calls)
  - [Using .calls](#using-calls)
  - [Using .verifyExpectations()](#using-verifyexpectations)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Mocks are pre-programmed with expectations which form a specification of the
> calls they are expected to receive. They can throw an exception if they
> receive a call they don't expect and are checked during verification to ensure
> they got all the calls they were expecting.

Mocks differ from fakes because mocks are pre-programmed with expectations and
verify calls they expect to receive. Fakes do not have verification logic.

## Creating a Mock

### Without Constructor Arguments

Creating a mock of an object without constructor arguments can be done as
follows:

```ts
class SomeClassWithoutConstructor {}

const mockWithoutConstructor = Mock(SomeClassWithoutConstructor)
  .create();

console.log(mockWithoutConstructor instanceof SomeClassWithoutConstructor); // true
```

### With Constructor Arguments

Creating a mock of an object with constructor arguments can be done as follows:

```ts
class SomeClassWithConstructor {
  public name: string;
  public type: "dog" | "cat";
  public colors: string[];

  constructor(
    name: string,
    type: "dog" | "cat",
    colors: string[],
  ) {
    this.name = name;
    this.type = type;
    this.colors = colors;
  }
}

const mockWithConstructor = Mock(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

console.log(mockWithConstructor instanceof SomeClassWithConstructor); // true
console.log(mockWithConstructor.name === "Missy"); // true
console.log(mockWithConstructor.type === "dog"); // true
console.log(mockWithConstructor.colors.includes("brown")); // true
console.log(mockWithConstructor.colors.includes("white")); // true
```

## Verifying Calls

Since mocks register calls they receive, you can check to see how many times a
mocked object's methods were called by accessing its calls property. Below is an
example of checking if a math service's add() method was called.

```ts
class MathService {
  add(num1: number, num2: number): number {
    return num1 + num2;
  }
}

class MyObj {
  protected service: MathService;
  constructor(service: MathService) { ... }
  add(num1: number, num2: number): number {
    return this.service.add(num1, num2);
  }
}

const mock = Mock(MathService).create();

const myObj = new MyObj(mock);

// Assert that the service's add() method was not called yet
assertEquals(mock.calls.add, 0); // pass

// Assert that the service's add() method was called once
myObj.add(1, 1);
assertEquals(mock.calls.add, 1); // pass
```
