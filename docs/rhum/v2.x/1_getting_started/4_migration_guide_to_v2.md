# Migration Guide to v2

Below are sections pertaining to parts of Rhum that have changed. There are
example code blocks highlighted similarly to Git diffs. The `-` red lines are
what was removed and the `+` green lines are what was added. The `+` green lines
are what your Rhum tests should be using if migrating from v1 to v2.

## Table of Contents

- [Rhum Namespace](#rhum-namespace)

## Rhum Namespace

The testing side of Rhum was taken out. This includes functions and data members
you might be familiar with such as:

- `.testCase()`
- `.testSuite()`
- `.testPlan()`
- `.asserts.*`

This being said, Rhum is purely a test double module.

The reasons for this are:

1. Deno's test runner has improved, and now has features that Rhum sought to add
   when Deno lacked them.
2. TLDR: We felt that there was no need for us to maintain the test runner side
   of Rhum since Deno improved. Longer story: Maintaining a test runner was a
   painful process. Rhum's test runner originally had one main goal: to provide
   pretty test result outputs. Test nesting and hooks were added to the test
   runner to make Rhum more feature rich, but those features bloated the code in
   a way that was a maintenance nightmare -- we could not really get around this
   due to the way we were mutating Deno's test output to achieve tree-like test
   result outputs.

Changes:

- `Rhum.asserts` was removed.

  You should import your assertion methods from
  [Deno Standard Modules](https://deno.land/std) and use those instead of
  `Rhum.asserts`.

  ```diff-typescript
  - import { Rhum } from "...";
  + import * as asserts from "https://deno.land/std@<VERSION>/testing/asserts.ts";

  - Rhum.asserts.assertEquals( ... );
  + asserts.assertEquals( ... );
  ```

  Make sure you replace `<VERSION>` with the version of Deno Standard Modules
  you are using.

- `Rhum.testPlan()`, `Rhum.testSuite()` and `Rhum.testCase()` were removed.

  Instead, you can now structure your tests like so:

  ```diff-typescript
  - import { Rhum } from "...";

  - Rhum.testPlan("tests/unit/user_test.ts", () => {
  -   Rhum.testSuite("saveToGoogle()", () => {
  -     Rhum.testCase("Saves the user to goole via the API", async () => {
  -       // ...
  -     });
  -   });
  - });
  -
  - Rhum.run()
  + Deno.test("saveToGoogle()", async (t) => {
  +   await t.step("Saves the user to google via the API", async () => {
  +     // ...
  +   })
  + })
  ```

  As Deno displays the filename of a test in the command line output, there is
  no need to specify the filename in the test case.

  For more information on using `Deno.test()`, please refer to
  [Deno's documentation](https://deno.land/manual@v1.20.5/testing).
