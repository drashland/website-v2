# Introduction

Wocket is a Websocket server module for Deno.

Learn more about Wocket [here](about-wocket).

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `app.ts` file.

   ```typescript
   // app.ts

   // Replace `<VERSION>` with the latest version of Wocket v1.x. The latest
   // version can be found at https://github.com/drashland/wocket/releases/latest
   import { Server, WebSocketClient } from "https://deno.land/x/wocket@<VERSION>/mod.ts";

   const server = new Server({
     hostname: "localhost",
     port: 1667,
   })
   server.run()
   server.on("hello", e => {
     server.to("hello", "hi :)")
   })

   const client = new WebsocketClient(server.address)
   client.on("hello", e => {
     console.log(`Client got a message!`, e.data)
   })
   client.onopen = () => {
     client.to("hello", "Hello!");
   }
   ```

4. Run your `app.ts` file.

   ```shell
   $ deno run --allow-net=localhost:1667 app_test.ts
   ```

5. In the output it provides, you should see that "Client got message!" was logged.

## Features

- Zero third-party dependencies outside of Deno Standard Modules
- Extensively documented
- Whisper to clients from the server
- Broadcast too all but one client
- Send to all clients
- Create channels
- Full generic support for channel listeners
- Path and query string support
