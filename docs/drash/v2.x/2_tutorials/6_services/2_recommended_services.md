# Recommended Services

If you plan on creating a Drash application, there are a few services we have
created that we believe are part of a "recommended set" to use in your
application. Why? Because these services have many benefits for every single
Drash application.

If you are not familiar with services, please read the
[Services > Basics](/drash/v2.x/tutorials/services/introduction) documentation
before reading on.

## List of Services to Use

These services can be very useful when added by default because they can add
builtin logging, or ways to secure your server or system. Therefore we believe
that every Drash application should use the below services, _but not required!_
The choice is still yours!

- [CSRF](/drash/v2.x/tutorials/services/drash-approved-services/csrf)
- [Dexter](/drash/v2.x/tutorials/services/drash-approved-services/dexter)
- [Paladin](/drash/v2.x/tutorials/services/drash-approved-services/paladin)
- [Rate Limiter](/drash/v2.x/tutorials/services/drash-approved-services/rate-limiter)
  (If your application is an API)

## Example

Below is a simple example of how you may construct your Drash server to use
these services.

### Steps

1. {{ placeholder: create_deps_file_step_text_only }}

   ```typescript
   // File: deps.ts

   // @Export drash_from_deno_no_version_comment
   // @Export csrf_service_from_deno_no_version_comment
   // @Export dexter_service_from_deno_no_version_comment
   // @Export paladin_service_from_deno_no_version_comment
   // @Export rate_limiter_service_from_deno_no_version_comment
   ```

1. Set up your `app.ts` file to use the services.

   ```typescript
   // File: app.ts

   import {
     CSRFService,
     DexterService,
     Drash,
     PaladinService,
     RateLimiterService,
   } from "./deps.ts";

   const csrf = new CSRFService({
     cookie: true,
   });

   const rateLimiter = new RateLimiterService({
     timeframe: 60 / 1000, // 60m (60m divided by 1000 = 60 minutes in milliseconds)
     max_requests: 50,
   });

   const dexter = new DexterService({
     url: true,
     datetime: true,
     method: true,
   });

   const paladin = new PaladinService();

   class HomeResource extends Drash.Resource {
     public paths = ["/"];

     public GET(request: Drash.Request, response: Drash.Response): void {
       response.text("Hello!");
     }
   }

   const server = new Drash.Server({
     hostname: "localhost",
     port: 1447,
     protocol: "http",
     resources: [
       HomeResource,
     ],
     services: [
       paladin,
       csrf,
       dexter,
       rateLimiter,
     ],
   });

   server.run();

   console.log(`Server running at ${server.address}.`);
   ```
