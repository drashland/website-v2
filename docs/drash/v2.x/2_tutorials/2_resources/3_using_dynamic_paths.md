# Using Dynamic Paths

Just like other frameworks, Drash resources have the ability to parse paths like
the following:

- `/path/:id`
- `/path/:id?`
- `/[a-z]/[0-9]`

## Table of Contents

- [Regular Path Params](#regular-path-params)
- [Optional Path Params](#optional-path-params)
- [Regular Expression Paths](#regular-expression-paths)

## Regular Path Params

Resources are able to specify path params in their paths to allow them to cover
multiple endpoints. For example:

```typescript
// home_resource.ts

// @Import drash_from_deps

export default class HomeResource extends Drash.Resource {
  public paths = [
    "/:my_param",
  ];

  public GET(request: Drash.Request, response: Drash.Response): void {
    const param = request.pathParam("my_param");

    if (param) {
      return response.text(param);
    }

    return response.text("No param passed in!");
  }
}
```

Examples of URIs that this resource would handle:

- `GET /hello`
  - Responds with: `hello`
- `GET /world`
  - Responds with: `world`
- `GET /something`
  - Responds with: `something`

## Optional Path Params

Path params can also be optional. This allows a resource to accept a request
with a URI that does not depend on path params. For example:

```typescript
// users_resource.ts

// @Import drash_from_deps

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

    const id = request.pathParam("id");
    const name = request.pathParam("name");
    const age = request.pathParam("age");
    const city = request.pathParam("city");

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

You can have as many optional params as you wish, but required params _MUST COME
BEFORE_ optional params (notice how the `id` param is required and comes before
the optional params).

Examples of URIs that this resource would handle:

- `GET /users/1`
  - Responds with: `GOT | 1`
- `GET /users/1/`
  - Responds with: `GOT | 1`
- `GET /users/1/John`
  - Responds with: `GOT | 1 | John`
- `GET /users/1/John/`
  - Responds with: `GOT | 1 | John`
- `GET /users/1/John/54`
  - Responds with: `GOT | 1 | John | 54`
- `GET /users/1/John/54/`
  - Responds with: `GOT | 1 | John | 54`
- `GET /users/1/John/54/UK`
  - Responds with: `GOT | 1 | John | 54 | UK`
- `GET /users/1/John/54/UK/`
  - Responds with: `GOT | 1 | John | 54 | UK`

## Regular Expression Paths

Resources are able to specify regular expressions in their paths to allow them
to cover multiple endpoints.

```typescript
// home_resource.ts

// @Import drash_from_deps

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

- `GET /1`
- `GET /2`
- `GET /3`
- `GET /9`

This resource would not handle the following URIs because they do not match the
regular expression:

- `GET /11`
- `GET /12`
- `GET /13`
- `GET /99`
