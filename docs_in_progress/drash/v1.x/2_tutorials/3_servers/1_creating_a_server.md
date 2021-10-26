# Creating a Server

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Regular Path Params](#regular-path-params)
- [Optional Path Params](#optional-path-params)
- [Regular Expression Paths](#regular-expression-paths)

## Before You Get Started

In this tutorial, you will create a very basic HTTP server that handles some
common requests: `GET`, `POST`, `PUT`, and `DELETE`.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will be able to handle
   `GET`, `POST`, `PUT`, and `DELETE` requests to the `/` URI.

Your server in this file will register your resource via the `resources` config.
Also, take note of the `response_output` server config. This config is set to
`application/json`, which means your server will default all responses to
`application/json`. You can change the value of this config to any proper MIME
type.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    // Create your resource

    export default class HomeResource extends Drash.Http.Resource {
      static paths = ["/"];

      public GET() {
        this.response.body = "GET request received!";
        return this.response;
      }

      public POST() {
        this.response.body = "POST request received!";
        return this.response;
      }

      public PUT() {
        this.response.body = "PUT request received!";
        return this.response;
      }

      public DELETE() {
        this.response.body = "DELETE request received!";
        return this.response;
      }
    }

    // Create and run your server

    const server = new Drash.Http.Server({
      response_output: "application/json", // Accepts any proper MIME type
      resources: [HomeResource],
    });

    server.run({ // or await server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Go to `http://localhost:1447` in your web browser. You should receive the
   following response:

   ```text
   GET request received!
   ```
