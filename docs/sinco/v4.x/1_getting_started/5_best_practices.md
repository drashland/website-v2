# Best Practices

As Sinco runs a subprocess, the subprocess will only be closed if:

- It is told to do so internally; or
- You tell it to. Otherwise it becomes a zombie process, and you will have to
  manually terminate it via Monitor, Task Manager or other related process
  managers.

This can lead to dozens of browser processes running on your system, when you
aren't even using them, and Sinco isn't either.

There are various ways to combat this:

## Close the Client Before Asserting

We cannot know when you want to assert. If your assertion fails but you have not
called `.close()`, the test case will throw an error and the subprocess will
never end. This is not something we can address -- it comes down to you.

To combat this, you should close your client before any assertions (where
possible):

```ts
// Run any code that will speak to the headless browser
const { browser, page } = await buildFor("chrome");
await page.location("https://drash.land");
const location = await page.location();
const elem = await page.querySelector("input");
const inputValue = await elem.value();
// Close the process as we dont need it anymore and it isn't left hanging
await client.close();
// Make our assertions as normal
assertEquals(location, "https://drash.land/");
assertEquals(inputValue, "some value");
```

## Wrap Your Code in a try/catch

It would be best to wrap your code in a try/catch block where possible, so if
something does throw an unexpected error, you are able to close the client:

```ts
const { browser, page } = await buildFor("chrome");
await page.location("https://drash.land"); // if page doesn't exist, Sinco will called close() itself, and throw an error safely
const elem = await page.querySelector("input"); // if element doesn't exist, Sinco will called close() itself, and throw an error safely
try {
  const elem2 = await page.querySelector("div");
  await elem2.value("hello world"); // A div is not an input element, error thrown!
} catch (e) {
  await browser.close();
  throw e;
}
await browser.close();
assertEquals(location, "https://drash.land/");
assertEquals(inputValue, "some value");
```
