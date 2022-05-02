# Class Spies With Mocks

During testing, you may run into a case where you want to spy on a class that a
mock is using. For example, you might have the following mock object created:

```ts
const service = new MyService();

const mock = Mock(MyClass)
  .withConstructorArgs(service)
  .create();
```

If you want to spy on `MyService`, you can pass in `Spy(MyService)` like so:

```ts
const spy = Spy(MyService);

const mock Mock(MyClass)
  .withConstructorArgs(spy)
  .create();
```

Doing the above will allow you to verify that the spy's methods were called as
expected. For example, say you want to verify that that the mock called
`MyService.doSomething()` with args `"hello"` and `"world"`. That test would
look like:

```ts
import { Mock, Spy } from "./deps.ts";

// This class will become the spy
class MyService {
  public doSomething(name: string, email: string): boolean {
    return true;
  }
}

// This class will become the mock
class MyClass {
  #my_service: MyService;

  constructor(myService: MyService) {
    this.#my_service = myService;
  }

  public handleRequest(request: { name: string; email: string }) {
    this.#my_service.doSomething(request.name, request.email);
  }
}

// Turn `MyService` into a spy
const spy = Spy(MyService);

// Create the mock and pass in the spy
const mock = Mock(MyClass)
  .withConstructorArgs(spy)
  .create();

// Call the method that calls the spy's `doSomething()` method
mock.handleRequest({
  name: "hello",
  email: "world",
});

// Verify that the spy's `doSomething()` method was called with the given args.
// Calling `.toBeCalledWithArgs()` will throw an error if the `doSomething()`
// method was not called with the given args. Here, we pass in the correct args,
// so this call does not throw an error.
spy.verify("doSomething").toBeCalledWithArgs("hello", "world");

// Here, we can see what happens if we verify that the `doSomething()` method
// was called with an incorrect set of args. As you can see, we have to wrap it
// in a try-catch because it will throw an error. In the `catch` block, we log
// the error message -- seeing that `"not world"` was unexpected.
try {
  spy.verify("doSomething").toBeCalledWithArgs("hello", "not world");
} catch (error) {
  console.log(error.message); // Outputs => Method "doSomething" received unexpected arg `not world<string>` at parameter position 2.
}
```
