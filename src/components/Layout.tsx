import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import SideBar from "@/src/components/SideBar";
import LayoutTopBar from "@/src/components/LayoutTopBar";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import LoadingScreen from "@/src/components/LoadingScreen";
import InnerContainer from "@/src/components/InnerContainer";
import { darkTheme, lightTheme } from "@/styles/theme";
import { getGitHubCreateIssueUrl } from "@/src/services/config_service";
import { runtimeConfig } from "@/src/config";
import { usePathname } from "next/navigation";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  background: ${(props) => props.theme.layout.background};
  color: ${(props) => props.theme.layout.color};
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

const Main = styled.div<{
  $mobileViewport?: boolean;
}>`
  padding-left: ${(props) => (!props.$mobileViewport ? "420px" : "0")};
  display: flex;
  justify-content: center;
  height: 100%;
  transition-duration: 0.25s;
  transition-property: padding;
`;

const MakeBetter = styled.div`
  background-color: ${(props) => props.theme.layout.makeBetter.background};
  border-radius: ${(props) => props.theme.layout.borderRadius};
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
  background: ${(props) => props.theme.layout.horizontalRule.background};
  height: .25rem;
  width: 100%;
  margin-top: 4rem !important;
  margin-bottom: 4rem;
  box-shadow: none;
  transition-duration: 0.25s;
  transition-property: background;
`;

const Copyright = styled.div`
  padding: 6rem 0 4rem 0;
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
  text-align: center;
`;

const ButtonOpenSideBar = styled.button<{
  $show?: boolean;
  $sideBarOpen?: boolean;
}>`
  display: ${(props) => (props.$show ? "block" : "none")};
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
    top: ${(props) => (props.$sideBarOpen ? "25px" : "17px")};
    width: 25px;
    left: 20px;
    transition-duration: .25s;
    transition-property: transform, top;
    transform: ${(
  props,
) => (props.$sideBarOpen ? "rotate(-45deg)" : "rotate(0deg)")};
  }

  &:after {
    content: "";
    background: #ffffff;
    clip-path: polygon(100% 35%,100% 60%,0% 60%,0% 35%);
    position: absolute;
    top: ${({ $sideBarOpen }) => ($sideBarOpen ? "25px" : "35px")};
    height: 15px;
    width: 25px;
    left: 20px;
    transition-duration: .25s;
    transition-property: transform, top;
    transform: ${(
  props,
) => (props.$sideBarOpen ? "rotate(45deg)" : "rotate(0deg)")};
  }
`;

const ButtonOpenSidebarMiddleBar = styled.div<{
  $sideBarOpen?: boolean;
}>`
  background: #ffffff;
  clip-path: polygon(100% 35%,100% 60%,0% 60%,0% 35%);
  position: absolute;
  top: 26px;
  height: 15px;
  width: 25px;
  left: ${(props) => (props.$sideBarOpen ? "50px" : "20px")};
  opacity: ${(props) => (props.$sideBarOpen ? "0" : "1")};
  transition-duration: .25s;
  transition-property: opacity, left;
  z-index: 1;
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// (crookse) This variable is intentionally out of the component. Reason being
// there is weird behavior with switching this variable to a `useState()`
// variable. When it's a `useState()` variable and is set to
// `window.innerWidth`, it gets reset because the component seems to be
// rerendering. However, I can't see that the component is rerendering even
// with `console.log()` statements. Not sure what's going on, but NOT using
// `useState()` with this variable solves the issue with the side bar closing
// when the user scrolls on a mobile device.
let windowInnerWidth = null;

export default function Layout(props) {
  const {
    children,
    editThisPageUrl,
    moduleVersion,
    moduleVersions,
    pageModifiedTime,
    sideBarCategories,
    topBarModuleName,
    willRedirect,
  } = props;

  const pathname = usePathname();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [mobileViewport, setMobileViewport] = useState(null);
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    // Make sure all code blocks are highlighted
    // @ts-ignore This exists. The typing doesn't though. Add it maybe?
    window.Prism.highlightAll();

    // Make sure to set the user's theme mode preference
    const userSettingsDarkMode = window.localStorage.getItem(
      runtimeConfig.localStorageKeys.darkMode,
    );
    if (!userSettingsDarkMode) {
      window.localStorage.setItem(
        runtimeConfig.localStorageKeys.darkMode,
        "false",
      );
    }
    setDarkMode(
      userSettingsDarkMode && userSettingsDarkMode === "true"
        ? "true"
        : "false",
    );

    // Support mobile views, desktop views, and window resizing
    addEventListener("resize", handleWindowSizeChange);
    // If the `mobileViewport` variable hasn't been set yet, then we need to
    // perform the `handleWindowSizeChange()` to see if we're in a mobile
    // viewport or not.
    if (mobileViewport === null) {
      handleWindowSizeChange();
    }
  }, [mobileViewport]);

  /**
   * Handle when the window size is changed.
   */
  function handleWindowSizeChange() {
    // Handle desktop (or large screen) view
    if (window.innerWidth >= 900) {
      setMobileViewport(false);
      setSideBarOpen(true);
      return;
    }

    // Handle mobile (or small screen) view below
    setMobileViewport(true);

    // On mobile devices, when the user scrolls, the browser window height
    // changes and this function (`handleWindowSizeChange()`) will fire off.
    // So, when that happens, we check to see if the window width changed. If
    // it didn't, then we know the user is scrolling on a mobile device and the
    // window height is changing. In this case, we just return early. We do not
    // want the side bar to close. The only time we want it to close is when
    // the user is viewing these documentations pages on a screen bigger than
    // 900px (e.g., desktop monitor). If that's the case, then the user can
    // change their browser window width. If they do that, we want to make sure
    // we close the side bar when they size their browser window width less
    // than 900px.
    if (window.innerWidth === windowInnerWidth) {
      return;
    }

    setSideBarOpen(false);
    windowInnerWidth = window.innerWidth;
  }

  /**
   * Get the breadcrumbs that go at the top of every page.
   *
   * @returns {string[]} - An array of breadcrumbs.
   */
  function getBreadcrumbs() {
    const parts = pathname.split("#")[0];
    const breadcrumbs = parts.split("/");
    // The first element is an empty string so take it out
    breadcrumbs.shift();

    return breadcrumbs;
  }

  /**
   * Toggle dark mode by setting the state appropriately.
   */
  function toggleDarkMode() {
    const userSettingsDarkMode = window.localStorage.getItem(
      runtimeConfig.localStorageKeys.darkMode,
    );

    const value = userSettingsDarkMode && userSettingsDarkMode === "true"
      ? "false"
      : "true";

    window.localStorage.setItem(
      runtimeConfig.localStorageKeys.darkMode,
      value,
    );

    // @ts-ignore Don't really care about Prism typing
    Prism.highlightAll();
    setDarkMode(value);
  }

  /**
   * Toggle the side bar by setting the state appropriately.
   */
  function toggleSideBar() {
    if (mobileViewport) {
      setSideBarOpen(!sideBarOpen);
    } else {
      setSideBarOpen(true);
    }
  }

  // If we haven't finished checking that we're in a mobile viewport yet, then
  // show a loading screen so that the page doesn't transition from desktop to
  // mobile or mobile to desktop. That would look jank to the user.
  if (
    (mobileViewport === null) ||
    (darkMode === null) ||
    willRedirect
  ) {
    return (
      <LoadingScreen
        themeProviderTheme={darkMode === "true" ? darkTheme : lightTheme}
      />
    );
  }

  return (
    <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
      <Container
        className={`layout-v2 ${
          (darkMode === "true") ? "layout-v2-dark" : "layout-v2-light"
        }`}
      >
        <ButtonOpenSideBar
          $show={mobileViewport}
          $sideBarOpen={sideBarOpen}
          onClick={() => {
            toggleSideBar();
          }}
        >
          <ButtonOpenSidebarMiddleBar $sideBarOpen={sideBarOpen} />
        </ButtonOpenSideBar>
        <LayoutTopBar
          moduleName={topBarModuleName}
          state={{
            darkMode,
            mobileViewport,
            toggleDarkMode,
          }}
        />
        <SideBar
          categories={sideBarCategories}
          moduleName={topBarModuleName}
          moduleVersion={moduleVersion}
          moduleVersions={moduleVersions}
          mobileViewport={mobileViewport}
          isOpen={mobileViewport ? sideBarOpen : true}
          state={{
            setSideBarOpen,
          }}
        />
        <Main
          $mobileViewport={mobileViewport}
        >
          <InnerContainer>
            <Breadcrumbs breadcrumbs={getBreadcrumbs()} />
            {children}
            <HorizontalRule />
            <MakeBetter>
              <MakeBetterHeading>
                Help Improve This Page
              </MakeBetterHeading>
              {pageModifiedTime && (
                <p>
                  This page was last edited: {pageModifiedTime}
                </p>
              )}
              <p>
                If you are having issues with this page (e.g., parts of this
                page are not loading, documentation does not make sense, etc.),
                please let us know by filing an issue{" "}
                <a
                  href={getGitHubCreateIssueUrl(pathname)}
                  target="_BLANK"
                  rel="noreferrer"
                >
                  here
                </a>. We want to make sure these documentation pages cater the
                best developer experience possible.
              </p>
              {editThisPageUrl && (
                <p>
                  Alternatively, you can{" "}
                  <a
                    href={editThisPageUrl}
                    target="_BLANK"
                    rel="noreferrer"
                  >
                    edit this page
                  </a>.
                </p>
              )}
            </MakeBetter>
            <Copyright>
              &copy; 2019 - 2023 Drash Land
            </Copyright>
          </InnerContainer>
        </Main>
      </Container>
    </ThemeProvider>
  );
}
