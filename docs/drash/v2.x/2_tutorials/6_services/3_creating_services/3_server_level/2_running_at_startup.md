# Running at Startup

Running services at startup time was introduced in v2.6.0. Please make sure you
are using v2.6.0 (or higher) before proceeding with this tutorial.

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial goes over creating a server-level service that runs at startup
time using `runAtStartup(...)`.

Specifically, it will show you how you can:

1. Compile TypeScript files to JavaScript source code during startup time.
2. Storing the JavaScript source code in memory.
3. Serving the stored JavaScript to clients.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  public/
       greeter.ts
       math_utils.ts
  ▾  resources/
       files_resource.ts
       home_resource.ts
  ▾  services/
       compiled_files_service.ts
     app.ts
     deps.ts
```

## Steps

1. Create your `app.ts` file.

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import FilesResource from "./resources/files_resource.ts";
   import HomeResource from "./resources/home_resource.ts";
   import compiledFilesService from "./services/compiled_files_service.ts";

   // Create your server and plug in the instantiated CompiledFilesService class

   const server = new Drash.Server({
     resources: [
       HomeResource,
       FilesResource,
     ],
     services: [
       compiledFilesService,
     ],
     hostname: "localhost",
     port: 1447,
     protocol: "http",
   });

   // Run your server

   server.run();

   console.log(`Server running at ${server.address}`);
   ```

2. Create your `services/compiled_files_service.ts` file.

   The service in this file will be in charge of taking `public/greeter.ts` and
   `public/math_utils.ts` and compiling their code to JavaScript so that they
   can be used in the browser.

   ```typescript
   // File: services/compiled_files_service.ts

   import { Drash } from "../deps.ts";

   class CompiledFilesService extends Drash.Service {
     /**
      * Map to hold source code -- retrievable via `.get(filename)`.
      */
     #source_code_map = new Map<string, string>();

     /**
      * Run the following code at startup time.
      */
     public runAtStartup(
       options: Drash.Interfaces.IServiceStartupOptions,
     ): void {
       this.#compileFile("./public/greeter.ts");
       this.#compileFile("./public/math_utils.ts");
     }

     /**
      * Get the compiled source code associated with the given filename.
      *
      * @param filename - The key in the #source_code_map.
      */
     public getSourceCode(filename: string): string | undefined {
       console.log(`Getting ${filename} from source code map.`);
       return this.#source_code_map.get(filename);
     }

     /**
      * Compile the given file from TS to JS.
      *
      * @param tsFile - The TS file to compile.
      */
     async #compileFile(tsFile: string): Promise<void> {
       console.log(`Compiling ${tsFile} to JavaScript.`);

       const { files } = await Deno.emit(tsFile);

       for (const [key, sourceCode] of Object.entries(files)) {
         const filename = key.split("/").pop();

         if (!filename) {
           continue;
         }

         this.#source_code_map.set(filename, sourceCode);
       }
     }
   }

   export default new CompiledFilesService();
   ```

3. Create your `resources/home_resource.ts` file.

   The resource in this file will be in charge of sending an HTML document for
   `GET /` requests. The HTML document will contain `script` tags that request
   `greeter.ts.js` and `math_utils.ts.js` -- your TypeScript files that will be
   compiled at startup time by the `CompiledFilesService` class.

   ```typescript
   // File: resources/home_resource.ts

   import { Drash } from "../deps.ts";

   export default class HomeResource extends Drash.Resource {
     public paths = ["/"];

     /**
      * Property to serve as the HTML document to serve back to clients.
      */
     #html = `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>Drash</title>
     </head>
     <body>
       <p style="font-family: Helvetica, Arial, sans-serif; max-width: 400px">
         Check your browser's inspector and console to see your TypeScript files compiled to JavaScript and them being available during runtime.
       </p>

       <script src="/public/greeter.ts.js"></script>
       <script src="/public/math_utils.ts.js"></script>
       <script>
         // Use math_utils.ts.js
         console.log("Calling MathUtils.add(1, 2, 3):");
         console.log(MathUtils.add(1, 2, 3));

         // Use greeter.ts.js
         console.log(\`Calling saySomething("Deno + Drash Woop Woop!"):\`);
         Greeter.yellSomething("DENO + DRASH WOOP WOOP!")
       </script>
     </body>
   </html>
   `;

     /**
      * Handle GET requests and return the HTML document in the #html property.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       return response.html(this.#html);
     }
   }
   ```

4. Create your `resources/files_resource.ts` file.

   The resource in this file will be in charge of handling
   `GET /pubilc/:filename` requests. The `:filename` path param will be used to
   retrieve compiled source code in the `#source_code_map` property in the
   `CompiledFilesService` class. Basically, the HTML document in the previous
   step will request your compiled TypeScript files and those requests will be
   handled in this resource.

   ```typescript
   // File: resources/files_resource.ts

   import { Drash } from "../deps.ts";
   import compiledFilesService from "../services/compiled_files_service.ts";

   export default class FilesResource extends Drash.Resource {
     public paths = ["/public/:filename"];

     /**
      * Handle GET requests.
      *
      * @param request - The incoming request from the client.
      * @param response - The response to send back to the client.
      */
     public GET(request: Drash.Request, response: Drash.Response): void {
       const filename = request.pathParam("filename");
       if (!filename) {
         throw new Drash.Errors.HttpError(
           400,
           `Path param "filename" required.`,
         );
       }

       const sourceCode = compiledFilesService.getSourceCode(filename);
       if (!sourceCode) {
         throw new Drash.Errors.HttpError(
           404,
           `Could not find file ${filename}.`,
         );
       }

       // Send the source code to the client in the response with a
       // Content-Type of `application/javascript`
       return response.send("application/javascript", sourceCode);
     }
   }
   ```

5. Create your `public/greeter.ts` file.

   Although this file is written in TypeScript, it will be available as
   JavaScript during runtime and used in the browser.

   ```typescript
   // File: public/greeter.ts

   class Greeter {
     static yellSomething(something: string): void {
       console.log(something.toUpperCase());
     }
   }
   ```

6. Create your `public/math_utils.ts` file.

   Although this is written in TypeScript, it will be available as JavaScript
   during runtime and used in the browser.

   ```typescript
   // File: public/math_utils.ts

   class MathUtils {
     static add(...numbers: number[]): number {
       return numbers.reduce((p: number, c: number) => p + c);
     }
   }
   ```

## Verification

1. Run your app.

   ```typescript
   $ deno run --allow-net --allow-read --unstable app.ts
   ```

   _The `--unstable` flag is required because the above code uses unstable Deno
   code (`Deno.emit()`) to compile the TypeScript files to JavaScript._

2. Open your browser and navigate to `http://localhost:1447`.

3. When the HTML page is displayed, open your browser's console.

   You should output similar to the following:

   ```text
   Calling MathUtils.add(1, 2, 3):
   6
   Calling saySomething("Deno + Drash Woop Woop!"):
   DENO + DRASH WOOP WOOP!
   ```

   As you can see, this code was originally written in TypeScript in the
   `public` directory, but it is now being used as JavaScript since it was
   compiled to JavaScript at startup time.

   This is just a simple example, but you can take the same approach and write
   the TypeScript files to real JavaScript files on disk or even bundle them
   like in single page applications.
