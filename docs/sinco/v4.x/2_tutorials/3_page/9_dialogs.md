# Dialogs

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.dialog()` that can allow you to accept or decline
dialogs, and to provide messages to prompts. Note that `Page#expectDialog()` is
needed to be called **before** the action that would produce a dialog. Sinco
needs this so when you call `.dialog()`, it doesn't try interact with a dialog
that hasn't opened yet. E.g, a race condition.

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website; and
- Accept a dialog.

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

   // So we can mock up a playground with a place to display a dialog.
   import { serve } from "https://deno.land/std@0.136.0/http/server.ts";
   serve(function (request: Request) {
     return new Response(`
         <button type="button" id="button">Click</button>
         <script>
           document.querySelector('#button').addEventListener('click', e => {
             const value = prompt("some text");
             e.target.textContent = value;
           })
         </script>
     `);
   });

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("http://localhost:8000");
     const button = await page.querySelector("#button");
     page.expectDialog();
     elem.click(); // If clicking produces a dialog, you shound't await it
     await page.dialog(true, "Sinco dialogs!"); // Will wait for the dialog to appear to accept it with the given text
     // "Sinco dialogs!" should now be the button's text.
     const buttonText = await page.evaluate(
       `document.querySelector("#button").textContent`,
     );
     await page.close(); // Closes the tab
     await browser.close(); // This is different, as this closes the browser process.
     console.log(buttonText);
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`http://localhost:8000`, a page you setup to produce a dialog. Once the page has
loaded, you will select the button from the DOM. You will then tell Sinco it is
expecting a dialog (so it can correctly wait for it), and click the button which
if you check the response from our server, will generate a dialog. You will
notice we aren't awaiting here - when clicking an element produces a dialog, it
will also wait for the dialog to be accepted, which we haven't done yet and
won't ever do because the execution cannot pass this `await`. You will then
accept this dialog and provide some text. To assert this, you will check that
the text provided in the `prompt()` is set as the text for the button.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. You should see the following output:

   ```shell
   Sinco dialogs!
   ```
