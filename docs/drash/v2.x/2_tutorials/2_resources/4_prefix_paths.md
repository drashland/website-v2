# Prefix Paths

You may have seen in other frameworks, such as Laravel, the ability to prefix certain resource paths, which allows you to avoid writing the same prefix over and over again, and should that prefix change (eg `/api/v1` to `/api/v2`), you only need to change it in one place, enforcing scalabillity.

An example in Laravel would be:

```php
Route::prefix("/api/v1", function () {
  Route::get("/users", function () {
    return "Drash";
  })
})
```

## Table of Contents

* [Regular Path Params](#regular-path-params)
* [Optional Path Params](#optional-path-params)
* [Regular Expression Paths](#regular-expression-paths)

## Regular Path Params

Resources are able to specify path params in their paths to allow them to cover multiple endpoints. For example:

```typescript
import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Resource {

  public paths = [
    "/:my_param",
  ];
 
  public GET(request: Drash.Request, response: Drash.Response): void {
    const param = request.pathParam("my_param");

    if (param) {
      return response.text(myParam);
    }

    return response.text("No param passed in!");
  }
} 
```
Examples of URIs that this resource would handle:

* `GET /hello`
  * Responds with: `hello`
* `GET /world`
  * Responds with: `world`
* `GET /something`
  * Responds with: `something`

## Optional Path Params

Path params can also be optional. This allows a resource to accept a request with a URI that does not depend on path params. For example:

```typescript
import { Drash } from "./deps.ts";
 
export default class UsersResource extends Drash.Resource {

  // id = required
  // name = optional
  // age = optional
  // city = optional
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

    return response.text(body);
  }
}
```

You can have as many optional params as you wish, but required params _MUST COME BEFORE_ optional params (notice how the `id` param is required and comes before the optional params).

Examples of URIs that this resource would handle:

* `GET /users/1`
  * Responds with: `GOT | 1`
* `GET /users/1/`
  * Responds with: `GOT | 1`
* `GET /users/1/John`
  * Responds with: `GOT | 1 | John`
* `GET /users/1/John/`
  * Responds with: `GOT | 1 | John`
* `GET /users/1/John/54`
  * Responds with: `GOT | 1 | John | 54`
* `GET /users/1/John/54/`
  * Responds with: `GOT | 1 | John | 54`
* `GET /users/1/John/54/UK`
  * Responds with: `GOT | 1 | John | 54 | UK`
* `GET /users/1/John/54/UK/`
  * Responds with: `GOT | 1 | John | 54 | UK`

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
