# Serving Static Assets

Drash has a unique, object orientated way to serve static assets. In other
projects, you may e used to serving static assets via Nginx, Apache, middleware,
or a single route. With Drash, you can use resources to serve your static
assets, and this makes complete sense. Why?

1. Requests for assets such as javascript and image files still need to 'hit' a
   resource
2. These are no different than any other request made to your Drash application
3. Defining a resource to render assets gives you unlimited configuration, and
   you have access to everything any other resource would have access to
4. Semantically, it just makes sense!

So what you would do is create a resource for these endpoints, and respond with
the related file. A common resource name for doing this in Drash, is a "Files
Resource"

- `/path/:id`
- `/path/:id?`
- `/[a-z]/[0-9]`

## Table of Contents

In this example, we are going to be using a `FilesResource`, defined by us, to
handle requests for all your javascript, stylesheet, and image files.

When your web application uses client assets, such as javascript files, it will
make a request to your server. What you are going to be doing is, creating a
resource for these requests, and essentially, returning the requested files
content.

The files resource is going to render and handle any requests for files, this
could be anything you want! JavaScript? Stylesheets? Favicons? User images? But
here we're going to be using javascript, stylesheets and favicons.

1. First, you will want to create your resource:

   ```typescript
   // File: app.ts

   import { Drash } from "../deps.ts";

   class FilesResource extends Drash.Resource {
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

2. And add it to your server just like any other resource:

   ```typescript
   const server = new Drash.Server({
     ...,
     resources: [
       ...,
       FilesResource
     ]
   });
   ```

And there you have it! You can now handle any file you want, and the options are
limitless:

- You can make your files resource only handle `/favicon.ico` is you do not use
  any other assets in your application
- You can split out your resource into two, if handling requests for `.js` files
  differs from handling a `favicon.ico` file
- You can add services to this resource
- You could create an auth service to only allow logged in users to view certain
  paths
- You have absolutely full control over how responses are sent, and how to
  handle requests

A files resource isn't special, it's no different than a resource that will
update a user ina database. All you're doing is telling it to handle assets,
this is your asset resource.
