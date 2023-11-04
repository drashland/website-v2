export default function AboutUs() {
  return (
    <div className="flex w-full h-full">
      <h2>Who We Are</h2>
      <p>
        We&apos;re a small squad of software engineers who code a lot of really
        cool stuff. We focus heavily on the developer UX because we think coding
        should be fun.
      </p>
      <p>
        When we release software in the JavaScript/TypeScript ecosystem, you can
        count on these three things:
      </p>
      <ul>
        <li>
          Zero Dependencies (mostly): Every Drash Land project starts with zero
          dependencies. We believe our software should be easy to use and users
          of our software shouldn&apos;t have to worry about dependencies in
          dependencies. If something we create has dependencies, we&apos;ll be
          sure to let you know in the documentation pages.
        </li>
        <li>
          Extensive Documentation: We love a good challenge, but working with
          Drash Land software shouldn&apos;t be one of them. That&apos;s why we
          provide all of the documentation you&apos;ll need. Want to know how to
          set up an HTTP server? We got you. Need to know how to set up
          WebSockets? We&apos;ll show you the way. And if you ever get stuck,
          just send us a message in our{" "}
          <a
            href="https://discord.gg/UuYKTVMW"
            target="_BLANK"
            rel="noreferrer"
          >
            Discord
          </a>{" "}
          and we&apos;ll gladly help you! Seriously! We respond fast.
        </li>
        <li>
          Thorough Testing: We HELLA test our software. We put our software
          through all of the use cases we can think of and find edge cases on
          edge cases. We know our software works -- the happy path and more.
          Every example code block and every tutorial we write is tested
          end-to-end (Caveat here... Sometimes we test them, make a{" "}
          <code className="manual-code">chore: clean up</code>{" "}
          commit update afterwards, and voila -- we have a typo. Apologies in
          advance!).
        </li>
      </ul>
      <p style={{ marginBottom: "3rem" }}>
        Drash Land is more than just a project to us. We&apos;ve invested our
        whole selves (and lots of energy drinks) into this. Does that make us
        nerds? We hope so. Because nerds make the best stuff.
      </p>
    </div>
  );
}
