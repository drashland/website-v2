# Response Time

This service will record how long a a response takes for any given request, by setting a `X-Response-Time` header on the response.

Simply add it to your Drash server's `services` config and you are all set!

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#configuration)
- [Verification](#verification)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { ResponseTimeService } from "https://deno.land/x/drash@<VERSION>/src/services/response_time/response_time.ts";
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
  ResponseTimeService,
} from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Resource {

  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello, world!");
  }
}

// Create and run your server (with PaladinService instantiated)

const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource
  ],
  services: [
    new ResponseTimeService(),
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
  < HTTP/1.1 200 OK
  < content-type: text/plain
  < x-response-time: 5ms
  < content-length: 13
  < date: Wed, 20 Oct 2021 02:20:33 GMT
  <
  * Connection #0 to host localhost left intact
  Hello, world!* Closing connection 0
  ```

  As you can see, the response contains the following header:

  ```text
  < x-response-time: 5ms
  ```