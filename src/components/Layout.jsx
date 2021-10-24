import { useEffect, useState } from "react";
import { useRouter }  from "next/router";
import styled, { ThemeProvider } from "styled-components";
import SideBar from "./SideBar";
import LayoutTopBar from "./LayoutTopBar";
import { titleCase } from "title-case";
import { formatLabel } from "../services/string_service";
import { lightTheme, darkTheme } from "../../styles/theme";

const LOCAL_STORAGE_DARK_MODE = "drash_land_dark_mode";
const MARGIN_BOTTOM = "margin-bottom: 1.25rem !important;";

const Container = styled.div`
  background: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.color};
  width: 100%;
  height: auto;
  min-width: 375px; // iPhone X width
  transition-duration: 0.25s;
  transition-property: background;

  &.container-loading {
    height: 100% !important;
  }

  .container-loading {
    height: 100% !important;
  }
`;

const Main = styled.div`
  padding-left: ${({ mobileViewport }) => (!mobileViewport ? '350px': '0')};
  display: flex;
  justify-content: center;
  height: 100%;
  transition-duration: 0.25s;
  transition-property: padding;
`;

const MakeBetter = styled.div`
  background-color: ${({ theme }) => theme.layout.makeBetter.background};
  border-radius: 1rem;
  padding: 2rem;
  transition-duration: 0.25s;
  transition-property: background;
`;

const MakeBetterHeading = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const HorizontalRule = styled.div`
  background: ${({ theme }) => theme.layout.horizontalRule.background};
  height: .25rem;
  width: 100%;
  margin-top: 4rem !important;
  margin-bottom: 4rem;
  box-shadow: none;
  transition-duration: 0.25s;
  transition-property: background;
`;

const InnerContainer = styled.div`
  padding: 0 20px;
  width: 100%;
  max-width: 900px;
  height: 100%;
`;

const Copyright = styled.div`
  padding: 6rem 0 4rem 0;
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
  text-align: center;
`;

const Breadcrumbs = styled.div`
  margin-top: 6rem !important;
  margin-bottom: 3rem;

  @media screen and (max-width: 768px) {
    font-size: .8rem;
  }
`;

const Pill = styled.div`
  color: ${({ theme }) => theme.breadcrumbs.color};
  display: inline-block;

  .slash {
    padding: 0 1rem;
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    .slash {
      padding: 0 .5rem;
    }
  }

  &.active {
    font-weight: bold;
  }

  &:last-of-type {
    .slash {
      display: none;
    }
  }
`;

const MiddleMessage = styled.div`
  font-size: .8rem;
  font-weight: bold;
  letter-spacing: .1rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const SideBarContainer = styled.div`
`;

const ButtonOpenSideBar = styled.button`
  display: ${({ show }) => (show ? 'block' : 'none' )};
  color: #ffffff;
  position: fixed;
  font-size: .8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: .1rem;
  bottom: 2rem;
  right: 2rem;
  background: #000000;
  border-radius: 50%;
  height: 65px;
  width: 65px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
  z-index: 100;
  overflow: hidden;

  &:before {
    content: "";
    background: #ffffff;
    clip-path: polygon(100% 35%,100% 60%,0% 60%,0% 35%);
    position: absolute;
    height: 15px;
    top: ${({ sideBarOpen }) => (sideBarOpen ? '25px' : '17px')};
    width: 25px;
    left: 20px;
    transition-duration: .25s;
    transition-property: transform, top;
    transform: ${({ sideBarOpen }) => (sideBarOpen ? 'rotate(-45deg)' : 'rotate(0deg)')};
  }

  &:after {
    content: "";
    background: #ffffff;
    clip-path: polygon(100% 35%,100% 60%,0% 60%,0% 35%);
    position: absolute;
    top: ${({ sideBarOpen }) => (sideBarOpen ? '25px' : '35px')};
    height: 15px;
    width: 25px;
    left: 20px;
    transition-duration: .25s;
    transition-property: transform, top;
    transform: ${({ sideBarOpen }) => (sideBarOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  }
`;

const Bar = styled.div`
  background: #ffffff;
  clip-path: polygon(100% 35%,100% 60%,0% 60%,0% 35%);
  position: absolute;
  top: 26px;
  height: 15px;
  width: 25px;
  left: ${({ sideBarOpen }) => (sideBarOpen ? '50px' : '20px')};
  opacity: ${({ sideBarOpen }) => (sideBarOpen ? '0' : '1')};
  transition-duration: .25s;
  transition-property: opacity, left;
  z-index: 1;
`;

export const Heading1 = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
`;

export const Heading2 = styled.h2`
  border-top: .25rem solid ${({ theme }) => theme.markdown.heading2.borderTopColor};
  margin-top: 2.5rem !important;
  padding-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
  transition-duration: 0.25s;
  transition-property: border-top;
`;

export const Heading3 = styled.h3`
  margin-top: 1.6rem !important;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
`;

export const Heading4 = styled.h3`
  margin-top: 1.6rem !important;
  font-size: 1.3rem;
  font-weight: bold;
  ${MARGIN_BOTTOM};
`;

export const ListItem = styled.li`
`;

export const Code = function({ className, children }) {
  return (
    <code
      className={className && className.replace("lang-", " language-")}
    >
      {children}
    </code>
  );
}

export const Paragraph = styled.p`
  ${MARGIN_BOTTOM};
`;

export const RestyledCode = styled(Code)`
  font-size: .85rem;
  background-color: #f4f4f4;
  border-radius: 1rem;
  color: #d43790;
  font-weight: 500;
  padding: .25rem .5rem;
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
  ${MARGIN_BOTTOM};
`;

export const UnorderedList = styled.ul`
  ${MARGIN_BOTTOM};
`;

export const Image = styled.img`
  border: 1px solid #dfdfdf;
`;

export default function Layout(props) {

  const router = useRouter();
  const pageUri = router.asPath;

  let breadcrumbs = router.asPath.split("#")[0];
  breadcrumbs = breadcrumbs.split("/");
  breadcrumbs.shift(); // The first element is an empty string so take it out

  let loading = breadcrumbs.length <= 2;

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [mobileViewport, setMobileViewport] = useState(null);
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    // Make sure all code blocks are highlighted
    window.Prism.highlightAll();

    // Make sure to set the user's theme mode preference
    const userSettingsDarkMode = window.localStorage.getItem(LOCAL_STORAGE_DARK_MODE);
    setDarkMode(userSettingsDarkMode && userSettingsDarkMode === "true");

    // Support mobile views, desktop views, and window resizing
    window.addEventListener("resize", handleWindowSizeChange);
    if (mobileViewport === null) {
      handleWindowSizeChange();
    }
  }, [mobileViewport]);

  function handleWindowSizeChange() {
    if (window.innerWidth >= 900) {
      setMobileViewport(false);
      setSideBarOpen(true);
    } else {
      setMobileViewport(true);
      setSideBarOpen(false);
    }
  }

  function toggleDarkMode() {
    window.localStorage.setItem(LOCAL_STORAGE_DARK_MODE, !darkMode);
    setDarkMode(!darkMode);
  }

  function toggleSideBar() {
    if (mobileViewport) {
      setSideBarOpen(!sideBarOpen);
    } else {
      setSideBarOpen(true);
    }
  }

  if (
    mobileViewport === null
  ) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container className="container-loading">
          <Main mobileViewport={true}>
            <InnerContainer>
              <MiddleMessage>Loading...</MiddleMessage>
            </InnerContainer>
          </Main>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <ButtonOpenSideBar
          show={mobileViewport}
          sideBarOpen={sideBarOpen}
          onClick={() => {
            toggleSideBar();
          }}
        >
          <Bar sideBarOpen={sideBarOpen} />
        </ButtonOpenSideBar>
        <LayoutTopBar
          moduleName={props.topBarModuleName}
          state={{
            darkMode,
            mobileViewport,
            toggleDarkMode,
          }}
        />
        <SideBarContainer>
          <SideBar
            categories={props.sideBarCategories}
            moduleName={props.topBarModuleName}
            moduleVersion={props.moduleVersion}
            moduleVersions={props.moduleVersions}
            mobileViewport={mobileViewport}
            isOpen={mobileViewport ? sideBarOpen : true}
            state={{
              setSideBarOpen,
            }}
          />
        </SideBarContainer>
        <Main
          mobileViewport={mobileViewport}
        >
          <InnerContainer>
            <Breadcrumbs>
              {breadcrumbs.map((breadcrumb, index) => {
                const isActive = (index + 1) == breadcrumbs.length;

                return (
                  <Pill
                    className={isActive && "active"}
                    index={index}
                    key={`${JSON.stringify(breadcrumb)}_${index}`}
                  >
                    <span className="label">{formatLabel(titleCase(breadcrumb))}</span>
                    <span className="slash">/</span>
                  </Pill>
                );
              })}
            </Breadcrumbs>
            {props.children}
            <HorizontalRule/>
            <MakeBetter>
              <MakeBetterHeading>
                Help Improve This Page
              </MakeBetterHeading>
              If you are having issues with this page (e.g., parts of this page are not loading, documentation does not make sense, etc.), please let us know by filing an issue <a href={getIssueUrl(pageUri)} target="_BLANK">here</a>. We want to make sure these documentation pages cater the best developer experience possible.
            </MakeBetter>
            <Copyright>
              &copy; 2019 - 2021 Drash Land
            </Copyright>
          </InnerContainer>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

function getIssueUrl(pageUri) {
  return `https://github.com/drashland/website-v2/issues/new?assignees=&labels=Priority:%20Medium,%20Remark:%20Investigation%20Needed%2C+documentation&template=documentation_page_issue.md&title=Issue%20on%20${pageUri}page`
}
