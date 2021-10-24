# Handling Cookies

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Setting a cookie on a response can be done using the following in a resource:

```typescript
this.response.setCookie({
  name: "MINI",
  value: "Cooper",
  expiry: 'some date'
  // ... and so on
});
```

Deleting a cookie from a response can be done using the following in a resource:

```typescript
this.response.delCookie("cookie_name");
```

Drash uses Deno Standard Modules for cookie handling.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will set the `my_cookie` value on the response object.

  ```typescript
  import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

  // Create your resource

  class HomeResource extends Drash.Http.Resource {
   
    static paths = ["/"];
   
    public GET() {
      // Set the cookie
      this.response.setCookie({name: "my_cookie", value: "chocolate"});

      // Tell the client the cookie was sent
      this.response.body = "my_cookie cookie sent!"

      return this.response;
    }
   
    public DELETE() {
      // Set the cookie
      this.response.setCookie({
        name: "my_cookie",
        value: "chocolate"
      });

      // Delete the above cookie
      this.response.delCookie("my_cookie");

      // Tell the client the cookie was set/deleted
      this.response.body = "my_cookie cookie was set and deleted!";

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
    port: 1447
  });

  console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
  ```

## Verification

1. Run your app.

  ```shell
  $ deno run --allow-net app.ts
  ```

2. Using `curl` (or similar command), make a `GET` request to `localhost:1447`.

  ```shell
  $ curl --verbose localhost:1447
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

3. Using `curl` (or similar command), make a `DELETE` request to `localhost:1447`.

  ```shell
  $ curl --request DELETE --verbose localhost:1447
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