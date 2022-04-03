# Order of Operations

## Table of Contents

- [High Level Overview](#high-level-overview)
- [Server-Level](#server-level)
- [Resource-Level](#resource-level)

## High Level Overview

At startup time (when you run `deno run [deno flags] your_app.ts`), the
following services/methods will run.

- Server-level `runAtStartup()`

At runtime (when your `your_app.ts` is running), the following services/methods
will run in the following order.

1. Server-level `runBeforeResource()`
2. Resource-level `runBeforeResource()`
3. Resource HTTP method level `runBeforeResource()`
4. Resource HTTP method level `runAfterResource()`
5. Resource-level `runAfterResource()`
6. Server-level `runAfterResource()`

Check out the
[Drash Lifecycle Diagram](/drash/v2.x/getting-started/lifecycle-diagram) for a
visual diagram of when services are executed by the server.

## Server-Level

In addition to the high level order of operations, server-level services will
execute in the order they are placed in the server's `services` config. For
example, the following services ...

```typescript
const server = new Drash.Server({
  ...
  ...
  ...
  services: [
    new OneService()
    new TwoService(),
    new RedService()
    new BlueService(),
  ],
});
```

... will execute in the following order ...

- `OneService`
- `TwoService`
- `RedService`
- `BlueService`

## Resource-Level

In addition to the high level order of operations, resource-level services will
execute in the order they are placed in a resource's `services` property. For
example, the following services ...

```typescript
class HomeResource extends Drash.Resource {

  ...
  ...
  ...
  public services = {
    // Run services on all requests
    ALL: [
      new AllOneService(),
      new AllTwoService(),
      new AllRedService(),
      new AllBlueService(),
    ],

    // Run services only on GET requests
    GET: [
      new GetOneService(),
      new GetTwoService(),
      new GetRedService(),
      new GetBlueService(),
    ],

    ...
    ...
    ...
  };

  ...
  ...
  ...
}
```

... will execute in the following order for all requests ...

- `AllOneService`
- `AllTwoService`
- `AllRedService`
- `AllBlueService`

... and will execute in the following order for `GET` requests ...

- `GetOneService`
- `GetTwoService`
- `GetRedService`
- `GetBlueService`

If you had other HTTP methods defined in the `services` property above (e.g.,
`POST`, `PUT`), then those HTTP methods' services will run in the same orders as
shown above for `ALL` and `GET` services.
