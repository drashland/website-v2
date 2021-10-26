# Using in Deploy

Drash supports [Deno Deploy](https://deno.com/deploy/), meaning you can also
create your very own Drash server on Deno's own hosted service!

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)

## Overview

Creating a Drash server in Deploy is a very simple and easy process. All you
have to do is write your own server, like you would, adding your resources,
services, adding server configuration. The **only thing** you need to change for
Drash to work in Deploy is... the server hostname. Yep... that's it!

Instead of defining your `hostname` property when passing in your options to a
`Drash.Server`, you simply leave it blank, an empty string. That's it!

The rest of this page is optional. You have all you need to write a Drash server
in Deploy (assuming you read the rest of our documentation!), but feel free to
read on for a visual representation of how you might create a Drash server in
Deploy.

## Getting Started

Here is a basic Drash application. It defines a resource to handle requests to
`/` and creates a server to listen on `http://localhost:3000`. It then runs the
server `(server.run())` the same way as it would run if it were being developed
without using Deno Deploy.

```typescript
// app.ts

import * as Drash from "./deps.ts";

class HomeResource extends Drash.Resource {
  paths = ["/"];

  public GET(_request: Drash.Request, response: Drash.Response) {
    response.text("Hello world!");
  }
}

const server = new Drash.Server({
  resources: [
    HomeResource,
  ],
  protocol: "http",
  hostname: "localhost",
  port: 3000,
});

server.run();
```

To use this Drash application with Deno Deploy, all you need to do is change the
value of `hostname` from `"localhost"` to `""`. For example:

```diff
const server = new Drash.Server({
    resources: [
      HomeResource,
    ],
    protocol: "http",
-   hostname: "localhost",
+   hostname: "",
    port: 3000,
  });
```

Below is what you would end up with:

```typescript
// app.ts

import * as Drash from "./deps.ts";

class HomeResource extends Drash.Resource {
  paths = ["/"];

  public GET(_request: Drash.Request, response: Drash.Response) {
    response.text("hello");
  }
}

const server = new Drash.Server({
  resources: [
    HomeResource,
  ],
  protocol: "http",
  hostname: "",
  port: 3000,
});

server.run();
```

Feel free to copy the above code and paste it into a Deno Deploy playground! For
a sanity check to make sure that your application is responding, add a `fetch`
request at the end of the `app.ts` file:

```typescript
const res = await fetch(server.address);
console.log(await res.text());
```
