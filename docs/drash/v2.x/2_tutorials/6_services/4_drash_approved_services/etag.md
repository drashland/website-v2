# ETag

This service was introduced in v2.3.0. Please make sure you are using v2.3.0 (or
higher) before proceeding with this tutorial.

This service can help improve response times by caching responses for certain
requests by setting the `ETag` header. It abides by the
[RFC](https://datatracker.ietf.org/doc/html/rfc7232). If you are unaware of what
"ETag" is, then please read the
[MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
before proceeding. That information is crucial to understanding what adding this
service to your app will do and how it works.

To use this service, simply add it to your resources that you wish to improve
caching for and you are all set! Generally this would be used in conjunction
with serving static files such as CSS and JavaScript files.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
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

Replace `<VERSION>` with the latest version of **Drash v2.x**. The latest
version can be found [here](https://github.com/drashland/drash/releases/latest).

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

import { Drash, ETagService } from "./deps.ts";

// Instantiate the service
//
// By default, this will set ETags to use a "strong validator". You can supply
// the `weak` config to make this service use a "weak validator" like so:
//
//     const etag = new ETagService({ weak: true });
//
const etag = new ETagService();

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  // Tell the resource what HTTP methods should have an ETag header set. In this
  // case, we are telling the resource to set it on the GET method. This means
  // all responses to GET requests will contain an ETag header.
  public services = {
    GET: [etag],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.html(`<p>Hello world!</p>`);
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

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447`.

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

As you can see, the response supplied the `ETag` header. This means that this
exact response body is identified by that value. Should you make another
request, the response time should be faster, though in our case it may not be
because our resource is very small. If you change the content of the response
body and make a new request, you no longer receive a cached response, but a new
`ETag` is set for this body to follow up subsequent requests.

## How It Works

Once a resource method is called, `ETagService` will generate a cryptographical
hash, using the response body, and will set the `ETag` header using the hash as
the value. Should the `weak` option be called, the value will have a `W/` prefix
to tell the browser this is a weak ETag.

This is why the `ETag` header changes -- because it is generated from the
response body. So, when the body changes, the hash changes.
