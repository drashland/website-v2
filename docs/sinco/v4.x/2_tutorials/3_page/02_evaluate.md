# Evaluate the Page

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.evaluate()` that can run JavaScript against the
context of the page.

You can pass in a string (`.evaluate('1 + 2')`) or a function
(`.evaluate(() => document.title)`).

Example evaluations could be:

- Querying the DOM (getting the child of an element)
- Returning the page title
- Adding elements to the page
- Run equations
- Anything you could write in a client side JavaScript file or in the console,
  you can do here!
- If there was an error with the code you tried to evaluate, Sinco will throw an
  error.
- You can even query using the `$x` selector when the passed in parameter to
  `evaluate()` is a string!

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website;
- Gather some information about the page;
- Run a basic sum; and
- Update the DOM.

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
     const pageTitle = await page.evaluate(() => {
       return document.title;
     });
     const sum = await page.evaluate(`1 + 10`);
     const oldBodyLength = await page.evaluate(() => {
       return document.body.children.length;
     });
     const newBodyLength = await page.evaluate(() => {
       const p = document.createElement("p");
       p.textContent = "Hello world!";
       document.body.appendChild(p);
       return document.body.children.length;
     });
     await browser.close();
     assertEquals(pageTitle, "Drash Land");
     assertEquals(sum, 11);
     assertEquals(oldBodyLength, 3);
     assertEquals(newBodyLength, 4);
   });
   ```

   Within the function you can pass to `evaluate()`, you have full access to the
   DOM, meaning you can write client-side JavaScript like you normally would.
   For example:

   ```typescript
   await page.evaluate(() => {
     const form = document.querySelector("form");
     const submitButton = document.getElementById("submit");
     const href = window.location.href;
     const savedValue = localStorage.getItem("id");
   });
   ```

   Here you are going to create your headless browser instance, and navigate to
   `https://drash.land`. Once the page has loaded, you will evaluate a few
   scripts that will get the document title and create a new element on the
   page. You will then assert that the page title is as expected, and also that
   a new element was added to the DOM.

2. Create your config.

   A `tsconfig.json` file is required when targeting the DOM (using document
   syntax) to tell Deno that this is valid.

   ```json
   {
     "compilerOptions": {
       "lib": ["dom", "deno.ns"]
     }
   }
   ```

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net --config tsconfig.json app_test.ts
   ```

2. All of your tests should pass.
