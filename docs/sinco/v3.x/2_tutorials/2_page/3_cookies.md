# Cookies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

`Page` provides the method `.cookie()` that can either get all cookies for the
page, or set a new one.

Passing no parameters (`await page.cookie()`) will return an array of cookies on
the page, or you can pass an object to set a cookie:

```ts
await page.cookie({
  name: "Project",
  value: "sinco",
  url: "https://drash.land",
});
```

In this tutorial, you will:

- Create a headless browser instance; and
- Go to a website;
- Set a cookie;
- Then retrieve that cookie;

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
  await page.cookie({
    name: "project",
    value: "sinco",
    // Note that getting cookies will get ones on the current page,
    // so setting `url` here to "https://google.com", means this cookie won't
    // exist when we try to retrieve it
    url: "https://drash.land",
  });
  const cookies = await page.cookie();
  await Sinco.done();
  assertEquals(cookies[0].name, "project");
  assertEquals(cookies[0].value, "sinco");
});
```

Here you are going to create your headless browser instance, and navigate to
https://drash.land. Once the page has loaded, you will set a new cookie on the
page. You will then assert that the cookie you just set, exists as expected.

## Verification

1. Run your test.

```shell
$ deno test --allow-run --allow-read --allow-net app_test.ts
```

2. All of your tests should pass
