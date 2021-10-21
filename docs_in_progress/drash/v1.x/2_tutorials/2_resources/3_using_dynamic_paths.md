# Using Dynamic Paths

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Regular Path Params](#regular-path-params)
* [Optional Path Params](#optional-path-params)
* [Regular Expression Paths](#regular-expression-paths)

## Before You Get Started

Just like other frameworks, Drash resources have the ability to parse paths like the following:

* `/path/:id`
* `/path/:id?`
* `/[a-z]/[0-9]`

## Regular Path Params

Resources are able to specify path params in their paths to allow them to cover multiple endpoints.

```typescript
// home_resource.ts

import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Http.Resource {
  static paths = [
    "/:my_param",
  ];
 
  public GET() {
    this.response.body = "GET request received!";
 
    let myParam = this.request.getPathParam("my_param");
 
    this.response.body += ` You passed in the following path param: ${myParam}`;
 
    return this.response;
  }
} 
```
Examples of URIs that this resource would handle:

* `GET /hello`
  * Responds with: Get request received! You passed in the following path param: hello
* `GET /world`
  * Responds with: Get request received! You passed in the following path param: world
* `GET /something`
  * Responds with: Get request received! You passed in the following path param: something

## Optional Path Params

Path params can also be optional, allowing a resource to accept a URI that doesn't depend on certain params, but still wishes to accept the request, with or without them.

```typescript
// users_resource.ts

import { Drash } from "./deps.ts";
 
export default class UsersResource extends Drash.Http.Resource {
  static paths = [
    "/users/:id/:name?/:age?/:city?",
  ];
 
  public GET() {
    this.response.body = "GET request received!";
 
    const id   = this.request.getPathParam("id");
    const name = this.request.getPathParam("name");
    const age  = this.request.getPathParam("age");
    const city = this.request.getPathParam("city");
 
    this.response.body += ` You passed in the following path params: |${id}|${name}|${age}|${city}|`;
 
    return this.response;
  }
}
```

You can have as many optional params as you wish, but required params _MUST_ precede optional params.

Examples of URIs that this resource would handle:

* `GET /users/1`
  * Responds with: Get request received! You passed in the following path params: |1||||
* `GET /users/1/`
  * Responds with: Get request received! You passed in the following path params: |1||||
* `GET /users/1/John`
  * Responds with: Get request received! You passed in the following path params: |1|John|||
* `GET /users/1/John/`
  * Responds with: Get request received! You passed in the following path params: |1|John|||
* `GET /users/1/John/54`
  * Responds with: Get request received! You passed in the following path params: |1|John|54||
* `GET /users/1/John/54/`
  * Responds with: Get request received! You passed in the following path params: |1|John|54||
* `GET /users/1/John/54/UK`
  * Responds with: Get request received! You passed in the following path params: |1|John|54|UK|
* `GET /users/1/John/54/UK/`
  * Responds with: Get request received! You passed in the following path params: |1|John|54|UK|

## Regular Expression Paths

Resources are able to specify regular expressions in their paths to allow them to cover multiple endpoints.


```typescript
// home_resource.ts

import { Drash } from "./deps.ts";
 
export default class HomeResource extends Drash.Http.Resource {
  static paths = [
    "/([0-9]$)",
  ];
 
  public GET() {
    this.response.body = "GET request received!";
 
    return this.response;
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
