# Introduction

Drash is a microframework for Deno's HTTP server.

Learn more about Drash [here](about-drash).

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `app.ts` file.

   ```typescript
   // app.ts

   // Replace `<VERSION>` with the Drash v2.x version you want to use. // All
   versions can be found at
   https://github.com/drashland/drash/releases?q=v2&expanded=true. import * as
   Drash from "https://deno.land/x/drash@<VERSION>/mod.ts";

   // Create your resource

   class HomeResource extends Drash.Resource { public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.json({
         hello: "world",
         time: new Date(),
       });
     }

   }

   // Create and run your server

   const server = new Drash.Server({
     hostname: "0.0.0.0", port: 1447, protocol:
    "http", resources: [ HomeResource, ],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

4. Run your `app.ts` file.

    ```shell
    $ deno run --allow-net app.ts
    ```

5. Go to `http://localhost:1447` in your web browser.

You should see something like the following:

    ```text
    {"hello":"world","time":"2021-10-09T21:08:21.982Z"}
    ```

## Features

- Zero third-party dependencies outside of Deno Standard Modules
- Extensively documented
- Server-side rendering (SSR)
- Single page application (SPA) support
- Content negotiation
- Dynamic paths
- Services (e.g. middleware, caching, logging)
- Request body parsing
- Deno Deploy support

## Badge

Want to show your support? Feel free to use our badge below!

```text
<a href="https://drash.land/drash">
  <img alt="Powered by Drash" src="https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC">
</a>

[![powered-by-drash](https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC)](https://drash.land/drash)
```
