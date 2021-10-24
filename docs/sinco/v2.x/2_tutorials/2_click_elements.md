# Clicking Elements

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Sinco provides the method `.click()` that will allow you to click any element on the page by the given selector.

Example selectors could be:

* `.click('a[href="/user"]');`
* `.click('button#submit');`
The `.click()` method will take any valid selector.

If there is any problem with clicking an element by the selector, such as the element not existing, Sinco will throw an error for you.

In this tutorial, you will:

* Create a headless browser instance; and
* Click a link;
* Assert the page was changed.

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
    await Sinco.goTo("https://drash.land");
    await Sinco.click('a[href="https://discord.gg/RFsCSaHRWK"]');
    await Sinco.waitForPageChange();
    await Sinco.assertUrlIs("https://discord.com/invite/RFsCSaHRWK");
    await Sinco.done();
  })
  ```

Here you are going to create your headless browser instance, and navigate to https://drash.land. Once the page has loaded, you will click an element matching the `a[href="https://discord.gg/RFsCSaHRWK"]` selector, which will send you to a different page. To assert this, you are going to use `.assertUrlIs()` to assert the page you are currently on, has now changed.

## Verification

1. Run your test.

  ```shell
  $ deno test --allow-run --allow-read --allow-net app_test.ts
  ```

2. All of your tests should pass