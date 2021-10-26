# Handling Path Params

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

You can get a value from a request's path params by using the following in a
resource:

```typescript
const param = this.request.getPathParam("param_name");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will check for the
   `:id` path param in the request's URL. If it exists and is a `number`, then
   it will return what was passed in. If it is `NaN`, then it will throw a
   `400 Bad Request` response.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    // Create your resource

    class UsersResource extends Drash.Http.Resource {
      static paths = [
        "/users/:id",
      ];

      public GET() {
        const userId = parseInt(this.request.getPathParam("id"));

        if (isNaN(userId)) {
          throw new Drash.Exceptions.HttpException(
            400,
            "This resource requires the `:id` path param to be a number.",
          );
        }

        this.response.body =
          `You passed in the following user ID as the path param: ${userId}`;

        return this.response;
      }
    }

    // Create your server

    const server = new Drash.Http.Server({
      response_output: "text/plain",
      resources: [UsersResource],
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

You can also specify optional path params by adding `?` to the end of path
params. Your server would still match `/users` requests to your resource. For
example ...

    ```typescript
    static paths = ["/users/:id?"];
    ```

... will match to the following ...

    ```text
    /users
    /users/
    /users/some-id
    /users/1
    /users/2
    ... and so on
    ```

## Verification

1. Run your app.

    ```shell
    $ deno run --allow-net app.ts
    ```

2. Using `curl` (or similar command), make a `GET` request to
   `localhost:1447/users/1`.

    ```text
    $ curl localhost:1447/users/1
    ```

You should receive the following response:

    ```text
    You passed in the following user ID as the path param: 1
    ```

3. Make the same request, but change the `:id` path param to `one`.

    ```text
    $ curl localhost:1447/users/one
    ```

You should receive the following response:

    ```text
    This resource requires the `:id` path param to be a number.
    ```
