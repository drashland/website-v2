# Creating Channels and Handling Events

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Wocket defines something called a "channel". This just means that clients send messages to the server via a channel, and vice versa. Here's an example to help:

   ```ts
   server.on("get user list", e => {})

   client.to("get user list", e => {})
   ```

The server has 'opened a channel' "get user list", by creating a listener for it. You do this by calling the `.on` method on the `Server`. So whenever a client sends to the channel "get user list", the above handler will handle this message.

Wockets listeners take an event emitter approach. You define a channel to listen on, and a callback, which will be called when a client sends to that channel. The callback is passed a single parameter, you can name it what you want, but it is of type `CustomEvent`, a native `Event` class. This variable will hold information about the request such as the message sent by the client, the **id** of the client, and more. Whenever a client connects, they are assigned an ID, so whenyour listener gets a message, you will know which client it was from.

Wocket also supports generics for the `.on()` method, which allows you to tell TypeScript what data you're expecting to receive:

   ```ts
   server.on<{ usernames: string[] }>("save-users", e => {
     // Note that you access the data via `e.detail`
     console.log(e.detail.id) // Id of the client
     console.log(e.detail.packet.usernames); // Intellisense will help you here. ["john", "jane"]
   })

   client.to(|"save-users", {
     usernames: ["john", "jane"]
   });
   ```

And finally, Wocket's reserved events:

- `connect`
- `disconnect`

You can create listeners for these events. This is when a client first connects, and disconnects, respectively. There is also no need for generics for these two events, we do that all for you! The `connect` event will hold the clients id (as usual), and the `disconnect` event will hold the code and reason for the disconnection:

   ```ts
   server.on("connect", e => {
     console.log(e.detail.id) // intellisense helps you here
   })
   server.on("disconnect", e => {
     console.log(e.detail.id, e.detail.code, e.detail.reason) // intellisense helps you here
   })
   ```


In this tutorial, you will:

- Create a websocket server using Wocket;
- Listen on the reserved events;
- Register your own channels and listeners;
- Send messages from a client.

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
   server.run()
   server.on("connect", e => {
     console.log('A client has connected!', e.detail.id);
   })
   server.on("disconnect", e => {
     console.log("A client has disconnected!", e.detail.id, e.detail.code, e.detail.reason)l
   })
   const users = [
     {
       name: "John",
       age: 44,
       location: "UK",
     },
     {
       name: "Jane",
       age: 44,
       location: "US",
     }
   ]
   type Users = "John" | "Jane";
   server.on<Users>("get-user-from-list", e => {
     const userToGet = e.detail.packet
     server.to("get-user-from-list", users.find(user => user.name === userToGet));
   })


   const client = new WebSocketClient(server.address);
   client.on("get-user-from-list", e => {
     console.log("Client got get-user-from-list!", e.data)
     client.close()
   })
   client.onopen = () => {
     client.to("get-user-from-list", "Jane");
   }
   ```

Here you are going to create your websocket server on the address `ws://localhost:1667`, and create a new channel called "get-user-from-list". You wil also have listened on the reserved events. You will then create a client to connect to your server, and send a message to your server, that will return a user object. The server will then send a message back, the client will log it and will then close, triggering the "disconnect" event.

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-net=localhost:1667 app.ts
   ```

2. You should see the following output:

   ```shell
   A client has connected! 1
   Client got get-user-from-list! { name: "Jane", age: 54, location: "US" }
   A client has disconnect! 1 1005 ""
   ```
