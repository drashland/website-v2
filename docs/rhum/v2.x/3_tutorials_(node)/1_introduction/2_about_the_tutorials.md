# About the Tutorials

Most tutorials will contain example code blocks with tabs. These tabs will be
labeled as follows:

- TypeScript (ESM): Used to show how to use the Rhum with TypeScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements and `ts-node`).
- JavaScript (ESM): Used to show how to use the Rhum with JavaScript in
  [JavaScript module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  (e.g., using `import` statements).
- CommonJS: Used to show how to use Rhum with JavaScript using `require`
  statements.

An example of a tutorial seen below:

1. Write your test.

   ```typescript
   // @Tab TypeScript (ESM)
   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab JavaScript (ESM)

   import { Fake } from "@drashland/rhum";

   // ... rest of code

   // @Tab CommonJS

   const { Fake } = require("@drashland/rhum");

   // ... rest of code
   ```

1. Run your test.

   ```bash
   // @Tab TypeScript (ESM)

   $ ts-node my_test.ts

   // @Tab JavaScript (ESM)

   $ node my_test.js

   // @Tab CommonJS

   $ node my_test.js
   ```
