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
    await Sinco.goTo("https://drash.land"); // Go to this page

    // Do any actions and assertions, in any order
    await Sinco.assertUrlIs("https://drash.land/");
    await Sinco.click('a[href="https://discord.gg/RFsCSaHRWK"]'); // This element will take the user to Sinco's documentation
    await Sinco.waitForPageChange();
    await Sinco.assertUrlIs("https://discord.com/invite/RFsCSaHRWK");

    // Once finished, close to clean up any processes
    await Sinco.done();
  })
  ```

4. Run your `app_test.ts` file.

  ```shell
  $ deno test --allow-net --allow-run --allow-read app.ts
  ```

5. In the output it provides, you should see that all tests pass!

## Features

* Zero third-party dependencies outside of Deno Standard Modules
* Extensively documented
* Browser support for:
  * Chrome
  * Firefox
* Click elements
* Type into input fields, and extract values
* Visit any page or website available on the internet
* Evaluate JavaScript
* Docker support
* Assertions
  * Assert url is
  * Assert see
