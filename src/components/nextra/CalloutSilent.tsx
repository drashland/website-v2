import { Callout as OGCallout } from "nextra/components";

export const CalloutSilent = ({ children }) => (
  <div className="callout-silent nextra-callout nx-overflow-x-auto nx-mt-6 nx-flex nx-rounded-lg nx-border nx-py-2 ltr:nx-pr-4 rtl:nx-pl-4 nx-border-gray-200 nx-bg-primary-700/5 dark:nx-bg-primary-300/10 contrast-more:nx-border-primary-900/20 contrast-more:nx-contrast-150 contrast-more:dark:nx-border-primary-100/40 contrast-more:nx-border">
    <div className="nx-select-none nx-text-xl ltr:nx-pl-3 ltr:nx-pr-2 rtl:nx-pr-3 rtl:nx-pl-2">
    </div>
    <div className="nx-w-full nx-min-w-0 nx-leading-7">
      {children}
    </div>
  </div>
);
