# Recommended Services

If you plan on creating a Drash application, there are a few services we have
created, that we believe are part of a 'recommended set' to use in your
application. Why? Because these services have many benefits for every single
Drash application.

If you aren't familiar with services, please read the
[services documentation](https://drash.land/drash/v2.x/tutorials/services/introduction)
before reading on.

## List of Services to Use

These services can be very useful when added by default because they can add
builtin logging, or ways to secure your server or system. Therefore we believe
that every Drash application should use the below services, _but not required!_.
The choice is still yours!

1. [`paladin`](/drash/v2.x/tutorials/services/drash-approved-services/paladin)
2. [`dexter`](/drash/v2.x/tutorials/services/drash-approved-services/dexter)
3. [`rate limiter`](/drash/v2.x/tutorials/services/drash-approved-services/rate-limiter)
   (If your application is an API)

## Example

Here is an example of how you may construct your Drash server to use these
services:

```typescript
import { Drash, PaladinService, DexterService, RateLimiterService, CSRFService } from "./deps.ts";

const csrf = new CSRFService({
  cookie: true,
});
const rateLimiter = new RateLimiterService({
  timeframe: 60 / 1000, // 60m (60m divided by 1000 = 60 minutes in milliseconds)
  max_requests: 50,
});
const dexter = new Dexter({
  url: true,
  datetime: true,
  method: true,
});
const paladin = new PaladinService();

const server = new Drash.Server({
  ...,
  services: [
    paladin,
    csrf,
    dexter,
    rateLimiter,
  ],
  ...
})
```
