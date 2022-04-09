# Migration Guide to v2

Below are sections pertaining to parts of Rhum that have changed. There are
example code blocks highlighted similarly to Git diffs. The `-` red lines are
what was removed and the `+` green lines are what was added. The `+` green lines
are what your Drash application should be using if migrating from v1 to v2.

## Table of Contents

- [Rhum Namespace](#drash-namespace)

## Drash Namespace

The testing side of Rhum was taken out, this includes functions you might be familiar with such as: `.testCase()`, `.testSuite()`, `.testPlan()` and `.asserts.*`. Rhum is purely a module to mock and stub now.

The reasons for this are:

1. Deno's test runner has improved, and now has features that Rhum sought to add when Deno lacked them. 
2. Maintaining a test runner was a painful process. Along with the above, we felt that there was no need for us to maintain the etst runner side of Rhum

Changes:

- `Rhum.asserts` was removed.

You should importing your assertion methods from `https://deno.land/std/testing` instead

- `Rhum.testPlan()`, `Rhum.testSuite()` and `Rhum.testCase()` was removed.

Instead, you can now structure your tests like so:

  ```diff-typescript
  - import { Drash } from "...";
  - Rhum.testPlan("tests/unit/user_test.ts", () => {
  -   Rhum.testSuite("saveToGoogle()", () => {
  -     Rhum.testCase("Saves the user to goole via the API", async () => {
  -       // ...
  -     })
  -   })  
  - })
  - Rhum.run()
  + Deno.test("saveToGoogle()", async t => {
  +   await t.step("Saves the user to google via the API", async () => {
  +     // ...
  +   })
  + })
  ```
As Deno displays the filename of a test in the command line output, there isn't a need to specify the filename in the test case.