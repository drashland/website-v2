# Drash Land Website (v2)

## Running the Development Environment

1. Install dependencies.

   ```shell
   $ yarn install
   ```

2. Run the dev server.

   ```shell
   $ yarn dev
   ```

_Note: Optionally, you can use `yarn dev --port <PORT>` to run your development
environment on a different port._

3. Go to `http://localhost:3000`

## Writing Documentation

All documentation is written using Markdown and stored in the `/docs` directory.
The `/docs` directory is read by `/pages/[...path_params].jsx` which utilizes
`react-markdown` to render the Markdown files.

In addition to Markdown syntax, this repository can also do the following with
Markdown (with the help of `react-markdown` and Prism.js):

- Syntax highlighting
- Diff highlighting in specific languages
- Tabbed example code blocks

When writing documentation, you can use the additional features as outlined
below.

### Syntax Highlighting

To add syntax highlighting to a fenced code block, add the language you want to
highlight by starting a fenced code block with the following:

<pre>
```{language-goes-here}
</pre>

The above will cause `react-markdown` to add a `language-{language-goes-here}`
class name to the code block and call Prism.js to highlight the code.

As an example, using `typescript` to start a fenced code block ...

<pre>
```typescript
import * as something from "./something.ts";
```
</pre>

... renders as ...

![Syntax Highlight](https://user-images.githubusercontent.com/12766301/163730086-586d950c-3e64-4707-b263-57ff3b4238a2.png)

### Diff + Syntax Highlighting

To add diff and syntax highlighting to a fenced code block, use the following:

<pre>
```diff-{language-goes-here}
</pre>

The above will cause `react-markdown` to add a
`language-diff-{language-goes-here}` class name to the code block and call
Prism.js to highlight the code.

As an example, using `diff-typescript` to start a fenced code block ...

<pre>
```diff-typescript
+ import { Rhum } from "...";
- import * as asserts from "https://deno.land/std@<VERSION>/testing/asserts.ts";

+ Rhum.asserts.assertEquals( ... );
- asserts.assertEquals( ... );
```
</pre>

... renders as ...

![Diff + Syntax Highlighting](https://user-images.githubusercontent.com/12766301/163729976-219ae844-9b7b-4506-b02e-e16848ab488e.png)

### Tabbed Code Blocks

To turn a fenced code block into a tabbed code block, separate the code in the
code block with `// @CodeTab {name of tab goes here}`.

The below fenced code block (with `// @CodeTab {name of tabe goes here}`
separators) ...

```typescript
// @CodeTab Deno
import { Mock } from "./deps.ts";

// Some cool code goes here
// ...
// ...

// @CodeTab Node (ESM)
import { Mock } from "@drashland/rhum";

// Some cool code goes here
// ...
// ...

// @CodeTab Node (CJS)
const { Mock } = require("@drashland/rhum");

// Some cool code goes here
// ...
// ...
```

... renders as ...

![Tabbed Code Blocks](https://user-images.githubusercontent.com/12766301/163728514-978a901f-01e8-47df-9fd2-e5b03f1387e0.png)

## Tech Stack

- [Jest](https://jestjs.io/) - Testing framework
- [Next.js](https://nextjs.org/) - Web framework
- [Prism.js](https://prismjs.com/) - Syntax highlighting for code blocks
- [react-markdown](https://github.com/remarkjs/react-markdown) - Used to render
  React components from Markdown files in `/docs` directory
- [styled-components](https://styled-components.com/) - Used to quickly style
  React components
