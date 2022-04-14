# Mocks

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Mock](#creating-a-mock)
  - [Without Constructor Arguments](#without-constructor-arguments)
  - [With Constructor Arguments](#with-constructor-arguments)
- [Pre-programming Methods](#pre-programming-methods)
  - [.method(...).willReturn(...)](#method-willreturn)
  - [.method(...).willThrow(...)](#method-willthrow)
- [Verifying Calls](#verifying-calls)
  - [Using .calls](#using-calls)
  - [Using .expects(...).toBeCalled(...) and .verifyExpectations()](#using-expects-tobecalled-and-verifyexpectations)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Mocks are pre-programmed with expectations which form a specification of the
> calls they are expected to receive. They can throw an exception if they
> receive a call they don't expect and are checked during verification to ensure
> they got all the calls they were expecting.

Unlike fakes, mocks are pre-programmed with expectations and verify calls they
expect to receive. Fakes do not have verification logic. Furthermore, mocks are
used to verify behavior. If you want to verify state, then you should use a
[Fake](/rhum/v2.x/tutorials/test-doubles/fakes).

In this tutorial, you will learn how to create mocks:

- One mock will return some value.
- One mock will throw an error.

## Creating a Mock

### Without Constructor Arguments

Creating a mock of an object without constructor arguments can be done as
follows:

```ts
import { Mock } from "./deps.ts";

class SomeClassWithoutConstructor {}

const mockWithoutConstructor = Mock(SomeClassWithoutConstructor).create();

console.log(mockWithoutConstructor instanceof SomeClassWithoutConstructor); // true
```

### With Constructor Arguments

Creating a mock of an object with constructor arguments can be done as follows:

```ts
import { Mock } from "./deps.ts";

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

## Pre-programming Methods

While this method is the same one that is used in fakes, we state
"pre-programming a method" when using the below methods in the context of mocks
-- strictly for staying in line with definitions.

### .method(...).willReturn(...)

Just like fakes, you can cause a mock to have one of its methods immediately
return a value by calling `.method(...).willReturn(...)`. This is called
"pre-programming a method" in the context of mocks and is useful if you do not
care how the method gets the value and just want it to return the value you want
it to return.

```ts
import { Mock } from "./deps.ts";

class Service {
  #repository: Repository;

  constructor(
    serviceOne: Repository,
  ) {
    this.#repository = serviceOne;
  }

  public getUsers(): { name: string }[] {
    return this.#repository.findAllUsers();
  }

  public getUser(id: number): { name: string } {
    return this.#repository.findUserById(id);
  }
}

class Repository {
  public anotha_one_called = false;
  public do_something_called = false;
  public do_something_else_called = false;

  public findAllUsers(): { name: string }[] {
    this.#doSomething();
    this.#doSomethingElse();
    this.#anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id: number): { name: string } {
    this.#doSomething();
    this.#doSomethingElse();
    this.#anothaOne();
    return { name: "Totoro" };
  }

  #anothaOne() {
    this.anotha_one_called = true;
  }

  #doSomething() {
    this.do_something_called = true;
  }

  #doSomethingElse() {
    this.do_something_else_called = true;
  }
}

// Assert that a mock can pre-program a method call in a class

const mockRepositoryDoingShortcut = Mock(Repository).create();

mockRepositoryDoingShortcut
  .method("findAllUsers")
  .willReturn([{ name: "someone else" }]);

const serviceWithShortcut = new Service(
  mockRepositoryDoingShortcut,
);

const actualShortcutValue = serviceWithShortcut.getUsers();

console.log(actualShortcutValue); // [ { name: "someone else" } ]
console.log(mockRepositoryDoingShortcut.anotha_one_called === false); // true
console.log(mockRepositoryDoingShortcut.do_something_called === false); // true
console.log(mockRepositoryDoingShortcut.do_something_else_called === false); // true

// Assert that the mock can call original implementations

const mockRepositoryNotDoingShortcut = Mock(Repository).create();

const serviceWithoutShortcut = new Service(
  mockRepositoryNotDoingShortcut,
);

const actualOriginal = serviceWithoutShortcut.getUsers();

console.log(actualOriginal); // [ { name: "Totoro" }, { name: "Domo-kun" } ]
console.log(mockRepositoryNotDoingShortcut.anotha_one_called === true); // true
console.log(mockRepositoryNotDoingShortcut.do_something_called === true); // true
console.log(mockRepositoryNotDoingShortcut.do_something_else_called === true); // true
```

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

### .method(...).willThrow(...)

Just like fakes, you can cause a mock to have one of its method throw an error
-- being pre-programmed to throw an expected error -- by calling
`.method(...).willThrow(...)`. This is useful if you do not care how the method
gets to the error and just want to throw the error immediately.

```ts
import { Mock } from "./deps.ts";

class Service {
  #repository: Repository;

  constructor(
    serviceOne: Repository,
  ) {
    this.#repository = serviceOne;
  }

  public getUsers(): { name: string }[] {
    return this.#repository.findAllUsers();
  }

  public getUser(id: number): { name: string } {
    return this.#repository.findUserById(id);
  }
}

class Repository {
  public anotha_one_called = false;
  public do_something_called = false;
  public do_something_else_called = false;
  #db_connection = null;

  public findAllUsers(): { name: string }[] {
    if (!this.#db_connection) {
      throw new Error("Database connection issue.");
    }
    this.#doSomething();
    this.#doSomethingElse();
    this.#anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id: number): { name: string } {
    this.#doSomething();
    this.#doSomethingElse();
    this.#anothaOne();
    return { name: "Totoro" };
  }

  #anothaOne() {
    this.anotha_one_called = true;
  }

  #doSomething() {
    this.do_something_called = true;
  }

  #doSomethingElse() {
    this.do_something_else_called = true;
  }
}

// Assert that the mock can throw an error immediately

const mockRepositoryThrowingError = Mock(Repository).create();

mockRepositoryThrowingError
  .method("findAllUsers")
  .willThrow(new Error("Database connection issue."));

const resourceWithShortcut = new Service(
  mockRepositoryThrowingError,
);

try {
  resourceWithShortcut.getUsers();
} catch (error) {
  console.log(error.message === "Database connection issue."); // true
}

console.log(mockRepositoryThrowingError.anotha_one_called === false); // true
console.log(mockRepositoryThrowingError.do_something_called === false); // true
console.log(mockRepositoryThrowingError.do_something_else_called === false); // true
```

## Verifying Calls

Since mocks register calls they receive, you can check to see how many times a
mocked object's methods were called by doing one of two things:

- Accessing the mock objects `calls`; or
- Using the mock object's `.verifyExpectations()` method (after using
  `.expects(...).toBeCalled(...)`)

### Using .calls

You can verify that methods were called a certain number of times using the
`calls` property on the mock.

```ts
class ObjectThatHasNestedCalls {
  public hello(): void {
    return;
  }

  public run(): string {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  public world(): void {
    return;
  }
}

const mock = Mock(ObjectThatHasNestedCalls).create();

// Run the method that calls hello() and world()
mock.run();

// Verify the number of calls for hello() and world()
console.log(mock.calls.hello === 1); // true
console.log(mock.calls.world === 1); // true
```

You might notice the following syntax: `mock.calls[theMethodName]`. To clarify
how this works, when you create a mock object, the mock object will create its
`calls` property. Its `calls` property is a key-value pair object where the keys
are the names of all public methods on the mock and the values are the number of
calls that the methods have received.

Take the following example:

```ts
class MyClass {
  public doSomething() { ... }
  public doSomethingElse() { ... }
  public anothaOne() { ... }
}
```

If you create a mock of the above `MyClass`, that mock will have the following
`calls` property:

```ts
calls = {
  doSomething: 0,
  doSomethingElse: 0,
  anothaOne: 0,
};
```

All calls start with `0` and increment as they are called during tests.

### Using .expects(...).toBeCalled(...) and .verifyExpectations()

You can add call expectations to methods on a mock object by using
`.expects(...).toBeCalled(...)` method, which can be verified later using
`.verifyExpectations()`.

In the below example, we are verifying that `ObjectThatHasNestedCalls.test()`
will call `hello()` once and `world()` once. If `hello()` and `world()` are
called more than their expected times, then `.verifyExpectations()` will throw
an error.

```ts
class ObjectThatHasNestedCalls {
  public hello(): void {
    return;
  }

  public run(): string {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  public world(): void {
    return;
  }
}

const mock = Mock(ObjectThatHasNestedCalls).create();

// We expect hello() to be called exactly one time when calling run()
mock.expects("hello").toBeCalled(1);

// We expect world to be called exactly one time when calling run()
mock.expects("world").toBeCalled(1);

// Run the method that calls hello() and world()
mock.run();

// This should not throw an error because hello() and world() are called once
mock.verifyExpectations();
```

Taking the same example above, we can make `.verifyExpectations()` throw an
error by putting in a different number of calls for `hello()`.

```ts
class ObjectThatHasNestedCalls {
  public hello(): void {
    return;
  }

  public run(): string {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  public world(): void {
    return;
  }
}

const mock = Mock(ObjectThatHasNestedCalls).create();

// We expect hello() to be called twice when calling run()
// This will cause an error to be thrown during verification
mock.expects("hello").toBeCalled(2);

// We expect world to be called exactly one time when calling run()
mock.expects("world").toBeCalled(1);

// Run the method to check that
mock.run();

// This should throw an error because hello() is only called once
// and we expected it to be called twice
mock.verifyExpectations();
```

Running the above code will result in the following error message being thrown:

```text
Method "hello" expected 2 call(s), but received 1 call(s).
```

Using `.expects(...).toBeCalled(...)` is useful if you want to make sure that
methods are being called exactly a certain number of times at the end of a test.

Using `.expects(...).toBeCalled(...)` _is exactly the same as verifying calls
manually using the `calls` property_. Both `calls` and
`expects(...).toBeCalled(...)` exist strictly for different use cases:

- Use `calls` to verify calls as well as incrementally verify calls while
  debugging a test.
- Use `expects(...).toBeCalled(...)` and `verifyExpectations()` to verify calls
  all at once _at the end of a test_. This means you cannot use it to debug
  calls as you walk through your test code.

Furthermore, `expects(...).toBeCalled(...)` uses the builder pattern so that we
can introduce further verification logic on top of it. For example,
`.toBeCalledWith(...)` will be introduced in a future release so that you can
expect a certain number of calls and that methods were called with expected
arguments.
