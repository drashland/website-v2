# Creating a Client

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

As with any websocket server, clients will connect to it. You may have seen in
our documentation that we use a `WebSocketClient` class as our client, but it
isn't the only way!

You are free to use the native `Websocket` to connect to your server, it will
still work! But we do recommend using our `WebSocketClient` class, which is a
basic wrapper around the native `Websocket` class (and extends it too). This is
so it is simpler for you, to send messages and listen on messages. The
`WbeSocketClient` only does 3 more things:

1. Exposes a `.on()` method. This allows a simple way for you to listen on
   channels.
2. Exposes a `.to()` method. This allows a simple way for you to send to
   channels.
3. Registers the `.onmessage` listener, parses the message according to how
   Wocket sends messages to clients, and calls the appropriate `.on` handler,
   based on the channel name

Because wocket uses channels, it needs to know where a message is going, so it
isn't as simple as `client.send("Where does this message go?"), but it isn't
impossible.

In this tutorial, you will:

- Create a client using native websockets, and send messages and listen on
  messages; and
- Create a client using `WebSocketClient`.

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
   });
   server.run();
   server.on("hello", (e) => {
     server.to("hello", {
       message: "hi :)",
     });
   });

   // Native websocket approach
   const client1 = new WebSocket(server.address);
   client1.onmessage = (e) => {
     const packet = JSON.parse(e.data);
     const { channel, message: { message } } = packet;
     if (channel === "hello") {
       console.log("Client got a message from hello!", message);
     }
   };
   client1.onopen = () => {
     client1.send(JSON.stringify({
       channel: "hello",
       message: "hello!",
     }));
   };

   // WebSocketClient
   const client = new WebSocketClient(server.address);
   client.on("hello", (e) => {
     console.log("Client got a message from hello!", e.message);
   });
   client.onopen = () => {
     client.to("hello", "hello!");
   };
   ```

Here you are going to create your websocket server on the address
`ws://localhost:1667`, and connect two clients to it, with varying
implementations.

Every you need to do when using the native websocket class, `WebSocketClient`
does for you, that is what we mean when we say we made it to make creating and
using a client, more friendly and easier to work with.

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-net=localhost:1667 app.ts
   ```

2. You should see the following output:

   ```shell
   Client 2 got a message from hello! hi :)
   Client 1 got a message from hello! hi :)
   Client 2 got a message from hello! hi :)
   Client 1 got a message from hello! hi :)
   ```

The reason you see four messages and not 2, is because you have 2 cients sending a message to the same channel. Your channel listener will send a message to **all** clients connected to that channel, so the channel gets a messsage, and sends it to both of your clients (even the 'initiator'). Then it will get a second message from the other client, and will proceed to send the message to both clients again, hence 4 log statements.
