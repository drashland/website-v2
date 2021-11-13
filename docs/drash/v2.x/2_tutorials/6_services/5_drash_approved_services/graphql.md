# GraphQL

This service allows your Drash application to use [GraphQL](https://graphql.org/).

***Note: This service uses third-party software.***

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#configuration)
- [Verification](#verification)

## Before You Get Started

This tutorial only shows you how to integrate your Drash application with GraphQL. To learn more about using GraphQL, please refer to [GraphQL docs](https://graphql.org/).

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { GraphQL, GraphQLService } from "https://deno.land/x/drash@<VERSION>/src/services/graphql/graphql.ts";
```

Replace `<VERSION>` with the latest version of **Drash v2.x**. The latest version can be found [here](https://github.com/drashland/drash/releases/latest).

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file.

```typescript
// app.ts

import {
  Drash,
  GraphQL,
  GraphQLService,
} from "./deps.ts";

// Set up your GraphQL environment

const schema = GraphQL.buildSchema(`
  type Query {
    greeting: String
  }
`);

const root = {
  greeting: () => { // or greeting: (source, args, context, info) => {
    return "Hello world!";
  },
};

// Instantiate the GraphQL service

const graphQl = new GraphQLService({
  schema,
  graphiql: true,
  rootValue: root,
});

// Create your GraphQL resource so that:
//
//   1. The playground can be viewed and used.
//   2. Clients can make queries to your graph.
//
// Also, note that `services` includes the instantiated GraphQLService.

class GraphQLResource extends Drash.Resource {
  public paths = ["/graphql"];

  public services = {
    ALL: [graphQl],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {
    // This is intentionally left blank.
    //
    // This is only defined to allow GET requests to the front-end playground.
    // Without this, Drash will throw a 405 Method Not Allowed error when
    // requesting to view the playground at /graphql.
    //
    // If you want to secure your playground, then you can fill in this method
    // with logic to secure it. For example:
    //
    // if (request.headers.get("some-token")! !== "someSecret") {
    //   response.status = 401;
    //   return response.text("You do not have access to this resource.");
    // }
  }

  public POST(request: Drash.Request, response: Drash.Response): void {
    // This is intentionally left blank.
    //
    // This is only defined so that POST requests to this resource can be
    // processed. Without this, Drash will throw a 405 Method Not Allowed error
    // when clients try to make GraphQL queries.
  }
}

// Create and run your server

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [GraphQLResource],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

## Verification

1. Run your app.

  ```shell
  $ deno run --allow-net app.ts
  ```

2. View your front-end playground by going to `http://localhost:1447/graphql`.

3. Make a query by entering the following in the left pane of your playground.

  ```text
  {
    greeting
  }
  ```

  You should receive the following response in the left pane of your playground:

  ```json
  {
    "data": {
      "greeting": "Hello world!"
    }
  }
  ```
