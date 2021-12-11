# Selecting Elements

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.querySelector()` that will query the DOM for this element, and return an `Element` instance, allowing you to query that specific element. 

In this tutorial, you will:

- Create a headless browser instance; and
- Go to a website;
- Query an element;


Example selectors could be:

- `.querySelector('a[href="/user"]');`
- `.querySelector('button#submit');` The `.click()` method will take any valid selector.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app_test.ts
  deps.ts
```

## Steps

1. Create your `app_test.ts` file.

```typescript
// app_test.ts

// Note you will need to import assertEquals from https://deno.land/std/testing/asserts.ts
import { assertEquals, buildFor } from "./deps.ts";

Deno.test("My web app works as expected", async () => {
  const Sinco = await buildFor("chrome");
  const page = await Sinco.goTo("https://drash.land");
  const img = await page.querySelector('img'); // This should be the logo
  // Now `img` is an `Element` instance, allowing you to action upon this element such as:
  //
  //   await img.click()
  //   await img.value() // If this element was an input element
  //
  // Youc an also check certain properties of `img`:
  //
  //   console.log(img.selector) // "img"
  //   console.log(img.method) // "document.querySelector"
  await Sinco.done();
});
```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you will then query the DOM for the first `img` element, which would be our logo.

## Verification

1. Run your test.

```shell
$ deno test --allow-run --allow-read --allow-net app_test.ts
```

2. All of your tests should pass
