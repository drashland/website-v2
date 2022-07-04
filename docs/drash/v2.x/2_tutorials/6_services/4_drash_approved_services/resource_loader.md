# Resource Loader

This service was introduced in v2.7.0. Please make sure you are using v2.7.0 (or
higher) before proceeding with this tutorial.

This service allows your Drash application to load all resource files contained
in multiple directories. For example, if you have resource files in a
`./resources` directory, you can pass in `./resources` and this service will
load all of the resources in that directory and register them in your Drash
server.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Configuration](#configuration)
  - [Required](#required)
    - [paths_to_resources: string[]](#paths-to-resources-string)

## Before You Get Started

{{ placeholder: drash_edit_your_deps_file_to_include_the_service }}

```typescript
// File: deps.ts

// @Export drash_from_deno_no_version_comment
// @Export resource_loader_service_from_deno_no_version_comment
// ... rest
// ... of
// ... your
// ... deps
```

If you are using this service to load ALL of your resources, then the
`resources` server config is not required. For example:

```typescript
...
...
...

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  // resources: [] <--- Not required anymore if you are loading all of your resources via ResourceLoaderService unless you like the empty array here
  services: [resourceLoaderService],
});
```

## Folder Structure End State

```text
▾  /path/to/your/project/
  ▾  api_resources/
       users_resource.ts
  ▾  ssr_resources/
       home_resource.ts
     app.ts
     deps.ts
```

## Steps

1. Create your `app.ts` file. This assumes you edited your `deps.ts` file above.

   ```typescript
   // app.ts

   import { Drash, ResourceLoaderService } from "./deps.ts";

   // Instantiate the service and provide it with the paths to your resources
   const resourceLoaderService = new ResourceLoaderService({
     paths_to_resources: [
       "./api_resources", // Searches ./api_resources and loads all resources
       "./ssr_resources", // Searches ./ssr_resources and loads all resources
     ],
   });

   // Create your server and plug in the instantiated ResourceLoaderService class

   const server = new Drash.Server({
     hostname: "0.0.0.0",
     port: 1447,
     protocol: "http",
     services: [resourceLoaderService],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

1. Create your `./api_resources/users_resource.ts` file.

   ```typescript
   import { Drash } from "../deps.ts";

   export class UsersResource extends Drash.Resource {
     public paths = ["/users/:id?"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       if (request.pathParam("id")) {
         return response.json({
           some: "user",
         });
       }

       return response.json([
         {
           some: "user",
         },
         {
           some: "other user",
         },
       ]);
     }
   }
   ```

1. Create your `./ssr_resources/home_resource.ts` file.

   ```typescript
   import { Drash } from "../deps.ts";

   export class HomeResource extends Drash.Resource {
     public paths = ["/home"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       response.html(`<div>Homepage</div>`);
     }
   }
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net --allow-read app.ts
   ```

2. Open your browser and navigate to `http://localhost:1447/home` to verify that
   the `HomeResource` in `./ssr_resources` was loaded.

   You should receive the following response:

   ```text
   Homepage
   ```

3. Navigate to `http://localhost:1447/users` to verify that the `UsersResource`
   in `./api_resources` was loaded.

   You should receive the following response:

   ```text
   [{"some":"user"},{"some":"other user"}]
   ```

4. Navigate to `http://localhost:1447/users/1` to verify that the
   `UsersResource` works as expected with and without a user ID.

   You should receive the following response:

   ```text
   {"some":"user"}
   ```

## Configuration

### Required

Below are the required configurations. You cannot use this service without
these.

#### paths_to_resources: string[]

- This config is used to help `ResourceLoaderService` find your resource class
  files.
- Example Usage

  ```typescript
  import { ResourceLoaderService } from "./deps.ts";

  const resourceLoaderService = new ResourceLoaderService({
    paths_to_resources: [
      "./api_resources", // Searches ./api_resources and loads all resources
      "./ssr_resources", // Searches ./ssr_resources and loads all resources
    ],
  });
  ```
