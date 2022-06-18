# About the Tutorials

## Format

All tutorials under Test Doubles will have a format similar to the follow:

- The test double definition
- How to create the test double
- Examples on using the test double
- How to do verification (if a test double has verification capabilities)

## Assumptions

The tutorials will assume you are using `Deno.test()`. If you are not using
`Deno.test()`, you can replace the `Deno.test()` calls with the calls required
by your test files.

## Testing Example Code Blocks

When copying and pasting example code blocks, you can run the code by using the
`deno test` command. For example:

1. Copy the following into a `my_class_test.ts` file.

   ```typescript
   // my_class_test.ts

   class MyClass {
     // Some class members go here
   }

   Deno.test({
     name: "Some cool test name",
     fn(): void {
       return;
       // An actual implementation of a test is not written here just so we can
       // be concise about this example. In the real world, this `fn()` block
       // would have your assertion calls (e.g., `assertEquals(a, b)`).
     },
   });
   ```

2. Run the following command in the terminal.

   ```bash
   $ deno test my_class_test.ts
   ```

   You should see something like the following:

   ```text
   Check file:///my_class_test.ts
   running 1 test from ./my_class_test.ts
   Some cool test name ... ok (6ms)

   test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (51ms)
   ```
