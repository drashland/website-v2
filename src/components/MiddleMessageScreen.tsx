import styled from "styled-components";
import MiddleMessage from "@/src/components/MiddleMessage";
import { component } from "./ComponentBuilder";

const Container = styled.div`
  height: 100% !important;
  min-width: 375px; // iPhone X width
  position: fixed;
  width: 100% !important;
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default component<{
  message: string;
}>("MiddleMessageScreen")
  .render(({
    message,
  }) => {
    return (
      <Container>
        <MiddleMessage>{message}</MiddleMessage>
      </Container>
    );
  });
