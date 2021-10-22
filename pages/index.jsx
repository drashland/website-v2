import styled from "styled-components";
import { useRouter } from "next/router";
import LayoutTopBar from "../src/components/LayoutTopBar";

const HERO_HEIGHT = "600px";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Hero = styled.div`
  background: #2f343c;
  color: #ffffff;
  height: ${HERO_HEIGHT};
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
  p {
    margin-bottom: 2rem;
  }
`;

const Section = styled.div`
  background: ${({ background }) => background ? background : "#ffffff"};
  color: ${({ color }) => color ? color : "#333333"};
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
`;

const LOGO_SIZE = 100;

const Card = styled.div`
  cursor: pointer;
  background: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  color: #333333;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .5);
  text-align: center;
  width: 100%;
  max-width: 33%;
  transition-property: bottom, position;
  transition-duration: .25s;
  bottom: 0;
  position: relative;

  &:hover {
    bottom: .5rem;
  }

  img {
    height: ${LOGO_SIZE}px;
    width: ${LOGO_SIZE}px;
    z-index: 2;
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
`

const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 0 !important;
`

const Button = styled.a`
  background: #000000;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 3rem;
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
`

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {

  const router = useRouter();

  function navigateTo(module) {
    switch(module) {
      case "drash":
        router.push("/drash")
        break;
      case "sinco":
        router.push("/sinco")
      default:
        break;
    }
  }

  return (
    <Container>
      <LayoutTopBar isLandingPage={true} />
      <Hero>
        <img src="https://drash.land/assets/common/img/logo_drash.svg" width="175" />
        <Org>Drash Land</Org>
      </Hero>
      <Main>
        <Section>
          <InnerContainer>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Lede>Zero dependencies. Extensively documented. Thoroughly tested.</Lede>
              <p style={{marginBottom: "3rem"}}>It's what we're all about.</p>
              <Button href="https://discord.gg/RFsCSaHRWK">Join The Community</Button>
            </div>
          </InnerContainer>
        </Section>
        <Section background="#2f343c" color="#ffffff">
          <InnerContainer>
            <SectionTitle>Deno Software</SectionTitle>
            <CardsContainer>
              <Card onClick={() => navigateTo("drash")}>
                <ImageContainer>
                  <img src="/logo-drash.svg"/>
                </ImageContainer>
                <CardTitle>Drash</CardTitle>
                <CardDescription>A micro HTTP framework</CardDescription>
              </Card>
              <Card>
                <ImageContainer>
                  <img src="/logo-wocket.svg"/>
                </ImageContainer>
                <CardTitle>Wocket</CardTitle>
                <CardDescription>A WebSocket framework</CardDescription>
              </Card>
              <Card>
                <ImageContainer>
                  <img src="/logo-dmm.svg"/>
                </ImageContainer>
                <CardTitle>dmm</CardTitle>
                <CardDescription>A lightweight module manager</CardDescription>
              </Card>
            </CardsContainer>
            <CardsContainer>
              <Card>
                <ImageContainer>
                  <img src="/logo-rhum.svg"/>
                </ImageContainer>
                <CardTitle>Rhum</CardTitle>
                <CardDescription>A unit test framework</CardDescription>
              </Card>
              <Card onClick={() => navigateTo("sinco")}>
                <ImageContainer>
                  <img src="/logo-sinco.svg"/>
                </ImageContainer>
                <CardTitle>Sinco</CardTitle>
                <CardDescription>A browser automation and testing tool</CardDescription>
              </Card>
              <Card>
                <ImageContainer>
                  <img src="/logo-line.svg"/>
                </ImageContainer>
                <CardTitle>Line</CardTitle>
                <CardDescription>A command-line framework</CardDescription>
              </Card>
            </CardsContainer>
            <Hr />
            <SectionTitle>Node Software</SectionTitle>
            <CardsContainer>
              <Card>
                <CardTitle>Moogle</CardTitle>
                <CardDescription>An easy way to "Google" your "Map" using search terms</CardDescription>
              </Card>
              <Card>
                <CardTitle>Accio</CardTitle>
                <CardDescription>An easy way to search for deeply nested data in large datasets</CardDescription>
              </Card>
            </CardsContainer>
          </InnerContainer>
        </Section>
        <Section>
          <InnerContainer>
            <SectionTitle>The Drash Land Team</SectionTitle>
            <p>We are a small squad of software engineers who code a lot of really cool stuff. We focus heavily on the developer UX because we think coding should be fun.</p>
            <p>When we release software in the Deno or Node ecosystem, you can count on these three things:</p>
            <ul>
              <li>Zero Dependencies: Every Drash Land project has zero dependencies (with the exception of Deno and Node, of course).</li>
              <li>Extensive Documentation: We love a good challenge but working with Drash shouldn't be one of them. That's why we provide all of the documentation you'll need. Want to know how to set up a server? We got you. Need to know how to set up web sockets? We'll show you the way. And if you ever get stuck, just send us a message in our Discord and we'll gladly help you!</li>
              <li>Thorough Testing: To put it bluntly, we test the shit out of our software. We know it works. Every example code block and every tutorial we write is tested end-to-end.</li>
            </ul>
            <p>Drash Land is more than just a project to us here. We've invested our whole selves (and lots of energy drinks) into this. Does that make us nerds? We hope so. Because nerds make the best stuff.</p>
          </InnerContainer>
        </Section>
        <Section background="#2f343c" color="#ffffff">
          <InnerContainer>
            <Copyright>&copy; 2019 - 2020 Drash Land</Copyright>
          </InnerContainer>
        </Section>
      </Main>
    </Container>
  )
}
