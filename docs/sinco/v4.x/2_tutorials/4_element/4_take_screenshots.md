# Take Screenshots

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` also provides the method `.takeScreenshot()` that will allow you to
take the screenshot of only that specific element.

Example usage would be:

- `.takeScreenshot("./screenshots");`
- `.takeScreenshot("./screenshots", { fileName: "home_page.png", format: "png" });`

If the directory for where to save screenshots does not exist, Sinco will throw
an error. By default, passing in one parameter will save a screenshot to the
specified directory -- where the filename is timestamped, and the format is
JPEG.

The method also takes an optional second parameter, which allows you to specify:

- `fileName` - If specified, this will be what your new image file will be
  named. For example, say you write
  `.takeScreenshot("./screenshots", { filename: "login_form.jpeg" })`, the
  screenshot will be saved to `./screenshots/login_form.jpeg`.
- `format` - The format of the image (e.g., `jpeg` or `png`). The default is
  `jpeg`.
- `quality` - The compression quality of the screenshot. The maximum is 100, and
  the default is 80.

In this tutorial, you will:

- Create a headless browser instance; and
- Take a screenshot of an element on your favourite website: drash.land!

## Folder Structure End State

```text
▾ /path/to/your/project/
    app_test.ts
    deps.ts
```

## Steps

1. Create your test file.

   ```typescript
   // app_test.ts

   import { buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("https://drash.land");
     const screenshotsFolder = "./screenshots";
     Deno.mkdirSync(screenshotsFolder); // Ensure you create the directory your screenshots will be put within
     const elem = await page.querySelector(
       'a[href="https://github.com/drashland"]',
     );
     await elem.takeScreenshot(screenshotsFolder, {
       fileName: "modules.jpeg",
     }); // Will screenshot only the GitHub icon section, and write it to `./screenshots/modules.jpeg`
     await browser.close();
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will take a screenshot of an
element on the page.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-write --allow-net app_test.ts
   ```

2. Now check your `screenshots` directory! The screenshot should be stored in
   there.
