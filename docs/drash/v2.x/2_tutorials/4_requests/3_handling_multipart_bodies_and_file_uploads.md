# Handling Multipart Bodies and File Uploads

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Further Reading](#further-reading)

## Before You Get Started

You can get a value from a request's body by using the following in a resource:

```typescript
const param = request.bodyParam<string>("param_name");
```

Note that when uploading files, the content type of the request must be
`multipart/form-data`, this is just the nature of how the browser uploads files
with requests.

Handling requests for files is just like handling any other request. You're able
to get any form data from the request, including files.

When Drash receives a request, it will check the content type. If it is
`multipart/form-data`, it will pull all data from the body and construct it into
a nice object, which you can use `bodyParam()` to get those values. When
retreiving files, note that the return value is of type `Drash.Types.BodyFile`:

```ts
type BodyFile = {
  content: Uint8Array; // the file content
  size: number; // size of the file in bytes, eg 700000 would be 700KB
  type: string; // the content type eg "image/png"
  filename: string; // The filename from when it was uploaded
};
```

To interact with the file, you need to access `.content`.

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app.ts` file. Your resource in this file will render a basic
   HTML page to include a form, and handle a POST request, that will save the
   file from the request body.

   ```typescript
   // app.ts

   import { Drash } from "./deps.ts";

   // Create your resource

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.html(
         `<!DOCTYPE html>
        <html>
            <head>

            </head>
            <body>
                <form action="/" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" />
                    <input name="name" type="text" />
                    <button type="submit">submit</button>
                </form>
            </body>
        </html>`,
       );
     }

     public POST(request: Drash.Request, response: Drash.Response) {
       const file = request.bodyParam<Drash.Types.BodyFile>("file"); // "file" being the `name` of the input element
       const name = request.bodyParam<string>("name");
       console.log("Got name and file!", file, name);
       if (!file) {
         throw new Error("File is required!");
       }
       Deno.writeFileSync(file.filename, file.content);
     }
   }

   // Create and run your server
   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     resources: [
       HomeResource,
     ],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```

## Verification

1. Run your app.

   ```shell
   $ deno run --allow-net app.ts
   ```

2. Visit the address shown in the console, select any file you wish for the
   form, and a name, and submit! Check your logs and you should see a similar
   response:

   ```text
   Got name and file! {
     type: "image/jpg",
     content: Uint8Array [ ... ],
     filename: "yourfile.jpg",
     size: 700000
   } Drashland
   ```

3. Now check the filesystem, you should see a new file and if you click it, it
   should successfully display the file you just uploaded!
