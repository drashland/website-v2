# Get and Set Attribute

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` provides methods to get and set attributes on an element:

- `getAttribute(attributeName: string)`
- `setAttribute(attributeName: string, newValue: string)`

In this tutorial, you will:

- Create a headless browser instance;
- Set an attribute on an element;
- Get the attribute associated with a specific element; and
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
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     const elem = await page.querySelector("a"); // Grab any anchor tag for this example
     await elem.setAttribute("data-user-name", "Sinco!");
     const val = await elem.getAttribute("data-user-name");
     await browser.close();
     assertEquals(val, "Sinco!");
   });
   ```

In this tutorial, you are creating a new browser instance that is pointing to
`https://drash.land`, then you will set an attribute onto an element, just so
the element is populated with an attribute we know. After, you will get that
attribute value from that element and assert it equals the value you set
beforehand.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-net --allow-read app_test.ts
   ```

2. All of your tests should pass.
