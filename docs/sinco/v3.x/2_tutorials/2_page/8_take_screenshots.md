# Take Screenshots

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.takeScreenshot` that will allow you to take a
screenshot of the whole page, or a specific element. This method will then write
the screenshot to a file.

Example usage would be:

- `.takeScreenshot("./screenshots");`
- `.takeScreenshot("./screenshots", { fileName: "home_page.png", selector: "body > main", format: "png" });`

The `.takeScreenshot` method will take any valid selector for `selector`.

If the directory for where to save the screenshot does not exist, Sinco will
throw an error. By default, passing in one parameter will save a screenshot to
the specified directory, where the filename is timestamped, and the format is
JPEG.

The method also takes an optional second parameter, which allows you to specify:

- `selector` - If specified, Sinco will only take a screenshot of that element
  (and of course all of its children), as opposed to the whole page. This is
  useful if you might only want to see the login form, or how a single element
  looks.
- `fileName` - If specified, this will be what your new image file will be
  named. For example, say you write
  `.takeScreenshot("./screenshots", { filename: "login_form.jpeg" })`, the
  screenshot will be saved to `./screenshots/login_form.jpeg`.
- `format` - The format of the image, eg jpeg or png. The default is jpeg.
- `quality` - The compression quality of the screenshot. The maximum is 100, and
  the default is 80.

In this tutorial, you will:

- Create a headless browser instance; and
- Take a screenshot of your favourite website: drash.land!;

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
     const Sinco = await buildFor("chrome");
     const page = await Sinco.goTo("https://drash.land");
     const screenshotsFolder = "./screenshots";
     Deno.mkdirSync(screenshotsFolder); // Ensure you create the directory your screenshots will be put within
     await page.takeScreenshot(screenshotsFolder); // Will take a screenshot of the whole page, and write it to `./screenshots/dd_mm_yyyy_hh_mm_ss.jpeg`
     await page.takeScreenshot(screenshotsFolder, {
       fileName: "drash_land.png",
       format: "png",
     }); // Specify filename and format. Will be saved as `./screenshots/drash_land.png`
     await page.takeScreenshot(screenshotsFolder, {
       fileName: "modules.jpeg",
       selector: 'a[href="https://github.com/drashland"]',
     }); // Will screenshot only the GitHub icon section, and write it to `./screenshots/dd_mm_yyyy_hh_mm_ss.jpeg`
     await Sinco.done();
   });
   ```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you will take a screenshot of the
whole page, take another screenshot with a custom filename and format, and take
a third screenshot with a custom selector.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-write --allow-net app_test.ts
   ```

2. Now check your screenshots folder!
