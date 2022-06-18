# Stubs

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Stubbing Properties](#stubbing-properties)
- [Stubbing Methods](#stubbing-methods)
- [Stubbing and Providing Values](#stubbing-and-providing-values)
  - [Properties](#properties)
  - [Methods](#methods)

## Before You Get Started

Per Martin Fowler, based on (Gerard Meszaros):

> Stubs provide canned answers to calls made during the test, usually not
> responding at all to anything outside what's programmed in for the test.

In this tutorial, you will learn how to stub properties and methods and provide
stubbed values.

## Stubbing Properties

You can stub a property by calling `Stub(object, propertyName)`. Doing this will
stub `object.propertyName` to have a value of `"stubbed"`. To provide a value,
read [Stubbing and Providing Values](#stubbing-and-providing-values) on this
page.

```ts
class MyClass {
  public some_property = "hello";
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.some_property === "hello"); // true

// Now stub the property
Stub(myObject, "some_property");

// Check that the property was stubbed
console.log(myObject.some_property === "stubbed"); // true
```

## Stubbing Methods

You can stub a method by calling `Stub(object, methodName)`. Doing this will
stub `object.methodName` to return a value of `"stubbed"`. To provide a value,
read [Stubbing and Providing Values](#stubbing-and-providing-values) on this
page.

```ts
class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.someMethod() === "This is the original value."); // true

// Now stub the property
Stub(myObject, "someMethod");

// Check that the property was stubbed
console.log(myObject.someMethod() === "stubbed"); // true
```

## Stubbing and Providing Values

Sometimes you will want to stub a property with a given value or stub a method
and have it return a given value. You can do so by providing a third argument to
the `Stub()` call. For example:

```ts
Stub(object, propertyOrMethodName, someNewValue);
```

### Properties

Below is how you can stub a property with a given value.

```ts
class MyClass {
  public some_property = "hello";
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.some_property === "hello"); // true

// Now stub the property
Stub(myObject, "some_property", "YOU GOT CHANGED!!!!");

// Check that the property was stubbed
console.log(myObject.some_property === "YOU GOT CHANGED!!!!"); // true
```

### Methods

Below is how you can stub a method with a given value.

```ts
class MyClass {
  public someMethod(): string {
    return "This is the original value.";
  }
}

const myObject = new MyClass();

// Check that the property is not yet stubbed
console.log(myObject.someMethod() === "This is the original value."); // true

// Now stub the property
Stub(myObject, "someMethod", "SOME NEW VALUE!!!!");

// Check that the property was stubbed
console.log(myObject.someMethod() === "SOME NEW VALUE!!!!"); // true
```
