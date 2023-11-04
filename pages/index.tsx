import { Card } from "@/src/components/landing/Card";
import { Compat } from "@/src/components/landing/Compat";
import {
  LinkArrowRight,
  LinkArrowRightPlain,
} from "@/src/components/landing/LinkArrowRight";
import { LinkExternal } from "@/src/components/nextra/LinkExternal";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

// slate-200 #e2e8f0
// slate-100 #f1f5f9

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Home() {
  return (
    <div className={"leading-relaxed bg-white"}>
      <TopBar />
      <Hero />
      <Latest />
      <Projects />
      <div className="p-5 bg-black text-slate-200 font-medium uppercase tracking-tight w-full text-center text-[11px]">
        <p>&copy; 2019 - 2023 Drash Land</p>
        <div className=" mt-10 mb-10">
          <Social />
        </div>
      </div>
      <Modules />
    </div>
  );
}

function GitHubIcon({
  onClick = () => {},
}) {
  return (
    <Icon>
      <svg
        onClick={onClick}
        className="w-6 h-6 text-slate-100 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
          clip-rule="evenodd"
        />
      </svg>
    </Icon>
  );
}

function DiscordIcon({
  onClick = () => {},
}) {
  return (
    <Icon>
      <svg
        onClick={onClick}
        className="w-6 h-6 text-slate-100 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 21 16"
      >
        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
      </svg>
    </Icon>
  );
}

function Icon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="cursor-pointer">
      {children}
    </div>
  );
}

function MaxWidth({ children, className = "max" }) {
  if (className === "max") {
    return (
      <div className="max-w-[2560px] w-full">
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}

function Hero() {
  const colors = [
    // "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-700 via-purple-300 to-rose-600",
    // "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-sky-100 via-indigo-600 to-blue-700",
    "bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-sky-100 via-sky-400 to-[#24c7c2]",
    // "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400 via-violet-500 to-rose-100",
    // "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-200 via-pink-400 to-pink-700",
    // "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-500 via-emerald-400 to-teal-500",
    // "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-blue-900",
    // "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-200 via-indigo-400 to-slate-400",
    // "bg-gradient-to-br from-blue-500 via-slate-400 to-indigo-200",
    // "bg-gradient-to-t from-blue-700 via-indigo-400 to-neutral-200",
  ];

  const h1Background = rand(colors);

  return (
    <div className="hero mb-15">
      <div className="transition-all flex flex-col sm:flex-row w-full h-[300px] sm:h-[550px] bg-black justify-center items-center">
        <h1
          className={`${h1Background} transition-all bg-clip-text text-4xl sm:text-6xl font-extrabold tracking-tighter text-center text-transparent`}
        >
          Drash Land
        </h1>
        <p className="transition-all flex sm:flex-col ml-1 text-slate-100 leading-[1rem] text-md pt-[2px]">
          <span className="inline-block">&nbsp;Develop</span>
          <span className="inline-block">&nbsp;with</span>
          <span className="inline-block">&nbsp;confidence</span>
        </p>
      </div>
      <div className="flex w-full relative z-1 h-[100px] sm:h-[150px] -mt-5 transition-[height]">
        <Image
          src={"/haikei/layered-waves-haikei-02.svg"}
          objectPosition="top"
          layout="fill"
          alt="Hero border"
        />
      </div>
    </div>
  );
}

function Latest() {
  return (
    <div className="latest bg-white py-20 overflow-hidden">
      <div className="w-full flex justify-center">
        <MaxWidth>
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center mb-20">
              <H2>Latest News</H2>
              <div className="border border-1 max-w-[100px] w-full" />
            </div>
            <div className="flex flex-col items-center gap-5">
              <H3>Drash v3.x Beta Released</H3>
              <p className="mb-2">
                Learn. Build. Send it. Repeat.
              </p>
              <div className="flex flex-col mb-10 items-center justify-center">
                <LinkArrowRight
                  href="https://dash.deno.com/playground/drash-v3x-preview-1"
                  external
                >
                  <span>Fork on Deno Deploy</span>
                </LinkArrowRight>
                <LinkArrowRight href="/drash-v3.x">
                  Build something great
                </LinkArrowRight>
              </div>
            </div>
          </div>
        </MaxWidth>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="projects bg-slate-100 mt-20">
      <div className="w-full flex justify-center">
        <MaxWidth>
          <div className="mt-20">
            <H2>Explore Our Projects</H2>
          </div>
          <p className="text-center text-md mb-20">
            Zero dependencies. Extensively documented. Thoroughly tested.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                title: "Drash",
                // logo: "/logo-drash.svg",
                description:
                  "A microframework for building JavaScript HTTP applications. Runtime-agnostic. Strongly typed.",
                compat: {
                  browser: true,
                  bun: true,
                  cloudflare: true,
                  deno: true,
                  node: true,
                },
                actions: {
                  href: "/drash-v3.x",
                  text: "Build something great",
                },
              },
              {
                title: "Rhum",
                // logo: "/logo-rhum.svg",
                description:
                  "A test double library providing you with fakes, dummies, mocks, spies, and stubs with strict definitions and usage.",
                compat: {
                  browser: true,
                  bun: true,
                  cloudflare: true,
                  deno: true,
                  node: true,
                },
                actions: {
                  href: "/rhum",
                  text: "Stabilize your apps",
                },
              },
              {
                title: "Sinco",
                // logo: "/logo-sinco.svg",
                description:
                  "A browser automation and testing tool. Uses Chrome DevTools Protocol.",
                compat: {
                  deno: true,
                },
                actions: {
                  href: "/sinco",
                  text: "Add browser automation to your stack",
                },
              },
              {
                title: "Accio",
                description:
                  "A deep data searcher. Search key-value pairs, arrays, and combinations of both.",
                compat: {
                  browser: true,
                  bun: true,
                  cloudflare: true,
                  deno: true,
                  node: true,
                },
                actions: {
                  external: true,
                  href: "https://github.com/drashland/accio",
                  text: "Search your data",
                },
              },
              {
                title: "Moogle",
                description: (
                  <>
                    A lightweight search index implementation of the{" "}
                    <code className="text-sm text-pink-400 bg-slate-100 px-[8px] py-[2px] rounded-lg">
                      Map
                    </code>{" "}
                    API.
                  </>
                ),
                compat: {
                  browser: true,
                  bun: true,
                  cloudflare: true,
                  deno: true,
                  node: true,
                },
                actions: {
                  external: true,
                  href: "https://github.com/drashland/moogle",
                  text: "Build a search form",
                },
              },
            ].map((props) => (
              <Card.Container key={props.title} title={props.title}>
                <Card.Description>
                  {props.description}
                </Card.Description>
                <Card.Actions>
                  <LinkArrowRight
                    href={props.actions.href}
                    external={props.actions.external}
                  >
                    {props.actions.text}
                  </LinkArrowRight>
                </Card.Actions>
                <Card.Compat {...props.compat} />
              </Card.Container>
            ))}
          </div>
        </MaxWidth>
      </div>
    </div>
  );
}

function Modules() {
  const links = [
    {
      name: "Accio",
      href: "https://github.com/drashland/accio",
      external: true,
    },
    // { name: "Dmm", href: "/dmm" },
    { name: "Drash", href: "/drash" },
    // { name: "Line", href: "/line" },
    {
      name: "Moogle",
      href: "https://github.com/drashland/moogle",
      external: true,
    },
    { name: "Rhum", href: "/rhum" },
    { name: "Sinco", href: "/sinco" },
    // { name: "Vital", href: "/vital" },
    // { name: "Wocket", href: "/wocket" },
  ];

  return (
    <div className="flex justify-center border-t border-slate-900 flex w-full p-3 bg-black">
      <MaxWidth>
        <div className="flex flex-col sm:flex-row text-center w-full text-gray-200 antialiased font-semibold uppercase text-[11px] tracking-wide justify-center">
          {links.map((link) => {
            return (
              <p
                key={JSON.stringify(link)}
                className="mb-4 sm:mb-0 ml-0 sm:ml-2 first-of-type:ml-0 mr-0 sm:mr-2 pr-0 sm:pr-4 border-0 sm:border-1 sm:border-r last-of-type:border-none sm:border-gray-800"
              >
                {link.external
                  ? (
                    <LinkArrowRightPlain
                      href={link.href}
                      external={true}
                    >
                      {link.name}
                    </LinkArrowRightPlain>
                  )
                  : <Link href={link.href}>{link.name}</Link>}
              </p>
            );
          })}
        </div>
      </MaxWidth>
    </div>
  );
}

function H2({
  children,
}) {
  return (
    <h2 className="text-xl transition-all font-semibold text-center mb-2">
      {children}
    </h2>
  );
}

function H3({
  children,
}) {
  return (
    <h2 className="text-3xl transition-all font-semibold tracking-tighter text-center mb-2">
      {children}
    </h2>
  );
}

function TopBar() {
  return (
    <div className="flex justify-center fixed t-0 l-0 border-b border-slate-900 flex w-full p-3 bg-black z-10">
      <MaxWidth>
        <div className="flex w-full justify-between items-center">
          <p className="text-slate-100 tracking-tight text-sm">
            Drash Land
          </p>
          <Social />
        </div>
      </MaxWidth>
    </div>
  );
}

function Social() {
  return (
    <div className="flex gap-5 justify-center">
      <a
        href="https://github.com/drashland"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://discord.gg/RFsCSaHRWK"
        target="_blank"
        rel="noreferrer"
      >
        <DiscordIcon />
      </a>
    </div>
  );
}
