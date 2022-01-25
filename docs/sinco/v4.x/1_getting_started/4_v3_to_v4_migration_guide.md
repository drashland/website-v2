# v3 to v4 Migration Guide

This is the migration guide for upgrading from v3 to v4.

There are a few things you would need to change, but we hoped that changing
these would improve the experience long term, so whilst migrating is a pain (as
we all know), the API will make more sense and be easier to write.

This version, we continue to be even closer to the browser APIs. All the classes
introduced in version 3 are carried forward, plus, we have introduced changes in
the actual way you would interact with your browser. For instance now the
`buildFor` method returns an object with two values - a `Client` object and a
`Page` object, representing your browser and its first tab.

```ts
const { browser, page } = await buildFor(...)
await page.location("https://drash.land");
const elem = await page.querySelector('div');
await page.evaluate(...);
await browser.close();
```

## `buildFor()`

The returned object has been changed significantly. It now consists of a
`Client` object referred to as "browser" and a `Page` object referred to as
"page".

This refers to usage of a "browser" and a "page":

```ts
const { browser, page } = await buildFor(...);
await page.someMethod(...);
await browser.someOtherMethod();
```

### `Page#goTo()`

Has now been retired. You will now use `page.location(...)` only instead.

You can still specify the url you wish to go to, but leaving the first parameter
blank will return the current url of the page:

```typescript
await page.location("https://drash.land"); // sends the page to this site
await page.location(); // returns the url: "https://drash.land/"
```

## `Page#takeScreenshot()`

The `selector` option has been removed from Screenshot options. Instead, now you
can query-select an `Element` from a `Page` object, and then call the
`takeScreenshot()` on it (no need to pass the selector again), as shown in the
following example:

```typescript
const elem = await page.querySelector("button#submit");
await elem.takeScreenshot("/path/to/folder");
```

## `Page#waitForPageChange`

Has now been retired, and functionality is implemented as default during
navigations, or an option during actions, such as a click.

This method was used if you clicked an element and maybe it sent you to another
page. Now, it is replaced by `.click({ waitFor: "navigation" })`. The first
parameter, if `options.waitFor` is set to `"navigation"`, the element will be
clicked and then it will wait for the page to change.

## `Page#assertSee()`

Has now been retired.

Instead you can try:

```typescript
const exists = page.evaluate(`document.body.innerText.includes("hello")`);
assertEquals(exists, true);
```

## `Client#done()`

Has now been renamed to `close()`.
