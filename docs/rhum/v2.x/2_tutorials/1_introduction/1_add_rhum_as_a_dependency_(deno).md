# Add Rhum as a Dependency (Deno)

## Table of Contents

- [Add Rhum as a Dependency](#add-rhum-as-a-dependency)
- [Managing Dependencies](#managing-dependencies)

## Add Rhum as a Dependency

As a standard practice, we recommend you create a `deps.ts` file and export Rhum
from it like below:

```typescript
// deps.ts

export {
  Dummy,
  Fake,
  Mock,
  Spy,
  Stub,
} from "https://deno.land/x/rhum@<VERSION>/mod.ts";

// Or you can export everything from Rhum
// export * as Rhum from "https://deno.land/x/rhum@<VERSION>/mod.ts";
```

Replace `<VERSION>` with the latest version of **Rhum v2.x**. The latest version
can be found [here](https://github.com/drashland/rhum/releases/latest).

Having a `deps.ts` file can make it easier for you to manage your dependencies
across multiple files. For example, instead of writing something like the
following in multiple test files ...

```typescript
import { assertEquals } from "https://deno.land/std@<LATEST_DENO_STANDARD_VERSION>/testing/asserts.ts";
import { Dummy } from "https://deno.land/x/rhum@<LATEST_RHUM_V2_VERSION>/mod.ts";

const dummy = Dummy(...);

Deno.test("Test double testing!", async (t) => {
  await t.step("Dummy() creates a dummy", async (t) => {
    class SomeClass { }
    const dummy = Dummy(SomeClass);
    assertEquals(Object.getPrototypeOf(dummy), SomeClass);
  });
});
```

... you can write the following which will allow you to change the versions of
Rhum and your dependencies in a single file as opposed to changing the versions
in all of your test files ...

```typescript
import { assertEquals, Dummy } from "./deps.ts";

const dummy = Dummy(...);

Deno.test("Test double testing!", async (t) => {
  await t.step("Dummy() creates a dummy", async (t) => {
    class SomeClass { }
    const dummy = Dummy(SomeClass);
    assertEquals(Object.getPrototypeOf(dummy), SomeClass);
  });
});
```

The `deps.ts` file is not required (and will not be mentioned in the tutorials),
but having one might make your development experience better.

## Managing Dependencies

You can read more about managing dependencies and the use of a `deps.ts` file in
Deno [here](https://deno.land/manual/examples/manage_dependencies).
