# Introduction

When creating a service, you need to extend the `Drash.Service` class and
implement one or all of the methods under the [Methods](#methods) section below.

Each method gives you the ability to run code during Drash's server's lifecycle.
You can run code during the server's startup time, runtime, or be more granular
by only running code on specific types of HTTP requests (e.g., only run code on
`GET` requests in a specific resource).

## Table of Contents

- [Methods](#methods)
  - [runAtStartup(...)](#runatstartup)
  - [runBeforeResource(...)](#runbeforeresource)
  - [runAfterResource(...)](#runafterresource)
- [Further Learning](#further-learning)

## Methods

_Note: If you have a service that does not define at least one of the methods
below, Drash will not run that service._

### runAtStartup(...)

This method only works in server-level services. It has the following signature:

```typescript
runAtStartup?: (
  options: IServiceStartupOptions,
  // This options parameter includes the following:
  //
  //   {
  //     server: Server, // Your instantiated Drash.Server class
  //     resources: ResourcesAndPatternsMap, // A Map of all your instantiated resource classes and their paths as URLPattern objects
  //   }
  //
) => void | Promise<void>;
```

Drash's server runs this method when it is starting up (after running
`deno run`). For example, when you run ...

```text
$ deno run --allow-net your_app.ts
```

... Deno will start to compile `your_app.ts` and Drash's server will run
`runAtStartup()` in any server-level service that has `runAtStartup()` defined.
The server will only ever run `runAtStartup()` once for each server-level
service.

Some uses cases are as follows:

- Building a cache at startup time and using/modifying the cache during runtime.
- Compiling TypeScript files to JavaScript at startup time and requesting the
  compiled files during runtime.

### runBeforeResource(...)

This method works in server-level, resource-level, and resource HTTP method
level services. It has the following signature:

```typescript
runBeforeResource?: (
  request: DrashRequest,
  response: DrashResponse,
) => void | Promise<void>;
```

Drash's server runs this method before passing requests to a resource's HTTP
method. A simplified version of this lifecycle is as follows:

1. Server receives `GET /some-path` request.
2. Server calls `runBeforeResource()` in all server-level services.
3. Server finds resource that has `/some-path` defined.
4. Server calls `runBeforeResource()` in all resource-level services.
5. Server calls `runBeforeResource()` in all resource HTTP method level
   services.
6. Server calls resource's `GET()` method.

Some uses cases are as follows:

- Authenticating requests before they make it to resources.
- Logging incoming requests
- Throwing HTTP `400` responses to requests that do not have valid request
  bodies

### runAfterResource(...)

This method works in server-level, resource-level, and resource HTTP method
level services. It has the following signature:

```typescript
runAfterResource?: (
  request: DrashRequest,
  response: DrashResponse,
) => void | Promise<void>;
```

Drash's server runs this method after a resource's HTTP method is called. A
simplified version of this lifecycle is as follows:

1. Server receives `GET /some-path` request.
2. Server finds resource that has `/some-path` defined.
3. Server calls resource's `GET()` method.
4. Server calls `runAfterResource()` in all resource HTTP method level services.
5. Server calls `runAfterResource()` in all resource-level services.
6. Server calls `runAfterResource()` in all server-level services.

Some uses cases are as follows:

- Setting response headers before the response makes it back to the client.
- Validating that the response body being sent back to the client meets a
  specific schema.
- Logging the response status code for a given request.

## Further Learning

Learn how to create server-level, resource-level, and resource HTTP method level
services by clicking one of the tutorials below. These tutorials can be found in
the side bar under Services > Creating Services.

- Creating Server-Level Services
  - [Running at Startup](/drash/v2.x/tutorials/services/creating-services/server-level/running-at-startup)
  - [Running Before Resources](/drash/v2.x/tutorials/services/creating-services/server-level/running-before-resources)
  - [Running After Resources](/drash/v2.x/tutorials/services/creating-services/server-level/running-after-resources)
- Creating Resource-Level Services
  - [Running Before Resources](/drash/v2.x/tutorials/services/creating-services/resource-level/running-before-resources)
  - [Running After Resources](/drash/v2.x/tutorials/services/creating-services/resource-level/running-after-resources)
- Creating Resource HTTP Method Level Services
  - [Running Before Resources](/drash/v2.x/tutorials/services/creating-services/resource-http-method-level/running-before-resources)
  - [Running After Resources](/drash/v2.x/tutorials/services/creating-services/resource-http-method-level/running-after-resources)
