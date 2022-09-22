import { Fragment, useState } from "react";
import styled from "styled-components";
import { Pre } from "../Markdown";
import { CODE_BLOCK_COMMENT_REPLACEMENTS } from "../../services/content_replacer_service";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const ACCEPTED_CODE_TAB_NAMES = [
  "Async Code",
  "Browser",
  "Deno",
  "JavaScript (ESM)",
  "Node - CommonJS",
  "Node - JavaScript (ESM)",
  "Node - TypeScript (ESM)",
  "Sync Code",
  "TypeScript (ESM)",
  "Yarn",
  "npm",
];

const Code = styled.code`
  font-size: .85rem;
  background: ${({ theme }) => theme.markdown.code.backgroundColor};
  border-radius: 1rem;
  color: ${({ theme }) => theme.markdown.code.color};
  font-weight: 500;
  padding: .25rem .5rem;
  transition-duration: 0.25s;
  transition-property: background, color;
`;

const Tab = styled.button`
  font-family: 'Menlo', Helvetica, Arial, sans-serif;
  font-size: .85rem;
  cursor: pointer;
  padding: 1rem;
  background: ${({ activeTab, name }) =>
  activeTab === name ? "#2f343c" : "#202328"};
  color: ${({ activeTab, name }) => activeTab === name ? "#ffffff" : "#5b677e"};
  border-right: 1px solid #444f62;
  margin: 0;
`;

// TODO(crookse) Split this component up. Hella code. I wrote it and even I'm
// confused.
export default function CodeExtension({
  className,
  children,
  /**
   * Example code blocks use the fenced code:
   *
   * ```typescript
   * something here
   * ```
   *
   * ... as opposed to a regular inline code element:
   *
   * `something here`
   */
  isExampleCodeBlock,
}) {
  // Let's make sure we always have a string as a class name before running
  // through this component's functions
  className = className?.replace("lang-", " language-") || "";
  const [activeTab, setActiveTab] = useState(null);

  // deno-lint-ignore no-window-prefix
  window.addEventListener("changeCodeBlockActiveTab", (e) => {
    setActiveTab(e.data);
  });

  function replaceImportExportComments(codeBlock) {
    if (Array.isArray(codeBlock)) {
      return codeBlock.map(replaceImportExportComment);
    }

    return replaceImportExportComment(codeBlock);
  }

  function replaceImportExportComment(line) {
    if (!line) {
      return;
    }

    CODE_BLOCK_COMMENT_REPLACEMENTS.forEach((replacementData, index) => {
      line = line.replace(
        replacementData.from,
        replacementData.to,
      );
    });

    return line;
  }

  /**
   * Get the Prims.js class name for the a code block.
   */
  function getPrismJsClassNameForCodeBlock(name) {
    // If this is a `diff-` class, then make sure we have diff highlighting
    if (className.includes("diff")) {
      return className + " diff-highlight";
    }

    if (isNodeTab(name)) {
      // Default to JavaScript
      let language = "language-javascript";
      if (isNodeTabForTypeScript(name)) {
        language = "language-typescript";
      }
      return className.replace(/language-(ts|typescript)/g, language);
    }

    // If we get here, let's make sure we check that a language was specified.
    // If not, then we default to the ugly text language.
    if (isExampleCodeBlock && !className.includes("language-")) {
      console.warn(
        `Markdown code block is missing syntax highlighting. Use \`\`\`<some-language> to hide this warning.`,
      );
      className += " language-text";
    }

    return className;
  }

  /**
   * Is this a Node code tab?
   *
   * @returns True if yes, false if no.
   */
  function isNodeTab(codeTabName) {
    if (!codeTabName) {
      return false;
    }

    return codeTabName.includes("Node");
  }

  /**
   * Is this a Node TypeScript code tab?
   *
   * @returns True if yes, false if no.
   */
  function isNodeTabForTypeScript(codeTabName) {
    return codeTabName?.includes("TypeScript");
  }

  /**
   * Take the given code block and get the tab name from it. The tab name is
   * the first line of the code block.
   *
   * @returns The tab name (the first line).
   */
  function getTabNameFromCodeBlock(codeBlock) {
    return codeBlock.match(/.+\n/)[0].trim();
  }

  /**
   * All tabbed code blocks will contain // @Tab {name of tab}. We want to
   * strip that part out. This is what this function does.
   *
   * @param codeBlock - The code block containing the tab name.
   * @param tabName - The tab name in the code to remove.
   * @returns The code without the tab name.
   */
  function renderCodeBlockWithoutTabName(codeBlock, tabName) {
    return replaceImportExportComments(codeBlock).replace(tabName, "").trim();
  }

  /**
   * @returns A component that displays a single, untabbed code block.
   */
  function renderSingleCodeBlock() {
    return (
      <code
        key={children.toString()}
        className={getPrismJsClassNameForCodeBlock(className)}
      >
        {replaceImportExportComments(children)}
      </code>
    );
  }

  /**
   * @param tabs - The tabs containing the code blocks.
   * @returns A component that displays the given tabs as separate tabs having
   * separate code blocks.
   */
  function renderTabbedCodeBlocks(tabs) {
    return (
      <div className="tabbed-code" style={{ overflow: "auto" }}>
        <div style={{ display: "flex", background: "#202328" }}>
          {tabs.map((tab) => {
            const tabName = tab.match(/.+\n/)[0].trim();
            return (
              <Tab
                activeTab={activeTab}
                key={`tab-name-${tab}`}
                name={tabName}
                onClick={() => {
                  // deno-lint-ignore no-window-prefix
                  window.dispatchEvent(
                    new MessageEvent("changeCodeBlockActiveTab", {
                      data: tabName,
                    }),
                  );
                  // setActiveTab(tabName)
                }}
              >
                {tabName}
              </Tab>
            );
          })}
        </div>
        <div style={{ padding: "1rem" }}>
          {tabs.map((codeBlock, index) => {
            const tabName = getTabNameFromCodeBlock(codeBlock);

            return (
              <div
                key={codeBlock + index}
                style={{
                  display: activeTab === tabName ? "block" : "none",
                }}
              >
                <Pre>
                  <code
                    className={getPrismJsClassNameForCodeBlock(tabName)}
                  >
                    {renderCodeBlockWithoutTabName(codeBlock, tabName)}
                  </code>
                </Pre>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /**
   * Separate the given code into tabs by splitting on `// @Tab `.
   *
   * @returns An array of code blocks. Each code block belongs to a tab.
   */
  function separateCodeIntoTabs() {
    const tabs = children[0].split("// @Tab ");
    tabs.shift(); // Take off the first element which is an empty string
    validateTabNames(tabs);
    return tabs;
  }

  /**
   * The only accepted tab names are in the ACCEPTED_CODE_TAB_NAMES array.
   * This will throw an error on the page if the @Tab annotation has an
   * invalid name.
   */
  function validateTabNames(tabs) {
    tabs.forEach((codeBlock) => {
      const tabName = getTabNameFromCodeBlock(codeBlock);
      if (!ACCEPTED_CODE_TAB_NAMES.includes(tabName)) {
        throw new Error(
          `@Tab with name "${tabName}" not accepted. Use ${
            ACCEPTED_CODE_TAB_NAMES.join(", ")
          } only.`,
        );
      }
    });
  }

  if (children && Array.isArray(children) && typeof children[0] === "string") {
    // Tabbed code blocks MUST have at least TWO "// @Tab" tags and
    // those tags MUST be in the following format:
    //
    //     // @Tab Some Name
    //
    // The logic below parses "//<one space>@Tab<one_space><name of tab>"
    //
    const tabs = separateCodeIntoTabs(children);

    // If `tabs` is greater than 0, then the code block has // @Tab sections
    if (tabs.length > 0) {
      // Set the first tab as the active tab
      if (!activeTab) {
        setActiveTab(getTabNameFromCodeBlock(tabs[0]));
      }
      return renderTabbedCodeBlocks(tabs);
    }
  }

  return renderSingleCodeBlock();
}
