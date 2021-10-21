# Configuration

Below are the configurations for the `Drash.Server` class and examples of how to use each.

## Table of Contents

* [Required](#required)
  * [hostname: string](#hostname-string)
  * [port: number](#port-number)
  * [protocol: "http" | "https"](#protocol-http--https)
  * [resources: typeof Drash.Resource[]](#resources-typeof-drashresource)
* [Optional](#required)
  * [cert_file?: string](#certfile-string)
  * [key_file?: string](#keyfile-string)
  * [services?: Drash.Service[]](#services-drashservice)

## Required

Below are the required configurations. You cannot create a Drash server without these.

### hostname: string

* This is the server's domain.
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    hostname: "0.0.0.0", // <--- See here
    port: 1447,
    protocol: "http",
    resources: [ ... ]
  });
  ```

### port: number

* This is the server's port.
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,  // <--- See here
    protocol: "http",
    resources: [ ... ]
  });
  ```

### protocol: "http" | "https"

* This is the server's protocol. If this is set to `https`, then `cert_file` and `key_file` must also be used when instantiating the `server` object.
* Example Usage (if using `http`)

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http", // <--- See here (also notice cert_file and key_file are not present)
    resources: [ ... ]
  });
  ```

* Example Usage (if using `https`)

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt", // <--- Required if using protocol is "https"
    hostname: "0.0.0.0",
    key_file: "/path/to/cert/file.key", // <--- Required if using protocol is "https"
    port: 1447,
    protocol: "https", // <--- See here (also notice cert_file and key_file are present)
    resources: [ ... ]
  });
  ```

### resources: typeof Drash.Resource[]

* This is the array of resources that the server will register so clients can target them. You can learn more about resources in the left sidebar under [Tutorials > Resources > Creating a Resource](/drash/v2.x/tutorials/resources/creating-a-resource).
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  class MyResource extends Drash.Resource {
    ...
    ...
    ...
  }

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http",
    resources: [
      MyResource, // <--- See here
    ],
  });
  ```

## Optional

Below are the optional configurations. Drash servers can be created without these unless your `protocol` config is set to `https`. If your `protocol` config is set to `https`, then `cert_file` and `key_file` are required.

### cert_file?: string

* This config is only required when the `protocol` config is set to `https`.
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt", // <--- See here (also notice key_file is present and protocol is "https")
    hostname: "0.0.0.0",
    key_file: "/path/to/cert/file.key",
    port: 1447,
    protocol: "https",
    resources: [ ... ]
  });
  ```
### key_file?: string

* This config is only required when the `protocol` config is set to `https`.
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  const server = new Drash.Server({
    cert_file: "/path/to/cert/file.crt",
    hostname: "0.0.0.0",
    key_file: "/path/to/cert/file.key", // <--- See here (also notice cert_file is present and protocol is "https")
    port: 1447,
    protocol: "https",
    resources: [ ... ]
  });
  ```

### services?: Drash.Service

* This is the array of instantiated services that the server will use throughout the request-resource-response lifecycle. You can learn more about services in the left sidebar under [Tutorials > Services > Introduction](/drash/v2.x/tutorials/services/introduction).
* Example Usage

  ```typescript
  import * as Drash from "./deps.ts";

  class MyService extends Drash.Service {
    ...
    ...
    ...
  }

  const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http",
    resources: [ ... ]
    services: [
      new MyService(), // <--- See here (all services must be instantiated using the `new` keyword before being placed in this array)
    ],
  });
  ```

