import {
  Chain,
  Resource,
} from "https://esm.sh/@drashland/drash/lib/esm/modules/chains/RequestChain/mod.native.js";

// Or use the npm module specifier
// Note: This uses the CJS Request Chain. More info about this is at https://drash.land/drash-v3.x/getting-started/known-issues
// import {
//     Chain,
//     Resource,
// } from "npm:@drashland/drash/lib/cjs/modules/chains/RequestChain/mod.native.js";

// Create a resource
class Home extends Resource {
  paths = ["/"];

  GET(request: Request) {
    console.log(`[Home.GET()] Request received: ${request.url}`);
    return new Response(
      `Hello from Home.GET()! (written at ${new Date()})`,
    );
  }
}

// Build the chain and add the resource
const chain = Chain
  .builder()
  .resources(Home)
  .build();

// Create and start the server
Deno.serve({
  onListen: ({ hostname, port }) => {
    console.log(`\nDrash running at http://${hostname}:${port}`);
  },
  handler: (request: Request): Promise<Response> => {
    // Pass the request to the chain
    return chain
      .handle<Response>(request)
      .catch((error) => {
        if (request.url.includes("favicon")) {
          return new Response();
        }

        return new Response(
          "Sorry, but we hit an error!",
          {
            status: 500,
            statusText: "Internal Server Error",
          },
        );
      });
  },
});
