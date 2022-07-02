# About the Tutorials

## Format

All tutorials under Test Doubles will have a format similar to the follow:

- The test double definition
- How to create the test double
- Examples on using the test double
- How to do verification (if a test double has verification capabilities)

## Assumptions

### Deno Code Blocks

The Deno code blocks will assume you are using `Deno.test()`. If you are not
using `Deno.test()`, you can replace the `Deno.test()` calls with the calls
required by your test files.

### Node Code Blocks

The Node code blocks will assume you have a testing framework installed (e.g.,
Jest or something using `describe()/it()/test()` functions). When copying and
pasting code from example code blocks, please make sure you correct the syntax
to match your testing framework's syntax.

## Tabbed Example Code Blocks

Most tutorials will contain example code blocks with tabs. These tabs will be
labeled as follows:

- Deno: Used to show how to use Rhum in Deno
- Node - TypeScript (ESM): Used to show how to use Rhum with TypeScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements and `ts-node`).
- Node - JavaScript (ESM): Used to show how to use Rhum with JavaScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements).
- Node - CommonJS: Used to show how to use Rhum with JavaScript using `require`
  statements.

An example of a tutorial seen below:

1. Write your test.

   ```typescript
   // @Tab Deno
   import { Fake } from "./deps.ts";
   // my_test.ts

   // ... rest of code

   // @Tab Node - TypeScript (ESM)
   // my.test.ts

   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab Node - JavaScript (ESM)
   // my.test.js

   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab Node - CommonJS
   // my.test.js

   const { Fake } = require("@drashland/rhum");

   // ... rest of code
   ```

1. Run your test.

   ```bash
   // @Tab Deno
   $ deno test my_test.ts

   // @Tab Node - TypeScript (ESM)

   $ ts-node my.test.ts

   // @Tab Node - JavaScript (ESM)

   $ node my.test.js

   // @Tab Node - CommonJS

   $ node my.test.js
   ```
