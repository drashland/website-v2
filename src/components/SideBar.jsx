import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  background: #f3f6f9;
  padding: 4rem 0 4rem 0;
  min-width: ${({ mobileViewport }) => (mobileViewport ? '100%' : '350px')};
  overflow: auto;
  position: fixed;
  height: 100%;
  transition-property: left;
  transition-duration: 0.25s;
  left: ${({ isOpen, mobileViewport }) => {
    if (mobileViewport) {
      return isOpen ? '0' : '-125%';
    } else {
      return '0';
    }
  }};
`;

const Category = styled.div`
  padding: 1rem 2rem .25rem 2rem;

  .category {
    padding: 0 0 1rem 1.25rem;
    .category-heading {
      border: none;
      padding: 0;
      margin-bottom: .5rem;
    }

    .category {
      .category-heading {
        border: none;
        padding-top: 1rem;
        margin: 1rem 0 .5rem 0;
      }
    }
  }
`;

const CategoryHeading = styled.div`
  border-bottom: 1px solid #dfdfdf;
  font-size: .8rem;
  font-weight: bold;
  letter-spacing: .1rem;
  margin-bottom: 1rem;
  padding: 0 0 .1rem 0;
  text-transform: uppercase;
`;

const LinkContainer = styled.div`
  display: block;
  a {
    color: ${({ isActive }) => (isActive ? "#7dade2" : "#333333")};
    border-left: 4px solid;
    border-color: ${({ isActive }) => (isActive ? "#7dade2" : "transparent")};
    transition-property: border, color;
    padding-left: 1rem;
    transition-duration: 0.15s;
    margin: .1rem 0;

    &:hover {
      color: #7dade2;
      border-left: 4px solid #7dade2;
      text-decoration: none !important;
    }
  }
`;

const LOGO_SIZE = 100;

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
    height: ${LOGO_SIZE}px;
    width: ${LOGO_SIZE}px;
    z-index: 2;
  }
`;

const Background = styled.div`
  overflow: hidden;
  border: 5px solid #000000;
  height: ${LOGO_SIZE * .8}px;
  width: ${LOGO_SIZE * .8}px;
  position: absolute;
  border-radius: 50%;
  z-index: 1;


  &:before {
    opacity: .25;
    content: "";
    position: absolute;
    background-image: url("/bg-polygons.jpg");
    background-size: 400%;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
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

export default function SideBar(props) {
  const { mobileViewport, state } = props;

  const logoName = `/logo-${props.moduleName.toLowerCase()}.svg`

  const router = useRouter();

  function handleVersionSelect(e) {
    const version = e.target.value;
    state.setSideBarOpen(false);
    router.push(`/${props.moduleName.toLowerCase()}/${version}`);
  }

  return (
    <Container
      mobileViewport={mobileViewport}
      isOpen={props.isOpen}
    >
      <ImageContainer>
        <img src={logoName}/>
      </ImageContainer>
      <VersionsSelectorContainer>
        <VersionsSelectorInnerContainer>
          <VersionsSelector
            onChange={(e) => handleVersionSelect(e)}
            defaultValue={props.moduleVersion}
          >
            {props.moduleVersions.map((version, index) => {
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
      {props.categories.map((category, index) => {
        return (
          <RecursiveCategory
            state={state}
            key={`${JSON.stringify(category)}_${index}`}
            category={category}
          />
        );
      })}
    </Container>
  );
}

function RecursiveCategory(props) {
  const { state } = props;
  const router = useRouter();

  return (
    <Category className="category">
      <CategoryHeading className="category-heading">{props.category.label}</CategoryHeading>
      {props.category.paths.map((path, index) => {
        if (path.is_directory) {
          return (
            <RecursiveCategory
              state={state}
              key={`${JSON.stringify(path)}_${index}`}
              category={path}
            />
          );
        }

        return (
          <LinkContainer
            key={`${JSON.stringify(path)}_${index}`}
            isActive={path.path == router.asPath}
            onClick={() => state.setSideBarOpen(false)}
          >
            <Link
              href={path.path}
            >
              {path.label}
            </Link>
          </LinkContainer>
        );
      })}
    </Category>
  );
}
