import Link from "next/link";

export function LinkArrowRight({
  href,
  children,
  external = false,
}) {
  return (
    <Link
      className="px-3 py-1 rounded-md transition transition-background flex items-center text-sky-600 hover:bg-slate-100"
      href={href}
      target={external ? "_blank" : "_self"}
    >
      <span className="relative">
        {children}
        {!external && (
          <span className="ml-2 inline-block rotate-45">&#8599;</span>
        )}
        {external && (
          <>
            <span className="pl-2">&nbsp;</span>
            <span className="inline-block text-sm absolute -right-[4px] top-[2px]">
              &#8599;
            </span>
          </>
        )}
      </span>
    </Link>
  );
}

export function LinkArrowRightPlain({
  href,
  children,
  external = false,
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
    >
      <span className="relative">
        {children}
        {!external && <span className="ml-2">&rsaquo;</span>}
        {external && (
          <>
            <span className="pl-1">&nbsp;</span>
            <span className="inline-block absolute -right-[4px] -top-[2px]">
              &#8599;
            </span>
          </>
        )}
      </span>
    </Link>
  );
}
