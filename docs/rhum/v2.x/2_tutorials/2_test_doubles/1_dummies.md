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
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Dummy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

class SomeClass {}

const dummy = Dummy(SomeClass);

Deno.test("Dummy", async (t) => {
  await t.step("Dummy() creates a dummy", async (t) => {
    const dummy = Dummy(SomeClass);
    assertEquals(Object.getPrototypeOf(dummy), SomeClass);
  });
});

// @Tab Node - TypeScript (ESM)
import { Dummy } from "@drashland/rhum";

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(SomeClass);
  });
});

// @Tab Node - JavaScript (ESM)
import { Dummy } from "@drashland/rhum";

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(SomeClass);
  });
});

// @Tab Node - CommonJS
const { Dummy } = require("@drashland/rhum");

// Create the class that will become a dummy
class SomeClass {}

describe("Dummy", () => {
  test("Dummy() creates a dummy", () => {
    const dummy = Dummy(SomeClass);
    expect(Object.getPrototypeOf(dummy)).toBe(SomeClass);
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
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Dummy } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

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

  public doSomething(): string {
    return "I did something!";
  }
}

class ServiceOne {}
class ServiceTwo {}
class ServiceThree {}

Deno.test("Dummy", async (t) => {
  await t.step(
    "should allow dummies to be passed into a class' constructor",
    async (t) => {
      const resource = new Resource(
        Dummy(ServiceOne),
        Dummy(ServiceTwo),
        Dummy(ServiceThree),
      );

      assertEquals(resource.doSomething(), "I did something!");
    },
  );
});

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
