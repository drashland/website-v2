# Visit Pages

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Sinco provides the method `.goTo()` on the `Client` class that will navigate
your browser client to the web page specified. This method will wait until the
page has loaded.

Example pages could be:

- https://github.com
- www.google.com

If there was an error navigating to the page (page does not exist), then Sinco
will throw an error, but will close all resources before doing so.

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website; and
- Assert the url is correct.

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

   import { assertEquals, buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const Sinco = await buildFor("chrome");
     const page = await Sinco.goTo("https://drash.land");
     const location = await page.location();
     await Sinco.done();
     assertEquals(location, "https://drash.land/");
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will assert that the url for
the page is as expected.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. All of your tests should pass.
