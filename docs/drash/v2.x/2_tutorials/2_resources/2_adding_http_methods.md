# Adding HTTP Methods

Giving a resource the ability to handle different types of requests is as easy as adding the HTTP method to handle those requests. In the code below, the resource can handle `GET`, `POST`, `PUT`, and `DELETE` requests.

The HTTP methods you add in a resource are the HTTP methods clients are allowed to call. If a client tries to make a `PATCH` request to the below resource, it would receive a `405 Method Not Allowed` error because this resource does not have `public PATCH() { ... }` defined.

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

Resources can handle the following HTTP methods:

* `GET`
* `HEAD`
* `POST`
* `PUT`
* `DELETE`
* `CONNECT`
* `OPTIONS`
* `TRACE`
* `PATCH`