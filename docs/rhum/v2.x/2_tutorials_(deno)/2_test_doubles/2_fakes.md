# Fakes

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Fake](#creating-a-fake)
  - [Without Constructor Arguments](#without-constructor-arguments)
  - [With Constructor Arguments](#with-constructor-arguments)
- [Taking Shortcuts](#taking-shortcuts)
  - [.method(...).willReturn(...)](#taking-a-shortcut-method-willreturn)
  - [.method(...).willThrow(...)](#taking-a-shortcut-method-willthrow)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Fake objects actually have working implementations, but usually take some
> shortcut which makes them not suitable for production (an InMemoryTestDatabase
> is a good example).

Unlike mocks, fakes do not verify calls. For example, you cannot verify that a
fake's method was called once. Fakes are used to verify state whereas mocks are
used to verify behavior (e.g., verifying that a call was made). If you want to
verify calls made during a test or verify behavior in general, then you should
use a [Mock](/rhum/v2.x/tutorials-deno/test-doubles/mocks).

In this tutorial, you will learn how to create fakes:

- One fake will return some value.
- One fake will throw an error.

## Creating a Fake

### Without Constructor Arguments

Creating a fake of an object without constructor arguments can be done as
follows:

```ts
import { Fake } from "./deps.ts";

class SomeClassWithoutConstructor {}

const fakeWithoutConstructor = Fake(SomeClassWithoutConstructor).create();

console.log(fakeWithoutConstructor instanceof SomeClassWithoutConstructor); // true
```

### With Constructor Arguments

Creating a fake of an object with constructor arguments can be done as follows:

```ts
import { Fake } from "./deps.ts";

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

const fakeWithConstructor = Fake(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

console.log(fakeWithConstructor instanceof SomeClassWithConstructor); // true
console.log(fakeWithConstructor.name === "Missy"); // true
console.log(fakeWithConstructor.type === "dog"); // true
console.log(fakeWithConstructor.colors.includes("brown")); // true
console.log(fakeWithConstructor.colors.includes("white")); // true
```

## Taking Shortcuts

While this method is the same one that is used in mocks, we state "taking a
shortcut" when using the below methods in the context of fakes -- strictly for
staying in line with definitions.

### .method(...).willReturn(...)

Just like mocks, you can cause a fake to have one of its methods immediately
return a value by calling `.method(...).willReturn(...)`. This is called "taking
a shortcut" in the context of fakes and is useful if you do not care how the
method gets the value and just want it to return the value you want it to
return.

```ts
import { Fake } from "./deps.ts";

class Service {
  #repository: Repository;

  constructor(
    repository: Repository,
  ) {
    this.#repository = repository;
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

// Assert that a fake can make a class take a shortcut

const fakeRepositoryDoingShortcut = Fake(Repository).create();

fakeRepositoryDoingShortcut
  .method("findAllUsers")
  .willReturn([{ name: "someone else" }]);

const serviceWithShortcut = new Service(
  fakeRepositoryDoingShortcut,
);

const actualShortcutValue = serviceWithShortcut.getUsers();

console.log(actualShortcutValue); // [ { name: "someone else" } ]
console.log(fakeRepositoryDoingShortcut.anotha_one_called === false); // true
console.log(fakeRepositoryDoingShortcut.do_something_called === false); // true
console.log(fakeRepositoryDoingShortcut.do_something_else_called === false); // true

// Assert that the fake can call original implementations

const fakeRepositoryNotDoingShortcut = Fake(Repository).create();

const serviceWithoutShortcut = new Service(
  fakeRepositoryNotDoingShortcut,
);

const actualOriginal = serviceWithoutShortcut.getUsers();

console.log(actualOriginal); // [ { name: "Totoro" }, { name: "Domo-kun" } ]
console.log(fakeRepositoryNotDoingShortcut.anotha_one_called === true); // true
console.log(fakeRepositoryNotDoingShortcut.do_something_called === true); // true
console.log(fakeRepositoryNotDoingShortcut.do_something_else_called === true); // true
```

### .method(...).willThrow(...)

Just like mocks, you can cause a fake to have one of its method throw an error
-- taking a shortcut to throw an expected error -- by calling
`.method(...).willThrow(...)`. This is useful if you do not care how the method
gets to the error and just want to throw the error immediately.

```ts
import { Fake } from "./deps.ts";

class Service {
  #repository: Repository;

  constructor(
    repository: Repository,
  ) {
    this.#repository = repository;
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
  #database_connection;

  constructor(databaseConnection: any) {
    this.#database_connection = databaseConnection;
  }

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
    if (!this.#database_connection) {
      throw new Error("Database connection issue.");
    }

    this.anotha_one_called = true;
  }

  #doSomething() {
    if (!this.#database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_called = true;
  }

  #doSomethingElse() {
    if (!this.#database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_else_called = true;
  }
}

// Assert that the fake can throw an error immediately

const fakeRepositoryThrowingError = Fake(Repository)
  .withConstructorArgs("some database connection")
  .create();

// Make the Fake throw an `Error` with the `Database connection issue.`
// message when `findAllUsers()` is called.
//
// Since the Fake was created with the `databaseConnection` constructor arg,
// its implementation will have `this.#database_connection` as truthy. This
// means the Fake (by default) will NOT throw errors when the following
// calls in the Fake are made:
//
//     - this.#doSomething();
//     - this.#doSomethingElse();
//     - this.#anothaOne();
//
// So here we are telling the Fake to throw an error instead of calling its
// original `findAllUsers()` implementation.
fakeRepositoryThrowingError
  .method("findAllUsers")
  .willThrow(new Error("Database connection issue."));

const resourceWithShortcut = new Service(
  fakeRepositoryThrowingError,
);

try {
  resourceWithShortcut.getUsers();
} catch (error) {
  console.log(error.message === "Database connection issue."); // true
}

console.log(fakeRepositoryThrowingError.anotha_one_called === false); // true
console.log(fakeRepositoryThrowingError.do_something_called === false); // true
console.log(fakeRepositoryThrowingError.do_something_else_called === false); // true
```
