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
expect to receive. Mocks do not have verification logic. Furthermore, mocks are
used to verify behavior. If you want to verify state, then you should use a
[Mock](/rhum/v2.x/tutorials/test-doubles/mocks).

In this tutorial, you will learn how to create mocks:

- One mock will return some value.
- One mock will throw an error.

## Creating a Mock

### Without Constructor Arguments

Creating a mock of an object without constructor arguments can be done as
follows:

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Mock
const mockWithoutConstructor = Mock(SomeClassWithoutConstructor).create();

// Make assertions below. The Mock should be an instance of the original class.

describe("Mock", () => {
  test("creates a mock without constructor args", () => {
    expect(mockWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Mock
const mockWithoutConstructor = Mock(SomeClassWithoutConstructor).create();

// Make assertions below. The Mock should be an instance of the original class.

describe("Mock", () => {
  test("creates a mock without constructor args", () => {
    expect(mockWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will become the Mock. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Mock
const mockWithoutConstructor = Mock(SomeClassWithoutConstructor).create();

// Make assertions below. The Mock should be an instance of the original class.

describe("Mock", () => {
  test("creates a mock without constructor args", () => {
    expect(mockWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});
```

### With Constructor Arguments

Creating a mock of an object with constructor arguments can be done as follows:

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock. Notice it requires constructor
// arguments.
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

// Create the Mock
const mockWithConstructor = Mock(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Mock should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Mock", () => {
  test("creates a mock with constructor args", () => {
    expect(mockWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(mockWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(mockWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(mockWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock. Notice it requires constrcutor
// arguments.
class SomeClassWithConstructor {
  constructor(
    name,
    type,
    colors,
  ) {
    this.name = name;
    this.type = type;
    this.colors = colors;
  }
}

// Create the Mock
const mockWithConstructor = Mock(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Mock should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Mock", () => {
  test("creates a mock with constructor args", () => {
    expect(mockWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(mockWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(mockWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(mockWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will become the Mock. Notice it requires constrcutor
// arguments.
class SomeClassWithConstructor {
  constructor(
    name,
    type,
    colors,
  ) {
    this.name = name;
    this.type = type;
    this.colors = colors;
  }
}

// Create the Mock
const mockWithConstructor = Mock(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Mock should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Mock", () => {
  test("creates a mock with constructor args", () => {
    expect(mockWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(mockWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(mockWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(mockWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});
```

## Pre-programming Methods

While this method is the same one that is used in mocks, we state
"pre-programming a method" when using the below methods in the context of mocks
-- strictly for staying in line with definitions.

### .method(...).willReturn(...)

Just like fakes, you can cause a mock to have one of its methods immediately
return a value by calling `.method(...).willReturn(...)`. This is called
"pre-programming a method" in the context of mocks and is useful if you do not
care how the method gets the value and just want it to return the value you want
it to return.

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will use the Mock
class Service {
  #repository: Repository;

  constructor(
    repository: Repository,
  ) {
    this.repository = repository;
  }

  public getUsers(): { name: string }[] {
    return this.repository.findAllUsers();
  }

  public getUser(id: number): { name: string } {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  public anotha_one_called = false;
  public do_something_called = false;
  public do_something_else_called = false;

  public findAllUsers(): { name: string }[] {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id: number): { name: string } {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
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

// The below test suite is split into two parts:
//
//   1. Asserting Mocks can take shortcuts; and
//   2. Asserting Mocks can call original implementations.
//

describe("Mock", () => {
  // Assert that a mock can make a class take a shortcut
  describe("can take a shortcut", () => {
    // Create the Mock
    const mockRepositoryDoingShortcut = Mock(Repository).create();

    // Make the Mock return a different value for `findAllUsers()`
    mockRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Mock
    const serviceWithShortcut = new Service(
      mockRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Mock is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Mock
    const mockRepositoryNotDoingShortcut = Mock(Repository).create();

    // Create the object that uses the Mock
    const serviceWithoutShortcut = new Service(
      mockRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Mock is not set to take shorcuts.

    test("returns original value", () => {
      const originalValue = serviceWithoutShortcut.getUsers();

      expect(originalValue).toStrictEqual([
        {
          name: "Totoro",
        },
        {
          name: "Domo-kun",
        },
      ]);
    });

    test("anotha_one_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will use the Mock
class Service {
  constructor(
    repository,
  ) {
    this.repository = repository;
  }

  getUsers() {
    return this.repository.findAllUsers();
  }

  getUser(id) {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  constructor() {
    this.anotha_one_called = false;
    this.do_something_called = false;
    this.do_something_else_called = false;
  }

  findAllUsers() {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  findUserById(id) {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return { name: "Totoro" };
  }

  anothaOne() {
    this.anotha_one_called = true;
  }

  doSomething() {
    this.do_something_called = true;
  }

  doSomethingElse() {
    this.do_something_else_called = true;
  }
}

// The below test suite is split into two parts:
//
//   1. Asserting Mocks can take shortcuts; and
//   2. Asserting Mocks can call original implementations.
//

describe("Mock", () => {
  describe("can take a shortcut", () => {
    // Create the Mock
    const mockRepositoryDoingShortcut = Mock(Repository).create();

    // Make the Mock return a different value for `findAllUsers()`
    mockRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Mock
    const serviceWithShortcut = new Service(
      mockRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Mock is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Mock
    const mockRepositoryNotDoingShortcut = Mock(Repository).create();

    // Create the object that uses the Mock
    const serviceWithoutShortcut = new Service(
      mockRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Mock is not set to take shorcuts.

    test("returns original value", () => {
      const originalValue = serviceWithoutShortcut.getUsers();

      expect(originalValue).toStrictEqual([
        {
          name: "Totoro",
        },
        {
          name: "Domo-kun",
        },
      ]);
    });

    test("anotha_one_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will use the Mock
class Service {
  constructor(
    repository,
  ) {
    this.repository = repository;
  }

  getUsers() {
    return this.repository.findAllUsers();
  }

  getUser(id) {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  constructor() {
    this.anotha_one_called = false;
    this.do_something_called = false;
    this.do_something_else_called = false;
  }

  findAllUsers() {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  findUserById(id) {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return { name: "Totoro" };
  }

  anothaOne() {
    this.anotha_one_called = true;
  }

  doSomething() {
    this.do_something_called = true;
  }

  doSomethingElse() {
    this.do_something_else_called = true;
  }
}

// The below test suite is split into two parts:
//
//   1. Asserting Mocks can take shortcuts; and
//   2. Asserting Mocks can call original implementations.
//

describe("Mock", () => {
  describe("can take a shortcut", () => {
    // Create the Mock
    const mockRepositoryDoingShortcut = Mock(Repository).create();

    // Make the Mock return a different value for `findAllUsers()`
    mockRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Mock
    const serviceWithShortcut = new Service(
      mockRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Mock is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(mockRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Mock
    const mockRepositoryNotDoingShortcut = Mock(Repository).create();

    // Create the object that uses the Mock
    const serviceWithoutShortcut = new Service(
      mockRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Mock is not set to take shorcuts.

    test("returns original value", () => {
      const originalValue = serviceWithoutShortcut.getUsers();

      expect(originalValue).toStrictEqual([
        {
          name: "Totoro",
        },
        {
          name: "Domo-kun",
        },
      ]);
    });

    test("anotha_one_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(mockRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});
```

### .method(...).willThrow(...)

Just like fakes, you can cause a mock to have one of its method throw an error
-- being pre-programmed to throw an expected error -- by calling
`.method(...).willThrow(...)`. This is useful if you do not care how the method
gets to the error and just want to throw the error immediately.

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will use the Mock
class Service {
  #repository: Repository;

  constructor(
    repository: Repository,
  ) {
    this.repository = repository;
  }

  public getUsers(): { name: string }[] {
    return this.repository.findAllUsers();
  }

  public getUser(id: number): { name: string } {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  public anotha_one_called = false;
  public do_something_called = false;
  public do_something_else_called = false;
  #database_connection;

  constructor(databaseConnection: any) {
    this.database_connection = databaseConnection;
  }

  public findAllUsers(): { name: string }[] {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id: number): { name: string } {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return { name: "Totoro" };
  }

  #anothaOne() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.anotha_one_called = true;
  }

  #doSomething() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_called = true;
  }

  #doSomethingElse() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_else_called = true;
  }
}

// Assert that the Mock can take a shortcut by throwing an error immediately

describe("Mock", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Mock
    const mockRepositoryThrowingError = Mock(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Mock throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Mock was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Mock (by default) will NOT throw errors when the following
    // calls in the Mock are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Mock to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    mockRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Mock
    const resourceWithShortcut = new Service(
      mockRepositoryThrowingError,
    );

    // Exercise the code and catch the `Error("Database connection issue.")`
    // error which is what we expect (based on the above `.willThrow()` call)
    try {
      resourceWithShortcut.getUsers();
    } catch (error) {
      expect(error.message).toBe("Database connection issue.");
    }

    // Assert that the following properties were not set to `true` because a
    // shortcut was taken

    expect(mockRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will use the Mock
class Service {
  constructor(
    repository: Repository,
  ) {
    this.epository = repository;
  }

  public getUsers() {
    return this.repository.findAllUsers();
  }

  public getUser(id) {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  constructor(databaseConnection) {
    this.anotha_one_called = false;
    this.do_something_called = false;
    this.do_something_else_called = false;

    this.database_connection = databaseConnection;
  }

  public findAllUsers() {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id) {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return { name: "Totoro" };
  }

  anothaOne() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.anotha_one_called = true;
  }

  doSomething() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_called = true;
  }

  doSomethingElse() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_else_called = true;
  }
}

// Assert that the Mock can take a shortcut by throwing an error immediately

describe("Mock", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Mock
    const mockRepositoryThrowingError = Mock(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Mock throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Mock was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Mock (by default) will NOT throw errors when the following
    // calls in the Mock are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Mock to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    mockRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Mock
    const resourceWithShortcut = new Service(
      mockRepositoryThrowingError,
    );

    // Exercise the code and catch the `Error("Database connection issue.")`
    // error which is what we expect (based on the above `.willThrow()` call)
    try {
      resourceWithShortcut.getUsers();
    } catch (error) {
      expect(error.message).toBe("Database connection issue.");
    }

    // Assert that the following properties were not set to `true` because a
    // shortcut was taken

    expect(mockRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will use the Mock
class Service {
  constructor(
    repository: Repository,
  ) {
    this.epository = repository;
  }

  public getUsers() {
    return this.repository.findAllUsers();
  }

  public getUser(id) {
    return this.repository.findUserById(id);
  }
}

// Create the class that will become the Mock
class Repository {
  constructor(databaseConnection) {
    this.anotha_one_called = false;
    this.do_something_called = false;
    this.do_something_else_called = false;

    this.database_connection = databaseConnection;
  }

  public findAllUsers() {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return [
      { name: "Totoro" },
      { name: "Domo-kun" },
    ];
  }

  public findUserById(id) {
    this.doSomething();
    this.doSomethingElse();
    this.anothaOne();
    return { name: "Totoro" };
  }

  anothaOne() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.anotha_one_called = true;
  }

  doSomething() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_called = true;
  }

  doSomethingElse() {
    if (!this.database_connection) {
      throw new Error("Database connection issue.");
    }

    this.do_something_else_called = true;
  }
}

// Assert that the Mock can take a shortcut by throwing an error immediately

describe("Mock", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Mock
    const mockRepositoryThrowingError = Mock(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Mock throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Mock was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Mock (by default) will NOT throw errors when the following
    // calls in the Mock are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Mock to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    mockRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Mock
    const resourceWithShortcut = new Service(
      mockRepositoryThrowingError,
    );

    // Exercise the code and catch the `Error("Database connection issue.")`
    // error which is what we expect (based on the above `.willThrow()` call)
    try {
      resourceWithShortcut.getUsers();
    } catch (error) {
      expect(error.message).toBe("Database connection issue.");
    }

    // Assert that the following properties were not set to `true` because a
    // shortcut was taken

    expect(mockRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_called).toBe(false);
    expect(mockRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});
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

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
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

// Make assertions using the `.calls` property
describe("Mock", () => {
  test(".calls property returns number of times a method was called", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // When the mock is created, there should be no calls made to `hello()` or
    // `world()`
    expect(mock.calls.hello).toBe(0);
    expect(mock.calls.world).toBe(0);

    // Now call the `run()` method which calls `hello()` and `world()` once
    mock.run();

    // We should expect `hello()` and `world()` to now have 1 call each
    expect(mock.calls.hello).toBe(1);
    expect(mock.calls.world).toBe(1);
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.calls` property
describe("Mock", () => {
  test(".calls property returns number of times a method was called", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // When the mock is created, there should be no calls made to `hello()` or
    // `world()`
    expect(mock.calls.hello).toBe(0);
    expect(mock.calls.world).toBe(0);

    // Now call the `run()` method which calls `hello()` and `world()` once
    mock.run();

    // We should expect `hello()` and `world()` to now have 1 call each
    expect(mock.calls.hello).toBe(1);
    expect(mock.calls.world).toBe(1);
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.calls` property
describe("Mock", () => {
  test(".calls property returns number of times a method was called", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // When the mock is created, there should be no calls made to `hello()` or
    // `world()`
    expect(mock.calls.hello).toBe(0);
    expect(mock.calls.world).toBe(0);

    // Now call the `run()` method which calls `hello()` and `world()` once
    mock.run();

    // We should expect `hello()` and `world()` to now have 1 call each
    expect(mock.calls.hello).toBe(1);
    expect(mock.calls.world).toBe(1);
  });
});
```

You might notice the following syntax: `mock.calls[theMethodName]`. To clarify
how this works, when you create a mock object, the mock object will create its
`calls` property. Its `calls` property is a key-value pair object where the keys
are the names of all public methods on the mock and the values are the number of
calls that the methods have received.

Take the following example:

```typescript
// @Tab Node - TypeScript (ESM)
class MyClass {
  public doSomething() { ... }
  public doSomethingElse() { ... }
  public anothaOne() { ... }
}

// @Tab Node - JavaScript (ESM)
class MyClass {
  doSomething() { ... }
  doSomethingElse() { ... }
  anothaOne() { ... }
}

// @Tab Node - CommonJS
class MyClass {
  doSomething() { ... }
  doSomethingElse() { ... }
  anothaOne() { ... }
}
```

If you create a mock of the above `MyClass`, that mock will have the following
`calls` property:

```typescript
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

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
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

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect hello() to be called exactly one time when calling run()
    mock.expects("hello").toBeCalled(1);

    // We expect world to be called exactly one time when calling run()
    mock.expects("world").toBeCalled(1);

    // Run the method that calls hello() and world()
    mock.run();

    // This should not throw an error because hello() and world() are called once
    mock.verifyExpectations();
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect hello() to be called exactly one time when calling run()
    mock.expects("hello").toBeCalled(1);

    // We expect world to be called exactly one time when calling run()
    mock.expects("world").toBeCalled(1);

    // Run the method that calls hello() and world()
    mock.run();

    // This should not throw an error because hello() and world() are called once
    mock.verifyExpectations();
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect hello() to be called exactly one time when calling run()
    mock.expects("hello").toBeCalled(1);

    // We expect world to be called exactly one time when calling run()
    mock.expects("world").toBeCalled(1);

    // Run the method that calls hello() and world()
    mock.run();

    // This should not throw an error because hello() and world() are called once
    mock.verifyExpectations();
  });
});
```

Taking the same example above, we can make `.verifyExpectations()` throw an
error by putting in a different number of calls for `hello()`.

```typescript
// @Tab Node - TypeScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
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

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect `hello()` to be called twice when calling `run()`. This will
    // cause an error to be thrown during verification because `hello()` will
    // only be called once.
    mock.expects("hello").toBeCalled(2);

    // We expect world to be called exactly one time when calling `run()`
    mock.expects("world").toBeCalled(1);

    // Run the method that calls `hello()` and `world()`
    mock.run();

    // This should not throw an error because `hello()` and `world()` are called
    // once
    mock.verifyExpectations();
  });
});

// @Tab Node - JavaScript (ESM)
import { Mock } from "@drashland/rhum";

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect `hello()` to be called twice when calling `run()`. This will
    // cause an error to be thrown during verification because `hello()` will
    // only be called once.
    mock.expects("hello").toBeCalled(2);

    // We expect world to be called exactly one time when calling `run()`
    mock.expects("world").toBeCalled(1);

    // Run the method that calls `hello()` and `world()`
    mock.run();

    // This should not throw an error because `hello()` and `world()` are called
    // once
    mock.verifyExpectations();
  });
});

// @Tab Node - CommonJS
const { Mock } = require("@drashland/rhum");

// Create the class that will become the Mock
class ObjectThatHasNestedCalls {
  hello() {
    return;
  }

  run() {
    this.hello();
    this.world();
    return "This method calls hello() and world().";
  }

  world() {
    return;
  }
}

// Make assertions using the `.verifyExpectations()`

describe("Mock", () => {
  test(".verifyExpectations() verifies expectations", () => {
    const mock = Mock(ObjectThatHasNestedCalls).create();

    // We expect `hello()` to be called twice when calling `run()`. This will
    // cause an error to be thrown during verification because `hello()` will
    // only be called once.
    mock.expects("hello").toBeCalled(2);

    // We expect world to be called exactly one time when calling `run()`
    mock.expects("world").toBeCalled(1);

    // Run the method that calls `hello()` and `world()`
    mock.run();

    // This should not throw an error because `hello()` and `world()` are called
    // once
    mock.verifyExpectations();
  });
});
```

Running the above code during test runs will result in the following error
message being thrown:

```text
Method "hello" expected 2 call(s), but received 1 call(s).
```

Using `.expects(...).toBeCalled(...)` is useful if you want to make sure that
methods are being called exactly a certain number of times at the end of a test.

Using `.expects(...).toBeCalled(...)` _is exactly the same as verifying calls
manually using the `calls` property_. Both `calls` and
`expects(...).toBeCalled(...)` exist strictly for different use cases:

- Use `calls` to verify calls as well as incrementally verifying calls while
  debugging a test.
- Use `expects(...).toBeCalled(...)` and `verifyExpectations()` to verify calls
  all at once _at the end of a test_. This means you cannot use it to debug
  calls as you walk through your test code.

Furthermore, `expects(...).toBeCalled(...)` uses the builder pattern so that we
can introduce further verification logic on top of it. For example,
`.toBeCalledWith(...)` will be introduced in a future release so that you can
expect a certain number of calls and that methods were called with expected
arguments.
