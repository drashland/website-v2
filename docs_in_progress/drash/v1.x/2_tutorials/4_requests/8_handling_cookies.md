# Handling Cookies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Getting a cookie from a request can be done using the following in a resource:

```typescript
const cookieValue = this.request.getCookie("my_cookie");
```

In this tutorial, you will learn how to get cookies from a request and parse
them into a key-value pair object.

Drash uses Deno Standard Modules for cookie handling.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will get the
   `my_cookie` value and use it in the response body.

   ```typescript
   import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

   // Create your resource

   class HomeResource extends Drash.Http.Resource {
     static paths = ["/"];

     public GET() {
       const cookieValue = this.request.getCookie("my_cookie");

       this.response.body =
         `You passed in the following cookie value: ${cookieValue}`;

       return this.response;
     }
   }

   // Create your server

   const server = new Drash.Http.Server({
     response_output: "text/plain",
     resources: [HomeResource],
   });

   server.run({
     hostname: "0.0.0.0",
     port: 1447,
   });

   console.log(
     `Server running. Go to http://${server.hostname}:${server.port}.`,
   );
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to `localhost:1447`
   and pass the following cookie key-value pair: `my_cookie=chocolate`.

   ```shell
   $ curl --cookie my_cookie=chocolate localhost:1447
   ```

You should receive the following response:

    ```text
    You passed in the following cookie value: chocolate
    ```
