# Fakes

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating a Fake](#creating-a-fake)
  - [Without Constructor Arguments](#without-constructor-arguments)
  - [With Constructor Arguments](#with-constructor-arguments)
- [Taking Shortcuts](#taking-shortcuts)
  - [.method(...).willReturn(...)](#method-willreturn)
  - [.method(...).willThrow(...)](#method-willthrow)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Fake objects actually have working implementations, but usually take some
> shortcut which makes them not suitable for production (an InMemoryTestDatabase
> is a good example).

Unlike mocks, fakes do not verify calls. For example, you cannot verify that a
fake's method was called once. Fakes are used to verify state whereas mocks are
used to verify behavior (e.g., verifying that a call was made). If you want to
verify calls made during a test or verify behavior in general, then you should
use a [Mock](/rhum/v2.x/tutorials/test-doubles/mocks).

In this tutorial, you will learn how to create fakes:

- One fake will return some value.
- One fake will throw an error.

## Creating a Fake

### Without Constructor Arguments

Creating a fake of an object without constructor arguments can be done as
follows:

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Fake } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

// Create the class that will become the Fake. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Fake
const fakeWithoutConstructor = Fake(SomeClassWithoutConstructor).create();

// Make assertions below. The Fake should be an instance of the original class.

Deno.test("Fake", async (t) => {
  await t.step(
    "creates a fake without constructor args",
    async (t) => {
      assertEquals(
        fakeWithoutConstructor instanceof SomeClassWithoutConstructor,
        true,
      );
    },
  );
});

// @Tab Node - TypeScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will become the Fake. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Fake
const fakeWithoutConstructor = Fake(SomeClassWithoutConstructor).create();

// Make assertions below. The Fake should be an instance of the original class.

describe("Fake", () => {
  test("creates a fake without constructor args", () => {
    expect(fakeWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});

// @Tab Node - JavaScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will become the Fake. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Fake
const fakeWithoutConstructor = Fake(SomeClassWithoutConstructor).create();

// Make assertions below. The Fake should be an instance of the original class.

describe("Fake", () => {
  test("creates a fake without constructor args", () => {
    expect(fakeWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});

// @Tab Node - CommonJS
const { Fake } = require("@drashland/rhum");

// Create the class that will become the Fake. Notice it does not have
// constructor arguments.
class SomeClassWithoutConstructor {}

// Create the Fake
const fakeWithoutConstructor = Fake(SomeClassWithoutConstructor).create();

// Make assertions below. The Fake should be an instance of the original class.

describe("Fake", () => {
  test("creates a fake without constructor args", () => {
    expect(fakeWithoutConstructor instanceof SomeClassWithoutConstructor)
      .toBe(true);
  });
});
```

### With Constructor Arguments

Creating a fake of an object with constructor arguments can be done as follows:

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Fake } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

// Create the class that will become the Fake. Notice it requires constructor
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

// Create the Fake
const fakeWithConstructor = Fake(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Fake should be an instance or the original class
// and should have all properties (used in the constructor) set.

Deno.test("Fake", async (t) => {
  await t.step("creates a fake constructor args", async (t) => {
    assertEquals(
      fakeWithConstructor instanceof SomeClassWithConstructor,
      true,
    );
  });

  await t.step("name property was set", async (t) => {
    assertEquals(fakeWithConstructor.name, "Missy");
  });

  await t.step("type property was set", async (t) => {
    assertEquals(fakeWithConstructor.type, "dog");
  });

  await t.step("colors property was set", async (t) => {
    assertEquals(fakeWithConstructor.colors, ["brown", "white"]);
  });
});

// @Tab Node - TypeScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will become the Fake. Notice it requires constructor
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

// Create the Fake
const fakeWithConstructor = Fake(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Fake should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Fake", () => {
  test("creates a fake with constructor args", () => {
    expect(fakeWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(fakeWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(fakeWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(fakeWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});

// @Tab Node - JavaScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will become the Fake. Notice it requires constrcutor
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

// Create the Fake
const fakeWithConstructor = Fake(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Fake should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Fake", () => {
  test("creates a fake with constructor args", () => {
    expect(fakeWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(fakeWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(fakeWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(fakeWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});

// @Tab Node - CommonJS
const { Fake } = require("@drashland/rhum");

// Create the class that will become the Fake. Notice it requires constrcutor
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

// Create the Fake
const fakeWithConstructor = Fake(SomeClassWithConstructor)
  .withConstructorArgs(
    "Missy",
    "dog",
    ["brown", "white"],
  )
  .create();

// Make assertions below. The Fake should be an instance or the original class
// and should have all properties (used in the constructor) set.

describe("Fake", () => {
  test("creates a fake with constructor args", () => {
    expect(fakeWithConstructor instanceof SomeClassWithConstructor)
      .toBe(true);
  });

  test("name property was set", () => {
    expect(fakeWithConstructor.name).toBe("Missy");
  });

  test("type property was set", () => {
    expect(fakeWithConstructor.type).toBe("dog");
  });

  test("colors property was set", () => {
    expect(fakeWithConstructor.colors).toStrictEqual([
      "brown",
      "white",
    ]);
  });
});
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

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Fake } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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

// The below test suite is split into two parts:
//
//   1. Asserting Fakes can take shortcuts; and
//   2. Asserting Fakes can call original implementations.
//

Deno.test("Fake", async (t) => {
  await t.step("can take a shortcut", async (t) => {
    // Create the fake
    const fakeRepositoryDoingShortcut = Fake(Repository).create();

    // Make the Fake return a different value for `findAllUsers()`
    fakeRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Fake
    const serviceWithShortcut = new Service(
      fakeRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Fake is set to take shorcuts.

    await t.step("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();
      assertEquals(shortcutValue, { name: "someone else" });
    });

    await t.step("anotha_one_called WAS NOT called", async () => {
      assertEquals(fakeRepositoryDoingShortcut.anotha_one_called, false);
    });

    await t.step("do_something_called WAS NOT called", async () => {
      assertEquals(fakeRepositoryDoingShortcut.do_something_called, false);
    });

    await t.step("do_something_else_called WAS NOT called", async () => {
      assertEquals(fakeRepositoryDoingShortcut.do_something_else_called, false);
    });
  });

  await t.step("can call original implementations", async (t) => {
    // Create the Fake
    const fakeRepositoryNotDoingShortcut = Fake(Repository).create();

    // Create the object that uses the Fake
    const serviceWithoutShortcut = new Service(
      fakeRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Fake is not set to take shorcuts.

    await t.step("returns original value", () => {
      const originalValue = serviceWithoutShortcut.getUsers();

      assertEquals(originalValue, [
        {
          name: "Totoro",
        },
        {
          name: "Domo-kun",
        },
      ]);
    });

    await t.step("anotha_one_called WAS called", () => {
      assertEquals(fakeRepositoryNotDoingShortcut.anotha_one_called, true);
    });

    await t.step("do_something_called WAS called", () => {
      assertEquals(fakeRepositoryNotDoingShortcut.do_something_called, true);
    });

    await t.step("do_something_else_called WAS called", () => {
      assertEquals(
        fakeRepositoryNotDoingShortcut.do_something_else_called,
        true,
      );
    });
  });
});

// @Tab Node - TypeScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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
//   1. Asserting Fakes can take shortcuts; and
//   2. Asserting Fakes can call original implementations.
//

describe("Fake", () => {
  // Assert that a fake can make a class take a shortcut
  describe("can take a shortcut", () => {
    // Create the Fake
    const fakeRepositoryDoingShortcut = Fake(Repository).create();

    // Make the Fake return a different value for `findAllUsers()`
    fakeRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Fake
    const serviceWithShortcut = new Service(
      fakeRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Fake is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Fake
    const fakeRepositoryNotDoingShortcut = Fake(Repository).create();

    // Create the object that uses the Fake
    const serviceWithoutShortcut = new Service(
      fakeRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Fake is not set to take shorcuts.

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
      expect(fakeRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});

// @Tab Node - JavaScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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
//   1. Asserting Fakes can take shortcuts; and
//   2. Asserting Fakes can call original implementations.
//

describe("Fake", () => {
  describe("can take a shortcut", () => {
    // Create the Fake
    const fakeRepositoryDoingShortcut = Fake(Repository).create();

    // Make the Fake return a different value for `findAllUsers()`
    fakeRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Fake
    const serviceWithShortcut = new Service(
      fakeRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Fake is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Fake
    const fakeRepositoryNotDoingShortcut = Fake(Repository).create();

    // Create the object that uses the Fake
    const serviceWithoutShortcut = new Service(
      fakeRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Fake is not set to take shorcuts.

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
      expect(fakeRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});

// @Tab Node - CommonJS
const { Fake } = require("@drashland/rhum");

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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
//   1. Asserting Fakes can take shortcuts; and
//   2. Asserting Fakes can call original implementations.
//

describe("Fake", () => {
  describe("can take a shortcut", () => {
    // Create the Fake
    const fakeRepositoryDoingShortcut = Fake(Repository).create();

    // Make the Fake return a different value for `findAllUsers()`
    fakeRepositoryDoingShortcut
      .method("findAllUsers")
      .willReturn([{ name: "someone else" }]);

    // Create the object that uses the Fake
    const serviceWithShortcut = new Service(
      fakeRepositoryDoingShortcut,
    );

    // Make assertions below. They should not call original implementations
    // since the Fake is set to take shorcuts.

    test("returns shortcut value", () => {
      const shortcutValue = serviceWithShortcut.getUsers();

      expect(shortcutValue).toStrictEqual([
        {
          name: "someone else",
        },
      ]);
    });

    test("anotha_one_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.anotha_one_called).toBe(false);
    });

    test("do_something_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_called).toBe(false);
    });

    test("do_something_else_called WAS NOT called", () => {
      expect(fakeRepositoryDoingShortcut.do_something_else_called).toBe(false);
    });
  });

  describe("can call original implementations", () => {
    // Create the Fake
    const fakeRepositoryNotDoingShortcut = Fake(Repository).create();

    // Create the object that uses the Fake
    const serviceWithoutShortcut = new Service(
      fakeRepositoryNotDoingShortcut,
    );

    // Make assertions below. They should call original implementations since
    // the Fake is not set to take shorcuts.

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
      expect(fakeRepositoryNotDoingShortcut.anotha_one_called).toBe(true);
    });

    test("do_something_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_called).toBe(true);
    });

    test("do_something_else_called WAS called", () => {
      expect(fakeRepositoryNotDoingShortcut.do_something_else_called).toBe(
        true,
      );
    });
  });
});
```

### .method(...).willThrow(...)

Just like mocks, you can cause a fake to have one of its method throw an error
-- taking a shortcut to throw an expected error -- by calling
`.method(...).willThrow(...)`. This is useful if you do not care how the method
gets to the error and just want to throw the error immediately.

```typescript
// @Tab Deno
// Replace `<VERSION>` with the latest version of Rhum v2.x. The latest version
// can be found at https://github.com/drashland/rhum/releases/latest
import { Fake } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
// Replace `<VERSION>` with the latest version of Deno Standard Modules. The
// latest version can be found at https://deno.land/std
import { assertEquals } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

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

// Assert that the Fake can take a shortcut by throwing an error immediately

Deno.test("Fake", async (t) => {
  await t.step("can take a shortcut by throwing an error", () => {
    // Create the Fake
    const fakeRepositoryThrowingError = Fake(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Fake throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Fake was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Fake (by default) will NOT throw errors when the following
    // calls in the Fake are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Fake to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    fakeRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Fake
    const resourceWithShortcut = new Service(
      fakeRepositoryThrowingError,
    );

    // Exercise the code and catch the `Error("Database connection issue.")`
    // error which is what we expect (based on the above `.willThrow()` call)
    try {
      resourceWithShortcut.getUsers();
    } catch (error) {
      assertEquals(error.message, "Database connection issue.");
    }

    // Assert that the following properties were not set to `true` because a
    // shortcut was taken

    assertEquals(fakeRepositoryThrowingError.anotha_one_called, false);
    assertEquals(fakeRepositoryThrowingError.do_something_called, false);
    assertEquals(fakeRepositoryThrowingError.do_something_else_called, false);
  });
});

// @Tab Node - TypeScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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

// Assert that the Fake can take a shortcut by throwing an error immediately

describe("Fake", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Fake
    const fakeRepositoryThrowingError = Fake(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Fake throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Fake was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Fake (by default) will NOT throw errors when the following
    // calls in the Fake are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Fake to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    fakeRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Fake
    const resourceWithShortcut = new Service(
      fakeRepositoryThrowingError,
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

    expect(fakeRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});

// @Tab Node - JavaScript (ESM)
import { Fake } from "@drashland/rhum";

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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

// Assert that the Fake can take a shortcut by throwing an error immediately

describe("Fake", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Fake
    const fakeRepositoryThrowingError = Fake(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Fake throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Fake was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Fake (by default) will NOT throw errors when the following
    // calls in the Fake are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Fake to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    fakeRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Fake
    const resourceWithShortcut = new Service(
      fakeRepositoryThrowingError,
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

    expect(fakeRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});

// @Tab Node - CommonJS
const { Fake } = require("@drashland/rhum");

// Create the class that will use the Fake
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

// Create the class that will become the Fake
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

// Assert that the Fake can take a shortcut by throwing an error immediately

describe("Fake", () => {
  test("can take a shortcut by throwing an error", () => {
    // Create the Fake
    const fakeRepositoryThrowingError = Fake(Repository)
      .withConstructorArgs("some database connection")
      .create();

    // Make the Fake throw an `Error` with the `Database connection issue.`
    // message when `findAllUsers()` is called.
    //
    // Since the Fake was created with the `databaseConnection` constructor arg,
    // its implementation will have `this.database_connection` as truthy. This
    // means the Fake (by default) will NOT throw errors when the following
    // calls in the Fake are made:
    //
    //     - this.doSomething();
    //     - this.doSomethingElse();
    //     - this.anothaOne();
    //
    // So here we are telling the Fake to throw an error instead of calling its
    // original `findAllUsers()` implementation.
    fakeRepositoryThrowingError
      .method("findAllUsers")
      .willThrow(new Error("Database connection issue."));

    // Create the object that uses the Fake
    const resourceWithShortcut = new Service(
      fakeRepositoryThrowingError,
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

    expect(fakeRepositoryThrowingError.anotha_one_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_called).toBe(false);
    expect(fakeRepositoryThrowingError.do_something_else_called).toBe(false);
  });
});
```
