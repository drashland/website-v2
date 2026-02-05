//
// This file only contains exported styled components. These components are
// used to replace the default components in our markdown package that we use
// in `[...path_params].jsx`.
//
import React, { Fragment } from "react";
import { Link } from "@styled-icons/bootstrap";
import styled from "styled-components";
import CodeExtended from "@/src/components/markdown/CodeExtended";
import { PLACEHOLDER_REPLACEMENTS } from "@/src/component_replacements";

const flatten = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const LinkIcon = styled(Link)`
  color: ${(props) => props.theme.headingLinkIcon.color};
  height: 25px;
  transition-duration: 0.15s;
  transition-property: opacity;
`;

const Note = styled.div`
  border-radius: ${(props) => props.theme.layout.borderRadius};
  background: #e0f0f9;
  border: ${(props) => `1px solid ${props.theme.note.borderColor}`};
  color: #36789d;
  padding: 1.25rem 1.25rem 1.25rem 2.25rem;
  margin-bottom: ${(props) => props.theme.layout.marginBottom};
  position: relative;
  overflow: hidden;

  &:before {
    position: absolute;
    content: "";
    width: 1rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.note.borderColor};
  }
`;

export const Blockquote = styled.blockquote`
  border-left: 5px solid #efefef;
  padding-left: 1rem;
`;

const Heading = function (level) {
  const wrappedHeadingBlock = function (props) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    let slug = text.toLowerCase()
      .replace(/\W/g, "-")
      .replace(/_+/g, "-")
      .replace(/-+/g, "-");
    if ((slug.lastIndexOf("-") + 1) === slug.length) {
      slug = slug.substr(0, slug.lastIndexOf("-"));
    }

    if (slug.charAt(0) === "-") {
      slug = slug.substring(1, slug.length);
    }

    const linkedHeadingChildren = [...props.children];

    // The <h1> tags do not need an anchor because they are at the top of the
    // page
    if (level !== 1) {
      linkedHeadingChildren.push(
        <a
          key={`anchor_${slug}_${level}`}
          className="icon-link"
          href={`#` + slug}
        >
          <LinkIcon
            key={`link_icon_${slug}_${level}`}
            className="icon"
          />
        </a>,
      );
    }

    const renderLinkedHeading = React.createElement(
      "h" + level,
      {
        key: JSON.stringify(props.children + level),
        className: (level != 1) ? "heading-linked" : null,
      },
      linkedHeadingChildren,
    );

    // Wrap the heading in a <div> tag so that we can style a border on the
    // <div> and style the heading separately
    if (level != 1) {
      return (
        <div className={props.className}>
          {/* @ts-ignore Add typing later */}
          <a className="heading-anchor" name={slug} />
          {renderLinkedHeading}
        </div>
      );
    }

    return (
      <div className={props.className}>
        {renderLinkedHeading}
      </div>
    );
  };

  return wrappedHeadingBlock;
};

export const Heading1 = styled(Heading(1))`
  h1 {
    color: ${(props) => props.theme.layout.text.color};
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: ${(props) => props.theme.layout.marginBottom};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const Heading2 = styled(Heading(2))`
  border-top: 0.25rem solid ${(props) =>
    props.theme.markdown.heading2.borderTopColor};
  margin-top: 2.5rem !important;
  h2,
  h2.heading-linked {
    color: ${(props) => props.theme.layout.text.color};
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2;
    padding-top: 2rem;
    margin-bottom: ${(props) => props.theme.layout.marginBottom};
    transition-duration: 0.25s;
    transition-property: border-top, color;
  }
`;

export const Heading3 = styled(Heading(3))`
  margin-top: 2.5rem !important;
  h3 {
    color: ${(props) => props.theme.layout.text.color};
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.2;
    padding-top: 1.5rem;
    margin-bottom: ${(props) => props.theme.layout.marginBottom};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const Heading4 = styled(Heading(4))`
  margin-top: 1.6rem !important;
  h4 {
    color: ${(props) => props.theme.layout.text.color};
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.layout.marginBottom};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const PreExtended = function ({ className, children }) {
  function renderCodeBlocks() {
    // If we have an array, then we have multiple code blocks. Multiple code
    // blocks means @Tab is being used inside the code block.
    if (Array.isArray(children)) {
      return children.map((child) => {
        return React.cloneElement(child, { isExampleCodeBlock: true });
      });
    }

    // Otherwise, we just have a single code block
    return children;
  }

  return (
    <pre className={className}>
      {renderCodeBlocks()}
    </pre>
  );
};

/**
 * In the documentation pages, there are placeholders that look like the
 * following:
 *
 *     {{ placeholder: some_slug_here }}
 *
 * These placeholders exist to prevent us from having to write the same
 * statements over and over and having to make sure they all say the same thing.
 * For example, having to write "Create your `deps.ts` file." and showing
 * example code would suck. This function helps in this area.
 *
 * @param {string} text - The text possibly containing the placeholder.
 * @returns The text with the placeholder replaced.
 */
const ParagraphExtended = ({ className, children: text }) => {
  let paragraphContainsPlaceholder = false;

  PLACEHOLDER_REPLACEMENTS.forEach((replacementData) => {
    text = text.map((line, index) => {
      // Exclude trying to replace undefined elements and React elements
      if (!line || typeof line === "object") {
        return line;
      }

      if (line.includes(replacementData.from)) {
        paragraphContainsPlaceholder = true;
        return <Fragment key={line + index}>{replacementData.to}</Fragment>;
      }

      return line;
    });
  });

  let note = null;
  text.forEach((line) => {
    if (typeof line === "string" && line.includes("{{ note_since")) {
      const version = line.replace(
        /\{\{.+(note_since|note_since_simple)+: +|\}\}/g,
        "",
      );

      if (line.includes("{{ note_since: ")) {
        note = (
          <Note>
            <span className="bold">Note:</span> This feature was introduced in
            {" "}
            {version}. Please make sure you are using {version}{" "}
            (or higher) before proceeding to use the following tutorial/code.
          </Note>
        );
      } else if (line.includes("{{ note_since_simple: ")) {
        note = (
          <Note>
            <span className="bold">Note:</span> This feature was introduced in
            {" "}
            {version}. Please make sure you are using {version}{" "}
            (or higher) for this feature.
          </Note>
        );
      } else {
        note = (
          <Note>
            <span className="bold">Note:</span> This feature was introduced in
            {" "}
            {version}. Please make sure you are using {version}{" "}
            (or higher) for this feature.
          </Note>
        );
      }
    }
  });

  if (note) {
    return note;
  }

  // If the paragraph includes placeholders, then we need to make sure we do not
  // wrap the replaced placeholder in a <p> tag. Otherwise we will end up with
  // nested <p> tags and that will throw a React error in the console. It's not
  // problematic per se, but annoying af.
  if (paragraphContainsPlaceholder) {
    return text;
  }

  return <p className={className}>{text}</p>;
};

export const Paragraph = styled(ParagraphExtended)`
  margin-bottom: ${(props) => props.theme.layout.marginBottom};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const Pre = styled(PreExtended)`
  background: #2f343c !important;
  border-radius: ${(props) => props.theme.markdown.pre.borderRadius};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.layout.marginBottom};

  &[class*="language-"] {
    margin-bottom: ${(props) => props.theme.layout.marginBottom};
  }

  pre {
    background: #2f343c !important;
    border-radius: ${(props) => props.theme.markdown.pre.borderRadius};
    margin-bottom: 0 !important;
    max-height: 500px;

    &[class*="language-"] {
      margin-bottom: 0 !important;
    }
  }

  code {
    font-size: 0.8rem;
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
`;

export const Code = styled(CodeExtended)`
  font-size: 0.85rem;
  background: ${(props) => props.theme.markdown.code.backgroundColor};
  border-radius: ${(props) => props.theme.markdown.code.borderRadius};
  color: ${(props) => props.theme.markdown.code.color};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  transition-duration: 0.25s;
  transition-property: background, color;
`;

export const Image = styled.img`
  border: 1px solid #dfdfdf;
`;
