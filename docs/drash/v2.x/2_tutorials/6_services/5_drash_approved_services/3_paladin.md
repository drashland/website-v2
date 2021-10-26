# Paladin

This service is an HTTP security headers service inspired by
[helmet](https://github.com/helmetjs/helmet). It is configurable and can be used
throughout the request-resource-response lifecycle.

Simply add it to your Drash server's `services` config and you are all set!

Please note that this service does not make your application bulletproof. It
only adds extra security layers.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#configuration)
- [Verification](#verification)
- [Configuration](#configuration)
  - [Content-Security-Policy](#content-security-policy)
  - [Expect-CT](#expect-ct)
  - [Referrer-Policy](#referrer-policy)
  - [Strict-Transport-Security](#strict-transport-security)
  - [X-Content-Type-Options](#x-content-type-options)
  - [X-DNS-Prefetch-Control](#x-dns-prefetch-control)
  - [X-Frame-Options](#x-frame-options)
  - [X-Powered-By](#x-powered-by)
  - [X-XSS-Protection](#x-xss-protection)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { PaladinService } from "https://deno.land/x/drash@<VERSION>/src/services/paladin/paladin.ts";
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

import { Drash, PaladinService } from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello, world!");
  }
}

// Create and run your server (with PaladinService instantiated)

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
  services: [
    new PaladinService(),
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
    < HTTP/1.1 200 OK
    < content-type: text/plain
    < strict-transport-security: max-age=5184000; include_sub_domains
    < x-content-type-options: nosniff
    < x-dns-prefetch-control: off
    < x-frame-options: SAMEORIGIN
    < x-xss-protection: 1; mode=block
    < content-length: 13
    < date: Wed, 20 Oct 2021 02:20:33 GMT
    <
    * Connection #0 to host localhost left intact
    Hello, world!* Closing connection 0
    ```

As you can see, the response contains the following headers:

    ```text
    < x-content-type-options: nosniff
    < x-dns-prefetch-control: off
    < x-frame-options: SAMEORIGIN
    < x-xss-protection: 1; mode=block
    ```

## Configuration

`PaladinService` has a list of default headers it will set when it is
instantiated without arguments, but you can override these.

### `Content-Security-Policy`

- This header is not enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
- Example Usage

  ```typescript
  // Calling it this way does not set the header
  const paladin = PaladinService();

  // You can set the header like so:
  const paladin = PaladinService({
    "Content-Security-Policy": "default-src 'self'",
  });
  // or
  //     const paladin = PaladinService({
  //       "Content-Security-Policy":
  //         "default-src 'self'; style-src 'self' maxcdn.bootstrapcdn.com",
  //     });
  ```

### `Expect-CT`

- This header is not enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT
- Example Usage

  ```typescript
  // Calling it this way does not set the header
  const paladin = PaladinService();

  // Calling it this way will result in the header to be:
  //
  //     max-age=30
  //
  const paladin = PaladinService({
    expect_ct: {
      max_age: 30,
    },
  });

  // Calling it this way will result in the header to be:
  //
  //     max-age=30; enforce
  //
  const paladin = PaladinService({
    expect_ct: {
      max_age: 30,
      enforce: true,
    },
  });

  // Calling it this way will result in the header to be:
  //
  //     enforce; max-age=30; report-uri="http://example.com/report"
  //
  const paladin = PaladinService({
    expect_ct: {
      max_age: 30,
      enforce: true,
      report_uri: "http://example.com/report",
    },
  });
  ```

### `Referrer-Policy`

- This header is not enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
- Example Usage

  ```typescript
  // Calling it this way will not set the header
  const paladin = PaladinService();

  // Calling it this way will set the header and set it to "origin"
  const paladin = PaladinService({
    "Referrer-Policy": "origin",
  });
  ```

### `Strict-Transport-Security`

- This header is enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
- Example Usage

  ```typescript
  // Calling it this way will default the header to 60 days and include subdomains
  const paladin = PaladinService();

  // Calling it this way will disable the header altogether
  const paladin = PaladinService({
    hsts: {
      max_age: false,
    },
  });

  // Calling it this way will enable HSTS and set a max age
  const paladin = PaladinService({
    hsts: {
      max_age: 5184000,
    },
  });

  // Calling it this way will enable default max age, but disable the inclusion
  // of subdomains
  const paladin = PaladinService({
    hsts: {
      include_sub_domains: false,
    },
  });

  // Calling it this way does nothing since it's set to `true` by default
  const paladin = PaladinService({
    hsts: {
      include_sub_domains: true,
    },
  });

  // Calling it this way includes the `preload` attribute
  const paladin = PaladinService({
    hsts: {
      preload: true, // Defaults to false
    },
  });
  ```

### `X-Content-Type-Options`

- This header is enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
- Example Usage

  ```typescript
  // Calling it this way will set the header by default
  const paladin = PaladinService();

  // Calling it this way will remove the header
  const paladin = PaladinService({
    "X-Content-Type-Options": false,
  });
  const paladin = PaladinService({
    "X-Content-Type-Options": true, // Explicitly enable it
  });
  ```

### `X-DNS-Prefetch-Control`

- This header is enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
- Example Usage

  ```typescript
  // Calling it this way removes the header
  const paladin = PaladinService();

  // Calling it this way removes the header
  const paladin = PaladinService({
    "X-DNS-Prefetch-Control": false,
  });

  // Calling it this way turns sets the header
  const paladin = PaladinService({
    "X-DNS-Prefetch-Control": true,
  });
  ```

### `X-Frame-Options`

- This header is enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
- Example Usage

  ```typescript
  // Calling it this way defaults the header to "sameorigin" -- allowing iFrames
  const paladin = PaladinService();

  // Calling it this way will not set the header
  const paladin = PaladinService({
    "X-Frame-Options": false,
  });

  // Calling it this way will set the header to "DENY" -- preventing any iFrames
  const paladin = PaladinService({
    "X-Frame-Options": "DENY",
  });

  // Calling it this way will allow `example.com` to embed iFrames
  const paladin = PaladinService({
    "X-Frame-Options": "ALLOW-FROM https://example.com",
  });
  ```

### `X-Powered-By`

- This header is removed by default. Drash does not set this header.
- Definition: See
  [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) page and
  scroll down to `X-Powered-By`
- Example Usage

  ```typescript
  // Calling it this way will remove the header
  const paladin = PaladinService();

  // Calling it this way will remove the header
  const paladin = PaladinService({
    "X-Powered-By": false,
  });

  // Calling it this way will not remove the header
  const paladin = PaladinService({
    "X-Powered-By": true,
  });

  // Calling it this way allows you disguise your technology
  const paladin = PaladinService({
    "X-Powered-By": "PHP 4.2.0",
  });
  ```

### `X-XSS-Protection`

- This header is enabled by default.
- Definition:
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
- Example Usage

  ```typescript
  // Calling it this way will set the header
  const paladin = PaladinService();

  // Calling it this way will set the header
  const paladin = PaladinService({
    "X-XSS-Protection": true,
  });

  // Calling it this way will disable the header
  const paladin = PaladinService({
    "X-XSS-Protection": false,
  });
  ```
