# Introduction

Sinco is a browser testing and automation tool for Deno.

Learn more about Sinco [here](about-sinco).

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `app_test.ts` file.

   ```typescript
   // app_test.ts

   import { buildFor } from "./deps.ts";

   Deno.test("My test", async () => {
     // Setup
     const { browser, page } = await buildFor("chrome"); // also supports firefox
     await page.location("https://drash.land"); // Go to this page

     // Try here so if the assertion fails, we can close all resources
     try {
       assertEquals(await page.location(), "https://drash.land/");
     } catch (e) {
       await browser.close();
       throw e;
     }
     const element = await page.querySelector(
       'a[href="https://discord.gg/RFsCSaHRWK"]',
     );
     await element.click({},true);
     const location = await page.location(); // Get all data before we close, then we can safely assert
     // Once finished, close to clean up any processes
     await browser.close();

     assertEquals(location, "https://discord.com/invite/RFsCSaHRWK");
   });
   ```

4. Run your `app_test.ts` file.

   ```shell
   $ deno test --allow-net --allow-run --allow-read app_test.ts
   ```

5. In the output it provides, you should see that all tests pass!

## Features

- Zero third-party dependencies outside of Deno Standard Modules
- Extensively documented
- Browser support for:
  - Chrome
  - Firefox
- Click elements
- Type into input fields, and extract values
- Visit any page or website available on the Internet
- Obtain handles to newly opened tabs and perform tasks
- Evaluate JavaScript
- Docker support
- Assertions
  - Assert see
- Query elements
- Set and get cookies
- Set and get the location
- Take screenshots
