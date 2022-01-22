# Custom Assertions

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides some utility methods that act as wrappers for Deno's std/testing
assertions. These methods will run a query on the DOM and make an assertion. You
do not need to assert these yourself.

The method it provides is:

- `assertNoConsoleErrors` - This method will check the developer console for any
  errors, and if there are, the browser resources will be closed (so you don't
  have to do it), and an assertion error will be thrown, where the error message
  will contain a list of errors in the console. Example errors could be:
  - An error when a favicon was not found (failed requests eg 404, 500)
  - An error with a JavaScript file (such as a Vue component has thrown an error
    during render) You can also pass in an exclusion list to ignore specific
    errors: `assertNoConsoleErrors('favicon')`.

In this tutorial, you will:

- Create a headless browser instance; and
- Assert no errors exist in the console.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app_test.ts
  deps.ts
```

## Steps

1. Create your `app_test.ts` file.

   ```typescript
   // app_test.ts

   import { buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     await page.assertNoConsoleErrors(); // or await page.assertNoConsoleErrors(["favicon"]);
     await browser.close();
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Finally you will assert that no errors exist inside the
console.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass.
