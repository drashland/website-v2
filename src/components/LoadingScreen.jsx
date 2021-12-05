import styled, { ThemeProvider } from "styled-components";
import InnerContainer from "./InnerContainer";
import { lightTheme } from "../../styles/theme";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  background: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.color};
  width: 100%;
  height: auto;
  min-width: 375px; // iPhone X width
  transition-duration: 0.25s;
  transition-property: background;
  height: 100% !important;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  transition-duration: 0.25s;
  transition-property: padding;
`;

const MiddleMessage = styled.div`
  align-items: center;
  display: flex;
  font-size: .8rem;
  font-weight: bold;
  height: 100%;
  justify-content: center;
  letter-spacing: .1rem;
  text-transform: uppercase;
  width: 100%;
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function LoadingScreen(props) {
  const { message = null, theme = null } = props;

  return (
    <ThemeProvider theme={theme ? theme : lightTheme}>
      <Container>
        <Main>
          <InnerContainer>
            <MiddleMessage>{message ? message : "Loading..."}</MiddleMessage>
          </InnerContainer>
        </Main>
      </Container>
    </ThemeProvider>
  );
}
