# Close a Page

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.close()` that closes the tab and consequently ends
the websocket conenction to its debugger url.

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website; and
- Close the default page.

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

   // Note you will need to import assertEquals from https://deno.land/std/testing/asserts.ts
   import { assertEquals, buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     await page.close(); //Closes the tab
     await browser.close(); // This is different, as this closes the browser process.
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will then close this page
seperately.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass.
