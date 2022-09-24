# Stubs

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Stubbing Properties](#stubbing-properties)
- [Stubbing Methods](#stubbing-methods)
- [Stubbing and Providing Values](#stubbing-and-providing-values)
  - [Properties](#properties)
  - [Methods](#methods)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Stubs provide canned answers to calls made during the test, usually not
> responding at all to anything outside what's programmed in for the test.

In this tutorial, you will learn how to stub properties and methods and provide
stubbed values.

## Stubbing Properties

You can stub a property by calling `Stub(object, propertyName)`. Doing this will
stub `object.propertyName` to have a value of `"stubbed"`. To provide a value,
read [Stubbing and Providing Values](#stubbing-and-providing-values) on this
page.

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Stub } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

class MyClass {
  public some_property = "hello";
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.some_property === "hello"); // true

// Now stub the property
Stub(myObject, "some_property");

// Check that the property was stubbed
console.log(myObject.some_property === "stubbed"); // true

// @Tab Node - TypeScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its property stubbed
class MyClass {
  public some_property = "hello";
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("hello");
  });

  test("property is now stubbed", () => {
    Stub(myObject, "some_property");
    expect(myObject.some_property).toBe("stubbed");
  });
});

// @Tab Node - JavaScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its property stubbed
class MyClass {
  constructor() {
    this.some_property = "hello";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("hello");
  });

  test("property is now stubbed", () => {
    Stub(myObject, "some_property");
    expect(myObject.some_property).toBe("stubbed");
  });
});

// @Tab Node - CommonJS
const { Stub } = require("@drashland/rhum");

// Create the class that will have its property stubbed
class MyClass {
  constructor() {
    this.some_property = "hello";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("hello");
  });

  test("property is now stubbed", () => {
    Stub(myObject, "some_property");
    expect(myObject.some_property).toBe("stubbed");
  });
});
```

## Stubbing Methods

You can stub a method by calling `Stub(object, methodName)`. Doing this will
stub `object.methodName` to return a value of `"stubbed"`. To provide a value,
read [Stubbing and Providing Values](#stubbing-and-providing-values) on this
page.

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Stub } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.someMethod() === "This is the original value."); // true

// Now stub the property
Stub(myObject, "someMethod");

// Check that the property was stubbed
console.log(myObject.someMethod() === "stubbed"); // true

// @Tab Node - TypeScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its method stubbed
class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();
  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed", () => {
    Stub(myObject, "someMethod");
    expect(myObject.someMethod()).toBe("stubbed");
  });
});

// @Tab Node - JavaScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its method stubbed
class MyClass {
  someMethod() {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();
  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed", () => {
    Stub(myObject, "someMethod");
    expect(myObject.someMethod()).toBe("stubbed");
  });
});

// @Tab Node - CommonJS
const { Stub } = require("@drashland/rhum");

// Create the class that will have its method stubbed
class MyClass {
  someMethod() {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();
  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed", () => {
    Stub(myObject, "someMethod");
    expect(myObject.someMethod()).toBe("stubbed");
  });
});
```

## Stubbing and Providing Values

Sometimes you will want to stub a property with a given value or stub a method
and have it return a given value. You can do so by providing a third argument to
the `Stub()` call. For example:

```typescript
// To stub a property
Stub(object, "some_property", someNewValue);

// To stub a method
Stub(object, "someMethod", someNewReturnValue);
```

See the examples below for stubbing properties and methods and providing values.

### Properties

Below is how you can stub a property with a given value.

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Stub } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

class MyClass {
  public some_property = "hello";
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.some_property === "hello"); // true

// Now stub the property
Stub(myObject, "some_property", "YOU GOT CHANGED!!!!");

// Check that the property was stubbed
console.log(myObject.some_property === "YOU GOT CHANGED!!!!"); // true

// @Tab Node - TypeScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its property stubbed
class MyClass {
  public some_property = "wooo!";
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("wooo!");
  });

  test("property is now stubbed with the provided value", () => {
    Stub(myObject, "some_property", "prop-purrrrrrrr-ty!");
    expect(myObject.someMethod()).toBe("prop-purrrrrrrr-ty!");
  });
});

// @Tab Node - JavaScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its property stubbed
class MyClass {
  constructor() {
    this.some_property = "wooo!";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("wooo!");
  });

  test("property is now stubbed with the provided value", () => {
    Stub(myObject, "some_property", "prop-purrrrrrrr-ty!");
    expect(myObject.someMethod()).toBe("prop-purrrrrrrr-ty!");
  });
});

// @Tab Node - CommonJS
const { Stub } = require("@drashland/rhum");

// Create the class that will have its property stubbed
class MyClass {
  constructor() {
    this.some_property = "wooo!";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("property is not stubbed yet", () => {
    expect(myObject.some_property).toBe("wooo!");
  });

  test("property is now stubbed with the provided value", () => {
    Stub(myObject, "some_property", "prop-purrrrrrrr-ty!");
    expect(myObject.someMethod()).toBe("prop-purrrrrrrr-ty!");
  });
});
```

### Methods

Below is how you can stub a method with a given value.

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Stub } from "https://deno.land/x/rhum@<VERSION>/mod.ts";

class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.someMethod() === "This is the original value."); // true

// Now stub the property
Stub(myObject, "someMethod", "SOME NEW VALUE!!!!");

// Check that the property was stubbed
console.log(myObject.someMethod() === "SOME NEW VALUE!!!!"); // true

// @Tab Node - TypeScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its method stubbed
class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed with the provided value", () => {
    Stub(myObject, "someMethod", "returnnnnnnn something else");
    expect(myObject.someMethod()).toBe("returnnnnnnn something else");
  });
});

// @Tab Node - JavaScript (ESM)
import { Stub } from "@drashland/rhum";

// Create the class that will have its method stubbed
class MyClass {
  someMethod() {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed with the provided value", () => {
    Stub(myObject, "someMethod", "returnnnnnnn something else");
    expect(myObject.someMethod()).toBe("returnnnnnnn something else");
  });
});

// @Tab Node - CommonJS
const { Stub } = require("@drashland/rhum");

// Create the class that will have its method stubbed
class MyClass {
  someMethod() {
    return "This is the original value.";
  }
}

describe("Stub", () => {
  const myObject = new MyClass();

  test("method is not stubbed yet", () => {
    expect(myObject.someMethod()).toBe("This is the original value.");
  });

  test("method is now stubbed with the provided value", () => {
    Stub(myObject, "someMethod", "returnnnnnnn something else");
    expect(myObject.someMethod()).toBe("returnnnnnnn something else");
  });
});
```
