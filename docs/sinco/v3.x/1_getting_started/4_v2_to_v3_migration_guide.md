# v2 to v3 Migration Guide

This is the migration guide for upgrading from v2 to v3.

There are quite a few things you would need to change, but we hoped that changing
these would improve the experience long term, so whilst migrating is a pain (as
we all know), the API will make more sense and be easier to write.

The way Sinco's version 3 API was built was to provide abstraction and be closer to
browser API's. This is why we have added `Client`, `Page` and `Element` classes,
as a way to interact with those aspects, and abstract certain methods for
certain scenarios. Take version 2 for example. The `Client` class held a
`getInputValue` method, but the naming was long winded. Writing it wasn't similar
to how you may get the value of an input element in the browser. Due to this, we
decided to rename this to `value`, and place it under an `Element` class.

The main changes are the introduction of a Page and Element class, and many methods moved under those classes:

```ts
const client = await buildFor(...)
const page = await goTo("https://drash.land");
const elem = await page.querySelector('div');
await page.evaluate(...);
```

Which documentation already exists for. Nearly all methods have either been
moved into the `Element` or `Page` class. Hopefully it's already quite self-explanatory
where the methods have been moved to. For example, `type()` belongs in the
`Element` class, whereas `cookie()` belongs to the `Page` class.

## `buildFor()`

The returned class has been changed significantly.

This refers to usage of a "client":

```ts
const client = await buildFor(...);
await client.someMethod();
```

### `Client#goTo()`

The `goTo` method now returns an instance of a `Page` class, which you now use
to query elements, and any other actions related to the **page**.

```ts
const client = await buildFor("chrome");
const page = await client.goTo("https://drash.land");
```

And to change the page location, you can use
`await page.location("https://github.com");`.

## `Client#setCookie()`

This method is now on the `Page` class and renamed to `cookie()`, and allows to
get cookies too. See the
[documentation page](/sinco/v3.x/tutorials/page/cookies)

## `Client#evaluatePage`

Renamed to `evaluate` and now exists on the `Page` class. See the
[documentation page](/sinco/v3.x/tutorials/page/evaluate) for more information
on how to use it

## `Client#waitForPageChange`

Moved to the `Page` class. See the
[documentation page](/sinco/v3.x/tutorials/page/waiting)

## `Client#takeScreenshot()`

Moved to the `Page` class. See the
[documentation page](/sinco/v3.x/tutorials/page/take-screenshots)

## `Client#assertSee()`

Moved to the `Page` class. See the
[documentation page](/sinco/v3.x/tutorials/page/custom-assertions)

## `Client#getInputValue()` and `Client#type()`

Moved to the `Element` class, and combined into a single method called
`value()`. See the
[documentation page](/sinco/v3.x/tutorials/element/get-and-set-input-value)

## `Client.click()`

Moved to the `Element` class. See the
[documentation page](/sinco/v3.x/tutorials/element/clicking)

## `Client#assertUrlIs()`

Removed. Use the following instead:

```ts
const client = await buildFor(...)
const page = await client.goTo(...)
const location = await page.location()
await client.done()
assertEquals(location, "the expected url")
```
