# Creating A Resource

Drash defines resources according to the MDN
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web).

Unlike most other frameworks, Drash does not use `app.get()` and does not use
controllers. Instead, Drash uses resources. You create a resource by defining a
resource class, defining its routes in its `paths` property, and define its HTTP
methods as public methods.

All resources must extend the `Drash.Resource` class. This is the base class for
all resources. You can define your own base resource class, but it _MUST_ extend
the `Drash.Resource` class.

Drash servers only register the resources that are specified in their
`resources` config.

In the example code below, the `HomeResource` class is the only resource that
will be regisrered by the server.

```typescript
// app.ts

import { Drash } from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.json({ hello: "world" });
  }
}

// Create and run your server

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

When Drash servers register resources, they also register their paths as
accessible URIs. An accessible URI is a URI that clients can target. In other
words, if a resource specifies `/my-resource` in its `paths` property, then
clients can go to `{your-site.com}/my-resource`.

Any URI that does not exist in any resource is a non-accessible URI.
Non-accessible URIs ultimately lead to a `404 Not Found` error response.

You can add as many resources as you want to your server and your server will
register them.
