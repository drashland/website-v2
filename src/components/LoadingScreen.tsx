import styled, { ThemeProvider } from "styled-components";
import InnerContainer from "@/src/components/InnerContainer";
import { lightTheme } from "@/styles/theme";
import MiddleMessage from "@/src/components/MiddleMessage";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  background: ${(props) => props.theme.layout.background};
  color: ${(props) => props.theme.layout.color};
  width: 100%;
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

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function LoadingScreen({
  message = null,
  themeProviderTheme = null,
}) {
  const theme = themeProviderTheme ? themeProviderTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Main>
          <InnerContainer>
            <MiddleMessage>
              {message ? message : "Loading..."}
            </MiddleMessage>
          </InnerContainer>
        </Main>
      </Container>
    </ThemeProvider>
  );
}
