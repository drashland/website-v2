import styled from "styled-components";
import { useRouter } from "next/router";
import RecursiveCategory from "./RecursiveCategory";
import { getApiReferenceUrl, getRoadmapsUrl } from "../services/config_service";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  background: ${({ theme }) => theme.sideBar.background};
  padding: 4rem 0 4rem 0;
  min-width: ${({ mobileViewport }) => (mobileViewport ? "100%" : "350px")};
  overflow: auto;
  position: fixed;
  height: 100%;
  transition-property: background, left;
  transition-duration: 0.25s;
  left: ${({ isOpen, mobileViewport }) => {
  if (mobileViewport) {
    return isOpen ? "0" : "-125%";
  } else {
    return "0";
  }
}};
`;

const ImageContainer = styled.div`
  padding: 7rem 0 6rem 0;
  text-align: center;
  width: 100%;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    height: ${({ theme }) => theme.module.logo.size};
    width: ${({ theme }) => theme.module.logo.size};
    z-index: 2;
  }
`;

const VersionsSelectorContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const VersionsSelectorInnerContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid #dfdfdf;
  background: #ffffff;
  width: 100%;
  padding: .25rem 1rem;
`;

const VersionsSelector = styled.select`
  background: transparent;
  width: 100%;
  padding: .5rem .25rem;
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function SideBar(props) {
  const {
    categories,
    isOpen,
    mobileViewport,
    moduleName,
    moduleVersion,
    moduleVersions,
    state,
  } = props;

  const logoName = `/logo-${moduleName.toLowerCase()}.svg`;
  const router = useRouter();

  function getLinks() {
    const links = [
      {
        is_external: true,
        label: "API Reference",
        path: getApiReferenceUrl(moduleName),
      },
    ];

    const roadmapsUrl = getRoadmapsUrl(moduleName);
    if (roadmapsUrl) {
      links.push({
        is_external: true,
        label: "Roadmaps",
        path: roadmapsUrl,
      });
    }

    return links;
  }

  /**
   * Handle when the version `select` element value is changed.
   *
   * @param e - The event object passed in from the `onChange` handler.
   */
  function handleVersionSelect(e) {
    const version = e.target.value;
    state.setSideBarOpen(false);
    router.push(`/${moduleName.toLowerCase()}/${version}`);
  }

  return (
    <Container
      mobileViewport={mobileViewport}
      isOpen={isOpen}
    >
      <ImageContainer>
        <img src={logoName} />
      </ImageContainer>
      <VersionsSelectorContainer>
        <VersionsSelectorInnerContainer>
          <VersionsSelector
            onChange={(e) => handleVersionSelect(e)}
            defaultValue={moduleVersion}
          >
            {moduleVersions.map((version, index) => {
              return (
                <option
                  key={`${JSON.stringify(version)}_${index}}`}
                  value={version}
                >
                  {version}
                </option>
              );
            })}
          </VersionsSelector>
        </VersionsSelectorInnerContainer>
      </VersionsSelectorContainer>
      {categories.map((category, index) => {
        return (
          <RecursiveCategory
            state={state}
            key={`${JSON.stringify(category)}_${index}`}
            category={category}
          />
        );
      })}
      <RecursiveCategory
        state={state}
        category={{
          label: "Links",
          paths: getLinks(),
        }}
      />
    </Container>
  );
}
