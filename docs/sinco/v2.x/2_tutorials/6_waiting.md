# Waiting

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Sinco provides methods to wait in specific scenarios, such as waiting for the page to change after clicking a button, or waiting for an anchor change on the uri. These help in ensuring your following code matches what the page should be, so say for example, you click a button that changes the page after 5 seconds. The `waitForPageChange()` method will wait for this, so your other actions and assertions aren't trying to run whilst the new page hasn't loaded yet.

The following methods Sinco provides are:

* `waitForPageChange()`
* The `waitForPageChange()` method will wait for the page to change, eg clicking an anchor tag that directs the user to a new uri.

In this tutorial, you will:

* Create a headless browser instance; and
* Go to a website;
* Wait for the page to change on a click;

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

  Deno.test("My web app works as expected", async function () {
    const Sinco = await buildFor("chrome");
    await Sinco.goTo("https://drash.land");
    await Sinco.assertUrlIs("https://drash.land/");
    await Sinco.click('a[href="https://discord.gg/RFsCSaHRWK"]');
    await Sinco.waitForPageChange();
    await Sinco.assertUrlIs("https://discord.com/invite/RFsCSaHRWK");
    await Sinco.done();
  })
  ```

Here you are going to create your headless browser instance, and navigate to https://drash.land. Once the page has loaded, you will assert that the url for the page is as expected.

## Verification

1. Run your test.

  ```shell
  $ deno test --allow-run --allow-read --allow-net app_test.ts
  ```

2. All of your tests should pass