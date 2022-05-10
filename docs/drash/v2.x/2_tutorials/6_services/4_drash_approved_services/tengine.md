# Tengine

This service is allows your Drash application to render HTML using a template
engine.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

To use this service, edit your `deps.ts` file to include the service.

```typescript
// deps.ts

...
...
...
export { TengineService } from "https://deno.land/x/drash@<VERSION>/src/services/tengine/tengine.ts";
```

Replace `<VERSION>` with the latest version of **Drash v2.x**. The latest
version can be found [here](https://github.com/drashland/drash/releases/latest).

This service can do the following:

- Render template variables
- Render template partials
- Render extended templates
- Evaluate in-template JavaScript

This tutorial will go over the following:

- Extending a template
- Including a template partial
- Writing a template
- Writing in-template JavaScript (a `for` loop and `if/else` conditional)

## Folder Structure End State

```text
▾ /path/to/your/project/
  ▾ views/
    index.html
    layout.html
    user_details.html
  app.ts
  deps.ts
```

## Steps

1. Create your `layout.html` template. This template will be extended by
   `index.html` via the `<% extends() %>` tag. When a template extends another
   template, the template that uses the `<% extends() %>` tag will be placed
   into the `<% yield %>` tag of the extended template.

```html
<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <title>Drash + Tengine</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
  </head>
  <body style="background: #f4f4f4">
    <% yield %>
  </body>
</html>
```

2. Create your `user_details.html` template partial. This will be included in
   `index.html`. As you can see, this template partial uses in-template
   JavaScript (`for` loop and `if/else` conditional). All in-template JavaScript
   will be evaluated by Tengine at runtime and rendered appropriately.

```html
<ul>
  <% for (let field in user.details) { %>
    <!-- Do not show the Phone field -->
    <% if (field !== "Phone") { %>
  <li><% field %>: <% user.details[field] %></li>
    <% } %>
  <% } %>
</ul>
```

3. Create your `index.html` template. This template will extend `layout.html`
   via the `<% extends() %>` tag. This template will also include the
   `user_details.html` template partial via the `<% includes() %>` tag.

```html
<% extends("/layout.html") %>

<div style="max-width: 640px; margin: 50px auto;">
  <h1 class="text-5xl mb-5"><% user.name %></h1>
  <% include_partial("/user_details.html") %>
</div>
```

4. Create your `app.ts` file.

```typescript
// app.ts

import { Drash, TengineService } from "./deps.ts";

// Instantiate and configure TengineService

const tengine = new TengineService({
  views_path: "./views",
});

// Create your resource with TengineService enabled on GET requests

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  public GET(_request: Drash.Request, response: Drash.Response): void {
    const templateVariables = {
      user: {
        name: "Jae",
        details: {
          "Role": "Software Engineer",
          "Phone": "(555) 555-5555",
          "E-mail": "jae@example.com",
        },
      },
    };

    const html = response.render("/index.html", templateVariables) as string;

    response.html(html);
  }
}

// Create and run your server

const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [HomeResource],
  services: [tengine],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

## Verification

1. Run your app.

```shell
$ deno run --allow-net --allow-read app.ts
```

2. Open up your web browser and navigate to `http://localhost:1447`. You should
   see the following:

![Drash and Tengine](/drash/v2.x/tengine.png "Drash and Tengine")

As you can see, everything has been rendered except for the `Phone` field since
the in-template JavaScript in `user_details.html` conditionally removes it.
