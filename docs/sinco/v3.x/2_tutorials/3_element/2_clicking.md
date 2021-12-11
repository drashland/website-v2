# Clicking

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` provides the method `.click()` that will allow you to click the
element you have selected.

In this tutorial, you will:

- Create a headless browser instance; and
- Click a link;
- Assert the page was changed.

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
     const Sinco = await buildFor("chrome");
     const page = await Sinco.goTo("https://drash.land");
     const elem = await page.querySelector(
       'a[href="https://discord.gg/RFsCSaHRWK"]',
     );
     await elem.click();
     await page.waitForPageChange();
     const location = await page.location();
     await Sinco.done();
     assertEquals(location, "https://discord.com/invite/RFsCSaHRWK");
   });
   ```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you will click an element matching
the `a[href="https://discord.gg/RFsCSaHRWK"]` selector, which will send you to a
different page.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass
