# Get All Params

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Drash provides a few methods to get all params. They are as follows:

```typescript
const bodyParams = this.request.getAllBodyParams();
const headerParams = this.request.getAllHeaderParams();
const pathParams = this.request.getAllPathParams();
const queryParams = this.request.getAllUrlQueryParams();
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will retrieve all
   header, body, query, and path params for the request.

    ```typescript
    // app.ts

    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    // Create your resource

    class HomeResource extends Drash.Http.Resource {
      static paths = ["/:name/:region"];

      public POST() {
        const bodyParams = this.request.getAllBodyParams();
        const headerParams = this.request.getAllHeaderParams();
        const pathParams = this.request.getAllPathParams();
        const queryParams = this.request.getAllUrlQueryParams();

        const data = {
          bodyParams,
          headerParams,
          pathParams,
          queryParams,
        };

        this.response.body = data;

        return this.response;
      }
    }

    // Create your server

    const server = new Drash.Http.Server({
      resources: [HomeResource],
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

## Verification

1. Run your app.

    ```shell
    $ deno run --allow-net app.ts
    ```

2. Using `curl` (or similar command), make a `POST` request to
   `localhost:1447/Edward/UK`.

    ```text
    $ curl --header "Content-Type: application/json" \
      --request POST \
      --data '{"name":"Edward","region":"UK"}' \
      localhost:1337/Edward/UK
    ```

You should receive the following response (we pretty-printed the response for
you):

    ```json
    {
      "bodyParams": {
        "data": {
          "name": "Edward",
          "region": "UK"
        },
        "content_type": "application/json"
      },
      "headerParams": {
        "host": "localhost:1337",
        "user-agent": "curl/7.54.0",
        "accept": "*/*",
        "content-type": "application/json",
        "content-length": "31"
      },
      "pathParams": {
        "name": "Edward",
        "region": "UK"
      }
    }
    ```
