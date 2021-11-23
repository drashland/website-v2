# Handling WebSocket Connections

Drash's `response` object comes with an `upgrade()` method to help you handle
requests that want to upgrade to a WebSocket.

To learn how to create a WebSocket connection, see
[Tutorials > Requests > Handling WebSocket Connections](/drash/v2.x/tutorials/requests/handling-websocket-connections).

## How It Works

The `upgrade()` method is used to tell Drash to return the `response` object it
receives instead of the `response` object that Drash creates for all incoming
HTTP requests. The `upgrade()` method looks like this:

```typescript
/**
 * Upgrade the response.
 *
 * @param response - The upgraded response (e.g. a WebSocket connection
 * response via Deno.upgradeWebSocket()).
 */
public upgrade(response: Response): void {
  this.upgraded = true;
  this.upgraded_response = response;
}
```

During Drash's request-resource-response lifecycle, it checks to see if the
`response` object it creates for all incoming HTTP requests has its `upgraded`
property set to `true`. If it is set to `true`, then Drash will return the
`response` object stored in `upgraded_response`. If it is set to `false`, then
Drash will continue with its normal request-resource-response lifecycle and send
the `response` object it creates for all incoming HTTP requests.
