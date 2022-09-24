# Add Rhum as a Dependency (Node)

## Table of Contents

- [Add Rhum as a Dependency](#add-rhum-as-a-dependency)

## Add Rhum as a Dependency

Before you start copying and pasting Node code blocks and running your tests,
please make sure you pull down the latest version of **Rhum v2.x**. Below are
examples of how to pull down Rhum using the `yarn` and `npm` commands.

```bash
// @Tab Yarn

$ yarn add --dev @drashland/rhum@<VERSION>

// @Tab npm

$ npm install --save-dev  @drashland/rhum@<VERSION>
```

Replace `<VERSION>` with the latest version of **Rhum v2.x**. The latest version
can be found [here](https://github.com/drashland/rhum/releases/latest).

Tutorials will assume you have the latest version of **Rhum v2.x** pulled down
since they will contain `import`/`export` or `require` statements using
`@drashland/rhum` in code blocks.
