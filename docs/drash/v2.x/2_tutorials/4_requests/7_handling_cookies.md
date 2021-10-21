# Handling Cookies

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Getting a cookie from a request can be done using the following in a resource:

```typescript
const cookieValue = this.request.getCookie("my_cookie");
```

In this tutorial, you will learn how to get cookies from a request and parse them into a key-value pair object.

Drash uses Deno Standard Modules for cookie handling.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will get the `my_cookie` value and use it in the response body.

  ```typescript
  import { Drash } from "./deps.ts";

  // Create your resource

  class HomeResource extends Drash.Resource {

    public paths = ["/"];

    public GET(request: Drash.Request, response: Drash.Response): void {
      const cookieValue = request.getCookie("my_cookie");

      if (cookieValue) {
        return response.text(`You passed in the following cookie value: ${cookieValue}`);
      }

      return response.text(`No cookie value received.`);
    }
  }

  // Create and run your server

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http",
    resources: [
      HomeResource
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

2. Using `curl` (or similar command), make a `GET` request to `http://localhost:1447` and pass the following cookie key-value pair: `my_cookie=chocolate`.

  ```shell
  $ curl --cookie my_cookie=chocolate http://localhost:1447
  ```

  You should receive the following response:

  ```text
  You passed in the following cookie value: chocolate
  ```
