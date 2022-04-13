# About Rhum

## Table of Contents

- [Overview](#overview)
- [Concepts](#concepts)
  - [Why the Test Double Definitions?](#why-the-test-double-definitions)
  - [Our Experiences From Other Testing Libraries and Our Solution](#our-experiences-from-other-testing-libraries-and-our-solution)
    - [Problem](#problem)
    - [Solution](#solution)

## Overview

Rhum is a test double library that helps facilitate your testing needs. It helps
you with both state verification and behavior verification. Some examples of how
Rhum can help you:

- Assert that a certain method on a class was called a number of times
- Override methods or properties on classes during test runs
- Ensure business logic was not called in a user flow
- Faking responses from databases, APIs, services, and more

The above list is not finite. There are many more use cases for Rhum. It really
depends on your testing needs.

## Concepts

### Why the Test Double Definitions?

Rhum follows the
[test double definitions](https://martinfowler.com/bliki/TestDouble.html) from
Gerard Meszaros (as stated by Martin Fowler). We made it this way to prevent
confusion on what test double to use during a system under test (SUT) and to
make it easier to ask yourself questions like the following when writing tests:

- Should this be a fake?
- Should I pass in a mock to this constructor?
- Do I need to create an expectation on this service that I am testing?
- Does this need to be stubbed?
- Are we verifying behavior or state?

### Our Experiences From Other Testing Libraries and Our Solution

We found that other testing libraries can create some overlap between test
doubles. This makes it kind of difficult to know what test double to use, why to
use it, and what you are verifying in tests. For example, some testing libraries
only have the concept of mocking instead of spying, faking, or creating dummies.
Furthermore, some testing libraries have mocks that can also be stubs
([Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)).
This can lead you to not testing anything if you are just stubbing everything in
your tests.

From our experiences and knowing the test double definitions written on Martin
Fowler's website, we sought out to provide a solution for creating test doubles.

#### Problem

The below example code is what we have seen in unit tests sometimes.

```typescript
class MyResource {
  constructor(
    serviceOne: ServiceOne, // This is the service we want to test
    serviceTwo: ServiceTwo, // This is out of scope for the SUT
    serviceThree: ServiceThree, // This is out of scope for the SUT
  ) {
    this.service_one = serviceOne;
    this.service_two = serviceTwo;
    this.service_three = serviceThree;
  }
}

const resource = new Resource(
  Mock(ServiceOne).create(),
  Mock(ServiceTwo).create(), // Out of scope for the SUT
  Mock(ServiceThree).create(), // Out of scope for the SUT
);
```

Based on the definitions Rhum now uses, the above is an incorrect way to go
about testing. Reason being:

- `ServiceTwo` is out of scope for the SUT so there is no reason to mock it.
  Mocking it means you expect it to receive calls.
- `ServiceThree` is out of scope for the SUT so there is no reason to mock it.
  Mocking it means you expect it to receive calls.

#### Solution

The below is how we feel it should be done. Per Dummy definition, they are
objects that are passed around, never actually used, and usually just used to
fill parameter lists.

```diff-typescript
  ...
  ...

  const resource = new Resource(
    Mock(ServiceOne).create(),
-   Mock(ServiceTwo).create(), // Out of scope for the SUT
-   Mock(ServiceThree).create(), // Out of scope for the SUT
+   Dummy(ServiceTwo), // Out of scope for the SUT
+   Dummy(ServiceThree), // Out of scope for the SUT
  );
```

Looking at the above, we can clearly see that `Dummy()` is being used for
`ServiceTwo` and `ServiceThree` and can know the following:

- `ServiceTwo` is not being exercised during the SUT because it is a dummy. It
  clearly shows it is out of scope for the SUT (even if we remove the comment).
- `ServiceThree` is not being exercised during the SUT because it is a dummy. It
  clearly shows it is out of scope for the SUT (even if we remove the comment).

The above example shows just one area where a test can be improved when using
Rhum. It does not stop there though. Rhum has other test doubles to help you
improve your tests.
