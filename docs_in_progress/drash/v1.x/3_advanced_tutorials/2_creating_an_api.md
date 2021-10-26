# Creating An API

## Table of Contents

- [Overview](#overview)
- [Project End State](#project-end-state)
- [Steps](#steps)
  - [Simulate Database Records](#simulate-database-records)
  - [Create the Server](#create-the-server)
  - [Create the Resources](#create-the-resources)
- [Verification](#verification)

## Overview

In this tutorial, you will learn how to create a simple API that returns
`application/json` responses. The data your API will return will be data on
coffees and teas.

## Project End State

Upon completing this tutorial, your folder structure end state should look like
the following:

```text
▾ /path/to/your/project/
  app.ts
  coffee.json
  coffee_resource.ts
  response.ts
  tea.json
  tea_resource.ts
```

## Steps

### Simulate Database Records

For simplicity, you will simulate retrieving records from a database instead of
implementing database code. This simulated database records will be parsable as
JSON.

1. Create your `coffee.json` file.

   ```json
   {
     "17": {
       "id": 17,
       "name": "Light Roast: Breakfast Blend",
       "price": 2.25
     },
     "28": {
       "id": 28,
       "name": "Medium Roast: Classico",
       "price": 2.50
     },
     "32": {
       "id": 32,
       "name": "Medium Roast: Premium Single Origin (Sumatra)",
       "price": 3.50
     }
   }
   ```

2. Create your `tea.json` file.

   ```json
   {
     "50": {
       "id": 50,
       "name": "Earl Gray",
       "price": 4.00
     },
     "68": {
       "id": 68,
       "name": "Citrus Chamomile",
       "price": 3.50
     },
     "83": {
       "id": 83,
       "name": "Imperial Blend",
       "price": 4.50
     }
   }
   ```

### Create the Server

Now that you have your "database" records in place from Part 1, you need a
server to handle requests for that data. The server you will create in this
tutorial part will handle requests via the following resources:

- `CoffeeResource`
- `TeaResource`

1. Create your `app.ts` file.

You will notice there are `import` statements for your resource files in this
file. You will be creating these files in the next section. For now, you just
need to make sure your server registers them.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    import CoffeeResource from "./coffee_resource.ts";
    import TeaResource from "./tea_resource.ts";

    const server = new Drash.Http.Server({
      response_output: "application/json",
      resources: [
        CoffeeResource,
        TeaResource,
      ],
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

### Create the Resources

1. Create your `coffee_resource.ts` file.

Your coffee resource will try to match the specified coffee `id` path param to a
coffee ID in your "database". If the `id` is matched, then the record will be
sent as the response. If not, then an error response will be sent.

    ```typescript
    // coffee_resource.ts

    import { Drash } from "./deps.ts";

    export default class CoffeeResource extends Drash.Http.Resource {
      static paths = [
        "/coffee/:id",
      ];

      public GET() {
        const coffeeId = this.request.getPathParam("id");
        this.response.body = this.getCoffee(Number(coffeeId));
        return this.response;
      }

      protected getCoffee(coffeeId: number) {
        let record = null;

        try {
          let fileContentsRaw = Deno.readFileSync("./coffee.json");
          let decoder = new TextDecoder();
          let records = decoder.decode(fileContentsRaw);
          records = JSON.parse(records);
          record = records[coffeeId];
        } catch (error) {
          throw new Drash.Exceptions.HttpException(
            400,
            `Error getting coffee with ID "${coffeeId}". Error: ${error.message}.`,
          );
        }

        if (!record) {
          throw new Drash.Exceptions.HttpException(
            404,
            `Coffee with ID "${coffeeId}" not found.`,
          );
        }

        return record;
      }
    }
    ```

2. Create your `tea_resource.ts` file.

Your tea resource will try to match the specified tea `id` path param to a tea
ID in your "database". If the `id` is matched, then the record will be sent as
the response. If not, then an error response will be sent.

    ```typescript
    import { Drash } from "./deps.ts";

    export default class TeaResource extends Drash.Http.Resource {
      static paths = [
        "/tea/:id",
      ];

      public GET() {
        let teaId = this.request.getPathParam("id");
        this.response.body = this.getTea(Number(teaId));
        return this.response;
      }

      protected getTea(teaId: number) {
        let record = null;

        try {
          let fileContentsRaw = Deno.readFileSync("./tea.json");
          let decoder = new TextDecoder();
          let records = decoder.decode(fileContentsRaw);
          records = JSON.parse(records);
          record = records[teaId];
        } catch (error) {
          throw new Drash.Exceptions.HttpException(
            400,
            `Error getting tea with ID "${teaId}". Error: ${error.message}.`,
          );
        }

        if (!record) {
          throw new Drash.Exceptions.HttpException(
            404,
            `Tea with ID "${teaId}" not found.`,
          );
        }

        return record;
      }
    }
    ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Make a coffee request like below or go to `http://localhost:1447/coffee/17`
   in your web browser.

   ```shell
   $ curl http://localhost:1447/coffee/17
   ```

You should receive the following response (we pretty-printed the response for
you):

    ```json
    {
      "id": 17,
      "name": "Light Roast: Breakfast Blend",
      "price": 2.25
    }
    ```

3. Make a coffee request to `http://localhost:1447/coffee/32`. You should
   receive the following response (we pretty-printed the response for you):

   ```json
   {
     "id": 32,
     "name": "Medium Roast: Premium Single Origin (Sumatra)",
     "price": 3.5
   }
   ```

4. Make a bad coffee request to `http://localhost:1447/coffee/9000`. You should
   receive the following response (we pretty-printed the response for you):

   ```text
   "Coffee with ID \"9000\" not found."
   ```

5. Make a tea request to `http://localhost:1447/tea/50`. You should receive the
   following response (we pretty-printed the response for you):

   ```json
   {
     "id": 50,
     "name": "Earl Gray",
     "price": 4
   }
   ```

6. Make a tea request to `http://localhost:1447/tea/68`. You should receive the
   following response (we pretty-printed the response for you):

   ```json
   {
     "id": 68,
     "name": "Citrus Chamomile",
     "price": 3.5
   }
   ```

7. Make a bad tea request to `http://localhost:1447/tea/2710`. You should
   receive the following response (we pretty-printed the response for you):

   ```text
   "Tea with ID \"2710\" not found."
   ```

**Congrats! You finished this tutorial!**
