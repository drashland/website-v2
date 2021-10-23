# Creating an SPA Using Vue

## Table of Contents

* [Overview](#overview)
* [Project End State](#project-end-state)
* [Steps](#steps)
  * [Create the Server](#create-the-server)
  * [Create the Resource](#create-the-resource)
  * [Create the HTML File](#create-the-html-file)
  * [Create the Vue App](#create-the-vue-app)
* [Verification](#verification)
* [Next Steps](#next-steps)

## Overview

In this tutorial, you will learn how to create a single page application (SPA) using Vue v2. Your Vue app will display Deno tweets.

## Project End State

```text
▾ /path/to/your/project/
  ▾ public/
    vue_app.js
  app.ts
  spa_resource.ts
  index.html
```

## Steps

### Create the Server

1. Create your `app.ts` file. Make sure you change the `directory` server config to the location to your project.

  ```typescript
  // app.ts

  import { Drash } from "./deps.ts";

  import SpaResource from "./spa_resource.ts";

  const server = new Drash.Http.Server({
    response_output: "text/html",
    resources: [SpaResource],
    directory: "/path/to/your/project",
    static_paths: ["/public"]
  });

  server.run({
    hostname: "0.0.0.0",
    port: 1447
  });

  console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
  ```

### Create the Resource

1. Create your `spa_resource.ts` file. This resource will serve an HTML file (you will create this in the next step). That HTML file will contain the Vue code to serve your SPA.

  ```typescript
  // spa_resource.ts

  import { Drash } from "./deps.ts";

  const decoder = new TextDecoder();

  export default class HomeResource extends Drash.Http.Resource {

    static paths = [
      "/"
    ];

    public GET() {
      try {
        let fileContentsRaw = Deno.readFileSync("./spa.html");
        let template = decoder.decode(fileContentsRaw);
        this.response.body = template;
      } catch (error) {
        throw new Drash.Exceptions.HttpException(
          400,
          `Error reading HTML template.`
        );
      }
      return this.response;
    }
  }
  ```

## Create the HTML File

1. Create your `spa.html` file. This HTML file will use Tailwind CSS for quick styling.

  ```html
  <!DOCTYPE html>
  <html class="h-full w-full">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
      <title>Deno Tweets</title>
    </head>
    <body>
      <div id="vue_app" style="max-width: 640px; margin: 0 auto;">
        <h1 class="text-5xl">{{ title }}</h1>
        <p class="text-xl mb-5">{{ description }}</p>
        <hr class="mb-5">
        <a class="twitter-timeline" href="https://twitter.com/deno_land?ref_src=twsrc%5Etfw">Tweets by deno_land</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="/public/vue_app.js"></script>
  </html>
  ```

  To make things easier, your HTML file comes with the embedded Twitter Timeline widget. This widget will show Deno's tweets.

  You will notice there are two Vue template variables: `title` and `description`. You will be assigning these variables in the next step.

  You will also notice there is a `vue_app.js` file being referenced near the bottom of the file. You will be creating this next as well.

## Create the Vue App

1. Create your `vue_app.js` file.

  ```javascript
  const app = new Vue({
    el: '#vue_app',
    data: {
      title: "Deno",
      description: "A secure runtime for JavaScript and TypeScript"
    }
  })
  ```

## Verification

1. Run your app.

  ```shell
  $ deno run --allow-net --allow-read app.ts
  ```


**Congrats! You finished this tutorial!**