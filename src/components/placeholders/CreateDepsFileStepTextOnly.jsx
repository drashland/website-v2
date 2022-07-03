import { Code, Paragraph, Pre } from "../Markdown";

export default function CreateDepsFileStepTextOnly() {
  return (
    <>
      <Paragraph>
        Create your <Code>deps.ts</Code> file. Replace{" "}
        <Code>&lt;VERSION&gt;</Code>{" "}
        with the latest version of Drash v2.x. The latest version can be found
        at{" "}
        <a
          href="https://github.com/drashland/drash/releases/latest"
          target="_BLANK"
        >
          the Drash latest release page
        </a>.
      </Paragraph>
    </>
  );
}
