# Adding HTTP Methods

Giving a resource the ability to handle different types of requests is as easy
as adding the HTTP method to handle those requests. In the code below, the
resource can handle `GET`, `POST`, `PUT`, and `DELETE` requests.

The HTTP methods you add in a resource are the HTTP methods clients are allowed
to call. If a client tries to make a `PATCH` request to the below resource, it
would receive a `405 Method Not Allowed` error because this resource does not
have `public PATCH() { ... }` defined.

```typescript
import { Drash } from "./deps.ts";

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    this.response.body = "GET request received!";
    return this.response;
  }

  public POST() {
    this.response.body = "POST request received!";
    return this.response;
  }

  public PUT() {
    this.response.body = "PUT request received!";
    return this.response;
  }

  public DELETE() {
    this.response.body = "DELETE request received!";
    return this.response;
  }
}
```
