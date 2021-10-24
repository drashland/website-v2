const light = {
  breadcrumbs: {
    color: "#333333",
  },
  markdown: {
    heading2: {
      borderTopColor: "#f4f4f4",
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
}

const dark = {
  breadcrumbs: {
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
  },
  markdown: {
    heading2: {
      borderTopColor: "#494f58",
    }
  },
  sideBar: {
    background: "#2f343c",
    categoryHeading: {
      borderBottomColor: "#424c5f",
      color: "#d4dbe8",
    },
    link: {
      colorInactive: "#d4dbe8",
      colorActive: "#7dade2",
    },
  },
}

const defaultTheme = {
  layout: {
    background: "#343c48",
  },
  fontSizes: [
    '14px', // 0
    '16px', // 1
    '18px', // 2
    '22px', // 3
    '26px', // 4
    '32px', // 5
    '40px'  // 6
  ],
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
  // ...
};

export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }
