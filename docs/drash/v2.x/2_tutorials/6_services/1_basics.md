# Basics

_**Note: Some of Drash's services use third-party software. For example, instead
of reinventing the wheel, Drash's GraphQL service uses
[GraphQL.js](https://www.npmjs.com/package/graphql).**_

Drash uses the term "services" to encapsulate any software used in a Drash
application that is not part of Drash's core functionality. This includes
services you create, Drash-approved middleware, middleware you create, etc.

Adding services to your application can make your application more feature rich.
Services can add ...

- request filtering
- caching
- logging
- response transforming
- third-party software integrations

... and more.

You can add services throughout your Drash application's
request-resource-response lifecycle at the server level, resource level, and/or
(if you want to be more granular) the resource HTTP method level (e.g., only run
services on `GET` requests in specific resources).

You can think of services as plug-n-play software. When you use a service, the
service is not "mixed in" with your code. Instead, it is added "on top" of your
code. This makes them easily removable and/or movable.
