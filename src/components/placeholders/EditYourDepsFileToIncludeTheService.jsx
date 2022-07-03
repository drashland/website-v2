import { Code, Paragraph } from "../Markdown";

export default function EditYourDepsFileToIncludeTheService() {
  return (
    <>
      <Paragraph>
        To use this service, edit your <Code>deps.ts</Code>{" "}
        file to include the service. Replace <Code>&lt;VERSION&gt;</Code>{" "}
        with the latest version of Drash v2.x. The latest version can be found
        at{" "}
        <a
          href="https://github.com/drashland/drash/releases/latest"
          target="_BLANK"
        >
          https://github.com/drashland/drash/releases/latest
        </a>.
      </Paragraph>
    </>
  );
}
