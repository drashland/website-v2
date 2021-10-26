# Redirects

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Drash defines redirections according to the MDN
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections).

To permanently redirect clients, use the following in a resource:

```typescript
this.response.redirect(301, "https://drash.land");
```

To temporarily redirect clients, use the following in a resource:

```typescript
this.response.redirect(302, "/cola/1");
```

You can redirect clients using a fully-qualified URL or a relative URL as seen
in the example code above.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   // app.ts

   import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

   export default class ColaResource extends Drash.Http.Resource {
     static paths = ["/cola/:id"];

     protected COLAS: any = {
       1: "Diet Cola",
       2: "Vanilla Cola",
       3: "Cherry Cola",
     };

     public GET() {
       let colaId = this.request.getPathParam("id");

       if (!COLAS[colaId]) {
         return this.response.redirect(302, "/colas/1");
       }

       this.response.body = this.getCola(colaId);
       return this.response;
     }

     protected getCola(colaId: string) {
       return this.COLAS[colaId];
     }
   }

   // Create your server

   const server = new Drash.Http.Server({
     response_output: "application/json",
     resources: [ColaResource],
   });

   server.run({
     hostname: "0.0.0.0",
     port: 1447,
   });

   console.log(
     `Server running. Go to http://${server.hostname}:${server.port}.`,
   );
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl` (or similar command), make a `GET` request to
   `localhost:1447/cola?id=5` to be redirected to `/cola/1`.

   ```text
   $ curl localhost:1447/cola?id=5
   ```

You should receive the following response:

    ```text
    Diet Cola
    ```
