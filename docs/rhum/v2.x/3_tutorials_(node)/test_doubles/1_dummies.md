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
// @Tab TypeScript (ESM)
import { Dummy } from "@drashland/rhum";

class SomeClass {}

const dummy = Dummy(SomeClass);

console.log((Object.getPrototypeOf(dummy) === SomeClass) === true);

// @Tab JavaScript (ESM)
import { Dummy } from "@drashland/rhum";

class SomeClass {}

const dummy = Dummy(SomeClass);

console.log((Object.getPrototypeOf(dummy) === SomeClass) === true);

// @Tab CommonJS
const { Dummy } = require("@drashland/rhum");

class SomeClass {}

const dummy = Dummy(SomeClass);

console.log((Object.getPrototypeOf(dummy) === SomeClass) === true);
```

## Filling Parameter Lists

You can use dummies to fill in parameter lists. Take the below example. We want
to test `Resource.doSomething()`, but we need an instance of `Resource` before
we can do that. In order to create an instance of `Resource`, we need to pass in
the following classes to its constructor:

- `ServiceOne`
- `ServiceTwo`
- `ServiceThree`

Dummies make this task trivial.

```typescript
// @Tab TypeScript (ESM)
import { Dummy } from "@drashland/rhum";

// This is the class we want to test
class Resource {
  #service_one: ServiceOne;
  #service_two: ServiceTwo;
  #service_three: ServiceThree;

  constructor(
    serviceOne: ServiceOne,
    serviceTwo: ServiceTwo,
    serviceThree: ServiceThree,
  ) {
    this.#service_one = serviceOne;
    this.#service_two = serviceTwo;
    this.#service_three = serviceThree;
  }

  doSomething(): string {
    return "I did something!";
  }
}

class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

const resource = new Resource(
  Dummy(ServiceOne),
  Dummy(ServiceTwo),
  Dummy(ServiceThree),
);

console.log(resource.doSomething() === "I did something!"); // true

// @Tab JavaScript (ESM)
import { Dummy } from "@drashland/rhum";

// This is the class we want to test
class Resource {
  constructor(
    serviceOne,
    serviceTwo,
    serviceThree,
  ) {
    this.service_one = serviceOne;
    this.service_two = serviceTwo;
    this.service_three = serviceThree;
  }

  doSomething() {
    return "I did something!";
  }
}

class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

const resource = new Resource(
  Dummy(ServiceOne),
  Dummy(ServiceTwo),
  Dummy(ServiceThree),
);

console.log(resource.doSomething() === "I did something!"); // true

// @Tab CommonJS
const { Dummy } = require("@drashland/rhum");

// This is the class we want to test
class Resource {
  constructor(
    serviceOne,
    serviceTwo,
    serviceThree,
  ) {
    this.service_one = serviceOne;
    this.service_two = serviceTwo;
    this.service_three = serviceThree;
  }

  doSomething() {
    return "I did something!";
  }
}

class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

const resource = new Resource(
  Dummy(ServiceOne),
  Dummy(ServiceTwo),
  Dummy(ServiceThree),
);

console.log(resource.doSomething() === "I did something!"); // true
```
