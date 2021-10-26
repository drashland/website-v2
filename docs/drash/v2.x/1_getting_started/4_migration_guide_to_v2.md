# Migration Guide to v2

Below are sections pertaining to parts of Drash that have changed. There are example code blocks highlighted similarly to Git diffs. The `-` red lines are what was removed and the `+` green lines are what was added. The `+` green lines are what your Drash application should be using if migrating from v1 to v2.

## Table of Contents

* [Drash Namespace](#drash-namespace)
* [Resources](#resources)
* [Middleware](#middleware)
  * [Importing](#importing)
  * [Resource-Level](#resource-level)
* [Example Application](#example-application)
  * [Code](#code)
  * [Running the Application](#running-the-application)

## Drash Namespace

Changes:

* `Drash` is not the only exported member.

  ```diff
  - import { Drash } from "...";
  + import * as Drash from "...";
  ```

* You can `import` parts of the `Drash` namespace like so:

  ```typescript
  import {
    Resource,
    Request,
    Response,
    ... other members
  } from "...";
  ```

## Resources

Changes:

* `Http` namespace has been removed.

  ```diff
  - class MyResource extends Drash.Http.Resource {
  + class MyResource extends Drash.Resource {
  ```

* `paths` property is now `public`.

  ```diff
  - static paths = ["/:some_param"];
  + public paths = ["/:some_param"];
  ```

* HTTP methods now require `request` and `response` parameters; and `this.request` and `this.response` are no longer available. This change goes against Drash's original philosophy that `this.request` and `this.response` should be readily available, but having `this` in resources seemed to be too "magical," and it was decided to have them removed and turned into required parameters.

  ```diff
  - public GET(): Drash.Response {
  + public GET(request: Drash.Request, response: Drash.Response): void {
  ```

  Also, with the above change, HTTP methods do not return a `response` object. They now return `void`.

* Methods to get parameters off the `request` object have changed.

  ```diff
    // Get path params from the URI
  - const pathParam = this.request.getPathParam("some_param");
  + const pathParam = request.pathParam("some_param");

    // Getting body params (works for form-urlencoded and JSON)
  - const bodyParam = this.request.getBodyParam("something")
  + const bodyParam = request.bodyParam<T>("something"); // T should match the type of the request's body

    // Getting files using multipart/form-data
  - const bodyFile = this.request.getBodyFile("file_name");
  + const bodyFile = request.bodyParam<BodyFile[]>("file_name");

    // Getting URL query params
  - const queryParam = this.request.getUrlQueryParam("some_param");
  + const queryParam = request.queryParam("some_param");
  ```

* `this.response.body` and `return this.response` can no longer be used. To set a body on the `response` object, you can call one of the `response` object's body methods to set the response body and `return` on the same line. You can learn more about the `response` object's body methods at [Tutorials > Responses > Setting the Body](/drash/v2.x/tutorials/responses/setting-the-body). The `response` object's body methods return `void`.

  ```diff
  - this.response.body = "Hello, world!";
  - return this.response;
  + return response.text("Hello, world!");
    // or return response.json( ... );
    // or return response.xml( ... );
    // or return response.html( ... );
    // or return response.file( ... );
    // or return response.download( ... );
    // or return response.render( ... );
    // or return response.send<T>("some-content-type, body); // T should match the body's type
  ```

## Middleware

Drash v2 uses the term "services" to encapsulate any software used in a Drash application that is not part of Drash's core functionality. This includes middleware. In Drash v1, the term "middleware" is used. During the course of v1 maintenance, it was found that the term "middleware" was restrictive about what kind of software could be plugged into a Drash application. Therefore, the term was changed to "services" to create a broader scope.

When using services, there are quite a few differences:

* `import` statements have changed
* Decorators have been removed from resource-level services and a `tsconfig.json` file is not required
* All services must follow the new `Drash.Service` syntax (see [Tutorials > Services > Creating Services](/drash/v2.x/tutorials/services/creating-services))

You can learn more about using Drash services in the left sidebar under Tutorials > Services.

### Importing
 
In v1, you use the `deno-drash-middleware` repository to import middleware. In v2, you use the `deno-drash` repository's `services.ts` file like so:

```diff
- import SomeMiddleware from "http://deno.land/x/deno-drash-middleware/some_middleware/mod.ts";
+ import { SomeMiddleware } from "http://deno.land/x/drash/services.ts";
```

### Resource-Level

Resource-level middleware in Drash v1 requires a `tsconfig.json` file with `experimentalDecorators` set to `true`. In Drash v2, decorators were removed so you do not need a `tsconfig.json` file (unless you use one for something other than Drash).

```diff
  // tsconfig.json

- {
-   "compilerOptions": {
-     "experimentalDecorators": true
-   }
- }
```

To use a service in your resource, change to the following:

```diff
  // some_resource.ts

- @Drash.Http.Middleware({
-   before_request: [ SomethingA ],
-   after_request: [ SomethingB ],
- })
- export default class SomeResource extends Drash.Http.Resource {
+ export default class SomeResource extends Drash.Resource {

    // All services that used to be in decorators now go into this property
    // To learn more about this property, view Tutorials > Services > Resource-Level Services
+   public services = {
+     ALL: [
+       SomethingA,
+       SomethingB,
+     ],
+     GET: [
+       SomethingC,
+       SomethingD,
+     ],
+   };

-   @Drash.Http.Middleware({
-     before_request: [ SomethingC ],
-     after_request: [ SomethingD ],
-   })
    public GET() {
      ...
      ...
      ...
    }
  }
```

If you have any custom middleware that you have plugged into your Drash application, they must be converted to the new `Drash.Services` syntax. To learn more about creating services, read [Tutorials > Services > Creating Services](/drash/v2.x/tutorials/services/creating-services).

To learn more about resource-level services, see [Tutorials > Services > Adding Resource-Level Services](/drash/v2.x/tutorials/services/adding-resource-level-services).

## Example Application

### Code

The below example application contains the following:

* A resource (`HomeResource`) that handles `GET` and `POST` requests
* A resource (`ServicesResource`) that handles `GET` and `POST` requests
  * This resource has a service that executes on all requests
  * This resource also has a service that executes only on `POST` requests
* A server with a service that executes on all requests

```typescript
// app.ts


// Replace `<VERSION>` with the Drash v2.x version you want to use.
// All versions can be found at https://github.com/drashland/drash/releases?q=v2&expanded=trueh.
import * as Drash from "http://deno.land/x/drash@<VERSION>/mod.ts";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - SERVICES //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Create the services below so that they can be used at the server level, the
// the resource level, and specifically on a resource HTTP method.
//

/**
 * A service to use at the server level. It will run before and after all HTTP
 * methods on every request to any resource. This will be plugged into the
 * server at server instantiation.
 */
class ServerService extends Drash.Service {
  /**
   * Run this service before the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    response.headers.set("SERVER-SERVICE", "hello");
  }

  /**
   * Run this service after the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runAfterResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    const originalValue = response.headers.get("SERVER-SERVICE");
    if (originalValue) {
      response.headers.set("SERVER-SERVICE", originalValue + " | goodbye");
    }
  }
}

/**
 * A service to use in ServicesResource. This service will run before and after
 * all HTTP methods on every request to ServicesResource. This will be plugged
 * into the ServicesResource's services.ALL property.
 */
class ServicesResourceAllRequestsService extends Drash.Service {
  /**
   * Run this service before the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    response.headers.set("RESOURCE-SERVICE", "bonjour");
  }

  /**
   * Run this service after the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runAfterResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    const originalValue = response.headers.get("RESOURCE-SERVICE");
    if (originalValue) {
      response.headers.set("RESOURCE-SERVICE", originalValue + " | au revoir");
    }
  }
}

/**
 * A service to use in ServicesResource. This service will only run before and
 * after the POST HTTP method on every POST request to ServicesResource. This
 * will be plugged into the ServicesResource's services.POST` property.
 */
class ServicesResourcePostRequestsService extends Drash.Service {
  /**
   * Run this service before the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    response.headers.set("RESOURCE-SERVICE-POST", "hola");
  }

  /**
   * Run this service after the resource's HTTP method is run.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public runAfterResource(
    request: Drash.Request,
    response: Drash.Response
  ): void {
    const originalValue = response.headers.get("RESOURCE-SERVICE-POST");
    if (originalValue) {
      response.headers.set("RESOURCE-SERVICE-POST", originalValue + " | adios");
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - RESOURCES /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Create the resources below so the server can handle requests at the following
// paths:
//
//     - /
//     - /services
//

/**
 * A basic resource. This resource only handles GET and POST requests. You can
 * add more HTTP methods if you'd like. For example:
 *
 *     public PUT(request: Drash.Request, response: Drash.Response): void {}
 *     public DELETE(request: Drash.Request, response: Drash.Response): void {}
 *     public PATCH(request: Drash.Request, response: Drash.Response): void {}
 *     ... and so on
 */
class HomeResource extends Drash.Resource {

  public paths = ["/"];

  /**
   * Handle GET requests at /.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      hello: "world (HomeResource - GET)",
      time: new Date(),
    });
  }

  /**
   * Handle POST requests at /.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public POST(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      hello: "world (HomeResource - POST)",
      time: new Date(),
    });
  }
}

/**
 * An extra resource. This resource uses services and only handles GET and POST
 * requests. You can add more HTTP methods if you'd like. For example:
 *
 *     public PUT(request: Drash.Request, response: Drash.Response): void {}
 *     public DELETE(request: Drash.Request, response: Drash.Response): void {}
 *     public PATCH(request: Drash.Request, response: Drash.Response): void {}
 *     ... and so on
 *
 * It has a `services` property to let it know what services to run and when to
 * run them.
 */
class ServicesResource extends Drash.Resource {

  public paths = ["/services"];

  public services = {
    // Run the below service on all requests
    ALL: [ new ServicesResourceAllRequestsService() ],
    // Run the below service on POST requests
    POST: [ new ServicesResourcePostRequestsService() ],
  };

  /**
   * Handle GET requests at /services.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      hello: "world (ServicesResource - GET)",
      time: new Date(),
    });
  }

  /**
   * Handle POST requests at /services.
   *
   * @param request - The request object.
   * @param response - The response object.
   */
  public POST(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      hello: "world (ServicesResource - POST)",
      time: new Date(),
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - SERVER INSTANTIATION //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Create and run the server. Also, output to the console when the server runs
// and what address it is using.
//

const server = new Drash.Server({
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources: [
    HomeResource,
    ServicesResource,
  ],
  services: [
    new ServerService(),
  ]
});

server.run();

console.log(`Server running at ${server.address}.`);

```

### Running the Application

If you run this application, the following requests will result in the following responses:

* `$ curl -v http://localhost:1447` will result in the following response:

  ```text
  *   Trying ::1...
  * TCP_NODELAY set
  * Connection failed
  * connect to ::1 port 1447 failed: Connection refused
  *   Trying 127.0.0.1...
  * TCP_NODELAY set
  * Connected to localhost (127.0.0.1) port 1447 (#0)
  > GET / HTTP/1.1
  > Host: localhost:1447
  > User-Agent: curl/7.64.1
  > Accept: */*
  >
  < HTTP/1.1 200 OK
  < content-type: application/json
  < server-service: hello | goodbye <---------- Added by ServerService class
  < content-length: 72
  < date: Sun, 17 Oct 2021 20:20:16 GMT
  <
  * Connection #0 to host localhost left intact
  {"hello":"world (HomeResource - GET)","time":"2021-10-17T20:20:16.557Z"}* Closing connection 0
  ```

* `$ curl -v http://localhost:1447/services` will result in the following response:

  ```text
  *   Trying ::1...
  * TCP_NODELAY set
  * Connection failed
  * connect to ::1 port 1447 failed: Connection refused
  *   Trying 127.0.0.1...
  * TCP_NODELAY set
  * Connected to localhost (127.0.0.1) port 1447 (#0)
  > GET /services HTTP/1.1
  > Host: localhost:1447
  > User-Agent: curl/7.64.1
  > Accept: */*
  >
  < HTTP/1.1 200 OK
  < content-type: application/json
  < resource-service: bonjour | au revoir <---- Added by ServicesResourceAllRequestsService class
  < server-service: hello | goodbye <---------- Added by ServerService class
  < content-length: 76
  < date: Sun, 17 Oct 2021 20:21:42 GMT
  <
  * Connection #0 to host localhost left intact
  {"hello":"world (ServicesResource - GET)","time":"2021-10-17T20:21:42.012Z"}* Closing connection 0
  ```

* `$ curl -X POST -v http://localhost:1447/services` will result in the following response:

  ```text
  *   Trying ::1...
  * TCP_NODELAY set
  * Connection failed
  * connect to ::1 port 1447 failed: Connection refused
  *   Trying 127.0.0.1...
  * TCP_NODELAY set
  * Connected to localhost (127.0.0.1) port 1447 (#0)
  > POST /services HTTP/1.1
  > Host: localhost:1447
  > User-Agent: curl/7.64.1
  > Accept: */*
  >
  < HTTP/1.1 200 OK
  < content-type: application/json
  < resource-service: bonjour | au revoir <---- Added by ServicesResourceAllRequestsService class
  < resource-service-post: hola | adios <------ Added by ServicesResourcePostRequestsService class
  < server-service: hello | goodbye <---------- Added by ServerService class
  < content-length: 77
  < date: Sun, 17 Oct 2021 20:23:07 GMT
  <
  * Connection #0 to host localhost left intact
  {"hello":"world (ServicesResource - POST)","time":"2021-10-17T20:23:07.243Z"}* Closing connection 0
  ```
