import { Callout } from "nextra/components";
import { Link } from "./Link";

export const CalloutJSRuntimeInstalled = () => (
  <Callout emoji={null} type="info">
    The steps below assume you have read the{" "}
    <Link href="../prerequisites">Prerequisites</Link> page.
  </Callout>
);
