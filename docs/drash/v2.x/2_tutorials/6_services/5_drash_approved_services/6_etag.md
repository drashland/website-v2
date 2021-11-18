# ETag

This service can help improve request time by caching responses for certain requests, by setting the `ETag` header. It abides by the [RFC](https://datatracker.ietf.org/doc/html/rfc7232). If you are unaware of what "ETag" is, then please read the [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) before proceeding, as that information is crucial to understanding what adding this service to your app will do, and how it works.

It can be simply be placed as a service for your resources and you are all set!

Simply add it to your resources that you wish to improve caching for, and you're all set! Generally this would be used in conjunction with serving static files, such as CSS and JavaScript files.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#configuration)
- [Verification](#verification)
- [How It Works](#how-it-works)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { ETagService } from "https://deno.land/x/drash@<VERSION>/src/services/etag/etag.ts";
```

Replace `<VERSION>` with the **Drash v2.x** version you want to use. All versions can be found [here](https://github.com/drashland/drash/releases?q=v2&expanded=true).

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file.

```typescript
// app.ts

import {
  Drash,
  ETagService,
} from "./deps.ts";

// Instantiate the service and set the ETag to "strong". Set to strong by default
const etag = new ETagService({
  // optional: 
  // weak: true /* instead of strong, it will set the etag to weak */
});

// Create your resource

class HomeResource extends Drash.Resource {

  public paths = ["/"];

  // Tell the resource what HTTP methods should have an ETag header set. In this
  // case, we are telling the resource to set it on the GET method. This means
  // the GET method will response with a new "ETag" header.
  public services = {
    GET: [ etag ],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.html(`<p>Hello world!</p>`);
  }
}

// Create and run your server

const server = new Drash.Server({
  hostname: "localhost",
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

2. Using `curl` (or similar command), make a `GET` request to `http://localhost:1447`.

  ```shell
  $ curl -v http://localhost:1447
  ```

  You should receive a response similar to the following:

  ```text
  *   Trying ::1...
  * TCP_NODELAY set
  * Connection failed
  * connect to ::1 port 1447 failed: Connection refused
  *   Trying 127.0.0.1...
  * TCP_NODELAY set
  * Connected to localhost (127.0.0.1) port 1447 (#0)
  > GET / HTTP/1.1
  > Host: localhost:1447
  > User-Agent: curl/7.64.1
  > Accept: */*
  >
  < HTTP/1.1 200
  < content-type: text/html;charset=UTF-8
  < content-length: 19
  < date: Tue, 19 Oct 2021 12:21:20 GMT
  < etag: "25-abcdefghijk"
  < last-modified: Tue, 19 Oct 2021 12:21:20 GMT
  <
  ```

  As you can see, the response supplied a new header: "ETag". This means that this exact response body is identified by that value. Should you make another request, the response time should be faster, though in our case it may not because our resource is very small. If you change the content of the response body and make a new request, you no longer receive a cached response, but a new etag is set for this body to follow up any other further requests.

## How It Works

Once a resource method is called, `ETag` will generate a cryptographical hash, using the response body, and will set the ETag header, supplied this new hash as the value. Should the `weak` option be called, the value has `W/` as a prefix, to tell the browser this is a weak ETag.

This is why the etag changes - because it's generated from the body, so when the body changes, the hash changes.
