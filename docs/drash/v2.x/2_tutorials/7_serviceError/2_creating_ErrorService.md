# Creating ErrorService

## Infos

The default ErrorService is :

```typescript
class ErrorService implements IErrorService {
    public runOnError(error: Errors.HttpError, response: Response): Response {
        response.status = error.code;
        response.text(error.stack ?? "Error: Unknown Error");
        return response;
    }
}
```

## Create ErrorService

To create an ErrorService, you need to create an extended class of `Drash.ErrorService`.

### example ErrorService

Change the error message to json and without debugging information :

```typescript
import { Drash } from "./deps.ts";

class MyErrorService extends Drash.ErrorService {
  runOnError(error: Drash.Errors.HttpError, response: Drash.Response): Drash.Response {
    response.status = error.code;
    response.json({error: error.message});
    return response;
  }
}
```
