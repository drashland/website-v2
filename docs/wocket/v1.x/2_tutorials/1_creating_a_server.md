# Creating a Server

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Wocket exposes a `Server` class to you, which allows you to run a native HTTP server that will upgrade requests to a websocket request as and when it receives them.

In this tutorial, you will:

- Create a websocket server using Wocket.

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

   import { Server } from "./deps.ts";

   // `Server()` takes one argument:
   //   1. Options for creating the server. This will be the following:
   //     - `hostname` - The hostname on which to serve this server.
   //     - `port` - The port on which to serve the server.
   //     - `protocol` - Which protocol to use, `ws` or `wss`.
   //     - `keyFile` - Optional. If `protocol` is `"wss"`, then you can supply the path to your key file
   //     - `certFile` - Optional. If `protocol` is `"wss"`, then you can supply the path to your certificate file
   //     - `path` - Optional. If you wish to start your server on a path
   //     e.g. new Server({
   //            hostname: "localhost",
   //            port: 9292,
   //            path: "/admin"
   //          });
   const server = new Server({
     hostname: "localhost",
     port: 1667,
     protocol: "ws",
     path: "/admin",
   });
   server.run()
   console.log('Running!');

   // And to close the server:
   await server.close();
   ```

Here you are going to create your websocket server on the address `ws://localhost:1667/admin`. Any requests to `localhost:1667` will return a 404, whereas requests to `localhost:1667/admin` will be handled.

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-net=localhost:1667 app.ts
   ```
