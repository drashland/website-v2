# Content Negotiation

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [By First Acceptable Content Type](#by-first-acceptable-content-type)
- [By Order of Preferred Content Type](#by-order-of-preferred-content-type)
- [By Random Selection](#by-random-selection)

## Before You Get Started

There are many ways to handle content negotation in Drash. This tutorial will go
over three different ways (this is not a definitive list):

- By First Acceptable Content Type
- By Order of Preferred Content Type
- By Random Selection

## By First Acceptable Content Type

In your resource HTTP methods, you can check the first acceptable content type
of the request via its `Accept` header by following the example below:

    ```typescript
    public GET() {
      // Grab the first acceptable content type
      let contentType: string|undefined = this.request.headers.get("Accept").split(";").shift();

      if (contentType) {
        // Set the content type as the response's Content-Type header
        this.response.headers.set("Content-Type", contentType);

        this.response.body = "some response";
        return this.response;
      }

      ...
      // Handle if undefined code
      ...
    }
    ```

## By Order of Preferred Content Type

In your resource HTTP methods, you can check the acceptable content types of the
request via its `Accept` header in the preferred order by following the example
below.

The code will return the first matched content type in the request's `Accept`
header.

    ```typescript
    public GET() {
      // Turn the Accept header into an array to iterate over each acceptable content type
      let contentTypes: string[] = this.request.headers.get("Accept").split(";");

      for (let content of contentTypes) {

        content = content.trim();

        if (content.indexOf("application/json") != -1) {
          this.response.headers.set("Content-Type", "application/json");
          this.response.body = {response: "something"};
          return this.response;
        }

        if (content.indexOf("text/html") != -1) {
          this.response.headers.set("Content-Type", "text/html");
          this.response.body = "<div>response: something</div>";
          return this.response;
        }

        if (content.indexOf("text/xml") != -1) {
          this.response.headers.set("Content-Type", "text/xml");
          this.response.body = "<response>something</response>";
          return this.response;
        }
      }
    }
    ```

## By Random Selection

In your resource HTTP methods, you can check the acceptable content types of the
request in random order via its `Accept` header by following the example below:

    ```typescript
    public GET() {
      if (this.request.accepts("application/json")) {
        this.response.headers.set("Content-Type", "application/json");
        this.response.body = {response: "something"};
        return this.response;
      }
      if (this.request.accepts("text/html")) {
        this.response.headers.set("Content-Type", "text/html");
        this.response.body = "<div>response: something</div>";
        return this.response;
      }
      if (this.request.accepts(["text/xml", "application/xml"])) {
        this.response.headers.set("Content-Type", "text/xml");
        this.response.body = "<response>something</response>";
        return this.response;
      }
    }
    ```
