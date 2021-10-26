# Creating a Server

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

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
   `GET`, `POST`, `PUT`, and `DELETE` requests at the `/` URI.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    // Create your resource

    class HomeResource extends Drash.Resource {
      public paths = ["/"];

      public GET(request: Drash.Request, response: Drash.Response): void {
        return response.text("GET request received!");
      }

      public POST(request: Drash.Request, response: Drash.Response): void {
        return response.text("POST request received!");
      }

      public PUT(request: Drash.Request, response: Drash.Response): void {
        return response.text("PUT request received!");
      }

      public DELETE(request: Drash.Request, response: Drash.Response): void {
        return response.text("DELETE request received!");
      }
    }

    // Create and run your server

    const server = new Drash.Server({
      hostname: "0.0.0.0",
      port: 1447,
      protocol: "http",
      resources: [
        HomeResource,
      ],
    });

    server.run();

    console.log(`Server running at ${server.address}.`);
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

3. Try some other requests using `curl` (or similar command):

- `$ curl -X POST http://localhost:1447`
  - Returns `POST request received!`
- `$ curl -X PUT http://localhost:1447`
  - Returns `PUT request received!`
- `$ curl -X DELETE http://localhost:1447`
  - Returns `DELETE request received!`
