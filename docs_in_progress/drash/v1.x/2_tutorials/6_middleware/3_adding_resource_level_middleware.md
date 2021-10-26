# Adding Resource-Level Middleware

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Unlike server-level middleware, resource-level middleware is specified using
decorators and a `tsconfig.json` file. Resource-level middleware can only be
executed by resources. That is, if a resource is decorated with middleware, then
the middleware specified in the decorators will be executed.

Take the example below. This resource contains two types of resource-level
middleware — class level and HTTP method level. With resource-level middleware,
you can specify middleware to be more granular by decorating only HTTP methods
or the resource class itself. Middleware on the resource will execute on each
HTTP method. Middleware on an HTTP method will only execute on that HTTP method.

```typescript
@Drash.Http.Middleware({
  before_request: [VerifyTokenMiddleware],
  after_request: [],
})
export default class SecretResource extends Drash.Http.Resource {
  static paths = [
    "/secret",
  ];

  @Drash.Http.Middleware({
    before_request: [LogAccessMiddleware],
    after_request: [],
  })
  public GET() {
    this.response.body = {
      method: "GET",
      body: "You have accessed the secret resource!",
    };
    return this.response;
  }
}
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  home_resource.ts
  log_access_middleware.ts
  secret_resource.ts
  tsconfig.json
  verify_token_middleware.ts
```

## Steps

1. Create your `tsconfig.json` file.

    ```typescript
    {
      "compilerOptions": {
        "experimentalDecorators": true
      }
    }
    ```

2. Create your `log_access_middleware.ts` file. This file takes in the `request`
   and `response` params.

    ```typescript
    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    export function LogAccessMiddleware(
      request: Drash.Http.Request,
      response: Drash.Http.Response,
    ): void {
      console.log("Secret resource was accessed by: {username}");
    }
    ```

3. Create your `verify_token_middleware.ts` file. This file takes in the
   `request` and `response` params.

    ```typescript
    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    export function VerifyTokenMiddleware(
      request: Drash.Http.Request,
      response: Drash.Http.Response,
    ): void {
      let token = request.getUrlQueryParam("super_secret_token");

      if (!token) {
        throw new Drash.Exceptions.HttpMiddlewareException(
          400,
          "Where is the token?",
        );
      }

      if (token != "AllYourBaseAreBelongToUs") {
        throw new Drash.Exceptions.HttpMiddlewareException(
          403,
          `Mmm... "${token}" is a bad token.`,
        );
      }
    }
    ```

4. Create your `home_resource.ts` file.

    ```typescript
    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    export default class HomeResource extends Drash.Http.Resource {
      static paths = ["/"];

      public GET() {
        this.response.body = {
          method: "GET",
          body: "Hello!",
        };
        return this.response;
      }
    }
    ```

5. Create your `secret_resource.ts` file. This resource will use the
   `VerifyTokenMiddleware` function to verify that the correct token has been
   passed in through the URL query params before the request is executed. If the
   token is incorrect, then the middleware will throw a `400` or `403` error
   response. If the token is correct, then the request will be processed further
   and the `LogAccessMiddleware` function will log that the resource has been
   accessed.

    ```typescript
    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";
    import { LogAccessMiddleware } from "./log_access_middleware.ts";
    import { VerifyTokenMiddleware } from "./verify_token_middleware.ts";

    @Drash.Http.Middleware({
      before_request: [VerifyTokenMiddleware],
      after_request: [],
    })
    export default class SecretResource extends Drash.Http.Resource {
      static paths = [
        "/secret",
      ];

      @Drash.Http.Middleware({
        before_request: [LogAccessMiddleware],
        after_request: [],
      })
      public GET() {
        this.response.body = {
          method: "GET",
          body: "You have accessed the secret resource!",
        };
        return this.response;
      }
    }
    ```

6. Create your `app.ts` file. Notice that you do not need to register your
   middleware here like you do with server-level middleware.

    ```typescript
    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    import HomeResource from "./home_resource.ts";
    import SecretResource from "./secret_resource.ts";

    const server = new Drash.Http.Server({
      resources: [
        HomeResource,
        SecretResource,
      ],
      response_output: "application/json",
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

## Verification

You can verify that your app's code works by making requests like the ones
below. Since this tutorial's app sets `application/json` as the
`response_output`, the server responds to requests with JSON by default.

1. Run your app.

    ```shell
    $ deno run --allow-net --config tsconfig.json app.ts
    ```

2. Make a request using `curl` or go to `localhost:1447` in your web browser.

    ```shell
    $ curl localhost:1447
    ```

This request is not filtered by `VerifyTokenMiddleware`; therefore, you should
receive the following response (we pretty-printed the response for you):

    ```json
    {
      "method": "GET",
      "body": "Hello!"
    }
    ```

3. Make a request using `curl` like below or go to `localhost:1447/secret` in
   your browser.

    ```shell
    $ curl localhost:1447/secret
    ```

This request is filtered by `VerifyTokenMiddleware`, but it is missing the
`super_secret_token` query param; therefore, you should receive the following
response:

    ```text
    "Where is the token?"
    ```

4. Make a request using `curl` like below or go to
   `localhost:1447/secret?super_secret_token=IsThisIt` in your browser.

    ```shell
    $ curl localhost:1447/secret?super_secret_token=IsThisIt
    ```

This request is filtered by `VerifyTokenMiddleware`, but it has the wrong
`super_secret_token` query param; therefore you should receive the following
response:

    ```text
    "Mmm... \"IsThisIt\" is a bad token."
    ```

5. Make a request using curl like below or go to
   `localhost:1447/secret?super_secret_token=AllYourBaseAreBelongToUs` in your
   browser.

    ```shell
    $ curl localhost:1447/secret?super_secret_token=AllYourBaseAreBelongToUs
    ```

This request is filtered by `VerifyTokenMiddleware` and it has the correct
`super_secret_token` query param; therefore you should receive the following
response (we pretty-printed the response for you):

    ```json
    {
      "method": "GET",
      "body": "You have accessed the secret resource!"
    }
    ```

Also, in the terminal where you started your server, you should see the
following message:

    ```text
    "Secret resource was accessed by: {username}"
    ```
