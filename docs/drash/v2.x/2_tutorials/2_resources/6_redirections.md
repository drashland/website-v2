# Redirections

## Table of Contents

- [Default Case](#default-case)
- [Specifying the HTTP Status Code](#specifying-the-http-status-code)
- [Specifying headers](#specifying-headers)

## Default Case

Resources are able to redirect requests to other resources using the following
in an HTTP method:

```typescript
this.redirect("https://domain.tld", response);
```

A full example looks like:

```typescript
// File: my_resource.ts

import { Drash } from "./deps.ts";

export class MyResource extends Drash.Resource {
  public paths = ["/my-resource"];

  public GET(request: Drash.Request, response: Drash.Response) {
    this.redirect("https://domain.tld", response);
  }
}
```

The signature of the `redirect()` method is as follows:

```typescript
public redirect(
  location: string,
  response: Drash.Response,
  status = 302,
  headers: Drash.Types.HttpHeadersKeyValuePairs = {},
): void {
  ...
  ...
  ...
}
```

As you can see, the default case only requires the `location` and `response`.
Using the default case will make Drash use `302` as the status code.

For specifying the status code and/or specifying headers, read the sections
below.

## Specifying the HTTP Status Code

By default, the `redirect()` method uses `302` as the status code for
redirection. If you want to change this, then specify a status code as the third
argument. For example:

```typescript
this.redirect(
  "https://domain.tld",
  response,
  301, // <--- See here
);
```

A full example looks like:

```typescript
// File: my_resource.ts

import { Drash } from "./deps.ts";

export class MyResource extends Drash.Resource {
  public paths = ["/my-resource"];

  public GET(request: Drash.Request, response: Drash.Response) {
    this.redirect("https://domain.tld", response, 301);
  }
}
```

## Specifying Headers

If you want to set headers on the redirection response for cases where clients
handle redirections manually, you can do so by specifying an object of key-value
pairs as the fourth argument. For example:

```typescript
this.redirect(
  "https://domain.tld",
  response,
  301,
  { "X-SOME-HEADER": "some value" }, // <--- See here
);
```

A full example looks like:

```typescript
// File: my_resource.ts

import { Drash } from "./deps.ts";

export class MyResource extends Drash.Resource {
  public paths = ["/my-resource"];

  public GET(request: Drash.Request, response: Drash.Response) {
    this.redirect(
      "https://domain.tld",
      response,
      301,
      {
        "X-SOME-HEADER": "some value",
      },
    );
  }
}
```

Note that the third argument (`status`) is required in this case.
