# Evaluate the Page

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Sinco provides the method `.evaluatePage()` that can run JavaScript against the context of the page.

You can pass in a string (`.evaluatePage('1 + 2')`) or a function (`.evaluatePage(() => document.title)`).

Example evaluations could be:

* Querying the DOM (getting the child of an element)
* Returning the page title
* Adding elements to the page
* Run equations
* Anything you could write in a client side JavaScript file or in the console, you can do here!
* If there was an error with the code you tried to evaluate, Sinco will throw an error.

In this tutorial, you will:

* Create a headless browser instance; and
* Go to a website;
* Gather some information about the page;
* Run a basic sum;
* Update the DOM.

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
  import { buildFor, assertEquals } from "./deps.ts";

  Deno.test("My web app works as expected", async () => {
    const Sinco = await buildFor("chrome");
    await Sinco.goTo("https://drash.land");
    const pageTitle = await Sinco.evaluatePage(() => {
      return document.title;
    })
    const sum = await Sinco.evaluatePage(`1 + 10`);
    const oldBodyLength = await Sinco.evaluatePage(() => {
      return document.body.children.length;
    })
    const newBodyLength = await Sinco.evaluatePage(() => {
      const p = document.createElement("p");
      p.textContent = "Hello world!"
      document.body.appendChild(p);
      return document.body.children.length;
    })
    await Sinco.done();
    assertEquals(pageTitle, "Drash Land");
    assertEquals(sum, 11);
    assertEquals(oldBodyLength, 3);
    assertEquals(newBodyLength, 4);
  })
  ```

Within the function you can pass to `evaluatePage()`, you have full access to the DOM, meaning you can write client side JavaScript like you normally would, for example:

```typescript
  await Sinco.evaluatePage(() => {
    const form = document.querySelector("form");
    const submitButton = document.getElementById("submit");
    const href = window.location.href;
    const savedValue = localStorage.getItem("id");
  })
```

Here you are going to create your headless browser instance, and navigate to https://drash.land. Once the page has loaded, you will evaluate a few scripts that will get the document title and create a new element on the page. You will then assert that the page title is as expected, and also that a new element was added to the DOM.

2. Create your config

A tsconfig.json file is required when targeting the DOM (using document syntax) to tell Deno that this is valid.

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

2. All of your tests should pass
