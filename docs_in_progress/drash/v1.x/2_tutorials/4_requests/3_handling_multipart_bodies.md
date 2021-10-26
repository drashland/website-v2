# Handling Multipart Bodies

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Drash's `multipart/form-data` parser uses Deno Standard Modules'
`MultipartReader`.

You can get a value from a `multipart/form-data` request body by using the
following in a resource:

```typescript
const param = this.request.getBodyFile("file_name");
```

## Folder Structure End State

```text
▾ /path/to/your/project/
  ▾ uploads/
    my_uploaded_file.txt
  app.ts
  deps.ts
  my_file.txt
```

## Steps

1. Create your `app.ts` file. Your resource in this file will check for the
   `my_file` param in the request's body. If it exists, then it will write its
   contents to `outputFile`. If it does not exist, then it will throw a
   `400 Bad Request` response.

The `memory_allocation.multipart_form_data` server config is how much memory in
megabytes you want to allow the `multipart/form-data` reader to allocate to
reading files. If you do not specify this config, Drash will default to `10`
megabytes.

    ```typescript
    // app.ts

    import { Drash } from "./deps.ts";

    // Create your resource

    class FilesResource extends Drash.Http.Resource {
      static paths = [
        "/files",
      ];

      public POST() {
        const decoder = new TextDecoder();
        const file = this.request.getBodyFile("my_file");

        if (!file || !file.content) {
          throw new Drash.Exceptions.HttpException(
            400,
            "This resource requires files to be uploaded via the request body.",
          );
        }

        const outputFile = "./uploads/my_uploaded_file.txt";

        Deno.writeFileSync(outputFile, file.content);

        this.response.body = `You uploaded the following to ${outputFile}: ` +
          `\n${decoder.decode(file.content)}`;

        return this.response;
      }
    }

    // Create your server

    const server = new Drash.Http.Server({
      response_output: "text/plain",
      resources: [FilesResource],
      memory_allocation: {
        multipart_form_data: 128,
      },
    });

    server.run({
      hostname: "0.0.0.0",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

2. Create your `my_file.txt` file so it can be passed in the request body.

    ```text
    Hello, world!

    I am a simple text file.
    ```

## Verification

1. Run your app.

    ```shell
    $ deno run --allow-net --allow-write app.ts
    ```

2. Create your `uploads` folder in your project's directory. This is where the
   output file will be stored. If you skip this step, you will get an error
   similar to "no such file or directory" from your server.

3. Using `curl` (or similar command), make a `POST`, request to
   `localhost:1447/files` and pass in `my_file.txt` in the request body. The
   name of the file is before `=@`. This is the name your resource will check
   for when trying to get the file.

    ```text
    $ curl -F "my_file=@my_file.txt" localhost:1447/files
    ```

You should receive the following response:

    ```text
    You uploaded the following to ./uploads/my_uploaded_file.txt:
    Hello, world!

    I am a simple text file.
    ```

4. Check your `uploads` directory. You should see `my_uploaded_file.txt` with
   the following contents:

    ```text
    Hello, world!

    I am a simple text file.
    ```

5. Make the same request, but change the file's name to `hello`.

    ```text
    curl -F "hello=@my_file.txt" localhost:1447/files
    ```

You should receive the following response:

    ```text
    This resource requires files to be uploaded via the request body.
    ```
