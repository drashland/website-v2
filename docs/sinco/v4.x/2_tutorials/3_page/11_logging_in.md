# Logging In

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Whilst Sinco doesn't provide much to help you log in to apps, we will explain
how you can do it via Sinco.

We are going to cover two areas:

- Handling requests that may require cookies; and
- Handling logging in to an application via forms, if an app is behind an
  authentication service (which may then provide you with an `X-CSRF-TOKEN`
  header in your subsequent requests).

## Cookies

If a resource requires a specific cookie, you can it before you change your
location to the page you wish to visit.

For more information, please see the
[cookie documentation](https://drash.land/sinco/v4.x/tutorials/page/cookies)

```ts
const { browser, page } = await buildFor("chrome");
await page.cookie({
  name: "_token",
  value: "test",
  url: "my.authenciated.app",
});
await page.location("my.authenticated.app");
```

## Forms

Forms are slightly different. What you will want to do, is go through the login
process yourself, controlling the flow via Sinco instead of directly interacting
with the page via your mouse and keyboard.

The flow you will take will be:

- Go to your 'login' page
- Fill out the form
- Submit the form
- Wait for the request to finish
- Your page session should now hold any cookies or headers your server may set,
  and you should hopefully be redirected to your main page

```ts
const { browser, page } = await buildFor("chrome");
await page.location("http://localhost:1447/login");
const email = await page.querySelector(`input[name="email"]`);
const password = await page.querySelector(`input[name="password"]`);
await email.value("admin@example.com");
await password.value("secret");
const submit = await page.querySelector(`button[type="submit"]`); // or "#submit" if your JS handles the submission for example
await submit.click({
  waitFor: "navigation",
});
// Now you should be logged in
console.log(await page.location()); // "http://localhost:1447/dashboard"
```
