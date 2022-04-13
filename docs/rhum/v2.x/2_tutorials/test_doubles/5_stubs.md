# Stubs

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Stubbing Properties](#stubbing-properties)
- [Stubbing Methods](#stubbing-methods)

### Before You Get Started

Rhum defines stubs as follows:

- Stubs provide canned answers to calls made during tests
- Stubs do not respond to calls outside the test's scope

Unlike mocks, stubs are used to help verify the state of the system being
tested. For example, you can check to see if the system being tested is in a
certain state when stubbing an object's property to a certain value.

### Stubbing Properties

Stubbing an object's properties can be done as follows:

```ts
class MyObject {
  public some_property = "someValue";
}

// Define the object that will have stubbed members as a stubbed object
const myStubbedObject = Rhum.stubbed(new MyObject());

// Stub the object's some_property property to a certain value
myStubbedObject.stub("some_property", "this property is now stubbed");

// Assert that the property was stubbed
assertEquals(myStubbedObject.some_property, "this property is now stubbed"); // pass
```

### Stubbing Methods

Stubbing an object's methods can be done as follows:

```ts
class MyObject {
  public someMethod(): string {
    return "someValue";
  }
}

// Define the object that will have stubbed members as a stubbed object
const myStubbedObject = Rhum.stubbed(new MyObject());

// Stub the object's someMethod() method to return a certain value
myStubbedObject.stub("someMethod", () => {
  return "stubbed";
});

// Assert that the method was stubbed
assertEquals(myStubbedObject.someMethod(), "stubbed"); // pass
```
