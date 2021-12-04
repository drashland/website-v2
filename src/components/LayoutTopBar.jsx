import { useEffect, useState } from "react";
import styled from "styled-components";
import { MarkGithub } from "@styled-icons/octicons";
import Switch from "react-switch";
import { Moon, Sun } from "@styled-icons/bootstrap";
import { useRouter } from "next/router";
import { getGitHubUrl } from "../services/config_service";
import Link from "next/link";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  font-size: ${({ mobileViewport }) => (mobileViewport ? ".6rem" : ".8rem")};
  font-weight: bold;
  letter-spacing: .1rem;
  text-transform: uppercase;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #2f343c;
  color: #ffffff;
  padding: 1rem;
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  a {
    color: #7dade2;
    text-decoration: none !important;
  }

  .middot {
    display: inline-block;
    margin: 0 .75rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const GitHubIcon = styled(MarkGithub)`
  color: #ffffff;
  height: 1.5rem;
  width: auto;
`;

const MoonIcon = styled(Moon)`
  height: ${({ theme }) => theme.themeSwitch.icon.height};
`;

const SunIcon = styled(Sun)`
  color: #333333;
  height: ${({ theme }) => theme.themeSwitch.icon.height};
`;

const ThemeSwitchContainer = styled.label`
  align-items: center;
  display: flex;
`;

const ThemeSwitch = styled(Switch)`
  margin-right: 1rem;
`;

const ThemeSwitchIconContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function TopBar(props) {
  const {
    moduleName,
    state,
  } = props;

  const router = useRouter();

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <Container
      mobileViewport={state.mobileViewport}
    >
      <Title>
        {moduleName && (
          <>
            <Link href="/"><a>Drash Land</a></Link>
            <span className="middot">&middot;</span>
            {moduleName}
          </>
        )}
      </Title>
      <RightSection>
        {router.asPath !== "/" && (
          <ThemeSwitchContainer>
            <span style={{ marginRight: ".25rem" }}>Mode</span>
            <ThemeSwitch
              onChange={state.toggleDarkMode}
              checked={state.darkMode}
              onColor="#4e5767"
              offColor="#fce803"
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              uncheckedIcon={
                <ThemeSwitchIconContainer>
                  <SunIcon />
                </ThemeSwitchIconContainer>
              }
              checkedIcon={
                <ThemeSwitchIconContainer>
                  <MoonIcon />
                </ThemeSwitchIconContainer>
              }
            />
          </ThemeSwitchContainer>
        )}
        <a
          href={getGitHubUrl(moduleName)}
          target="_BLANK"
          rel="noreferrer"
        >
          {pageLoaded === true && <GitHubIcon />}
        </a>
      </RightSection>
    </Container>
  );
}
