# Clicking

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` provides the method `.click()` that will allow you to click the
element you have selected.

If you wish to open a link in a new tab by clicking an element, you would call
`click` like so: `click({ button: "middle" })`. Otherwise Sinco will not know to
connect to this new page before your other code is executed, which is important
if you want to get it via `browser.page(2)` for example.

If clicking will change the page, pass `{ waitFor: "navigation" }` to the method
call as `.click({ waitFor: "navigation" })`. This way, Sinco knows it has to
wait until new the new location is loaded on the page before your other code is
executed.

In this tutorial, you will:

- Create a headless browser instance;
- Click a link with the middle mouse button;
- Retrive the newly opened tab and get its location;
- Click a link normally in first tab and wait for page to load;
- Get the first page's location; and
- Assert the first page was changed and the second page opened to the right
  location.

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

   import { buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     const githubElem = await page.querySelector(
       "a",
     );
     await githubElem.click({
       button: "middle", // Make sure when clicking an element that will open a new page, "middle" is used
     });
     await delay(1000);
     const page2 = await browser.page(2);
     const page2Location = await page2.location();

     // Click an element that will change a pages location
     const discordElem = await page.querySelector(
       'a[href="https://discord.gg/UuYKTVMW"]',
     );
     await discordElem.click({
       waitFor: "navigation",
     });
     const page1Location = await page.location();

     await browser.close();

     assertEquals(
       page2Location,
       "https://github.com/drashland",
     );
     assertEquals(page1Location, "https://discord.com/invite/UuYKTVMW");
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will click an element
matching the `a` selector with middle mouse button. This will open a new tab
with the href and we will then attach to this new tab. We then click an element
on the first tab matching the `a[href="https://discord.gg/UuYKTVMW"]` selector
and the flag to `waitForNavigation`, which will send your first tab to a
different page and wait for it to load completely.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass.
