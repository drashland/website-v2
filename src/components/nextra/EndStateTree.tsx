import { FileTree, Tab, Tabs } from "nextra/components";

type Props = {
  tree: string[];
};

export const EndStateTree = ({
  tree,
}: Props) => {
  return (
    <div className="step-directory-tree nx-mt-6">
      <p className="nx-mt-6 nx-leading-7 first:nx-mt-0">
        After completing the steps in this section, your project&apos;s directory
        should look like the directory tree below (based on the language you
        are using).
      </p>
      <Tabs items={["TypeScript", "JavaScript"]}>
        <Tab>
          <FileTree>
            <FileTree.Folder
              name="path/to/your/project"
              defaultOpen
            >
              {tree.map((file, index) => {
                return (
                  <FileTree.File
                    key={`file-` + file + index}
                    name={file}
                  />
                );
              })}
            </FileTree.Folder>
          </FileTree>
        </Tab>
        <Tab>
          <FileTree>
            <FileTree.Folder
              name="path/to/your/project"
              defaultOpen
            >
              {tree.map((file, index) => {
                return (
                  <FileTree.File
                    key={`file-` +
                      file.replace(".ts", ".js") + index}
                    name={file.replace(".ts", ".js")}
                  />
                );
              })}
            </FileTree.Folder>
          </FileTree>
        </Tab>
      </Tabs>
    </div>
  );
};
