# Prefixing Paths

Sometimes you may want to prefix your paths with `/web`, `/api/v1`, or something
else that meets your requirements. By default, Drash does not have any built-in,
magic code that allows you to do this. However, since Drash is extensible, the
implementation is quite simple.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

In this tutorial, we will go over one way to introduce path prefixing.

Please note that the steps below outline just a single way of implementing path
prefixes. You can take this tutorial as inspiration to create your own preferred
implementation.

## Folder Structure End State

```text
▾  website/
  ▾  resources/api/
    ▾  v1/
         users_resource.ts
    ▾  v2/
         users_resource.ts
       base_resource.ts
     app.ts
     deps.ts
```

## Steps

1. Create your `app.ts` file.

```typescript
// app.ts

import { Drash } from "./deps.ts";
import { UsersResource as v1UsersResource } from "./resources/api/v1/users_resource.ts";
import { UsersResource as v2UsersResource } from "./resources/api/v2/users_resource.ts";

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    v1UsersResource,
    v2UsersResource,
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

2. Create your `BaseResource` class. When resources extend this class, they can
   use the `prefixPaths()` method to prefix their paths.

```ts
// resources/api/base_resource.ts

import { Drash } from "../../deps.ts";

export class BaseResource extends Drash.Resource {
  /**
   * Define a list of prefixes that can be used by resources that extend this class.
   */
  #prefixes: { [k: string]: string } = {
    api_v1: "/api/v1",
    api_v2: "/api/v2",
  };

  /**
   * Returns the passed in array with each path being prefixed
   *
   * @param prefix - The prefix to use
   * @param paths - The resource paths to prefix
   *
   * @returns The `paths` parameter, but with every item prefixed with `this.#prefix`
   */
  protected prefixPaths(prefix: string, paths: string[]) {
    return paths.map((path) => this.#prefixes[prefix] + path);
  }
}
```

3. Add a v1 `UsersResource` by extending `BaseResource` and choosing the
   `/api/v1` prefix.

```ts
// resources/api/v1/users_resource.ts

import { Drash } from "../../../deps.ts";
import { BaseResource } from "../base_resource.ts";

export class UsersResource extends BaseResource {
  public paths = this.prefixPaths("api_v1", ["/users", "/users/:id"]);
  // The above will be transformed to the following:
  //
  //   - /api/v1/users
  //   - /api/v1/users/:id

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello from v1!");
  }
}
```

4. Add a v2 `UsersResource` by extending `BaseResource` and choosing the
   `/api/v2` prefix.

```ts
// resources/api/v2/users_resource.ts

import { Drash } from "../../../deps.ts";
import { BaseResource } from "../base_resource.ts";

export class UsersResource extends BaseResource {
  public paths = this.prefixPaths("api_v2", ["/users", "/users/:id"]);
  // The above will be transformed to the following:
  //
  //   - /api/v2/users
  //   - /api/v2/users/:id

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("Hello from v2!");
  }
}
```

Note that you can take the above steps and apply them to all of your resources
(assuming they all need a prefix). Just create a base resource once and for
every resource that needs a prefix, just extend the base resource and define the
paths like in the above steps.

If only some of your resources need a prefix, they can still extend the base
resource, but they do not need to call the `prefixPaths()` method.

## Verification

1. Run your app.

```shell
$ deno run --allow-net app.ts
```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447/api/v1/users`.

```text
$ curl http://localhost:1447/api/v1/users
```

You should receive the following response:

```text
Hello from v1!
```

3. Make another request, but to `http://localhost:1447/api/v2/users`.

```text
$ curl http://localhost:1447/api/v2/users
```

You should receive the following response:

```text
Hello from v2!
```
