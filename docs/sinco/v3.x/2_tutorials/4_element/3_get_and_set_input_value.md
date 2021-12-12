# Get and Set Inpiut Value

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` provides a method to get the value associated with an input element
that is present on the page, as well as setting it.

In this tutorial, you will:

- Create a headless browser instance;
- Set the value for an input element;
- Get the value associated with a specific input element; and
- Assert that value is correct.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app_test.ts
  deps.ts
```

## Steps

1. Create your `app_test.ts` file.

   ```typescript
   // app.ts

   // Note that you will need to import assertEquals from https://deno.land/std/testing/asserts.ts
   import { assertEquals, buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const Sinco = await buildFor("chrome");
     const page = await Sinco.goTo("https://chromestatus.com");
     const elem = await page.querySelector('input[placeholder="Filter"]');
     await elem.value("hello world");
     const val = await elem.value();
     await Sinco.done();
     assertEquals(val, "hello world");
   });
   ```

In this tutorial, you are creating a new browser instance that is pointing to
https://chromestatus.com, then you will type a value into an input field, just
so the field is populated with a value. After, you will get the value from that
input field and assert it equals the value you typed.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-net --allow-read app_test.ts
   ```

2. All of your tests should pass
