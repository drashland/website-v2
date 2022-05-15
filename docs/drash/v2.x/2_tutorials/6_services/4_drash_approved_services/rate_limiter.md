# Rate Limiter

This service was introduced in v2.2.0. Please make sure you are using v2.2.0 (or
higher) before proceeding with this tutorial.

This service will add rate limits to requests from an IP address.

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
export { RateLimiterService } from "https://deno.land/x/drash@<VERSION>/src/services/rate_limiter/rate_limiter.ts";
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

import { Drash, RateLimiterService } from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(_request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello, world!");
  }
}

// Create and run your server (with RateLimiterService instantiated)

const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
  services: [
    new RateLimiterService({
      timeframe: 10 * 1000, // 10 seconds
      max_requests: 5, // No more than 5 requests can be made within 10 seconds
    }),
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
< HTTP/1.1 200 OK
< content-type: text/plain
< date: Sat, 13 Nov 2021 23:32:41 GMT
< x-ratelimit-limit: 5
< x-ratelimit-remaining: 4
< x-ratelimit-reset: 1636846365
< content-length: 13
<
* Connection #0 to host localhost left intact
Hello, world!* Closing connection 0
```

As you can see, the response contains the following headers:

```text
< x-ratelimit-limit: 5
< x-ratelimit-remaining: 4
< x-ratelimit-reset: 1636846365
```

Notice the following:

- `x-ratelimit-remaining` has a value of `4`. This means you have `4` requests
  remaining in the timeframe. In this tutorial, the timeframe is set to 10
  seconds (see it in `app.ts` where `RateLimiterService` is instantiated).
- `x-ratelimit-limit` has a value of `5`. This means only 5 requests can be made
  within the timeframe. You control this through `RateLimiterService`'s
  `max_requests` config.
- `x-ratelimit-reset` has a timestamp value. This tells you when the rate limit
  will be reset. Once reset, you will be able to make the maximum number of
  requests again. In this tutorial, after 10 seconds has gone by, you will be
  able to make 5 requests again.

3. Now, spam `http://localhost:1447` with more than 5 requests. You should
   receive a response similar to the following:

```text
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 1447 (#0)
> GET / HTTP/1.1
> Host: localhost:1447
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 429 Too Many Requests
< date: Sat, 13 Nov 2021 23:37:25 GMT
< x-ratelimit-limit: 5
< x-ratelimit-remaining: 0
< x-ratelimit-reset: 1636846655
< x-retry-after: 10s
< content-type: text/plain;charset=UTF-8
< content-length: 476
<
Error: Too many requests, please try again later.
* Connection #0 to host localhost left intact
```

Notice the following:

- The response status is `429 Too Many Requests`.
- The response contains `x-retry-after` as a header with a value of `10s`. This
  means you can retry your request without hitting the rate limit after 10
  seconds has gone by. This is expected because this tutorial sets
  `RateLimiterService`'s `timeframe` config to 10 seconds in milliseconds using
  `10 * 1000`.

4. After spamming the server, wait 10 seconds (the timeframe length) and then
   send another request. You should receive a response similar to the following:

```text
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 1447 (#0)
> GET / HTTP/1.1
> Host: localhost:1447
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 200 OK
< content-type: text/plain
< date: Sat, 13 Nov 2021 23:32:41 GMT
< x-ratelimit-limit: 5
< x-ratelimit-remaining: 4
< x-ratelimit-reset: 1636846365
< content-length: 13
<
* Connection #0 to host localhost left intact
Hello, world!* Closing connection 0
```

Notice that the response status is `200 OK` again since you waited 10 seconds as
the server and `RateLimiterService` expected you to.
