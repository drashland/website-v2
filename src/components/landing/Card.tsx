import Link from "next/link";
import { IconLinkExternal } from "../nextra/IconLinkExternal";
import { IconArrowRight } from "./IconArrowRight";
import { Compat as OgCompat } from "./Compat";
import { ReactNode } from "react";

function Container({
  children = [],
  title,
  className,
}: {
  children: ReactNode[];
  className?: string;
  title: string;
}) {
  const bg = [
    // "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800 via-gray-800 to-gray-900"
  ];

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  return (
    <div
      className={"bg-white flex flex-col items-center justify-between p-5 text-slate-800" +
        (className ? " " + className : "")}
    >
      <div className="text-4xl font-semibold mb-5 mt-5">{title}</div>
      {children.map((component) => component)}
    </div>
  );
}

function Description({
  children,
  actions = null,
}) {
  return (
    <>
      <div className="flex items-center justify-center p-5 text-center text-md min-h-[10rem]">
        <p className="mb-5 max-w-sm">
          {children}
        </p>
        {actions && (
          <div className="flex flex-col sm:flex-row justify-center mb-10">
            {actions}
          </div>
        )}
      </div>
    </>
  );
}

function Actions({
  children,
}) {
  return (
    <div className="flex w-full justify-center mb-5">
      {children}
    </div>
  );
}

function Compat(props) {
  return (
    <div className="w-full mb-5 border-t border-slate-300 mt-5">
      <OgCompat {...props} />
    </div>
  );
}

export const Card = {
  Actions,
  Compat,
  Container,
  Description,
};
