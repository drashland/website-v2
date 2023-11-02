import { Tooltip } from "react-tooltip";

export function Compat({
  browser = false,
  bun = false,
  cloudflare = false,
  deno = false,
  node = false,
}) {
  const render = (name, tooltipText) => {
    return (
      <div className="compatibility-markers">
        <div
          key={name + tooltipText}
          className="cursor-pointer flex justify-center items-center uppercase font-bold text-[11px] inline-block w-8 h-6 bg-slate-500 text-white border border-slate-200"
          data-tooltip-id={name}
          data-tooltip-content={tooltipText}
          data-tooltip-place="top"
        >
          {name}
        </div>
        <Tooltip style={{ fontSize: 12 }} id={name} />
      </div>
    );
  };

  return (
    <div className="mt-5 pt-3 w-full">
      <p className="uppercase text-[11px] mb-3 font-semibold text-center">
        Works in
      </p>
      <div className="flex w-full justify-center gap-2">
        {browser && render("br", "Browsers")}
        {bun && render("bn", "Bun")}
        {cloudflare && render("cf", "Cloudflare Workers")}
        {deno && render("dn", "Deno")}
        {node && render("no", "Node")}
      </div>
    </div>
  );
}
