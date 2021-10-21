# Setting the Body

Drash comes with some methods on the `response` object to help you send some common responses to clients. Read further to learn more how you can set the body on a response and send that body to clients.

## Table of Contents

* [Body Methods]()
  * [download()](#download)
  * [file()](#file)
  * [html()](#html)
  * [json()](#json)
  * [xml()](#xml)
* [How Body Methods Work](#how-body-methods-work)
* [Custom Response Bodies](#custom-response-bodies)

## Body Methods

Below are the built-in body methods on the `response` object and examples of how to use each one in a resource.

### download()

* Use this method to send downloadable content types to clients.
* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.download(
      "./path/to/my-image.png", // Relative to the current working directory that executed the entrypoint script
      "image/png", // The content type of the file (used to set the Content-Type header on the response)
    );
  }
  ```

### file()

* Use this method to send files to client.
* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.file(
      "./path/to/my-file.txt", // Relative to the current working directory that executed the entrypoint script
    );
  }
  ```

### html()

* Use this method to send HTML to clients.
* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    const html = Deno.readFileSync("./path/to/file.html");
    return response.html(html);
    // or return response.html("<div>Hello, world!</div>");
  }
  ```

### json()

* Use this method to send JSON to clients.
* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.json({
      hello: "world"
    });
  }
  ```

### xml()

* Use this method to send XML to clients.
* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    const xml = Deno.readFileSync("./path/to/file.xml");
    return response.xml(xml);
    // or return response.xml("<body>Hello, world!</body>");
  }
  ```

## How Body Methods Work

Under the hood, the built-in body methods above set the `response` object's body and `Content-Type` header based on the method being used. For example, if you use `response.json(someJson)`, then the following will happen under the hood ...

```typescript
this.body = JSON.stringify(someJson);
this.headers.set("Content-Type", "application/json");
```

... and if you use `response.html(someHtmlString)`, then the following will happen under the hood ...

```typescript
this.body = someHtmlString;
this.headers.set("Content-Type", "text/html");
```

There is not much magic to these methods. All they do is set the response body and `Content-Type` header. They were implemented as convenience methods so you do not have to set the body and set the `Content-Type` header in your resources -- preventing code bloat.

## Custom Response Bodies

The built-in body methods above are useful if you want to send common responses to clients. If you want more control over your response body and `Content-Type` header, then use the `.send()` method.

* The `.send()` method's signature is as follows:

  ```typescript
  response.send<T extends BodyInit>(
    contentType: string,
    body: T,
  ): void {
    ...
    ...
    ...
  }
  ```

* Example Usage

  ```typescript
  public GET(request: Drash.Request, response: Drash.Response): void {
    const typescript = Deno.readFileSync("/path/to/my/typescript/file.ts");
    return response.send<string>("application/typescript", body);
  }
  ```
