import { Code, Paragraph, Pre } from "../components/Markdown";

export const CODE_BLOCK_COMMENT_REPLACEMENTS = [
  {
    from: /\/\/ @Import drash_from_deno$/gm,
    to:
      `// Replace \`<VERSION>\` with the latest version of Drash v2.x. The latest\n` +
      `// version can be found at https://github.com/drashland/drash/releases/latest\n` +
      `import * as Drash from "https://deno.land/x/drash@<VERSION>/mod.ts";`,
  },
  {
    from: /\/\/ @Export drash_v2_from_deno_no_version_comment$/gm,
    to: `export * as Drash from "https://deno.land/x/drash@<VERSION>/mod.ts";`,
  },
  {
    from: /\/\/ @Export drash_v2_csrf_service_from_deno_no_version_comment$/gm,
    to:
      `export { CSRFService } from "https://deno.land/x/drash@<VERSION>/src/services/csrf/csrf.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_dexter_service_from_deno_no_version_comment$/gm,
    to:
      `export { DexterService } from "https://deno.land/x/drash@<VERSION>/src/services/dexter/dexter.ts";`,
  },
  {
    from: /\/\/ @Export drash_v2_etag_service_from_deno_no_version_comment$/gm,
    to:
      `export { ETagService } from "https://deno.land/x/drash@<VERSION>/src/services/etag/etag.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_graphql_service_from_deno_no_version_comment$/gm,
    to:
      `export { GraphQL, GraphQLService } from "https://deno.land/x/drash@<VERSION>/src/services/graphql/graphql.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_paladin_service_from_deno_no_version_comment$/gm,
    to:
      `export { PaladinService } from "https://deno.land/x/drash@<VERSION>/src/services/paladin/paladin.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_rate_limiter_service_from_deno_no_version_comment$/gm,
    to:
      `export { RateLimiterService } from "https://deno.land/x/drash@<VERSION>/src/services/rate_limiter/rate_limiter.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_resource_loader_service_from_deno_no_version_comment$/gm,
    to:
      `export { ResourceLoaderService } from "https://deno.land/x/drash@<VERSION>/src/services/resource_loader/resource_loader.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_response_time_service_from_deno_no_version_comment$/gm,
    to:
      `export { ResponseTimeService } from "https://deno.land/x/drash@<VERSION>/src/services/response_time/response_time.ts";`,
  },
  {
    from:
      /\/\/ @Export drash_v2_tengine_service_from_deno_no_version_comment$/gm,
    to:
      `export { TengineService } from "https://deno.land/x/drash@<VERSION>/src/services/tengine/tengine.ts";`,
  },
];

/**
 * Replacement mappings for content.
 */
export const PLACEHOLDER_REPLACEMENTS = [
  {
    from:
      "{{ placeholder: drash_v2_edit_your_deps_file_to_include_the_service }}",
    to: <DrashEditYourDepsFileToIncludeTheService />,
  },
  {
    from: "{{ placeholder: drash_create_deps_file_step }}",
    to: (
      <>
        <CreateDepsFileStepText
          releasesUrl="https://github.com/drashland/drash/releases/latest"
          moduleName="Drash"
          moduleVersion="v2.x"
        />
        <CreateDepsFileStepCodeBlock
          exportStatement={`export * as Drash from "https://deno.land/x/drash@&lt;VERSION&gt;/mod.ts";`}
        />
      </>
    ),
  },
];

export function CreateDepsFileStepCodeBlock({
  exportStatement,
}) {
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
  releasesUrl,
  moduleName,
  moduleVersion,
}) {
  return (
    <>
      <Paragraph>
        Create your <Code>deps.ts</Code> file. Replace{" "}
        <Code>&lt;VERSION&gt;</Code> with the latest version of {moduleName}
        {" "}
        {moduleVersion}. The latest version can be found at{" "}
        <a
          href={releasesUrl}
          target="_BLANK"
        >
          the {moduleName} latest release page
        </a>.
      </Paragraph>
    </>
  );
}

export function DrashEditYourDepsFileToIncludeTheService() {
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
          the Drash latest release page
        </a>.
      </Paragraph>
    </>
  );
}
