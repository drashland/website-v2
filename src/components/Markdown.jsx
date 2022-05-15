//
// This file only contains exported styled components. These components are
// used to replace the default components in our markdown package that we use
// in `[...path_params].jsx`.
//
import React from "react";
import { Link } from "@styled-icons/bootstrap";
import styled from "styled-components";
import CodeExtended from "./markdown/CodeExtended";

const flatten = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const MARGIN_BOTTOM = "margin-bottom: 1.25rem !important;";

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

export const Paragraph = styled.p`
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
