# Configuration

Below are the configurations for the `Drash.Server` class and examples of how to
use each.

## Table of Contents

- [Required](#required)
  - [hostname: string](#hostname-string)
  - [port: number](#port-number)
  - [protocol: "http" | "https"](#protocol-http-https)
  - [resources: typeof Drash.Resource[]](#resources-typeof-drash-resource)
- [Optional](#required)
  - [cert_file?: string](#cert-file-string)
  - [error_handler?: new (...args: any[]) => IErrorHandler](#error-handler-new-args-any-ierrorhandler)
  - [key_file?: string](#key-file-string)
  - [services?: Drash.Service[]](#services-drash-service)

## Required

Below are the required configurations. You cannot create a Drash server without
these.

### hostname: string

- This is the server's domain.
- Example Usage

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    hostname: "localhost", // <--- See here
    port: 1447,
    protocol: "http",
    resources: [ ... ]
  });
  ```

### port: number

- This is the server's port.
- Example Usage

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,  // <--- See here
    protocol: "http",
    resources: [ ... ]
  });
  ```

### protocol: "http" | "https"

- This is the server's protocol. If this is set to `https`, then `cert_file` and
  `key_file` must also be used when instantiating the `server` object.
- Example Usage (if using `http`)

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,
    protocol: "http", // <--- See here (also notice cert_file and key_file are not present)
    resources: [ ... ]
  });
  ```

- Example Usage (if using `https`)

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt", // <--- Required if using protocol is "https"
    hostname: "localhost",
    key_file: "/path/to/cert/file.key", // <--- Required if using protocol is "https"
    port: 1447,
    protocol: "https", // <--- See here (also notice cert_file and key_file are present)
    resources: [ ... ]
  });
  ```

### resources: typeof Drash.Resource[]

- This is the array of resources that the server will register so clients can
  target them. You can learn more about resources in the left sidebar under
  [Tutorials > Resources > Creating a Resource](/drash/v2.x/tutorials/resources/creating-a-resource).
- Example Usage

  ```typescript
  // @Import drash_from_deno

  class MyResource extends Drash.Resource {
    ...
    ...
    ...
  }

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,
    protocol: "http",
    resources: [
      MyResource, // <--- See here
    ],
  });
  ```

## Optional

Below are the optional configurations. Drash servers can be created without
these unless your `protocol` config is set to `https`. If your `protocol` config
is set to `https`, then `cert_file` and `key_file` are required.

### cert_file?: string

- This config is only required when the `protocol` config is set to `https`.
- Example Usage

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt", // <--- See here (also notice key_file is present and protocol is "https")
    hostname: "localhost",
    key_file: "/path/to/cert/file.key",
    port: 1447,
    protocol: "https",
    resources: [ ... ]
  });
  ```

### error_handler?: new (...args: any[]) => IErrorHandler

- This config is useful if you want your server to use a custom implementation
  of error handling instead of it using the default, built-in behavior. To learn
  more about the default behavior and customizing it, read
  [Tutorials > Servers > Error Handling](/drash/v2.x/tutorials/servers/error-handling).
- Example Usage

  ```typescript
  // @Import drash_from_deno

  class MyErrorHandler extends Drash.ErrorHandler {
    public catch(error: Error, _request: Drash.Request, response: Drash.Response) {
      // Default to 500
      let code = 500;
      let message = "Server failed to process the request. Please try again later.";

      // If this was a bad request, then return 400
      if (error instanceof MyCustomBadRequestError) {
        code = 400;
        message = "Invalid request params/body received.";
      }

      // If this was an unauthorized request, then return 401
      if (error instanceof MyCustomUnauthorizedError) {
        code = 401;
        message = "You cannot access this resource.";
      }

      // If an internal Drash error was thrown, use the status code and message
      // attached to the error object
      if (error instanceof Drash.Errors.HttpError) {
        code = error.code;
        message = error.message;
      }

      // ... and so on ...

      // Return the response for Drash to send to the client
      response.status = code;
      return response.json({
        message,
      });

      // The above will result in the following response ...
      //
      //   {
      //     message: "Whatever the message variable was set to.",
      //   }
      //
      // ... and will have the correct status code in the Status Line of the
      // response
    }
  }

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,
    protocol: "http",
    resources: [ ... ]
    error_handler: MyErrorHandler // <--- See here
  });
  ```

### key_file?: string

- This config is only required when the `protocol` config is set to `https`.
- Example Usage

  ```typescript
  // @Import drash_from_deno

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt",
    hostname: "localhost",
    key_file: "/path/to/cert/file.key", // <--- See here (also notice cert_file is present and protocol is "https")
    port: 1447,
    protocol: "https",
    resources: [ ... ]
  });
  ```

### services?: Drash.Service

- This is the array of instantiated services that the server will use throughout
  the request-resource-response lifecycle. You can learn more about services in
  the left sidebar under
  [Tutorials > Services > Introduction](/drash/v2.x/tutorials/services/introduction).
- Example Usage

  ```typescript
  // @Import drash_from_deno

  class MyService extends Drash.Service {
    ...
    ...
    ...
  }

  const server = new Drash.Server({
    hostname: "localhost",
    port: 1447,
    protocol: "http",
    resources: [ ... ]
    services: [
      new MyService(), // <--- See here (all services must be instantiated using the `new` keyword before being placed in this array)
    ],
  });
  ```
