# Lifecycle Diagram

## Table of Contents

- [Notes](#notes)
  - [Entry Point](#entry-point)
  - [Request-Resource-Response Lifecycle](#request-resource-response-lifecycle)
- [Diagram](#diagram)

## Notes

### Entry Point

Say you have `drash_app.ts`. When you run
`deno run [--deno-flags] drash_app.ts`, the Entry Point flow in the diagram
below starts. Once the Entry Point flow calls `yourDrashServer.run()`, it stays
open and lets your server listen for requests. When your server receives a
request, your server will start the Request-Resource-Response lifecycle flow for
that request.

### Request-Resource-Response Lifecycle

All requests that your server receives follow the Request-Resource-Response
lifecycle in the diagram below. Here are some explanations regarding the
diagram:

- Blue rectangles represent services and their flows.
- Red rectangles represent errors being thrown and their flows.
- All flows ultimately lead to Connector A, B, or C.
  - Connector A means an error was thrown and the server will ensure the error
    details (e.g., response status code) are sent in the response to the client.
  - Connector B means no errors were thrown and the server will send the
    response that was generated throughout the request-resource-response
    lifecycle.
  - Connector C means a service threw an error or ended early (via calling
    `request.end()`). If an error was thrown, then the flow will lead to
    Connector A. If the service ended early, then the flow will lead to
    Connector B.
- Click on the diagram to view the full image.

## Diagram

[![Drash v2.6.x Lifecycle Diagram](/drash-v2.6.x-lifecycle-diagram.svg)](/drash-v2.6.x-lifecycle-diagram.svg)
