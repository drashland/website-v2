# Handling Cookies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Setting a cookie on a response can be done using the following in a resource:

```typescript
response.setCookie({
  name: "MINI",
  value: "Cooper",
  expiry: "some date",
  // ... and so on
});
```

Deleting a cookie from a response can be done using the following in a resource:

```typescript
response.deleteCookie("cookie_name");
```

Drash uses Deno Standard Modules for cookie handling.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. {{ placeholder: drash_create_deps_file_step }}

1. Create your `app.ts` file. Your resource in this file will set the
   `my_cookie` value on the `response` object.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       // Set the cookie
       response.setCookie({ name: "my_cookie", value: "chocolate" });

       // Tell the client the cookie was sent
       return response.text("my_cookie cookie sent!");
     }

     public DELETE(request: Drash.Request, response: Drash.Response): void {
       // Set the cookie
       response.setCookie({
         name: "my_cookie",
         value: "chocolate",
       });

       // Delete the above cookie
       response.deleteCookie("my_cookie");

       // Tell the client the cookie was set/deleted
       return response.text("my_cookie cookie was set and deleted!");
     }
   }

   // Create and run your server

   const server = new Drash.Server({
     resources: [HomeResource],
     hostname: "localhost",
     protocol: "http",
     port: 1447,
   });

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447`.

   ```shell
   $ curl --verbose http://localhost:1447
   ```

   You should receive a response similar to the following:

   ```text
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > GET / HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: application/json
   < set-cookie: my_cookie=chocolate <---------- The cookie is here
   < content-length: 24
   <
   * Connection #0 to host localhost left intact
   "my_cookie cookie sent!"* Closing connection 0
   ```

3. Using `curl` (or similar command), make a `DELETE` request to
   `http://localhost:1447`.

   ```shell
   $ curl --request DELETE --verbose http://localhost:1447
   ```

   You should receive a response similar to the following:

   ```text
   *   Trying 127.0.0.1...
   * TCP_NODELAY set
   * Connected to localhost (127.0.0.1) port 1447 (#0)
   > DELETE / HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: application/json
   < set-cookie: my_cookie=; Expires=Thu, 01 Jan 1970 00:00:00 GMT <---------- The cookie is here and is invalidated via the Expires attribute
   < content-length: 39
   <
   * Connection #0 to host localhost left intact
   "my_cookie cookie was set and deleted!"* Closing connection 0
   ```
