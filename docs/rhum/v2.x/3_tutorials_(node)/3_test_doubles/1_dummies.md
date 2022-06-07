# Dummies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Dummy](#creating-a-dummy)
- [Filling Parameter Lists](#filling-parameter-lists)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Dummy objects are passed around but never actually used. Usually they are just
> used to fill parameter lists.

In this tutorial, you will learn how to create dummies of certain types and pass
them in to fill a constructor's parameter list.

## Creating a Dummy

Creating a dummy can be done as follows:

```typescript
// @Tab Node - TypeScript (ESM)
import { Dummy } from "@drashland/rhum";

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(true);
  });
});

// @Tab Node - JavaScript (ESM)
import { Dummy } from "@drashland/rhum";

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(true);
  });
});

// @Tab Node - CommonJS
const { Dummy } = require("@drashland/rhum");

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(true);
  });
});
```

## Filling Parameter Lists

You can use dummies to fill in parameter lists. Take the below example. We want
to test `Resource.doSomething()`, but we need an instance of `Resource` before
we can do that. In order to create an instance of `Resource`, we need to pass in
the following classes to its constructor:

- `ServiceOne`
- `ServiceTwo`
- `ServiceThree`

Dummies make this task trivial. See how below:

```typescript
// @Tab Node - TypeScript (ESM)
import { Dummy } from "@drashland/rhum";

// This is the class we want to test
class Resource {
  #service_one: ServiceOne;
  #service_two: ServiceTwo;
  #service_three: ServiceThree;

  // These parameters will become dummies since all we need is to fill this
  // parameter list
  constructor(
    serviceOne: ServiceOne,
    serviceTwo: ServiceTwo,
    serviceThree: ServiceThree,
  ) {
    this.#service_one = serviceOne;
    this.#service_two = serviceTwo;
    this.#service_three = serviceThree;
  }

  // This is the method we want to test
  doSomething(): string {
    return "I did something!";
  }
}

class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

describe("Dummy", () => {
  test("should allow dummies to be passed into a class' constructor", () => {
    const resource = new Resource(
      Dummy(ServiceOne),
      Dummy(ServiceTwo),
      Dummy(ServiceThree),
    );

    expect(resource.doSomething()).toBe("I did something!");
  });
});

// @Tab Node - JavaScript (ESM)
import { Dummy } from "@drashland/rhum";

// This is the class we want to test
class Resource {
  // These parameters will become dummies since all we need is to fill this
  // parameter list
  constructor(
    serviceOne,
    serviceTwo,
    serviceThree,
  ) {
    this.service_one = serviceOne;
    this.service_two = serviceTwo;
    this.service_three = serviceThree;
  }

  // This is the method we want to test
  doSomething() {
    return "I did something!";
  }
}

// Create the classes that will become dummies
class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

describe("Dummy", () => {
  test("should allow dummies to be passed into a class' constructor", () => {
    const resource = new Resource(
      Dummy(ServiceOne),
      Dummy(ServiceTwo),
      Dummy(ServiceThree),
    );

    expect(resource.doSomething()).toBe("I did something!");
  });
});

// @Tab Node - CommonJS
const { Dummy } = require("@drashland/rhum");

// This is the class we want to test
class Resource {
  // These parameters will become dummies since all we need is to fill this
  // parameter list
  constructor(
    serviceOne,
    serviceTwo,
    serviceThree,
  ) {
    this.service_one = serviceOne;
    this.service_two = serviceTwo;
    this.service_three = serviceThree;
  }

  // This is the method we want to test
  doSomething() {
    return "I did something!";
  }
}

// Create the classes that will become dummies
class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

describe("Dummy", () => {
  test("should allow dummies to be passed into a class' constructor", () => {
    const resource = new Resource(
      Dummy(ServiceOne),
      Dummy(ServiceTwo),
      Dummy(ServiceThree),
    );

    expect(resource.doSomething()).toBe("I did something!");
  });
});
```
