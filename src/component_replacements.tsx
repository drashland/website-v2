import { Code, Paragraph, Pre } from "@/src/components/Markdown";

/**
 * Replacement mappings for content.
 */
export const PLACEHOLDER_REPLACEMENTS = [
  {
    from: "{{ placeholder: drash_edit_your_deps_file_to_include_the_service }}",
    to: <DrashEditYourDepsFileToIncludeTheService />,
  },
  {
    from: "{{ placeholder: drash_create_deps_file_step }}",
    to: (
      <>
        <DrashCreateDepsFileStepText />
        <DrashCreateDepsFileStepCodeBlock />
      </>
    ),
  },
  {
    from: "{{ placeholder: line_v1_create_deps_file_step }}",
    to: (
      <>
        <CreateDepsFileStepText
          moduleName="Line"
          moduleVersion="v1.x"
          releasesPageUrl="https://github.com/drashland/line/releases/latest"
        />
        <CreateDepsFileStepCodeBlock
          exportStatement={`export * as Line from "https://deno.land/x/line@&lt;VERSION&gt;/mod.ts";`}
        />
      </>
    ),
  },
];

export function CreateDepsFileStepCodeBlock({ exportStatement }) {
  return (
    <>
      <Pre className="language-typescript">
        <code
          className="language-typescript"
          dangerouslySetInnerHTML={{
            __html: `// File: deps.ts

${exportStatement}`,
          }}
        />
      </Pre>
    </>
  );
}

export function CreateDepsFileStepText({
  moduleName,
  moduleVersion,
  releasesPageUrl,
}) {
  return (
    <>
      {/* @ts-ignore Fix typing later */}
      <Paragraph>
        Create your <Code>deps.ts</Code> file. Replace{" "}
        {/* @ts-ignore Fix typing later */}
        <Code>&lt;VERSION&gt;</Code> with the latest version of {moduleName}
        {" "}
        {moduleVersion}. The latest version can be found at the{" "}
        <a
          href={releasesPageUrl}
          target="_BLANK"
        >
          {moduleName} latest release page
        </a>.
      </Paragraph>
    </>
  );
}

export function DrashCreateDepsFileStepCodeBlock() {
  return (
    <>
      <Pre className="language-typescript">
        <code
          className="language-typescript"
          dangerouslySetInnerHTML={{
            __html: `// File: deps.ts

export * as Drash from "https://deno.land/x/drash@&lt;VERSION&gt;/mod.ts";`,
          }}
        />
      </Pre>
    </>
  );
}

export function DrashCreateDepsFileStepText() {
  return (
    <>
      {/* @ts-ignore Fix typing later */}
      <Paragraph>
        Create your <Code>deps.ts</Code> file. Replace{" "}
        {/* @ts-ignore Fix typing later */}
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

export function DrashEditYourDepsFileToIncludeTheService() {
  return (
    <>
      {/* @ts-ignore Fix typing later */}
      <Paragraph>
        To use this service, edit your <Code>deps.ts</Code>{" "}
        file to include the service. Replace <Code>&lt;VERSION&gt;</Code>{" "}
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
