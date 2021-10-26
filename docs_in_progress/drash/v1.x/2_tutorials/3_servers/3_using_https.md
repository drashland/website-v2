# Using HTTPS

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Server Syntax](#server-syntax)

## Before You Get Started

The only difference between running an HTTP server and an HTTPS server is the
method you use when you run the server.

HTTP servers use `server.run()` and HTTPS servers use `server.runTLS()` with two
extra configs:

- `certFile`
- `keyFile`

## Server Syntax

```typescript
import { Drash } from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    this.response.body = "Hello, HTTPS world!";
    return this.response;
  }
}

// Create and run your server

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [HomeResource],
});

server.runTLS({
  hostname: "0.0.0.0",
  port: 1447,
  certFile: "/path/to/certFile.crt",
  keyFile: "/path/to/keyFile.key",
});

console.log(`Server running. Go to https://${server.hostname}:${server.port}.`);
```
