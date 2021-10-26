# Creating an SSR App

## Table of Contents

- [Overview](#overview)
- [Project End State](#project-end-state)
- [Steps](#steps)
  - [Create the Server](#create-the-server)
  - [Create the Resources](#create-the-resources)
  - [Create the HTML Files](#create-the-html-files)
- [Verification](#verification)
- [Next Steps](#next-steps)

## Overview

In this tutorial, you will learn how to create an app that is server-side
rendered (SSR). Your application will server `text/html` responses by default.

## Project End State

```text
▾ /path/to/your/project/
  ▾ html/
    about.html
    contact.html
    home.html
  about_resource.ts
  app.ts
  contact_resource.ts
  home_resource.ts
```

Below are samples of what you will create:

[![Home](/drash-v1x-advanced-tutorial-creating-an-ssr-app-1.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-1.png)

[![Contact](/drash-v1x-advanced-tutorial-creating-an-ssr-app-2.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-2.png)

[![About](/drash-v1x-advanced-tutorial-creating-an-ssr-app-3.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-3.png)

## Steps

### Create the Server

1. Create your `app.ts` file.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    import AboutResource from "./about_resource.ts";
    import ContactResource from "./contact_resource.ts";
    import HomeResource from "./home_resource.ts";

    const server = new Drash.Http.Server({
      response_output: "text/html",
      resources: [
        AboutResource,
        ContactResource,
        HomeResource,
      ],
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

### Create the Resources

1. Create your `home_resource.ts` file. This resource will serve an HTML file
   with the following text: This is the home page!

    ```typescript
    // home_resource.ts

    import { Drash } from "./deps.ts";

    const decoder = new TextDecoder();

    export default class HomeResource extends Drash.Http.Resource {
      static paths = [
        "/",
      ];

      public GET() {
        try {
          let fileContentsRaw = Deno.readFileSync("./html/home.html");
          let template = decoder.decode(fileContentsRaw);
          this.response.body = template;
        } catch (error) {
          throw new Drash.Exceptions.HttpException(
            400,
            `Error reading HTML template.`,
          );
        }
        return this.response;
      }
    }
    ```

2. Create your `contact_resource.ts` file. This resource will serve an HTML file
   with the following text: This is the contact page!

    ```typescript
    // contact_resource.ts

    import { Drash } from "./deps.ts";

    const decoder = new TextDecoder();

    export default class ContactResource extends Drash.Http.Resource {
      static paths = [
        "/contact",
      ];

      public GET() {
        try {
          let fileContentsRaw = Deno.readFileSync("./html/contact.html");
          let template = decoder.decode(fileContentsRaw);
          this.response.body = template;
        } catch (error) {
          throw new Drash.Exceptions.HttpException(
            400,
            `Error reading HTML template.`,
          );
        }
        return this.response;
      }
    }
    ```

3. Create your `about_resource.ts` file. This resource will serve an HTML file
   with the following text: This is the about page!

    ```typescript
    // about_resource.ts

    import { Drash } from "./deps.ts";

    const decoder = new TextDecoder();

    export default class AboutResource extends Drash.Http.Resource {
      static paths = [
        "/about",
      ];

      public GET() {
        try {
          let fileContentsRaw = Deno.readFileSync("./html/about.html");
          let template = decoder.decode(fileContentsRaw);
          this.response.body = template;
        } catch (error) {
          throw new Drash.Exceptions.HttpException(
            400,
            `Error reading HTML template.`,
          );
        }
        return this.response;
      }
    }
    ```

## Create the HTML Files

1. Create your `home.html` file. This HTML file will use Tailwind CSS for quick
   styling.

    ```html
    <!DOCTYPE html>
    <html class="h-full w-full">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
        <title>Home</title>
      </head>
      <body style="background: #f4f4f4;">
        <div style="max-width: 640px; margin: 100px auto;">
          <h1 class="text-5xl">Home</h1>
          <p class="text-xl mb-5">This is the home page!</p>
        </div>
      </body>
    </html>
    ```

2. Create your `contact.html` file.

    ```html
    <!DOCTYPE html>
    <html class="h-full w-full">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
        <title>Contact</title>
      </head>
      <body style="background: #f4f4f4;">
        <div style="max-width: 640px; margin: 100px auto;">
          <h1 class="text-5xl">Contact</h1>
          <p class="text-xl mb-5">This is the contact page!</p>
        </div>
      </body>
    </html>
    ```

3. Create your `about.html` file.

    ```html
    <!DOCTYPE html>
    <html class="h-full w-full">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
        <title>About</title>
      </head>
      <body style="background: #f4f4f4;">
        <div style="max-width: 640px; margin: 100px auto;">
          <h1 class="text-5xl">About</h1>
          <p class="text-xl mb-5">This is the about page!</p>
        </div>
      </body>
    </html>
    ```

## Verification

1. Run your app.

    ```shell
    $ deno run --allow-net --allow-read app.ts
    ```

2. Go to `http://localhost:1447` in your web browser.

You should receive a response similar to the following:

[![Home](/drash-v1x-advanced-tutorial-creating-an-ssr-app-1.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-1.png)

2. Go to `http://localhost:1447/contact` in your web browser.

You should receive a response similar to the following:

[![Contact](/drash-v1x-advanced-tutorial-creating-an-ssr-app-2.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-2.png)

3. Go to `http://localhost:1447/about` in your web browser.

You should receive a response similar to the following:

[![About](/drash-v1x-advanced-tutorial-creating-an-ssr-app-3.png)](/drash-v1x-advanced-tutorial-creating-an-ssr-app-3.png)

**Congrats! You finished this tutorial!**
