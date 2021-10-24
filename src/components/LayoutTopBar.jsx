import { useState } from "react";
import styled from "styled-components";
import { MarkGithub } from "@styled-icons/octicons";
import Switch from "react-switch";
import { Moon, Sun } from "@styled-icons/bootstrap";
import { useRouter } from "next/router";

const THEME_SWITCH_ICON_SIZE = "15px";

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

const Icons = styled.div`
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
  height: ${THEME_SWITCH_ICON_SIZE};
`;

const SunIcon = styled(Sun)`
  color: #333333;
  height: ${THEME_SWITCH_ICON_SIZE};
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

export default function TopBar(props) {
  const { state } = props;
  const router = useRouter();

  return (
    <Container
      mobileViewport={state.mobileViewport}
    >
      <Title>
        {props.moduleName && (
          <>
            <a href="/">Drash Land</a>
            <span className="middot">&middot;</span>
            {props.moduleName}
          </>
      )}
      </Title>
      <Icons>
        {router.asPath !== "/" && (
          <label style={{display: "flex", alignItems: "center"}}>
            <span style={{marginRight: ".25rem"}}>Mode</span>
            <ThemeSwitch
              onChange={state.toggleDarkMode} checked={state.darkMode}
              onColor="#4e5767"
              offColor="#DBE541"
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
          </label>
        )}
        <a href={getGitHubHref(props.moduleName ? props.moduleName : 'https://github.com/drashland')} target="_BLANK">
          <GitHubIcon />
        </a>
      </Icons>
    </Container>
  );
}

function getGitHubHref(module) {
  if (!module) {
    return;
  }

  switch (module.toLowerCase()) {
    case "drash":
      return "https://github.com/drashland/deno-drash";
    case "sinco":
      return "https://github.com/drashland/sinco";
    default:
      break;
  }

  return "https://github.com/drashland";
}
