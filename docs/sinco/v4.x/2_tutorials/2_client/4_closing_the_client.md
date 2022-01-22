# Closing the Client

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Closing the client process after all your testing is completed is an important
step. You definitely don't want your browser running astray after the work is
done, occupying precious memory.

`Client` provides the method `.close()` method that will close the headless
browser instance (sub process), and all resources linked to it, to acoid any
leaking resources. If you want to close the client but also want it to throw a
custom error, you may also pass in your own error message as an argument. You
can even provide a second argument defining the class of the error. Default is
`Error`

In this tutorial, you will:

- Create both a headless browser instance for Chrome and Firefox; and
- Close them both.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app_test.ts` file.

   ```typescript
   // app.ts

   import { buildFor } from "./deps.ts";

   const { browser: Chrome, page: Cpage } = await buildFor("chrome");
   const { browser: Firefox, page: Fpage } = await buildFor("firefox");
   // Now you close the connections and processes, as you are done here
   await Chrome.close(); // or await Chrome.close("Some Error occured") to close and throw an Error
   await Firefox.close(); // or await Firefox.close("The range is too big!", RangeError) to close and throw a RangeError
   ```

Here you are going to create your headless browser instance for Firefox and
Chrome. Note that you would not need to create both at the same time, you are
only doing that here for demonstration purposes.

Note that closing Firefox will also close any existing Firefox sessions (only on
Windows). Related Deno issue: _https://github.com/denoland/deno/issues/7087_

## Verification

1. Run your file.

   ```shell
   $ deno run --allow-run --allow-net --allow-write=$TMPDIR --allow-read app_test.ts
   ```
