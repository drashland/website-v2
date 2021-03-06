# Custom Assertions

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Sinco provides some utility methods that act as wrappers for Deno's std/testing
assertions. These methods will run a query on the DOM and make an assertion. You
do not need to assert these yourself.

The methods it provides are:

- `assertUrlIs` - This will assert that the URL for the page matches a given
  parameter
- `assertSee` - This method will assert that the given text exists inside the
  page

In this tutorial, you will:

- Create a headless browser instance;
- Assert the url for the page; and
- Assert text exists inside the DOM (page).

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

   import { buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const Sinco = await buildFor("chrome");
     await Sinco.goTo("https://drash.land");
     await Sinco.assertUrlIs("https://drash.land/");
     await Sinco.assertSee("Develop With Confidence");
     await Sinco.done();
   });
   ```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you are going to assert that the
page you are on is as expected. You will assert this URL and also assert that
you can see some given text on the page, and in this example, it is Develop With
Confidence.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass
