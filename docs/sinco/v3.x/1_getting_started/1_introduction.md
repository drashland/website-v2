# Introduction

Sinco is a browser testing and automation tool for Deno.

Learn more about Sinco [here](about-sinco).

The way Sinco's API was built was to provide abstraction and be closer to browser API's. This is why we have added `Client`, `Page` and `Element` classes, as a way to interact with those aspects, and abstract certain methods for certain scenarios. Take version 2 for example. The `Client` class held a `getInputValue` method, but the naming was long winded, writing it was similar to how you may get the value of an input element in the browser. Due to this, we decided to rename this to `value`, and place it under an `Element` class.

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
        assertEquals(await page.location(), "https://drash.land");
     } catch (_e) {
        await Sinco.done();
     }
     const element = await page.querySelector('a[href="https://discord.gg/RFsCSaHRWK"]');
     await element.click() // This element will take the user to Sinco's documentation
     await page.waitForPageChange();
     await Sinco.assertUrlIs("https://discord.com/invite/RFsCSaHRWK");
     const location = await page.location(); // Get all data before we close, then we can safely assert
     // Once finished, close to clean up any processes
     await Sinco.done();

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
- Visit any page or website available on the internet
- Evaluate JavaScript
- Docker support
- Assertions
  - Assert url is
  - Assert see
