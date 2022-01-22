# v3 to v4 Migration Guide

This is the migration guide for upgrading from v3 to v4.

There are a few things you would need to change, but we hoped that
changing these would improve the experience long term, so whilst migrating is a
pain (as we all know), the API will make more sense and be easier to write.

This version, we continue to be even closer to the browser APIs. All the classes introduced in version 3 are carried forward, plus, we have introduced changes in the actual way you would interact with your browser. For instance now the `buildFor` method returns an object with two values - a `Client` object and a `Page` object, representing your browser and its first tab.


```ts
const {browser, page} = await buildFor(...)
await page.location("https://drash.land");
const elem = await page.querySelector('div');
await page.evaluate(...);
await browser.close();
```


## `buildFor()`

The returned object has been changed significantly. It now consists of a `Client` object referred to as "browser" and a `Page` object referred to as "page".

This refers to usage of a "browser" and a "page":

```ts
const { browser, page } = await buildFor(...);
await page.someMethod(...);
await browser.someOtherMethod();
```

### `Page#goTo()`

Has now been retired. You will now use `page.location(...)` only instead.


## `Page#waitForPageChange`

Has now been retired, and functionality is implemented as default during navigations, or an option during actions, such as a click.

## `Page#assertSee()`

Has now been retired.

## `Client#done()`

Has now been renamed to `close()`.
