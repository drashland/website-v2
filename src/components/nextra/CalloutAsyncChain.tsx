import { Callout } from "nextra/components";
import { CodeLinkExternal } from "./CodeLinkExternal";
import { LinkExternal } from "./LinkExternal";

export const CalloutAsyncChain = () => (
  <Callout type="info" emoji={null}>
    <strong>Keep in mind:</strong> This chain is{" "}
    <LinkExternal href="https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous">
      asynchronous
    </LinkExternal>{" "}
    by default. This means all of its handlers return a{" "}
    <CodeLinkExternal href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">
      Promise
    </CodeLinkExternal>. If you want to use this chain synchronously, you can
    use{" "}
    <CodeLinkExternal href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">
      await
    </CodeLinkExternal>{" "}
    if your environment allows it.
  </Callout>
);
