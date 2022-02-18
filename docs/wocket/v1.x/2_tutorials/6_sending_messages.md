# Sending Messages

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

A server is able to send messages to a client, and a client is able to send a
message to a server.

A client sends messages to a "channel". These can be objects or strings.

A server can send a message to a single client, to all clients, or to all but
one client in a channel. These can also be objects or strings. `Server#to()` is
used to send a message to all clients in a channel, or just a specific client in
a channel. Whereas `Server#broadcast()` is used to send a message to all clients
in a channel bar one.

To send a message to a single client:

```ts
server.to("some-channel", "some message", id); // `id` being the id of the client to send to
```

To send a message to all clients in a channel:

```ts
server.to("some-channel", "some-message"); // omit the id
```

To broadcast a message and exclude one client:

```ts
server.broadcast("some-channel", "some-message", id); // Will not send a message to the client with id of `id`
```

To send a message from a client to the server:

```ts
client.to("some-channel", "hello");
client.to("some-channel", {
  project: "wocket",
  tutorial: "sending messages",
});
```

In this tutorial, you will:

- Create a client using native websockets, and send messages and listen on
  messages; and
- Create a client using `WebSocketClient`.
- Create a server which will send messages to clients; and
- Create a client which will send a message to the server.

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

   // A channel where the message is a string, and we want to send to all clients in a channel
   server.on<string>("channel-1", (e) => {
     const message = e.detail.packet; // "hello": string
     server.to("channel-1", message);
   });

   // A channel where the message is an object, and we want to send to all but one client in a channel
   server.on<{ message: string }>("channel-2", (e) => {
     const { message } = e.detail.packet; // string
     // The user wants to send a message to everyone else but themself!
     server.broadcast("channel-1", message, e.detail.id); // Dont send to the sender!
   });

   // A channel where the message is an object, and we want to only send to the initiator
   server.on<{ message: string }>("channel-3", (e) => {
     server.to("channel-3", {
       title: "Secret message just for you. Here is what you sent us!",
       text: e.detail.packet.message,
     }, e.detail.id);
   });

   const client = new WebSocketClient(server.address);
   client.on("channel-1", (e) => {
     // Everyone in channel-1 got the message "hello!"
   });
   client.on("channel-2", (e) => {
     // Everyone else but me got the message :(
   });
   client.on("channel-3", (e) => {
     // Only i got the message >:)
   });
   client.onopen = () => {
     client.to("channel-1", "hello!");
     client.to("channel-2", {
       message: "Hello",
     });
     client.to("channel-3", {
       message: "Hiya!",
     });
   };
   ```

Here you are going to create your websocket server on the address
`ws://localhost:1667`, and connect a single client.

Your server will demonstrate sending a message to a single specific client in a
channel, all clients in a channel, and all but one client in a channel.
