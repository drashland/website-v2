# Introduction

Drash is an HTTP microframework for Deno's HTTP server.

Learn more about Drash [here](about).

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

  import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

  // Create your resource

  class HomeResource extends Drash.Http.Resource {
    static paths = ["/"];
    public GET() {
      this.response.body = `Hello World! (on ${new Date()})`;
      return this.response;
    }
  }

  // Create and run your server

  const server = new Drash.Http.Server({
    response_output: "text/html",
    resources: [HomeResource]
  });

  server.run({
    hostname: "0.0.0.0",
    port: 1447
  });

  console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
  ```

4. Run your `app.ts` file.

  ```shell
  $ deno run --allow-net app.ts
  ```

5. Go to `http://localhost:1447` in your web browser.

  You should see something like the following:

  ```text
  Hello World! (on 2021-09-26T12:29:13.510Z)
  ```

## Features

* Zero third-party dependencies outside of Deno Standard Modules
* Extensively documented
* Content negotiation
* Dynamic paths
* Middleware
* Request body parsing

## Badge

Want to show your support? Feel free to use our badge below!

```text
<a href="https://drash.land/drash">
  <img alt="Powered by Drash" src="https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC">
</a>

[![powered-by-drash](https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC)](https://drash.land/drash)
```
