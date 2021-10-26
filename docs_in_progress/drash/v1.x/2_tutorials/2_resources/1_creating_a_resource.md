# Creating A Resource

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Adding a Resource](#adding-a-resource)

## Before You Get Started

Drash defines resources according to the MDN
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web).

Unlike most other frameworks, Drash does not use `app.get()` and does not use
controllers. Instead, Drash uses resources. You create a resource by defining a
resource class, defining its routes in its `paths` property, and define its HTTP
methods as public methods.

All resources must extend the `Drash.Http.Resource` class. This is the base
class for all resources. You can define your own base resource class, but it
_MUST_ extend the `Drash.Http.Resource` class.

Drash servers only register the resources that are specified in their
`resources` config.

In the example code below, the `HomeResource` class is the only resource that
will be regisrered by the server.

```typescript
// app.ts

import { Drash } from "./deps.ts";

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  resources: [HomeResource],
});

server.run({
  hostname: "0.0.0.0",
  port: 1447,
});

console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
```

When Drash servers register resources, they also register their paths as
accessible URIs. An accessible URI is a URI that a client can target. In other
words, if a resource specifies `/my-resource` in its `paths` property, then
clients can go to `{http|https}://{server-adress.tld}/my-resource`.

Any URI that does not exist in any resource is a non-accessible URI.
Non-accessible URIs ultimately lead to a `404 Not Found` error response.

Adding resources to a server is as simple as importing the resource and adding
it to the `resources` config. In the example below, the `UsersResource` class is
imported and added to the `resources` config. This server now has `HomeResource`
and `UsersResource` registered.

```typescript
// app.ts

import { Drash } from "./deps.ts";

import HomeResource from "./home_resource.ts";
import UsersResource from "./users_resource.ts";

const server = new Drash.Http.Server({
  resources: [
    HomeResource,
    UsersResource,
  ],
});

server.run({
  hostname: "0.0.0.0",
  port: 1447,
});

console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
```

## Adding a Resource

Take the example below. The `HomeResource` handles requests at the `/` URI. If a
client makes a request to `http://localhost:1447/`, the `HomeResource` would
handle that request.

```typescript
// app.ts

import { Drash } from "./deps.ts.ts";

// Create the resource

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    this.response.body = "GET request received!";
    return this.response;
  }

  public POST() {
    this.response.body = "POST request received!";
    return this.response;
  }
}

// Create and run the server

const server = new Drash.Http.Server({
  resources: [
    HomeResource,
  ],
});

server.run({
  hostname: "0.0.0.0",
  port: 1447,
});

console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
```
