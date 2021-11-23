# Handling WebSocket Connections

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

You can upgrade connections to a WebSocket using the following in a resource:

```typescript
const { socket, response: socketResponse } = Deno.upgradeWebSocket(request);

socket.onopen = () => {
  socket.send("Connected!");
};

socket.onmessage = (e) => {
  console.log(`Message received:`, e.data);
};

socket.onclose = () => {
  console.log("Closed.");
};

socket.onerror = (e) => {
  console.error("WebSocket error:", e);
};

response.upgrade(socketResponse);
```

In this tutorial, you will learn how to create a WebSocket connection using
`Deno.upgradeWebSocket()`.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will check to see if a
   request wants to upgrade to a WebSocket connection.

```typescript
import { Drash } from "./deps.ts";

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    // If all of the requirements to upgrade a connection to a WebSocket are
    // met, then upgrade the connection to a WebSocket
    if (
      request.headers.has("connection") &&
      request.headers.has("upgrade") &&
      request.headers.get("connection")!.toLowerCase() == "upgrade" &&
      request.headers.get("upgrade")!.toLowerCase() == "websocket"
    ) {
      try {
        const {
          socket,
          response: socketResponse,
        } = Deno.upgradeWebSocket(request);

        this.#addEventHandlers(socket);

        return response.upgrade(socketResponse);
      } catch (error) {
        console.log(error);
        return response.text(error);
      }
    }

    // Otherwise, just send a message
    return response.text("Hello!");
  }

  #addEventHandlers(socket: WebSocket): void {
    // When the connection opens, log that it has been opened
    socket.onopen = () => {
      console.log("WebSocket connection opened!");
    };

    // When a message is received from the client, log it and send a message to
    // the client confirming that the message was received
    socket.onmessage = (e: MessageEvent) => {
      console.log(`Message received:`, e.data);
      socket.send(`We received your message! You sent: ${e.data}`);
    };

    // When the connection closes, log that it has been closed
    socket.onclose = () => {
      console.log("Connection closed.");
    };

    // When an error occurs during the connection, log the error
    socket.onerror = (e: Event) => {
      console.log("WebSocket error:", e);
      socket.send(`Woops! We hit a snag: ${e}`);
    };
  }
}

// Create and run your server

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

## Verification

1. Run your app.

```shell
$ deno run --allow-net app.ts
```

2. Open up the Deno REPL using the `deno` command.

```shell
$ deno
```

You should something similar to the following after entering the command:

```text
Deno <your Deno version here>
exit using ctrl+d or close()
>
```

3. Create a WebSocket connection in the Deno REPL.

```shell
> const ws = new WebSocket("ws://localhost:1447");
```

You should see the following after creating the connection:

```text
> const ws = new WebSocket("ws://localhost:1447");
undefined
>
```

4. Check the terminal that you used to run your `app.ts` file. You should see
   the following:

```text
Server running at http://0.0.0.0:1447.
WebSocket connection opened!
```

5. Go back to the terminal where you created your WebSocket connection in the
   Deno REPL.

6. Create an event handler to receive messages from the server.

```text
> ws.onmessage = (e) => console.log(e.data);
```

You should see the following:

```text
> ws.onmessage = (e) => console.log(e.data);
[Function]
>
```

7. Now send a message to the server from the Deno REPL.

```text
> ws.send("Is there anybody out there?!");
```

Since the server has the following code ...

```typescript
socket.onmessage = (e: MessageEvent) => {
  console.log(`Message received:`, e.data);
  socket.send(`We received your message! You sent: ${e.data}`);
};
```

... you should receive the following message back:

```text
> We received your message! You sent: Is there anybody out there?!
```

8. Go to the terminal that you used to run your `app.ts` file. You should see
   the following:

```text
Message received: Is there anybody out there?!
```
