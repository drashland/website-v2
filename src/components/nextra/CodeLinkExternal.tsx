import { Code } from "./Code";
import { LinkExternal } from "./LinkExternal";

export const CodeLinkExternal = ({ children, href }) => (
  <Code><LinkExternal href={href}>{children}</LinkExternal></Code>
);