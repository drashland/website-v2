# Giving Clients UUIDs in the Server

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

The `Client` class, which is how you can interact with connected clients
provides a `uuid` property. This by default is set to a string and will never be
set by us. This is so it aids in typechecking, and opens up the possibility of
you wanting to give clients UUIDs, with ease.

Setting the uuid is as simple as `client.uuid = generateMyUUID()`.

In this tutorial, you will:

- Create an event handler for your server; and
- Set a uuid for every client that connects.

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

   import { Client, Server, WebSocketClient } from "./deps.ts";

   const server = new Server({
     hostname: "localhost",
     port: 1667,
     protocol: "ws",
   });
   server.on("connect", (e) => {
     console.log("A new client has connected!");
     const client = server.clients.get(e.detail.id);
     client.uuid = "my uuid!";
   });
   ```

   Now, everytime you want or need to access a client, you can use the uuid!

   ```ts
   server.on("some custom channel", (e) => {
     const client = server.clients.get(e.detail.id) as Client;
     console.log(client.uuid); // "my uuid!"
   });
   ```
