//
// This file only contains exported styled components. These components are
// used to replace the default components in our markdown package that we use
// in `[...path_params].jsx`.
//
import React, { Fragment } from "react";
import { Link } from "@styled-icons/bootstrap";
import styled from "styled-components";
import CodeExtended from "./markdown/CodeExtended";
import { PLACEHOLDER_REPLACEMENTS } from "../services/content_replacer_service";

const MARGIN_BOTTOM = "margin-bottom: 1.25rem !important;";

const flatten = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const LinkIcon = styled(Link)`
  color: ${({ theme }) => theme.headingLinkIcon.color};
  height: 25px;
  transition-duration: 0.15s;
  transition-property: opacity;
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
          <LinkIcon key={`link_icon_${slug}_${level}`} className="icon" />
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
    color: ${({ theme }) => theme.layout.text.color};
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
    ${MARGIN_BOTTOM};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const Heading2 = styled(Heading(2))`
  border-top: .25rem solid ${({ theme }) =>
  theme.markdown.heading2.borderTopColor};
  margin-top: 2.5rem !important;
  h2 {
    color: ${({ theme }) => theme.layout.text.color};
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2;
    padding-top: 2rem;
    ${MARGIN_BOTTOM};
    transition-duration: 0.25s;
    transition-property: border-top, color;
  }
`;

export const Heading3 = styled(Heading(3))`
  margin-top: 2.5rem !important;
  h3 {
    color: ${({ theme }) => theme.layout.text.color};
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.2;
    padding-top: 1.5rem;
    ${MARGIN_BOTTOM};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const Heading4 = styled(Heading(4))`
  margin-top: 1.6rem !important;
  h4 {
    color: ${({ theme }) => theme.layout.text.color};
    font-size: 1.3rem;
    font-weight: bold;
    ${MARGIN_BOTTOM};
    transition-duration: 0.25s;
    transition-property: color;
  }
`;

export const ListItem = styled.li`
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

  // If the paragraph includes placeholders, then we need to make sure we do not
  // wrap the replaced placeholder in a <p> tag. Otherwise we will end up with
  // nested <p> tags and that will throw a React error in the console. It's not
  // problematic per se, but annoying af.
  return paragraphContainsPlaceholder
    ? text
    : <p className={className}>{text}</p>;
};

export const Paragraph = styled(ParagraphExtended)`
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const Pre = styled(PreExtended)`
  background: #2f343c !important;
  border-radius: 1rem;
  overflow: hidden;
  ${MARGIN_BOTTOM};

  &[class*=language-] {
    ${MARGIN_BOTTOM};
  }

  pre {
    background: #2f343c !important;
    border-radius: 1rem;
    margin-bottom: 0 !important;

    &[class*=language-] {
      margin-bottom: 0 !important;
    }
  }

  code {
    font-size: .85rem;
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
`;

export const Code = styled(CodeExtended)`
  font-size: .85rem;
  background: ${({ theme }) => theme.markdown.code.backgroundColor};
  border-radius: 1rem;
  color: ${({ theme }) => theme.markdown.code.color};
  font-weight: 500;
  padding: .25rem .5rem;
  transition-duration: 0.25s;
  transition-property: background, color;
`;

export const OrderedList = styled.ol`
  margin-left: 0;
  padding-left: 2.5rem;
  ${MARGIN_BOTTOM};
`;

export const UnorderedList = styled.ul`
  margin-left: 0;
  padding-left: 2.5rem;
  ${MARGIN_BOTTOM};
`;

export const Image = styled.img`
  border: 1px solid #dfdfdf;
`;
