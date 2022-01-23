# Paths and Query String Parameters

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Wocket supports running on a 'path' meaning you aren't constrained to hosting
your server on the root URL.

Wocket also collects any query string parameters
(`localhost:1234/?project=wocket&type=module`) that you are able to use within
your server.

In this tutorial, you will:

- Create a websocket server using Wocket;
- Start the server on a path; and
- Connect a client to your server with query string parameters.

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

   import { Server, WebSocketClient } from "./deps.ts";

   const server = new Server({
     hostname: "localhost",
     port: 1667,
     protocol: "ws",
     path: "/admin",
   });
   server.run();
   server.on("connect", (e) => {
     console.log("A client has connected!", e.queryParams.get("project"));
   });

   const client = new WebSocketClient(server.address = "/admin?project=wocket");
   ```

Here you are going to create your websocket server on the address
`ws://localhost:1667/admin`. You will then create a client to connect to your
server, passing in a `project` parameter in the URL.

Note that any event/channel listener can retrieve the query parameters, they
will be set on the event (`e`) parameter in the callback for all listeners. As
`queryParams` is of type `URLSearchParams`, for more information on how to use
it, refer to the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-net=localhost:1667 app.ts
   ```

2. You should see the following output:

   ```shell
   A client has connected! wocket
   ```
