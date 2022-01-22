# Get Pages

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Sinco provides the method `.page()` on the `Client` class that will try and
retrieve the page (tab), of which the index (_starting at 1 for the first tab_)
is provided as an argument. If the provided index is not within the range of
total open tabs in the browser, Sinco will close all resources and throw a
`RangeError`.

Sinco also provides the method `closeAllPagesExcept()` on the `Client` class,
that will try and close all open pages except the one passed in as the argument.
Please be aware that any other page objects will then not allow interaction with
their respective page and any such attempt will result in an Error.

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website;
- Open a link in a new tab;
- Take control of the new tab;
- Close all other pages except this new tab; and
- Assert the URL of the newly opened tab.

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

   import { assertEquals, buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     const elem = await page.querySelector("a");
     await elem.click({
       button: "middle",
     });
     const page2 = await browser.page(2);
     await browser.closeAllPagesExcept(page2); //'page' object reference becomes invalid after this line.
     const page2location = await page2.location();
     await browser.close();
     assertEquals(page2location, "https://github.com/drashland");
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will click on a hyperlink
with middle mouse button to open it in a new page (tab). You will then take
control of that new page, close the rest of the pages and assert that the URL
for the new page is as expected.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass.
