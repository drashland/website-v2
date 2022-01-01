# Errors To Json

This service transform HttpErrors on a json http response

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { ErrorsToJsonService } from "https://deno.land/x/drash@<VERSION>/src/services/errors_to_json/errors_to_json.ts";
```

Replace `<VERSION>` with the **Drash v2.x** version you want to use. All
versions can be found
[here](https://github.com/drashland/drash/releases?q=v2&expanded=true).

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

import { Drash, ErrorsToJsonService } from "./deps.ts";

// Create and run your server (with RateLimiterService instantiated)

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
  services: [
    new ErrorsToJsonService(),
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
* Connected to localhost (::1) port 1447 (#0)
> GET / HTTP/1.1
> Host: localhost:1447
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 404 Not Found
< content-type: application/json
< content-length: 36
< date: Sat, 01 Jan 2022 21:43:06 GMT
<
* Connection #0 to host localhost left intact
{"code":"404","message":"Not Found"}
```

As you can see, the response contains the following header:

```text
< content-type: application/json
```

and response is json encoded:

```json
{
  "code": 404,
  "message": "Not Found"
}
```
