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

  import { buildFor } from "https://deno.land/x/sinco@v2.0.0/mod.ts";
  import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

  Deno.test("My test", async () => {
    // Setup
    const Sinco = await buildFor("chrome"); // also supports firefox
    await Sinco.goTo("https://drash.land"); // Go to this page

    // Do any actions and assertions, in any order
    await Sinco.assertUrlIs("https://drash.land");
    await Sinco.click('img[src="/logo-sinco.png"]'); // This element will take the user to Sinco's documentation
    await Sinco.waitForPageChange();
    await Sinco.assertUrlIs("https://drash.land/sinco");
    await Sinco.assertSee("Sinco is a browser testing and automation tool for Deno");

    // Once finished, close to clean up any processes
    await Sinco.done();
  })
  ```

4. Run your `app_test.ts` file.

  ```shell
  $ deno test --allow-net --allow-run=chrome app.ts
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
