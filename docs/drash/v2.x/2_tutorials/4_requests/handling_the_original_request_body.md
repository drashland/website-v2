# Handling the Original Request Body

{{ note_since: v2.7.0 }}

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

When Drash processes an incoming request, it creates its own internal
`Drash.Request` object which is an extension of the native JavaScript `Request`
class. It does this to provide helper methods such as `request.bodyParam()`. As
a result, it automatically reads the incoming request's body. This means you
cannot read the request body again since the request will be flagged as
`{ bodyUsed: true }`.

If you want to handle the original request's body, you can do so by accessing
the `original` property on the `Drash.Request` object.

In this tutorial, you will learn how to read a JSON request body on the original
request.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   import { Drash } from "./deps.ts";

   // Create your resource

   class RawRequestExampleResource extends Drash.Resource {
     public paths = ["/raw-request-example"];

     public async POST(
       request: Drash.Request,
       response: Drash.Response,
     ): Promise<void> {
       const jsonBody = await request.original.json();
       response.text(
         `The original request body is: ${JSON.stringify(jsonBody)}`,
       );
     }
   }

   // Create and run your server

   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     resources: [RawRequestExampleResource],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `POST` request to
   `http://localhost:1447/` and pass in `{"name":"deno"}` in the request body.

   ```text
   $ curl --header "Content-Type: application/json" \
       --request POST \
       --data '{"user":"drash"}' \
       http://localhost:1447/raw-request-example
   ```

   You should receive the following response:

   ```text
   The original request body is: {"user":"drash"}
   ```
