# Ending Requests Early

There are two ways to end a request early in a service:

1. Calling `this.end()`; and/or
2. Throwing an error (e.g., `throw new Error("Something")`)

## Table of Contents

- [Calling this.end()](#calling-this-end)
- [Throwing an Error](#throwing-an-error)

## Calling this.end()

When you create a service and extend the `Drash.Service` class, your service
inherits the `end()` method from `Drash.Service`. This method is useful if you
want to make your service end a request early -- short-circuiting the
request-resource-response lifecycle.

For example, the below code ends the request if the request passes in
`use_cache=true` in the URL.

```typescript
// File: app.ts

import { Drash } from "./deps.ts";

class CacheService extends Drash.Service {
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response,
  ): void {
    const useCache = request.queryParam("use_cache");

    if (useCache && useCache === "true") {
      console.log("Client requested cached values. Ending lifecycle early.");
      response.text("Hello! (cached)");
      return this.end();
    }

    // If we get here, then the request continues through the
    // request-resource-response lifecycle
    console.log("Not using cache. Moving on.");
  }
}

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello!");
  }
}

const server = new Drash.Server({
  resources: [
    HomeResource,
  ],
  services: [
    new CacheService(),
  ],
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
});

// Run your server

server.run();

console.log(`Server running at ${server.address}`);
```

You can run the above code by doing the following:

1. Run your app.

   ```text
   $ deno run --allow-net app.ts
   ```

2. Make a request with and without the `use_cache=true` query param key/value.

   ```text
   $ curl http://localhost:1447?use_cache=true # Recieves "Hello! (cached)"
   $ curl http://localhost:1447 # Receives "Hello!"
   ```

## Throwing an Error

All services that throw errors will be caught in Drash's server. When the server
sees that a service threw an error, it will immediately end the
request-resource-response-lifecycle and return the error to the client that made
the request.

For example, the below app uses a `TokenService` class to throw the built-in
`Drash.Errors.HttpError` error if it does not see the `Authorization` header in
a request.

```typescript
// File: app.ts

import { Drash } from "./deps.ts";

class TokenService extends Drash.Service {
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response,
  ): void {
    const token = request.headers.get("Authorization");

    if (!token) {
      console.log(
        "Client did not send Authorization header. Ending lifecycle early.",
      );
      throw new Drash.Errors.HttpError(401, "Authorization header missing.");
    }

    // If we get here, then we can continue to check if the token is valid
    console.log("Authorization header present. Checking if valid.");
    // Validation code goes here
    // ...
    // ...
    // ...
  }
}

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello!");
  }
}

const server = new Drash.Server({
  resources: [
    HomeResource,
  ],
  services: [
    new TokenService(),
  ],
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
});

// Run your server

server.run();

console.log(`Server running at ${server.address}`);
```

You can run the above code by doing the following:

1. Run your app.

   ```text
   $ deno run --allow-net app.ts
   ```

2. Make a request with and without the `Authorization` header.

   ```text
   $ curl --header "Authorization: 50m370k3n" http://localhost:1447 # Recieves "Hello!"
   $ curl http://localhost:1447 # Receives "Error: Authorization header missing."
   ```
