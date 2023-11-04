import { IconLinkExternal } from "./IconLinkExternal";

export const LinkExternal = ({ children, href }) => (
  <a
    className="inline-block nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
    href={href}
    target="_blank"
  >
    {children}
    <span className="link-external-arrow inline-block ml-[2px]">
      <IconLinkExternal />
    </span>
  </a>
);
