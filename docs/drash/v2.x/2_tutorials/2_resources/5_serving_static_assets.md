# Serving Static Assets

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Example](#example)

## Before You Get Started

Drash has a unique, object orientated way to serve static assets. In other
projects, you may be used to serving static assets via Nginx, Apache, middleware
(e.g. `serve-static` in Node), or a single route. With Drash, you can use
resources to serve your static assets, and this makes complete sense. Why?

1. Requests for assets such as JavaScript and image files still need to "hit" a
   resource.
2. These are no different than any other request made to your Drash application.
3. Defining a resource to render assets gives you unlimited configuration and
   you have access to everything any other resource would have access to.
4. Semantically, it just makes sense!

So, what you would do is create a resource for these endpoints and respond with
the related file. A common resource name for doing this in Drash is
`FilesResource`.

## Example

In this example, we are going to be using a `FilesResource`, defined by us, to
handle requests for all your JavaScript, CSS, and image files.

When your web application uses client assets, such as JavaScript files, it will
make a request to your server. What you are going to be doing is creating a
resource for these requests, and essentially, returning the requested files'
content.

The `FilesResource` is going to render and handle any requests for files and
this could be anything you want to serve! JavaScript? CSS? Favicons? User
images? You can serve all of that! However, here we are going to be using
JavaScript, CSS, and Favicons.

1. {{ placeholder: drash_create_deps_file_step }}

1. Create your resource file that will handle your static assets.

   ```typescript
   // File: files_resource.ts

   import { Drash } from "./deps.ts";

   export class FilesResource extends Drash.Resource {
     // This resource will handle the following paths:
     //
     //   1. /favicon.ico
     //   2. /public/<anything>.<extension>
     //
     // With the power of URLPattern, which is what Drash uses internally
     // to create paths based on a resources paths, you can use regex to
     // define your own paths.
     //
     // Here, your resource will be able to handle requests like:
     //
     // /public/js/app.js
     // /public/app.js
     // /public/css/one/two/three/app.css
     // /public/images/users/52/profile_picture.png
     // /public/images/logos/logo.svg
     //
     // Due to the regex below: "/public/.*\.(jpg|png|svg|css|js)"
     //
     //   .* - This means it will match anything, such as /public/hello, /public/very/deep/path
     //   \. - A literal ".", because as this is a files resource, the request url should have an extension: ".css"
     //   (jpg|png|svg|css|js) - Following the ".", the path should end in ONE of these values
     paths = ["/favicon.ico", "/public/.*\.(jpg|png|svg|css|js)"];

     public GET(request: Drash.Request, response: Drash.Response) {
       const path = new URL(request.url).pathname;
       // The path will now be something that matches the `paths` property,
       // for example: "/favicon.ico"

       // With any request, we need to set a response, so what we will do is
       // find the file using the path, with Drash's `file()` method.
       // For more information on this method, see https://drash.land/drash/v2.x/tutorials/responses/setting-the-body#file,
       // but it will read the content of the parameter passed in, and set that as the body
       //
       // Be aware that this can be insecure if you haven't limited your `paths` property, for example,
       // say you have confidential images in `./private`, and your path looks like `paths = [..., "/private/\."],
       // a user CAN make a request to `https://.../private/my_invoice_2021.pdf
       return response.file(`.${path}`); // response.file("./favicon.ico")
     }
   }
   ```

1. Next, add it to your server just like any other resource:

   ```typescript
   // File: app.ts

   import { Drash } from "./deps.ts";
   import { FilesResource } from "./files_resource.ts";

   const server = new Drash.Server({
     // ... other server config
     // ... other server config
     // ... other server config
     resources: [
       // ... other resource
       // ... other resource
       // ... other resource
       FilesResource,
     ],
   });
   ```

And there you have it! You can now handle any file you want and the options are
limitless:

- You can make your files resource only handle `/favicon.ico` if you do not use
  any other assets in your application
- You can split out your resource into multiple resources:
  - If handling requests for `.js` files, you can have a `JSFileResource`
  - If handling requests for `favicon.ico`, you can have a `FaviconFileResource`
  - If handling requests for `.css` files, you can have a `CSSFileResource`
- You can add services to this resource
- You could create an authentication service to only allow logged in users to
  view certain paths

You have absolutely full control over how responses are sent and how to handle
requests to your resources that handle files.

A files resource is not special. It is no different than a resource that will
update a user in a database. All you are doing is telling it to handle assets
and specific endpoints -- this is your asset resource.
