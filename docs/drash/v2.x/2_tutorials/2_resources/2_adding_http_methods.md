# Adding HTTP Methods

Giving a resource the ability to handle different types of requests is as easy as adding the HTTP method to handle those requests. In the code below, the resource can handle `GET`, `POST`, `PUT`, and `DELETE` requests.

The HTTP methods you add in a resource are the request methods clients are allowed to perform. If a client tries to perform a `PATCH` request to the below resource, the client will receive a `405 Method Not Allowed` error because the resource does not have a `PATCH` method defined.

```typescript
// home_resource.ts

import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Resource {
  public paths = ["/"];
 
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.json({hello: "GET"});
  }
 
  public POST(request: Drash.Request, response: Drash.Response): void {
    return response.json({hello: "POST"});
  }
 
  public PUT(request: Drash.Request, response: Drash.Response): void {
    return response.json({hello: "PUT"});
  }
 
  public DELETE(request: Drash.Request, response: Drash.Response): void {
    return response.json({hello: "DELETE"});
  }
}
```

Resources can handle the following HTTP verbs as methods:

* `GET`
* `HEAD`
* `POST`
* `PUT`
* `DELETE`
* `CONNECT`
* `OPTIONS`
* `TRACE`
* `PATCH`

Taking the above example code, you can add more HTTP methods by following the below syntax and replacing `{HTTP VERB}` with the HTTP verb you want to add:

```typescript
public {HTTP VERB}(request: Drash.Request, response: Drash.Response): void { ... }
```
