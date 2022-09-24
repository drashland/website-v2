# GraphQL

This service was introduced in v2.2.0. Please make sure you are using v2.2.0 (or
higher) before proceeding with this tutorial.

This service allows your Drash application to use
[GraphQL](https://graphql.org/).

_**Note: This service uses third-party software.**_

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Configuration](#configuration)
  - [Required](#required)
    - [graphiql: boolean | string](#graphiql-boolean-string)
    - [rootValue: Record<string, (...args: any) => string>](#rootvalue-record-string-args-any-string)
    - [schema: GraphQL.GraphQLSchema](#schema-graphql-graphqlschema)

## Before You Get Started

This tutorial only shows you how to set up your Drash application to use
GraphQL. To learn more about using GraphQL, please refer to the
[GraphQL documentation](https://graphql.org/).

{{ placeholder: drash_v2_edit_your_deps_file_to_include_the_service }}

```typescript
// File: deps.ts

// @Export drash_v2_from_deno_no_version_comment
// @Export drash_v2_graphql_service_from_deno_no_version_comment
// ... rest
// ... of
// ... your
// ... deps
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. This assumes you edited your `deps.ts` file above.

   ```typescript
   // File: app.ts

   import { Drash, GraphQL, GraphQLService } from "./deps.ts";

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

   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     services: [graphQl],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

1. View your front-end playground by going to `http://localhost:1447/graphql`.

1. Make a query by entering the following in the left pane of your playground.

   ```text
   {
     greeting
   }
   ```

   You should receive the following response in the right pane of your
   playground:

   ```json
   {
     "data": {
       "greeting": "Hello world!"
     }
   }
   ```

## Configuration

### Required

Below are the required configurations. You cannot use this service without
these.

#### graphiql: boolean | string

- This config enables or disables the
  [GraphQL playground](https://github.com/graphql/graphql-playground).
- Values:
  - If set to `true`, then the GraphQL playground will be enabled and accessible
    at `/graphql`.
  - If set to `false`, then the GraphQL playground will be disabled.
  - If set to a `string`, then it _**must**_ be a proper
    [pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname)
    (e.g., `/graphql-playground`). This will change the location of the GraphQL
    playground. For example, if set to `/graphql-playground`, then the GraphQL
    playground will be accessible at `/graphql-playground` and not `/graphql`.
- Example Usage on changing the GraphQL playground path to
  `/graphql-playground`:

  ```typescript
  // app.ts

  import { Drash, GraphQL, GraphQLService } from "./deps.ts";

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
    graphiql: "/graphql-playground", // <--- Now the GraphQL playground will be accessible at http://localhost:1447/graphql-playground and not http://localhost:1447/graphql
    rootValue: root,
  });

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,
    protocol: "http",
    resources: [],
    services: [graphQl],
  });

  server.run();

  console.log(`Server running at ${server.address}.`);
  ```

### rootValue: Record<string, (...args: any) => string>

- This config provides a resolver function for each API endpoint.
- Please refer to
  [GraphQL's documentation on root fields and resolvers](https://graphql.org/learn/execution/#root-fields-resolvers).

#### schema: GraphQL.GraphQLSchema

- This config defines your GraphQL's schema
- Please refer to
  [GraphQL's documentation on schemas](https://graphql.org/learn/schema/).
