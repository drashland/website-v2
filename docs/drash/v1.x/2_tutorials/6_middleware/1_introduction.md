# Introduction

## Table of Contents

* [Basics](#basics)
* [Middleware Execution Points](#middleware-execution-points)
* [Sorting Middleware](#sorting-middleware)

## Basics

Drash defines middleware according to the MDN [here](https://developer.mozilla.org/en-US/docs/Glossary/Middleware).

Adding middleware to your application is useful when you want to:

* filter requests;
* process/manipulate request data; and/or
* process/manipulate response data.

There are two main types of middleware in Drash:

* server-level
* resource-level

Middleware is executed throughout the request-resource-response lifecycle. Read the [Middleware Execution Points](#middleware-execution-points) section below for more information on middleware execution points. You can also view the [Lifecycle Diagram](/drash/v1.x/getting-started/lifecycle-diagram) for a visual representation of where middleware is executed in the request-resource-response lifecycle.

## Middleware Execution Points

There are four points where middleware can be executed:

* when the server starts (a.k.a. compile time);
* before the request is made;
* after the request is matched to a resource; and
* after the request is made

### Compile Time

Middleware executed at compile time means it is executed when the server is starting up. Compile time middleware is useful if you want to process data at compile time and use that data at runtime — keeping your server's performance up.

### Before the Request

Middleware executed before the request means it is executed before a resource's HTTP method (e.g., `MyResource.GET()`, `MyResource.POST()`, `MyResource.DELETE()`) is called.

### After Request Is Matched To Resource

Middleware executed after a request is matched to a resource means it is executed immediately after the server figures out what resource will handle the request based on its URI.

### After the Request

Middleware executed after the request means it is executed immediately after a resource's HTTP method is called and before a response is sent to the client that made the request.

### Setting the Execution Point of Server-Level Middleware

You can have server-level middleware execute at compile time, before the request, after a request is matched to a resource, and after a request by placing your middleware in the appropriate array. See the example below to see middleware defined in these arrays.

  ```typescript
  const server = new Drash.Http.Server({
    middleware: {
      compile_time: [
        ServeTypeScript,
      ],
      before_request: [
        Auth,
      ],
      after_resource: [
        TemplateEngine,
      ],
      after_request: [
        CleanUpData,
      ]
    },
  });
  ```

### Setting the Execution Point of Resource-Level Middleware

You can have resource-level middleware execute before and after the request by placing your middleware in the appropriate array in your resource class' middleware decorators. See the example below to see middleware defined in these arays.

  ```typescript
  @Drash.Http.Middleware({
    before_request: [VerifyTokenMiddleware],
    after_request: []
  })
  export default class SecretResource extends Drash.Http.Resource {
   
    static paths = [
      "/secret"
    ];
   
    @Drash.Http.Middleware({
      before_request: [LogAccessMiddleware],
      after_request: []
    })
    public GET() {
      this.response.body = {
        method: "GET",
        body: "You have accessed the secret resource!"
      };
      return this.response;
    }
  }
  ```

## Sorting Middleware

Middleware is executed in the order you define them. Take the examples below.

The following server-level middleware would execute in the following order:

* `OneMiddleware`
* `TwoMiddleware`

```typescript
const server = new Drash.Http.Server({
  middleware: {
    before_request: [
      OneMiddleware,
      TwoMiddleware
    ]
  },
});
```

The following resource-level middleware would execute in the following order:

* `RedMiddleware`
* `BlueMiddleware`

```typescript
@Drash.Http.Middleware({
  before_request: [
    RedMiddleware,
    BlueMiddleware
  ]
})
export default class HomeResource extends Drash.Http.Resource {
 
  static paths = [
    "/"
  ];
 
  public GET() {
    this.response.body = "GET request received!";
    return this.response;
  }
}
```