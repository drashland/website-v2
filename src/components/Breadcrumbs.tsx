import styled from "styled-components";
import { formatLabel } from "@/src/services/string_service";
import { titleCase } from "title-case";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  margin-top: 6rem !important;
  margin-bottom: 3rem;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Breadcrumb = styled.div`
  color: ${(props) => props.theme.breadcrumbs.color};
  display: inline-block;

  .slash {
    padding: 0 1rem;
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    .slash {
      padding: 0 0.5rem;
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

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function Breadcrumbs(props) {
  const {
    breadcrumbs,
  } = props;

  function addParensToTutorialsBreadcrumb(breadcrumb) {
    return breadcrumb
      .replace("Tutorials Node", "Tutorials (Node)")
      .replace("Tutorials Deno", "Tutorials (Deno)");
  }

  return (
    <Container>
      {breadcrumbs.map((breadcrumb, index) => {
        const isActive = (index + 1) == breadcrumbs.length;

        return (
          <Breadcrumb
            className={isActive && "active"}
            key={`${JSON.stringify(breadcrumb)}_${index}`}
          >
            <span className="label">
              {addParensToTutorialsBreadcrumb(
                formatLabel(titleCase(breadcrumb)),
              )}
            </span>
            <span className="slash">/</span>
          </Breadcrumb>
        );
      })}
    </Container>
  );
}
