# Add Rhum as a Dependency

## Table of Contents

- [Add Rhum as a Dependency](#add-rhum-as-a-dependency)

## Add Rhum as a Dependency

Before you get started with any tutorial, please make sure you pull down the
latest version of **Rhum v2.x**.

```bash
// @Tab Yarn

$ yarn add --dev @drashland/rhum@<VERSION>

// @Tab npm

$ npm install --save-dev  @drashland/rhum@<VERSION>
```

Replace `<VERSION>` with the latest version of **Rhum v2.x**. The latest version
can be found [here](https://github.com/drashland/rhum/releases/latest).

Tutorials will assume you have the latest version of **Rhum v2.x** pull down
since they will contain `import` or `require` statements using `@drashland/rhum`
in code blocks like so:

```typescript
// @Tab Node - TypeScript (ESM)
// some.test.ts

import { Dummy, Fake, Mock, Spy, Stub } from "@drashland/rhum";

// @Tab Node - JavaScript (ESM)
// some.test.js

import { Dummy, Fake, Mock, Spy, Stub } from "@drashland/rhum";

// @Tab Node - CommonJS
// some.test.js

const { Dummy, Fake, Mock, Spy, Stub } = require("@drashland/rhum");
```
