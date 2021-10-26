# CORS

This service is a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
HTTP-based service inspired by
[expressjs/cors](https://expressjs.com/en/resources/middleware/cors.html).

Simply add it to your Drash server's `services` config and you are all set!

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#configuration)
- [Verification](#verification)
- [Configuration](#configuration)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
import { CORSService } from "https://deno.land/x/drash@<VERSION>/src/services/cors/cors.ts";
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











## Configuration

You can use `CORSService` without passing in any configs. If you do not pass in any configs, then `CORSService` will use its default configs. Also, you should note that not passing in any configs will enable CORS for all requests from any origin.

### `allowedHeaders`

* This config is optional.
* This config manages the [`Access-Control-Allow-Headers` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers).
* This config expects a `string` or `string[]` (e.g., `"Content-Type,Authorization"` or `["Content-Type", "Authorization"]`).
* If this config is not specified, then it defaults to reflecting the values specified in the request's `Access-Control-Request-Headers` header.
* Example Usage

### `credentials`

* This config is optional. This config manages the [`Access-Control-Allow-Credentials`
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials).
* Set this config to `true` to send the header. Otherwise, it is omitted from the response.
* Example Usage

### `exposedHeaders`

* This config is optional.
* This config manages the [`Access-Control-Expose-Headers` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers).
* This config expects a `string` or `string[]` (e.g., `"Content-Range,X-Content-Range"` or `["Content-Range", "X-Content-Range"]`).
* If this config is not specified, then no custom headers are exposed.
* Example Usage

### `origin`

* This config is optional.
* This config manages the [`Access-Control-Allow-Origin` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).
* This config tells `CORSService` what origins to allow requests from. For example, if the value of this config is `"https://google.com"`, then `CORSService` will not allow requests from `"https://stackoverflow.com"`.
* The `origin` config can be of the following types:
  * `RegExp`
    * Set `origin` to a regular expression to allow requests only from origins matching the regular expression. For example, the pattern `/example\.com$/` will match and allow any request that is coming from an origin ending with `example.com`.
  * `array`
    * Set `origin` to an array of valid origins. Each origin can be a `string` or a `RegExp`. For example, `["http://example1.com", /\.example2\.com$/]` will allow any request from `http://example1.com` and any request from a subdomain of `example2.com`.
  * `boolean`
    * Set `origin` to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), or set it to `false` to disable.
  * `string`
    * Set `origin` to a single, specific origin. For example, set it to `"http://example.com"` to allow requests only from that origin.
* Example Usage

### `maxAge`

* This config is optional.
* This config manages the [`Access-Control-Max-Age` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age).
* Set this config to an integer to send the header. Otherwise, it is omitted from the response.

### `methods`

* This config is optional.
* This config manages the (`Access-Control-Allow-Methods` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods).
* This config expects a `string` or `string[]` (e.g., `"GET,PUT,POST"` or `["GET", "PUT", "POST"]`).
* Example Usage

### `preflight`

* This config is optional.
* If needed, you can disable preflight entirely by setting this config to `false`.
* If this config is not specified, then it defaults to `true`.
