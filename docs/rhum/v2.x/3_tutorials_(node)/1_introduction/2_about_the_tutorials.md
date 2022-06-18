# About the Tutorials

## Assumptions

The tutorials will assume you have a testing framework installed (e.g., Jest or
something using `describe()/it()/test()` functions). When copying and pasting
code from example code blocks, please make sure you correct the syntax to match
your testing framework's syntax.

## Tabbed Example Code Blocks

Most tutorials will contain example code blocks with tabs. These tabs will be
labeled as follows:

- Node - TypeScript (ESM): Used to show how to use the Rhum with TypeScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements and `ts-node`).
- Node - JavaScript (ESM): Used to show how to use the Rhum with JavaScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements).
- Node - CommonJS: Used to show how to use Rhum with JavaScript using `require`
  statements.

An example of a tutorial seen below:

1. Write your test.

   ```typescript
   // @Tab Node - TypeScript (ESM)
   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab Node - JavaScript (ESM)

   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab Node - CommonJS

   const { Fake } = require("@drashland/rhum");

   // ... rest of code
   ```

1. Run your test.

   ```bash
   // @Tab Node - TypeScript (ESM)

   $ ts-node my_test.ts

   // @Tab Node - JavaScript (ESM)

   $ node my_test.js

   // @Tab Node - CommonJS

   $ node my_test.js
   ```
