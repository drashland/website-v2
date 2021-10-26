# Handling Forms and File Uploads

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Getting a file from a form can be done by using the following in a resource:

```typescript
const file = this.request.getBodyFile("file_name");
```

In this tutorial, you will be able to go to:

- go to your browser;
- upload a file to a form; and
- send that form to your server

Your server will save that file.

## Folder Structure End State

```text
▾ /path/to/your/project/
  ▾ public/
    index.html
  app.ts
  profile_resource.ts
  user_1_pic.png
```

## Steps

1. Create your `profile_resource.ts` file. Your resource file will check for the
   `profile-picture` file in the request's body. If it exists, then it will
   write its contents to `outputFile`. If it does not exist, then it will throw
   a `400 Bad Request` response.

    ```typescript
    // profile_resource.ts

    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";

    export default class ProfileResource extends Drash.Http.Resource {
      static paths = [
        "/profile",
      ];

      public GET() {
        const htmlFilePath = "./public/index.html";
        const rawHtmlContents = Deno.readFileSync(htmlFilePath);
        const decodedHtmlContents = new TextDecoder().decode(rawHtmlContents);
        this.response.body = decodedHtmlContents;
        return this.response;
      }

      public POST() {
        const decoder = new TextDecoder();
        const username = this.request.getBodyParam("username");
        const file = this.request.getBodyFile("profile-picture");

        console.log(username);
        console.log(file);

        if (!file || !file.content) {
          throw new Drash.Exceptions.HttpException(
            400,
            "This resource requires files to be uploaded via the request body.",
          );
        }

        const outputFile = "./user_1_pic.png";

        Deno.writeFileSync(outputFile, file.content);

        this.response.body = `You uploaded the following to ${outputFile}: ` +
          `\n${decoder.decode(file.content)}`;

        return this.response;
      }
    }
    ```

2. Create your `public/index.html` file so you can fill out a form and send it
   in the request to your server.

    ```html
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <form>
          <input name="username" type="text">
          <input type="file" name="profile-picture">
          <button id="submit" type="button">Submit</button>
        </form>
        <script>
          window.addEventListener("DOMContentLoaded", () => {
            document.getElementById("submit").addEventListener("click", async () => {
              const form = document.querySelector("form");
              await fetch("http://localhost:1447/profile", {
                method:  "POST",
                body: new FormData(form)
              });
            });
          });
        </script>
      </body>
    </html>
    ```

3. Create your `app.ts` file. The `memory_allocation.multipart_form_data` config
   is how much memory in megabytes you want to allow the `multipart/form-data`
   reader to allocate to reading files. If you do not specify this config, Drash
   will default to `10` megabytes.

    ```typescript
    // app.ts

    import { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";
    import ProfileResource from "./profile_resource.ts";

    const server = new Drash.Http.Server({
      response_output: "text/html",
      resources: [ProfileResource],
      memory_allocation: {
        multipart_form_data: 128,
      },
    });

    server.run({
      hostname: "localhost",
      port: 1447,
    });

    console.log(`Server running. Go to http://${server.hostname}:${server.port}.`);
    ```

## Verification

1. Run your app.

    ```shell
    $ deno run --allow-net --allow-write --allow-read app.ts
    ```

2. Go to `http://localhost:1447/profile` in your browser, fill in the form
   (where the username is "Drashland") and press the "Submit" button.

Feel free to select any file, preferably an image with the name `user_1_pic.png`
as this tutorial uses that name and is about a profile picture.

You should receive the following response in your terminal (we have pretty
printed it for you):

    ```text
    Drashland
    {
      filename: "...",
      type: "image/...",
      content: ...,
      size: ...
    }
    ```

3. Check your root directory. You should see a new `user_1_pic.png` file, that
   should be the exact same image as the one you uploaded
