# Error Handling

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Further Reading](#further-reading)

## Before You Get Started

### Default Behavior

Under the hood (in `Drash.Server`), Drash uses its default `Drash.ErrorHandler` class to handle all errors thrown during the request-resource-response lifecycle. When the error handler catches errors, it returns an error response with a proper HTTP error status code. However, it also returns the stack trace and this behavior might not fit well with your application's requirements. For example, it will return something like the following:

```text
Error: Method Not Allowed
    at Server.<anonymous> (https://deno.land/x/drash/src/http/server.ts:238:17)
    at async Server.#respond (https://deno.land/std/http/server.ts:298:18)
```

### Overriding the Default Behavior

You may want to override the default behavior so that clients do not see a stack trace. For example, you can override the default behavior to return an error response like the following:

```json
{
  "message": "HTTP method `POST` is not allowed on this resource."
}
```

Overriding the default behavior is a very simple process. All you need to do is to plug in a custom error handler class to the `error_handler` server config (as shown in the Steps section on this page).

All error handler classes passed into the `error_handler` server config must match the `Drash.Interfaces.IErrorHandler` contract. In other words, make sure your error handler class has the following `catch` method definition:

```typescript
public catch(
   error: Error, // Notice this is Error -- all errors should be an extension of Error
   request: Request, // Notice this is the native Request
   response: Drash.Response // Notice this is the built-in Drash Response
): void { ... }
```

A full example looks like:

```typescript
class MyErrorHandler {
 public catch(error: Error, request: Request, response: Drash.Response) {
    // If a Drash error was thrown (internally or in a resource), then use the
    // error code and message attached to the error -- converting the error
    // object into a JSON response to send to clients
   if (error instanceof Drash.Errors.HttpError) {
     response.status = error.code;
     return response.json({
        message: error.message,
     });
   }

   // Default to 500
   response.status = 500;
   return response.json({
      message: "Server failed to process the request.",
   });
 }
}
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
    public paths = ["/"];

    public GET(request: Drash.Request, response: Drash.Response): void {
      return response.json({
        hello: "world"
      });
    }
   }

   // Create your error handler to send JSON responses

   class MyErrorHandler {
    public catch(error: Error, request: Request, response: Drash.Response) {
      // Handle all built-in Drash errors
      if (error instanceof Drash.Errors.HttpError) {
        response.status = error.code;
        return response.json({
           message: error.message,
        });
      }

      // Default to 500
      response.status = 500;
      return response.json({
         message: "Server failed to process the request.",
      });
    }
   }

   // Create and run your server

   const server = new Drash.Server({
    error_handler: MyErrorHandler,
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

2. Using `curl` (or similar command), make a `GET` request to
   `http://localhost:1447`.

   ```text
   $ curl http://localhost:1447
   ```

   You should receive the following response:

   ```text
   {"hello":"world"}
   ```

3. Make the same request, but add `/hello` to the end of the URL.

   ```text
   $ curl http://localhost:1447/hello
   ```

   You should receive the following response:

   ```text
   {"message":"Not Found"}
   ```

3. To see the default behavior, comment the `error_handler` config.

   ```diff-typescript
        const server = new Drash.Server({
   -     error_handler: MyErrorHandler,
   + //  error_handler: MyErrorHandler,
         hostname: "0.0.0.0",
         port: 1447,
         protocol: "http",
         resources: [
           HomeResource,
         ],
        });
   ```

4. Now make a `GET` request to `/hello` again.

   ```text
   $ curl http://localhost:1447/hello
   ```

   You should see a response similar to the following:

   ```text
   Error: Not Found
       at Server.<anonymous> (https://deno.land/x/drash/src/http/server.ts:238:17)
       at async Server.#respond (https://deno.land/std/http/server.ts:298:18)
   ```

## Further Reading

The above tutorial exercises "catching" Drash errors and transforming them to a specific response. What if you wanted to throw different types of errors in your resources though?

For example, what if you had a `BadRequestError` class that you wanted to throw in your resource and catch in your error handler? Again, the process is simple. Just make your resource throw that error and handle the error in your error handler class like so:

```typescript
// app.ts

import { Drash } from "./deps.ts";

// Create your custom error. This MUST be an extension of Error.

class BadRequestError extends Error {
  public code = 400; // It is a good idea to associate the HTTP status code in your custom error

  constructor(message?: string) {
    super(message ?? "Invalid request params received.");
  }
}

// Create your resource

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    throw new BadRequestError();
  }
}

// Create your error handler to send JSON responses

class MyErrorHandler {
 public catch(error: Error, request: Request, response: Drash.Response) {
   // Handle all built-in Drash errors
   if (error instanceof Drash.Errors.HttpError) {
     response.status = error.code;
     return response.json({
        message: error.message,
     });
   }

   // Handle your custom error that you can throw in resources and catch here
   if (error instanceof BadRequestError) {
     response.status = error.code;
     return response.json({
       message: error.message
     });
   }

   // Default to 500
   response.status = 500;
   return response.json({
      message: "Server failed to process the request.",
   });
 }
}

// Create and run your server

const server = new Drash.Server({
  error_handler: MyErrorHandler,
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

Taking the above code (assuming it is written in an `app.ts` file), we can verify that it handles errors as expected:

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl -v` (or similar command), make a `GET` request to
   `http://localhost:1447`.

   ```text
   $ curl -v http://localhost:1447
   ```

   You should receive a response similar to the following:

   ```text
   > GET / HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 400 Bad Request
   < content-type: application/json
   < content-length: 46
   < date: Sun, 09 Jan 2022 02:23:21 GMT
   <
   * Connection #0 to host localhost left intact
   {"message":"Invalid request params received."}* Closing connection 0
   ```

   As you can see, the request status code is `400` and the response body is:

   ```text
   {"message":"Invalid request params received."}
   ```
