/**
 * Common styles that both light theme and dark theme use go here.
 */
const common = {
  module: {
    logo: {
      size: "100px",
    },
  },
  themeSwitch: {
    icon: {
      height: "13px",
    },
  },
};

/**
 * Light theme colors go here. This is used by `ThemeProvider` in the `Layout`
 * component.
 */
export const lightTheme = {
  ...common,
  breadcrumbs: {
    color: "#333333",
  },
  headingLinkIcon: {
    color: "#333333",
  },
  markdown: {
    heading2: {
      borderTopColor: "#f4f4f4",
    },
    code: {
      color: "#d43790",
      backgroundColor: "#f4f4f4",
    },
  },
  layout: {
    background: "#ffffff",
    horizontalRule: {
      background: "#f4f4f4",
    },
    makeBetter: {
      background: "#f3f6f9",
      heading: {
        color: "#efefef",
      },
    },
    text: {
      color: "#333333",
    },
  },
  sideBar: {
    background: "#f3f6f9",
    categoryHeading: {
      borderBottomColor: "#dfdfdf",
      color: "#333333",
    },
    link: {
      colorInactive: "#333333",
      colorActive: "#7dade2",
    },
  },
};

/**
 * Dark theme colors go here. This is used by `ThemeProvider` in the `Layout`
 * component.
 */
export const darkTheme = {
  ...common,
  breadcrumbs: {
    color: "#efefef",
  },
  headingLinkIcon: {
    color: "#efefef",
  },
  layout: {
    background: "#363b44",
    color: "#efefef",
    horizontalRule: {
      background: "#494f58",
    },
    makeBetter: {
      background: "#2f343c",
      heading: {
        color: "#efefef",
      },
    },
    text: {
      color: "#f4f8ff",
    },
  },
  markdown: {
    heading2: {
      borderTopColor: "#494f58",
    },
    code: {
      color: "#cc99cd",
      backgroundColor: "#2f343c",
    },
  },
  sideBar: {
    background: "#2f343c",
    categoryHeading: {
      borderBottomColor: "#424c5f",
      color: "#f4f8ff",
    },
    link: {
      colorInactive: "#d4dbe8",
      colorActive: "#7dade2",
    },
  },
};
