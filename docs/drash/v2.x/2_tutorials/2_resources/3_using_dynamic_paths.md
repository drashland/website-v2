# Using Dynamic Paths

Just like other frameworks, Drash resources have the ability to parse paths like the following:

* `/path/:id`
* `/path/:id?`
* `/[a-z]/[0-9]`

## Table of Contents

* [Regular Path Params](#regular-path-params)
* [Optional Path Params](#optional-path-params)
* [Regular Expression Paths](#regular-expression-paths)

## Regular Path Params

Resources are able to specify path params in their paths to allow them to cover multiple endpoints.

```typescript
import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Resource {

  public paths = [
    "/:my_param",
  ];
 
  public GET(request: Drash.Request, response: Drash.Response): void {
    const param = request.pathParam("my_param");

    if (param) {
      return response.text(`You passed in the following path param: ${myParam}`);
    }

    return response.text("No param passed in!");
  }
} 
```
Examples of URIs that this resource would handle:

* `GET /hello`
  * Responds with: Get request received! You passed in the following path param: `hello`
* `GET /world`
  * Responds with: Get request received! You passed in the following path param: `world`
* `GET /something`
  * Responds with: Get request received! You passed in the following path param: `something`

## Optional Path Params

Path params can also be optional. This allows a resource to accept a URI that does not depend on path params, but still wishes to accept the request.

```typescript
import { Drash } from "./deps.ts";
 
export default class UsersResource extends Drash.Resource {

  public paths = [
    "/users/:id/:name?/:age?/:city?",
  ];
 
  public GET(request: Drash.Request, response: Drash.Response): void {
    let body = "GOT";
 
    const id   = this.request.pathParam("id");
    const name = this.request.pathParam("name");
    const age  = this.request.pathParam("age");
    const city = this.request.pathParam("city");

    if (id) {
      body += ` | ${id}`;
    }

    if (name) {
      body += ` | ${name}`;
    }

    if (age) {
      body += ` | ${age}`;
    }

    if (city) {
      body += ` | ${city}`;
    }

    return response.text(`You passed in the following: ${body}`);
  }
}
```

You can have as many optional params as you wish, but required params _MUST PRECEDE_ optional params.

Examples of URIs that this resource would handle:

* `GET /users/1`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1`
* `GET /users/1/`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1`
* `GET /users/1/John`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John`
* `GET /users/1/John/`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John`
* `GET /users/1/John/54`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John | 54`
* `GET /users/1/John/54/`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John | 54`
* `GET /users/1/John/54/UK`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John | 54 | UK`
* `GET /users/1/John/54/UK/`
  * Responds with: Get request received! You passed in the following path params: `GOT | 1 | John | 54 | UK`

## Regular Expression Paths

Resources are able to specify regular expressions in their paths to allow them to cover multiple endpoints.


```typescript
import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Resource {

  public paths = [
    "/([0-9]$)",
  ];
 
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.text("GOT!");
  }
}
```

Examples of URIs that this resource would handle:

* `GET /1`
* `GET /2`
* `GET /3`
* `GET /9`

This resource would not handle the following URIs because they do not match the regular expression:

* `GET /11`
* `GET /12`
* `GET /13`
* `GET /99`
