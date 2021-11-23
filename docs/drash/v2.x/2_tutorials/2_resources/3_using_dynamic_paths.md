# Using Dynamic Paths

Just like other frameworks, Drash resources have the ability to parse paths like the following:

* `/path/:id`
* `/path/:id?`
* `/[a-z]/[0-9]`

## Table of Contents

* [How To Implement Prefixes](#hoe-to-implement-prefixes)

## How to Implement Prefixes

Drash does not have any magic code built-in to allow you to do this, because we feel it's trivial to implement yourself and due to the way Drash is written, you can easily extend it.

An example of how you may add prefixes could look like so:

```ts
// resources/base_resource.ts
export class BaseResource extends Drash.Resource {
  protected prefixes = {
    api: "/api/v2",
  }

  /**
   * Returns the passed in array with each path being prefixed
   * 
   * @param prefix - The prefix to use
   * @param paths - The resource paths to prefix
   * 
   * @example
   * ```js
   * class Resource extends BaseResource {
   *   public paths = this.prefixPaths(this.prefixes.api, ["/users", "/cars"]); // ["/api/v2//users", "/api/v2//cars"]
   * }
   * ```
   * 
   * @returns The `paths` parameter, but with every item prefixed with `this.#prefix`
   */
  protected prefixPaths(prefix: string, paths: string[]) {
    return paths.map(path => this.#prefixes[prefix] + path);
  }
}
```

```ts
// resources/api/user_resource.ts

import { BaseResource } from "../base_resource.ts";

export class ApiUserResource extends BaseResource {
  public paths = this.prefixPaths("api", ["/user", "/users", "/user/:id"])
}
```

Now you can do this for all of your resources (assuming they all need a prefix), just create the base resource once and for every resource, just extend the base resource and define the paths like the above.

If only some of your resources need a prefix, they can still extend the base resource, but they don't need to call the `prefixPaths` method.