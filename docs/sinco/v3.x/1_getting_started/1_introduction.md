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
     const Sinco = await buildFor("chrome"); // also supports firefox
     const page = await Sinco.goTo("https://drash.land"); // Go to this page

     // Try here so if the assertion fails, we can close all resources
     try {
       assertEquals(await page.location(), "https://drash.land/");
     } catch (e) {
       await Sinco.done();
       throw e;
     }
     const element = await page.querySelector(
       'a[href="https://discord.gg/UuYKTVMW"]',
     );
     await element.click(); // This element will take the user to Sinco's documentation
     await page.waitForPageChange();
     const location = await page.location(); // Get all data before we close, then we can safely assert
     // Once finished, close to clean up any processes
     await Sinco.done();

     assertEquals(location, "https://discord.com/invite/UuYKTVMW");
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
- Evaluate JavaScript
- Docker support
- Assertions
  - Assert see
- Query elements
- Set and get cookies
- Set and get the location
- Take screenshots
