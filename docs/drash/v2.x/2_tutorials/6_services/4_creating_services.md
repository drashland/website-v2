# Creating Services

When creating a service, you need to extend the `Drash.Service` class and
implement one or both of the methods below in the service:

- `runBeforeResource()`
  - This method is executed before a resource's HTTP method is called. For
    example, if you have a resource with a `GET()` method and a `GET` request is
    made to that resource, then the server will run the service before the
    `GET()` method is called.
- `runAfterResource()`
  - This method is executed after a resource's HTTP method is called. For
    example, if you have a resource with a `GET()` method and a `GET` request is
    made to that resource, then the server will run the service after the
    `GET()` method is called.

An example of how a service is written is below:

```typescript
import { Drash } from "./deps.ts";

class SomeService extends Drash.Service {
  /**
   * Run this service before the resource's HTTP method.
   */
  public runBeforeResource(
    request: Drash.Request,
    response: Drash.Response,
  ): void {
    // Some code here
  }

  /**
   * Run this service after the resource's HTTP method.
   */
  public runAfterResource(
    request: Drash.Request,
    response: Drash.Response,
  ): void {
    // Some code here
  }
}
```

Both the `runBeforeResource()` and `runAfterResource()` methods require the
`request` and `response` params. As a result, both methods have access to the
incoming `request` object and the `response` object that will be used to send
data to the client.

Check out
[Tutorials > Services > Introduction > Order of Operations](/drash/v2.x/tutorials/services/introduction#order-of-operations)
for a detailed explanation of when services execute to better decide what kind
of service you want to create (e.g., server-level, resource-level, resource HTTP
method level).

You can also check out the
[Drash Lifecycle Diagram](/drash/v2.x/getting-started/lifecycle-diagram) for a
visual diagram of when services are executed by the server.
