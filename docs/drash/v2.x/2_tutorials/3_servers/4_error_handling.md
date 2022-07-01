# Error Handling

This page goes over the default error handling behavior and how to customize it.
Customizing the default behavior was introduced in v2.4.0. Please make sure you
are using v2.4.0 (or higher) before proceeding with this tutorial.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Further Reading](#further-reading)
  - [Throwing Errors in Resources](#throwing-errors-in-resources)
  - [Throwing Errors in Services](#throwing-errors-in-services)
  - [Extending Drash.ErrorHandler](#extending-drash-errorhandler)
  - [Implementing Drash.Interfaces.IErrorHandler](#implementing-drash-interfaces-ierrorhandler)

## Before You Get Started

### Default Behavior

Under the hood (in `Drash.Server`), Drash uses its `Drash.ErrorHandler` class'
`catch()` method to handle all errors thrown during the
request-resource-response lifecycle. When `Drash.ErrorHandler.catch()` receives
errors, it returns an error response with a proper HTTP error status code.
However, it also returns the stack trace and this behavior might not fit well
with your application's requirements. For example, it will return something like
the following for request methods that are not allowed:

```text
Error: Method Not Allowed
    at Server.<anonymous> (https://deno.land/x/drash/src/http/server.ts:238:17)
    at async Server.#respond (https://deno.land/std/http/server.ts:298:18)
```

### Customizing the Default Behavior

You may want to customize the default behavior so that clients do not see a
stack trace. For example, you may want to return the following response and log
the stack trace instead.

```json
{
  "message": "HTTP method `POST` is not allowed on this resource."
}
```

Customizing the default behavior is a very simple process. All you need to do is
plug in a custom error handler class to the `error_handler` server config (as
shown in the Steps section on this page).

Things to note:

- You can create an extended error handler class by using
  `... extends Drash.ErrorHandler`. The Steps section below will use this
  method. You can also learn more about this method in the
  [Extending Drash.ErrorHandler](#extending-drash-errorhandler) section on this
  page.
- You can create a fully customized error handler class using
  `... implements Drash.Interfaces.IErrorHandler`. You can learn more about this
  method in the
  [Implementing Drash.Interfaces.IErrorHandler](#implementing-drash-interfaces-ierrorhandler)
  section on this page.
- When creating an error handler class, it must implement the `catch()` method
  defined by `Drash.Interfaces.IErrorHandler`. The `.catch()` method is called
  in `Drash.Server` so _**it is required**_. For example:

  ```typescript
  // Example of extending Drash.ErrorHandler
  class MyErrorHandler extends Drash.ErrorHandler {
    public catch(
      error: Error,
      request: Request,
      response: Drash.Response,
      connInfo: ConnInfo,
    ): void {
      // ... rest of implementation goes here
    }
  }

  // Example of implementing Drash.Interfaces.IErrorHandler
  class MyErrorHandler implements Drash.Interfaces.IErrorHandler {
    public catch(
      error: Error,
      request: Request,
      response: Drash.Response,
      connInfo: ConnInfo,
    ): void {
      // ... rest of implementation goes here
    }
  }
  ```
  Notice the following:
  - The `error` parameter expects an `Error` object or an extension of one.
  - The `request` parameter expects a native `Request` object or an extension of
    one.
  - The `response` parameter expects Drash's `Response` object or an extension
    of one.
  - The `connInfo` parameter is the connection info of the current request. See
    [the documentation page for this in Deno](https://doc.deno.land/https://deno.land/std/http/mod.ts/~/ConnInfo).
    This parameter is optional should you wish to omit it if you are not
    planning to use it.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

_Note: The steps shown below will make use of the `Drash.ErrorHandler` class by
using `... extends Drash.ErrorHandler`._

1. Create your `app.ts` file.

   ```typescript
   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.json({
         hello: "world",
       });
     }
   }

   // Create your error handler to send JSON responses instead of Drash sending
   // an error with a stack trace

   class MyErrorHandler extends Drash.ErrorHandler {
     public catch(
       error: Error,
       request: Request,
       response: Drash.Response,
     ): void {
       // Handle all built-in Drash errors. This means any error that Drash
       // throws internally will be handled in this block. This also means any
       // resource that throws Drash.Errors.HttpError will be handled here.
       if (error instanceof Drash.Errors.HttpError) {
         response.status = error.code;
         return response.json({
           message: error.message,
         });
       }

       // If the error is not of type Drash.Errors.HttpError, then default to a
       // HTTP 500 error response. This is useful if you cannot ensure that
       // third-party dependencies (e.g., some database dependency) will throw
       // an error object that can be converted to an HTTP response.
       response.status = 500;
       return response.json({
         message: "Server failed to process the request.",
       });
     }
   }

   // Create and run your server

   const server = new Drash.Server({
     error_handler: MyErrorHandler,
     hostname: "localhost",
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

3. Make a request to a URI that does not exist (e.g., `/hello`).

   ```text
   $ curl http://localhost:1447/hello
   ```

   You should receive the following response:

   ```text
   {"message":"Not Found"}
   ```

4. To see the default behavior, comment out the `error_handler` config.

   ```diff-typescript
        const server = new Drash.Server({
   -     error_handler: MyErrorHandler,
   + //  error_handler: MyErrorHandler,
         hostname: "localhost",
         port: 1447,
         protocol: "http",
         resources: [
           HomeResource,
         ],
        });
   ```

5. Now make a `GET` request to `/hello` again.

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

### Throwing Errors in Resources

The above tutorial exercises catching `Drash.Errors.HttpError` objects and
transforming them to a specific response schema. What if you wanted to throw
your own errors in your resources though?

For example, what if you had a `BadRequestError` class that you wanted to throw
in your resource and catch it in your error handler? Again, the process is
simple. Just make your resource throw that error and handle the error in your
error handler class like so:

```typescript
// app.ts

import { Drash } from "./deps.ts";

// Create your custom error. This MUST be an extension of Error.

class BadRequestError extends Error {
  // It is a good idea to associate the HTTP status code in your custom error
  // so you can retrieve it as `error.code` in your error handler class
  public code = 400;

  constructor(message?: string) {
    // Use the message provided or default to a generic error message
    super(message ?? "Invalid request params received.");
  }
}

// Create your resource and have it throw your custom BadRequestError

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    const name = request.queryParam("name");

    // If the `?name={value}` is not provided, then throw a bad request error
    if (!name) {
      throw new BadRequestError();
    }

    return response.json({
      message: `Hello, ${name}!`,
    });
  }
}

// Create your error handler to send JSON responses

class MyErrorHandler extends Drash.ErrorHandler {
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
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

#### Verification

Taking the above code (assuming it is written in an `app.ts` file), we can
verify that it handles errors as expected:

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

   As you can see, the response status code is `400` and the response body is:

   ```text
   {"message":"Invalid request params received."}
   ```

3. Now make a valid request to `http://localhost:1447?name=Thor`.

   ```text
   $ curl -v http://localhost:1447?name=Thor
   ```

   You should receive a response similar to the following:

   ```text
   > GET /?name=Thor HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 200 OK
   < content-type: application/json
   < content-length: 26
   < date: Sun, 09 Jan 2022 16:57:32 GMT
   <
   * Connection #0 to host localhost left intact
   {"message":"Hello, Thor!"}* Closing connection 0
   ```

   As you can see, the response status code is `200` and the response body is:

   ```text
   {"message":"Hello, Thor!"}
   ```

### Throwing Errors in Services

Just like in resources, you can throw errors in services and handle them in your
error handler.

For example, what if you had a `BadRequestBodyError` class that you wanted to
throw in a `RequestBodyValidationService` to accommodate your request validation
process? No problem! Just make your service throw that error and handle the
error in your error handler class like so:

```typescript
// app.ts

import { Drash } from "./deps.ts";

// Create your custom error. This MUST be an extension of Error.

class BadRequestBodyError extends Error {
  // It is a good idea to associate the HTTP status code in your custom error
  // so you can retrieve it as `error.code` in your error handler class
  public code = 400;

  constructor(message?: string) {
    // Use the message provided or default to a generic error message
    super(message ?? "Missing required body params.");
  }
}

// Create your service that handles request body validation on POST requests

class RequestBodyValidationService extends Drash.Service {
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response,
  ): void {
    if (
      request.method === "POST" &&
      !request.bodyParam("params")
    ) {
      throw new BadRequestBodyError("Body field `params` is required.");
    }
  }
}

// Create your resource

class UsersResource extends Drash.Resource {
  public paths = ["/users"];

  public POST(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      message: `You made it to the UsersResource!`,
    });
  }
}

// Create your error handler to send JSON responses

class MyErrorHandler extends Drash.ErrorHandler {
  public catch(error: Error, request: Request, response: Drash.Response) {
    // Handle all built-in Drash errors
    if (error instanceof Drash.Errors.HttpError) {
      response.status = error.code;
      return response.json({
        message: error.message,
      });
    }

    // Handle your custom error that you can throw in resources and catch here
    if (error instanceof BadRequestBodyError) {
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
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [
    UsersResource,
  ],
  services: [
    new RequestBodyValidationService(),
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

#### Verification

Taking the above code (assuming it is written in an `app.ts` file), we can
verify that it handles errors as expected:

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Using `curl -v` (or similar command), make a `POST` request to
   `http://localhost:1447/users`.

   ```text
   $ curl -X POST -v http://localhost:1447/users
   ```

   You should receive a response similar to the following:

   ```text
   > POST /users HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   >
   < HTTP/1.1 400 Bad Request
   < content-type: application/json
   < content-length: 46
   < date: Mon, 10 Jan 2022 01:23:00 GMT
   <
   * Connection #0 to host localhost left intact
   {"message":"Body field `params` is required."}* Closing connection 0
   ```

   As you can see, the response status code is `400` and the response body is:

   ```text
   {"message":"Body field `params` is required."}
   ```

3. Now make a valid request to `http://localhost:1447/users`.

   ```text
   $ curl -X POST -v -H "Content-Type: application/json" -d '{"params":"hello"}' localhost:1447/users
   ```

   You should receive a response similar to the following:

   ```text
   > POST /users HTTP/1.1
   > Host: localhost:1447
   > User-Agent: curl/7.64.1
   > Accept: */*
   > Content-Type: application/json
   > Content-Length: 18
   >
   * upload completely sent off: 18 out of 18 bytes
   < HTTP/1.1 200 OK
   < content-type: application/json
   < content-length: 47
   < date: Mon, 10 Jan 2022 01:24:55 GMT
   <
   * Connection #0 to host localhost left intact
   {"message":"You made it to the UsersResource!"}* Closing connection 0
   ```

   As you can see, the response status code is `200` and the response body is:

   ```text
   {"message":"You made it to the UsersResource!"}
   ```

### Extending Drash.ErrorHandler

Creating an error handler class can be done easily by extending
`Drash.ErrorHandler`. For example:

```typescript
import { Drash } from "./deps.ts";

class MyErrorHandler extends Drash.ErrorHandler {
  public catch(
    error: Error,
    request: Request,
    response: Drash.Response,
  ): void {
    // Handle all built-in Drash errors. This means any error that Drash
    // throws internally will be handled in this block. This also means any
    // resource that throws Drash.Errors.HttpError will be handled here.
    if (error instanceof Drash.Errors.HttpError) {
      response.status = error.code;
      return response.json({
        message: error.message,
      });
    }

    // If the error is not of type Drash.Errors.HttpError, then default to a
    // HTTP 500 error response. This is useful if you cannot ensure that
    // third-party dependencies (e.g., some database dependency) will throw
    // an error object that can be converted to an HTTP response.
    response.status = 500;
    return response.json({
      message: "Server failed to process the request.",
    });
  }
}
```

Key benefits to this method:

- Since `MyErrorHandler` above is an extension of `Drash.ErrorHandler`, you have
  the option to use `override` if your application/development processes require
  it. For example:
  ```typescript
  import { Drash } from "./deps.ts";

  class MyErrorHandler extends Drash.ErrorHandler {
    public override catch( // <--- See override keyword here
      error: Error,
      request: Request,
      response: Drash.Response,
    ): void {
      // ... rest of implementation goes here
    }
  }
  ```
- Since `MyErrorHandler` above is an extension of `Drash.ErrorHandler`, you have
  the option to use `super.catch()` if your error handling processes require it.
  For example:

  ```typescript
  class MyErrorHandler extends Drash.ErrorHandler {
    public catch(
      error: Error,
      request: Request,
      response: Drash.Response,
    ): void {
      // Any error that should return a stack trace is handled here. Since
      // Drash's default error handler returns a stack trace, just use its
      // implementation.
      if (error instanceof SomeErrorThatShouldReturnStackTraces) {
        return super.catch(error, request, response);
      }

      // Handle all other errors and return a JSON response -- not a stack
      // trace like the above
      return response.json({
        message: "Some fantastic error message for clients.",
      });
    }
  }
  ```

### Implementing Drash.Interfaces.IErrorHandler

If you want to create an error handler that is not an extension of
`Drash.ErrorHandler`, simply use the `Drash.Interfaces.IErrorHandler` interface.
For example:

```typescript
import { Drash } from "./deps.ts";

class MyErrorHandler implements Drash.Interfaces.IErrorHandler {
  public catch(
    error: Error,
    request: Request,
    response: Drash.Response,
  ): void {
    // Handle all built-in Drash errors. This means any error that Drash
    // throws internally will be handled in this block. This also means any
    // resource that throws Drash.Errors.HttpError will be handled here.
    if (error instanceof Drash.Errors.HttpError) {
      response.status = error.code;
      return response.json({
        message: error.message,
      });
    }

    // If the error is not of type Drash.Errors.HttpError, then default to a
    // HTTP 500 error response. This is useful if you cannot ensure that
    // third-party dependencies (e.g., some database dependency) will throw
    // an error object that can be converted to an HTTP response.
    response.status = 500;
    return response.json({
      message: "Server failed to process the request.",
    });
  }
}
```

Key benefit to this method:

- You have full control over your error handling.
