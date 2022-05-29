# Handling URL Query Params

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

You can get a value from a request's URL query params by using the following in
a resource:

```typescript
const param = request.queryParam("param_name");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. {{ placeholder: drash_create_deps_file_step }}

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       // Check for the param
       const param = request.queryParam("name");

       // No param passed in? Get out.
       if (!param) {
         throw new Drash.Errors.HttpError(
           400,
           "This resource requires the `name` URL query param.",
         );
       }

       return response.text(
         `You passed in the following URL query param: ${param}`,
       );
     }
   }

   // Create and run your server

   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     resources: [
       HomeResource,
     ],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447?name=deno`.

   ```text
   $ curl http://localhost:1447?name=deno
   ```

   You should receive the following response:

   ```text
   You passed in the following URL query param: deno
   ```

3. Make the same request, but change the URL query param to use `username`
   instead of `name`.

   ```text
   $ curl http://localhost:1447?username=deno
   ```

   You should receive the following response:

   ```text
   This resource requires the `name` URL query param.
   ```
