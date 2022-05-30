# Wait for Requests

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.waitForRequest()` and `.expectWaitForRequest()`
that allow you to wait for any HTTP requests to finish.

An example of this:

- You have a button, and a form with user sign-up details
- You have JavaScript that listens on a "click" event for that button
- On click, you send a request to your server via `fetch`
- Wait for this to finish
- Assert that a success message displays

You would be able to wait for HTTP requests to finish before continuing with
your testing.

In this tutorial, you will:

- Create a headless browser instance;
- Go to a website;
- Submit a form;
- Wait for that request to finish; and
- Assert that you have waited and received a response.

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

   // So we can mock up a playground with a place to send long running HTTP requests.
   import { serve } from "https://deno.land/std@<LATEST VERSION>/http/server.ts";
   import { delay } from "https://deno.land/std@<LATEST VERSION>/async/delay.ts";
   serve(async function (request: Request) {
     if (request.method === "POST") {
       await delay(2000);
       return new Response("Done!");
     }
     return new Response(`
        <form action="/" method="POST">
            <button type="submit">Click</button>
        </form>
        <button id="second-button" type="button">Click</button>
        <script>
            document.getElementById("second-button").addEventListener('click', async e => {
              await fetch("/", {
                  method: "POST",
              })
              e.target.textContent = "done";
            })
        </script>
     `);
   });

   Deno.test("My web app works as expected", async () => {
     const { browser, page } = await buildFor("chrome");
     await page.location("http://localhost:8000");
     const elem = await page.querySelector("#button");
     page.expectWaitForRequest();
     await elem.click();
     await page.waitForRequest();
     console.log(await page.evaluate(`document.body.innerText`));
     await page.close();
     await browser.close();
   });
   ```

   _Note: Make sure you change `<LATEST VERSION>` to the latest Deno Standard
   Modules version._

   Here you are going to create your headless browser instance, and navigate to
   `http://localhost:8000`, a page you setup to produce . Once the page has
   loaded, you will select the button from the DOM. You will then tell Sinco it
   is expecting a request (so it can correctly wait for it), and click the
   button which if you check the response from our server, will generate a
   script to send a HTTP request. You will wait for this request to finish to
   carry out assertions following the request. To assert this, you will check
   that the response from the server is present in the DOM.

## Verification

1. Run your test.

   ```shell
   $ deno test --allow-run --allow-read --allow-net app_test.ts
   ```

2. You should see the following:
   ```shell
   Done!
   ```
