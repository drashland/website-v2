# Change Location

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.location()` that can either get the current location (url) of the page, or set it if you wish to visit a different path or website.

In this tutorial, you will:

- Create a headless browser instance; and
- Go to a website;
- Set the location to be a new site;
- Then retrieve the location, asserting it to be the one you just set;

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
  await page.location("https://github.com");
  const location = await page.location();
  await Sinco.done();
  assertEquals(location, "https://github.com");
});
```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you will then navigate to https://github.com. After, you are going to retrieve the pages current location, and assert it is that of GitHubs.

## Verification

1. Run your test.

```shell
$ deno test --allow-run --allow-read --allow-net app_test.ts
```

2. All of your tests should pass
