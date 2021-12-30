# Introduction

By default, `Errors` are sent as a text response with `error.stack`, we can see all affected files and lines.
The Error Service is here to customize this error response.

## Declare Custom ErrorService

You can declare your ErrorService like that:

```typescript
const server = new Drash.Server({
  ...
  ...
  ...
  error_service: new MyErrorService(),
});
```

You can declare only 1 ErrorService for all server.
