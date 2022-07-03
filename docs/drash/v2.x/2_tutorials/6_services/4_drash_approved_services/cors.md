# Cors

Cors is a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
HTTP-based middleware inspired by
[expressjs/cors](https://expressjs.com/en/resources/middleware/cors.html).

Simply add it to your server that needs Cors and you're good to go!

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Configuration Options](#configuration-options)
- [Example](#example)
- [How It Works](#how-it-works)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { CorsService } from "https://deno.land/x/drash@<VERSION>/src/services/cors/cors.ts";
```

Replace `<VERSION>` with the **Drash v2.x** version you want to use. All
versions can be found
[here](https://github.com/drashland/drash/releases?q=v2&expanded=true).

## Configuration Options

You can use `CorsService` without passing in any configs. If you do not pass in
any configs, then `Cors` will use its default configs. Also, you should note
that not passing in any configs will enable CORS for all requests from any
origin.

### `allowedHeaders`

This config is optional. This config manages the
[`Access-Control-Allow-Headers` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers).

This config expects a `string` or `string[]` (e.g.,
`"Content-Type,Authorization"` or `["Content-Type", "Authorization"]`).

If this config is not specified, then it defaults to reflecting the values
specified in the request's `Access-Control-Request-Headers` header.

### `credentials`

This config is optional. This config manages the
[`Access-Control-Allow-Credentials`
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials).

Set this config to `true` to send the header. Otherwise, it is omitted from the
response.

### `exposedHeaders`

This config is optional. This config manages the
[`Access-Control-Expose-Headers` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers).

This config expects a `string` or `string[]` (e.g.,
`"Content-Range,X-Content-Range"` or `["Content-Range", "X-Content-Range"]`).

If this config is not specified, then no custom headers are exposed.

### `origin`

This config is optional. This config manages the
[`Access-Control-Allow-Origin` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).
This config tells `Cors` what origins to allow requests from. For example, if
the value is `"https://google.com"`, then `CorsService` will not allow requests
from `"https://stackoverflow.com"`.

The `origin` config can be of the following types:

- `RegExp`
  - Set `origin` to a regular expression to allow requests only from origins
    matching the regular expression. For example, the pattern `/example\.com$/`
    will match and allow any request that is coming from an origin ending with
    `example.com`.
- `array`
  - Set `origin` to an array of valid origins. Each origin can be a `string` or
    a `RegExp`. For example, `["http://example1.com", /\.example2\.com$/]` will
    allow any request from `http://example1.com` and any request from a
    subdomain of `example2.com`.
- `boolean`
  - Set `origin` to `true` to reflect the
    [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), or set
    it to `false` to disable CORS.
- `string`
  - Set `origin` to a single, specific origin. For example, set it to
    `"http://example.com"` to allow requests only from that origin.

### `methods`

This config is optional. This config manages the (`Access-Control-Allow-Methods`
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods).

This config expects a `string` or `string[]` (e.g., `"GET,PUT,POST"` or
`["GET", "PUT", "POST"]`).

### `maxAge`

This config is optional. This config manages the
[`Access-Control-Max-Age` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age).

Set this config to an integer to send the header. Otherwise, it is omitted from
the response.

### `preflight`

This config is optional. If needed, you can disable preflight entirely by
setting this config to `false`.

If this config is not specified, then it defaults to `true`.

## Example

1. Create your `app.ts` file.

```typescript
// app.ts

import { CorsService, Drash } from "./deps.ts";

// Instantiate the service and generate the token. The token can be accessed
// via `csrf.token`.
const cors = new CorsService();

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello world!");
  }
}

// Create and run your server
// You wil be passing in `cors` as a service to the server,
// as Cors is mainly a server-level service, applied to every request
// accepted, and will run *after* request is handled and a resource
// is called, but before a response is sent as it uses the
// `runAfterResource` method.
const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  services: [cors],
  resources: [
    HomeResource,
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

## How It Works

`CorsService` will determine if you server will allow Cors.

By default, the server will allow all and any requests for any method and any
origin, but you can cutomise this by
[changing the configuration options](#configuration-options).

This service checks a variety of headers on the request to see if they match
what the default config or passed in config allows.

Be sure to inspect the specifications of Cors to understand how this service
would act for you.
