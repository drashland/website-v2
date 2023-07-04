import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import LayoutTopBar from "@/src/components/LayoutTopBar";
import LoadingScreen from "@/src/components/LoadingScreen";
import { common as theme } from "@/styles/theme";

const MAINTAINERS = [
  {
    github_username: "crookse",
    image_src: "https://github.com/crookse.png",
  },
  {
    github_username: "ebebbington",
    image_src: "https://github.com/ebebbington.png",
  },
  {
    github_username: "Guergeiro",
    image_src: "https://github.com/Guergeiro.png",
  },
  {
    github_username: "saragee3",
    image_src: "https://github.com/saragee3.png",
  },
];

const KEY_CONTRIBUTORS = [
  {
    github_username: "SnoCold",
    image_src: "https://github.com/SnoCold.png",
  },
  {
    github_username: "prisis",
    image_src: "https://github.com/prisis.png",
  },
];

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Hero = styled.div`
  background: #2f343c;
  color: #ffffff;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;
  padding-bottom: 75px;

  img {
    position: relative;
    z-index: 2;
    margin-bottom: 1rem;
  }

  &:after {
    clip-path: polygon(100% 70%, 73% 64%, 24% 71%, 0 67%, 0 100%, 100% 100%);
    content: "";
    position: absolute;
    background: #ffffff;
    height: 500px;
    width: 100%;
    bottom: -75px;
    z-index: 1;
  }

  &:before {
    opacity: .05;
    content: "";
    position: absolute;
    background: url("/bg-polygons.jpg") center center no-repeat;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;

const Org = styled.p`
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: .1rem;
  color: #7dade2;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const Motto = styled.p`
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
`;

const Copyright = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: .8rem;
  letter-spacing: .1rem;
  text-transform: uppercase;
  margin-bottom: 0 !important;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Main = styled.div`
  background: #ffffff;
  position: relative;
  z-index: 2;
  color: #333;
`;

const Section = styled.div`
  background: ${({ $background }) => $background ? $background : "#ffffff"};
  color: ${({ $color }) => $color ? $color : "#333333"};
  display: flex;
  padding: 4rem 2rem;
  justify-content: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  letter-spacing: .1rem;
  text-transform: uppercase;
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
`;

const Lede = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  cursor: pointer;
  background: #ffffff;
  border-radius: ${theme.layout.borderRadius};
  padding: 1.5rem;
  color: #333333;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .5);
  text-align: center;
  transition-property: bottom, position;
  transition-duration: .25s;
  bottom: 0;
  position: relative;
  max-width: 30%;
  width: 100%;

  &:hover {
    bottom: .5rem;
  }

  img {
    height: 100px;
    width: 100px;
    z-index: 2;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 800px) {
    max-width: 40%;
  }

  @media screen and (max-width: 700px) {
    max-width: 100%;
  }
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.a`
  background: #000000;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: ${theme.button.borderRadius};
  font-weight: bold;
  font-size: .8rem;
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-align: center;
  transition-property: color;
  transition-duration: .15s;
  text-decoration: none;

  &:hover {
    color: #7dade2;
    text-decoration: none;
  }
`;

const Hr = styled.div`
  height: 5px;
  border-radius: 3rem;
  background: rgba(0, 0, 0, 0.25);
  margin-bottom: 3rem;
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-items: flex-end;
`;

const Tag = styled.div`
  background: #000000;
  border-radius: ${theme.tag.borderRadius};
  color: #ffffff;
  font-size: .75rem;
  padding: .15rem .9rem;
  text-align: center;
  text-transform: uppercase;
  margin-right: .25rem;
  &:last-of-type {
    margin-right: 0;
  }
`;

const MaintainersContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const Maintainer = styled.img`
  border-radius: 50%;
  cursor: pointer;
  padding: 1rem;
  max-width: 110px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export default function Home() {
  const router = useRouter();
  const [mobileViewport, setMobileViewport] = useState(null);

  // TODO(crookse) This is duplicate code. We should switch to using contexts or something else.
  useEffect(() => {
    // Support mobile views, desktop views, and window resizing
    addEventListener("resize", handleWindowSizeChange);
    if (mobileViewport === null) {
      handleWindowSizeChange();
    }
  }, [mobileViewport]);

  // TODO(crookse) This is duplicate code. We should switch to using contexts or something else.
  function handleWindowSizeChange() {
    if (window.innerWidth >= 900) {
      setMobileViewport(false);
    } else {
      setMobileViewport(true);
    }
  }

  const handleTeamMemberClick = (username) => {
    window.open(`https://github.com/${username}`, "_blank").focus();
  };

  if (mobileViewport === null) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <LayoutTopBar
        isLandingPage={true}
        state={{
          mobileViewport,
        }}
      />
      <Hero>
        <img src="/assets/common/img/logo_drash.svg" width="175" />
        <Org>Drash Land</Org>
        Develop With Confidence
      </Hero>
      <Main>
        <Section>
          <InnerContainer>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Lede>
                Zero dependencies. Extensively documented. Thoroughly tested.
              </Lede>
              <p style={{ marginBottom: "3rem" }}>
                It&apos;s what we&apos;re all about.
              </p>
              <Button href="https://discord.gg/RFsCSaHRWK">
                Join The Community
              </Button>
            </div>
          </InnerContainer>
        </Section>
        <Section $background="#2f343c" $color="#ffffff">
          <InnerContainer>
            <SectionTitle>Our Software</SectionTitle>
            <CardsContainer>
              <Card onClick={() => router.push("/drash")}>
                <ImageContainer>
                  <img src="/logo-drash.svg" />
                </ImageContainer>
                <CardTitle>Drash</CardTitle>
                <CardDescription>A micro HTTP framework</CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/wocket")}>
                <ImageContainer>
                  <img src="/logo-wocket.svg" />
                </ImageContainer>
                <CardTitle>Wocket</CardTitle>
                <CardDescription>A WebSocket framework</CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/dmm")}>
                <ImageContainer>
                  <img src="/logo-dmm.svg" />
                </ImageContainer>
                <CardTitle>dmm</CardTitle>
                <CardDescription>A lightweight module manager</CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/rhum")}>
                <ImageContainer>
                  <img src="/logo-rhum.svg" />
                </ImageContainer>
                <CardTitle>Rhum</CardTitle>
                <CardDescription>A test double library</CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                  <Tag>Node</Tag>
                  <Tag>Browser</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/sinco")}>
                <ImageContainer>
                  <img src="/logo-sinco.svg" />
                </ImageContainer>
                <CardTitle>Sinco</CardTitle>
                <CardDescription>
                  A browser automation and testing tool
                </CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/line")}>
                <ImageContainer>
                  <img src="/logo-line.svg" />
                </ImageContainer>
                <CardTitle>Line</CardTitle>
                <CardDescription>A command-line framework</CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
              <Card
                onClick={() =>
                  router.push("https://github.com/drashland/moogle")}
              >
                <CardTitle>Moogle</CardTitle>
                <CardDescription>
                  An easy way to &quot;Google&quot; your &quot;Map&quot; using
                  search terms
                </CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                  <Tag>Node</Tag>
                  <Tag>Browser</Tag>
                </TagsContainer>
              </Card>
              <Card
                onClick={() =>
                  router.push("https://github.com/drashland/accio")}
              >
                <CardTitle>Accio</CardTitle>
                <CardDescription>
                  An easy way to search for deeply nested data in large datasets
                </CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                  <Tag>Node</Tag>
                  <Tag>Browser</Tag>
                </TagsContainer>
              </Card>
              <Card onClick={() => router.push("/vital")}>
                <ImageContainer>
                  <img src="/logo-vital.svg" />
                </ImageContainer>
                <CardTitle>Vital</CardTitle>
                <CardDescription>
                  Postgres ORM for Deno
                </CardDescription>
                <TagsContainer>
                  <Tag>Deno</Tag>
                </TagsContainer>
              </Card>
            </CardsContainer>
          </InnerContainer>
        </Section>
        <Section>
          <InnerContainer>
            <SectionTitle>Who We Are</SectionTitle>
            <p>
              We&apos;re a small squad of software engineers who code a lot of
              really cool stuff. We focus heavily on the developer UX because we
              think coding should be fun.
            </p>
            <p>
              When we release software in the JavaScript/TypeScript ecosystem,
              you can count on these three things:
            </p>
            <ul>
              <li>
                Zero Dependencies (mostly): Every Drash Land project starts with
                zero dependencies. We believe our software should be easy to use
                and users of our software shouldn&apos;t have to worry about
                dependencies in dependencies. If something we create has
                dependencies, we&apos;ll be sure to let you know in the
                documentation pages.
              </li>
              <li>
                Extensive Documentation: We love a good challenge, but working
                with Drash Land software shouldn&apos;t be one of them.
                That&apos;s why we provide all of the documentation you&apos;ll
                need. Want to know how to set up an HTTP server? We got you.
                Need to know how to set up WebSockets? We&apos;ll show you the
                way. And if you ever get stuck, just send us a message in our
                {" "}
                <a
                  href="https://discord.gg/RFsCSaHRWK"
                  target="_BLANK"
                  rel="noreferrer"
                >
                  Discord
                </a>{" "}
                and we&apos;ll gladly help you! Seriously! We respond fast.
              </li>
              <li>
                Thorough Testing: We HELLA test our software. We put our
                software through all of the use cases we can think of and find
                edge cases on edge cases. We know our software works -- the
                happy path and more. Every example code block and every tutorial
                we write is tested end-to-end (Caveat here... Sometimes we test
                them, make a{" "}
                <code className="manual-code">chore: clean up</code>{" "}
                commit update afterwards, and voila -- we have a typo. Apologies
                in advance!).
              </li>
            </ul>
            <p style={{ marginBottom: "3rem" }}>
              Drash Land is more than just a project to us. We&apos;ve invested
              our whole selves (and lots of energy drinks) into this. Does that
              make us nerds? We hope so. Because nerds make the best stuff.
            </p>
            <SectionTitle>Core Team</SectionTitle>
            <MaintainersContainer>
              {MAINTAINERS.map((maintainer, index) => {
                return (
                  <Maintainer
                    key={`${JSON.stringify(maintainer)}_${index}`}
                    onClick={() =>
                      handleTeamMemberClick(maintainer.github_username)}
                    src={maintainer.image_src}
                  />
                );
              })}
            </MaintainersContainer>
            <SectionTitle>Key Contributors</SectionTitle>
            <MaintainersContainer>
              {KEY_CONTRIBUTORS.map((maintainer, index) => {
                return (
                  <Maintainer
                    key={`${JSON.stringify(maintainer)}_${index}`}
                    onClick={() =>
                      handleTeamMemberClick(maintainer.github_username)}
                    src={maintainer.image_src}
                  />
                );
              })}
            </MaintainersContainer>
          </InnerContainer>
        </Section>
        <Section $background="#2f343c" $color="#ffffff">
          <InnerContainer>
            <Copyright>&copy; 2019 - 2023 Drash Land</Copyright>
          </InnerContainer>
        </Section>
      </Main>
    </Container>
  );
}