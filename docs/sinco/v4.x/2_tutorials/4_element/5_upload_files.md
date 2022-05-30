# Upload Files

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Element` also provides the method `.file()` and `.files()` that will allow you
to upload files to an input file element, just like how you would when clicking
the input and choosing a file yourself.

Example usage would be:

- `.file(resolve("./logo.png"));`
- `.files(resolve("./logo.png"), resolve("./logo.png"));`

Note that the following may occur:

- If `.files()` is called but the element does not have the `multiple`
  attribute, Sinco will throw an error.
- If either are called and the element is not an input element, Sinco will
  throw.
- If either are called and the element is not of type `file`, Sinco will throw.

In this tutorial, you will:

- Create a headless browser instance; and
- Upload a file to an input element!

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
   import { resolve } from "https://deno.land/std@<LATEST VERSION>/path/mod.ts";

   // So we can mock up a playground with a place to upload files.
   import { serve } from "https://deno.land/std@<LATEST VERSION>/http/server.ts";
   serve(function (request: Request) {
     return new Response(`
         <input type="file" multiple id="file" />
     `);
   });

   const { browser, page } = await buildFor("chrome");
   await page.location("http://localhost:8000");
   const fileInput = await page.querySelector("#file");

   // We need `resolve` because Sinco requires an absolute path
   await fileInput.file(resolve("./hello.json"));
   await browser.close();
   ```

   Here you are going to create your headless browser instance and navigate to
   your local web server. Once the page has loaded, you will select the element
   you created and upload a file to it.

2. Create your `hello.json` file to use with the `fileInput.file()` call.

   This is a placeholder used to attach to your file input, given we cannot
   expect every person to have the same file at the same location!

   ```json
   {
     "some": "text"
   }
   ```

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-run --allow-read --allow-write --allow-net app_test.ts
   ```

2. At this moment in time, there is no simple way for you to check this
   yourself. It could be possible if/when Sinco introduces
   `Element#getAttribute()`.

   For the time being, you can do:

   ```ts
   const file = JSON.parse(await page.evaluate(`JSON.stringify(document.querySelector('#file').files[0])`)));
   ```
