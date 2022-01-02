# Introduction

## Table of Contents

- [Basics](#basics)
- [Order of Operations](#order-of-operations)
  - [High Level Overview](#high-level-overview)
  - [Server-Level](#server-level)
  - [Resource-Level](#resource-level)
- [Creating Your Own Service](#creating-your-own-service)

## Basics

_**Note: Some of Drash's services use third-party software. For example, instead
of reinventing the wheel, Drash's GraphQL service uses
[GraphQL.js](https://www.npmjs.com/package/graphql).**_

Drash uses the term "services" to encapsulate any software used in a Drash
application that is not part of Drash's core functionality. This includes
services you create, Drash-approved middleware, middleware you create, etc.

Adding services to your application can make your application more feature rich.
Services can add ...

- request filtering
- caching
- logging
- response transforming
- third-party software integrations

... and more.

You can add services throughout your Drash application's
request-resource-response lifecycle at the server level, resource level, and/or
(if you want to be more granular) the resource HTTP method level.

## Order of Operations

### High Level Overview

Briefly stated, at a high level, services execute in the following order:

1. Server-level `runBeforeResource()`
2. Resource-level `runBeforeResource()`
3. Resource HTTP method level `runBeforeResource()`
4. Resource HTTP method level `runAfterResource()`
5. Resource-level `runAfterResource()`
6. Server-level `runAfterResource()`

Check out the
[Drash Lifecycle Diagram](/drash/v2.x/getting-started/lifecycle-diagram) for a
visual diagram of when services are executed by the server.

### Server-Level

In addition to the high level order of operations, server-level services will
execute in the order they are placed in the array. For example ...

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

### Resource-Level

In addition to the high level order of operations, resource-level services will
execute in the order they are placed in the arrays. For example ...

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

## Creating Your Own Service

If you want to create your own service to be plugged into your server or
resource, follow
[Tutorials > Services > Creating Services](/drash/v2.x/tutorials/services/creating-services).
