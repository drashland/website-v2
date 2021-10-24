# Content Types

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

By default, Drash will send responses with a content type based on the requests `Accept` header. If the request accepts `*/*`, the response content type will be `application/json`. If the request accepts many types, Drash will grab the first one from the request's `Accept` header and use that. Otherwise, the default will be `application/json`.

You can customize the default response content type when you create your server by using the `response_output` config:

```typescript
const server = new Drash.Http.Server({
  response_output: "text/html", // or text/xml or another correct MIME type
});
```

You can also explicitly set the response content type on a per request basis using `this.response.headers.set()` inside your resource:

```typescript
// This example uses text/html, but it can be any correct MIME type
this.response.headers.set("Content-Type", "text/html");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
```

## Steps

1. Create your `app.ts` file.

  ```typescript
  // app.ts

  import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

  class Resource extends Drash.Http.Resource {

    static paths = ["/"];

    public GET() {
      // You can override the default content type on a per resource method basis.
      // With the below, this method will now respond with "text/html" being the content type.
      this.response.headers.set("Content-Type", "text/html");
      this.response.body = `<p>Hello world</p>`;
      return this.response
    }

  }

  const server = new Drash.Http.Server({
    // This will be the default content type used for responses.
    // If this config is not used, then Drash will default to
    // application/json.
    response_output: "application/json",
    resources: [Resource],
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

2. Go to `localhost:1447`. You will notice that even though your `repsonse_output` config is set to `application/json`, you received a `text/html` response. This is because your resource overrides the `response_output` config by calling the following:

  ```typescript
    this.response.headers.set("Content-Type", "text/html");
  ```