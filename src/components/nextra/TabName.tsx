export const TabName = ({
  text,
}: {
  text: string[];
}) => {
  return (
    <span
      style={{ display: "inline-block", minWidth: 100 }}
      dangerouslySetInnerHTML={{ __html: text.join("<br/>") }}
    />
  );
};
