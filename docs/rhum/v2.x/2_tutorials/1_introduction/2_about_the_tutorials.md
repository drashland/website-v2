# About the Tutorials

## Format

All tutorials under Test Doubles will have a format similar to the follow:

- The test double definition
- How to create the test double
- Examples on using the test double
- How to do verification (if a test double has verification capabilities)

## Important Notes

- Since Rhum is an agnostic TypeScript library (e.g., it can be compiled down to
  CommonJS), the Test Doubles tutorials _DO NOT_ show you how to use a test
  double in a specific runtime (e.g., Deno or Node). Instead of seeing assertion
  calls like Jest's `expect()` or Deno's testing module's `assertEquals()`, you
  will see `console.log()` statements showing some output in example code
  blocks. For example, the
  [Test Doubles > Mocks](/rhum/v2.x/tutorials/test-doubles/mocks) tutorial will
  show something like ...

  ```ts
  const mock = Mock(SomeClass).create();

  console.log(mock instanceof SomeClass); // true
  ```

  ... instead of ...

  ```ts
  const mock = Mock(SomeClass).create();

  // In Jest ...
  expect(mock instanceof SomeClass).toBe(true);

  // In Deno ...
  assertEquals(mock instanceof SomeClass, true);
  ```

- There is work being done to provide tabbed exampled code blocks so you can see
  how to use Rhum in a specific syntax in a specific runtime (e.g., Using Node
  with TypeScript).
