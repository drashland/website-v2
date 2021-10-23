import styled from "styled-components";
import { MarkGithub } from "@styled-icons/octicons";

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

export default function TopBar(props) {
  const { state } = props;

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
    default:
      break;
  }

  return "https://github.com/drashland";
}