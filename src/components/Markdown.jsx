//
// This file only contains exported styled components. These components are
// used to replace the default components in our markdown package that we use
// in `[...path_params].jsx`.
//
import React from "react";

const flatten = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
export const HeadingRenderer = (props) => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
};

import styled from "styled-components";

const MARGIN_BOTTOM = "margin-bottom: 1.25rem !important;";

export const Blockquote = styled.blockquote`
  border-left: 5px solid #efefef;
  padding-left: 1rem;
`;

const Heading = function (level) {
  const heading = function (props) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text.toLowerCase().replace(/\W/g, "-");
    switch (level) {
      case 1:
        return <h1 id={slug} className={props.className}>{props.children}</h1>;
      case 2:
        return <h2 id={slug} className={props.className}>{props.children}</h2>;
      case 3:
        return <h3 id={slug} className={props.className}>{props.children}</h3>;
      case 4:
        return <h4 id={slug} className={props.className}>{props.children}</h4>;
      default:
        break;
    }
    return <p id={slug} className={props.className}>{props.children}</p>;
  };

  return heading;
};

export const Heading1 = styled(Heading(1))`
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const Heading2 = styled(Heading(2))`
  border-top: .25rem solid ${({ theme }) =>
  theme.markdown.heading2.borderTopColor};
  margin-top: 2.5rem !important;
  padding-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: border-top, color;
`;

export const Heading3 = styled(Heading(3))`
  margin-top: 1.6rem !important;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const Heading4 = styled(Heading(4))`
  margin-top: 1.6rem !important;
  font-size: 1.3rem;
  font-weight: bold;
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const ListItem = styled.li`
`;

export const Code = function ({ className, children }) {
  function getPrismJsClassName(ogClassName) {
    if (ogClassName.includes("diff")) {
      return className.replace("lang-", " language-") + " diff-highlight";
    }

    // Default to just making sure that `language-` is used instead of `lang-`.
    return className.replace("lang-", " language-");
  }

  return (
    <code
      className={className && getPrismJsClassName(className)}
    >
      {children}
    </code>
  );
};

export const Paragraph = styled.p`
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: color;
`;

export const RestyledCode = styled(Code)`
  font-size: .85rem;
  background: ${({ theme }) => theme.markdown.code.backgroundColor};
  border-radius: 1rem;
  color: ${({ theme }) => theme.markdown.code.color};
  font-weight: 500;
  padding: .25rem .5rem;
  transition-duration: 0.25s;
  transition-property: background, color;
`;

export const Pre = styled.pre`
  background: #2f343c !important;
  border-radius: 1rem;
  ${MARGIN_BOTTOM};

  &[class*=language-] {
    ${MARGIN_BOTTOM};
  }

  code {
    font-size: .85rem;
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
`;

export const OrderedList = styled.ol`
  margin-left: 1rem;
  ${MARGIN_BOTTOM};
`;

export const UnorderedList = styled.ul`
  margin-left: 1rem;
  ${MARGIN_BOTTOM};
`;

export const Image = styled.img`
  border: 1px solid #dfdfdf;
`;
