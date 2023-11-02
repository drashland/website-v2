import { Tab as NextraTab, Tabs as NextraTabs } from "nextra/components";
import { ReactNode } from "react";

function TabButton({
  text,
}: {
  text: string[];
}) {
  return (
    <span
      style={{ display: "inline-block", minWidth: 100 }}
      dangerouslySetInnerHTML={{ __html: text.join("<br/>") }}
    />
  );
}

function Container({
  children,
  tabs,
}: {
  children: ReactNode;
  tabs: (string[])[];
}) {
  return (
    <div className="tab-group-container nx-border nx-rounded border-slate-200 mt-5 p-5">
      <NextraTabs
        items={tabs.map((tabTextLines) => <TabButton text={tabTextLines} />)}
      >
        {children}
      </NextraTabs>
    </div>
  );
}

const Panel = NextraTab;

export default {
  Container,
  Panel,
};
