(() => {
  "use strict";
  var e,
    t = {
      3594: (e, t, n) => {
        var o = {};
        n.r(o), n.d(o, { default: () => $, resource: () => C });
        var a = {};
        n.r(a), n.d(a, { default: () => E, resource: () => A });
        var s = {};
        n.r(s), n.d(s, { default: () => V, resource: () => M });
        var r = {};
        n.r(r), n.d(r, { default: () => J, resource: () => U });
        var i = {};
        n.r(i), n.d(i, { default: () => oe, resource: () => ee });
        var l = {};
        n.r(l), n.d(l, { default: () => le, resource: () => se });
        var c = {};
        n.r(c), n.d(c, { default: () => me, resource: () => de });
        var d = {};
        n.r(d), n.d(d, { default: () => be, resource: () => _e });
        var u = n(9346),
          h = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("app-root", {
              attrs: { sidebar: e.sidebar, module: "line" },
            });
          };
        h._withStripped = !0;
        var m = n(8646), p = n(8165);
        const _ = {
          components: { AppRoot: m.Z },
          data() {
            return {
              sidebar: {
                api_reference_href:
                  "https://doc.deno.land/https/deno.land/x/line@" +
                  this.$conf.line.latest_version + "/mod.ts",
                base_url: "/line/" + (0, p.b)(),
                github_href: "https://github.com/drashland/line",
                logo: "/assets/common/img/logo_line.svg",
                menus: {
                  "Getting Started": {
                    Quickstart: "/#quickstart",
                    Importing: "/#importing",
                    Features: "/#features",
                  },
                  Tutorials: {
                    "Creating CLIs": "/tutorials/creating-clis",
                    "Adding Subcommands": "/tutorials/adding-subcommands",
                    "Adding Options": "/tutorials/adding-options",
                  },
                  "Advanced Tutorials": {
                    "Creating An Advanced CLI":
                      "/advanced-tutorials/creating-an-advanced-cli",
                  },
                },
                module: "line",
              },
            };
          },
        };
        var v = n(1900), g = (0, v.Z)(_, h, [], !1, null, null, null);
        g.options.__file = "src/modules/line-v0.x/vue/app.vue";
        const b = g.exports;
        n(4733);
        var f = n(5589),
          w = n(5908),
          y = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("page", {
              attrs: {
                base_url: e.base_url,
                base_uri: e.base_uri,
                title: e.title,
                subtitle: e.subtitle,
              },
            }, [
              n("breadcrumbs", {
                attrs: {
                  base_url: e.base_url + "/#" + e.base_uri,
                  part: -1,
                  parts: 3,
                },
              }),
              n("hr"),
              n("h2-hash", [e._v("Overview")]),
              n("p", [
                e._v(
                  "In this tutorial series, you will learn how to create a CLI using Line. You will learn how to create your main command, create your subcommands that give your CLI functionality, and add an option to one of your subcommands. Alongside this, you will understand how your CLI will handle your help menus for your subcommands.",
                ),
              ]),
              n("p", [
                e._v(
                  "The CLI you will be creating will be a file manager. It will be able to:",
                ),
              ]),
              n("ul", [
                n("li", [e._v("Read files")]),
                n("li", [e._v("Write files")]),
                n("li", [e._v("Copy files")]),
                n("li", [e._v("Delete files")]),
              ]),
              n("p", { staticClass: "mt-10 text-center" }, [
                n("a-get-started", {
                  attrs: { href: e.base_url + "/#" + e.base_uri + "/part-1" },
                }),
              ], 1),
              n("hr"),
              n("h2-hash", [e._v("End State")]),
              n("p", [e._v("Below is a sample of what you will create.")]),
              n("code-block", { attrs: { language: "text", header: !1 } }, [
                e._v(
                  "File Manager - Read, write, copy, and delete files.\n\nUSAGE\n\n    fm [option | [[subcommand] [args] [deno flags] [options]]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n\n    copy\n        Copy a file from one location to another.\n    delete\n        Delete a file.\n    read\n        Read a file.\n    write\n        Write text to a file.",
                ),
              ]),
              n("hr"),
              n("breadcrumbs", {
                attrs: {
                  base_url: e.base_url + "/#" + e.base_uri,
                  part: -1,
                  parts: 3,
                },
              }),
            ], 1);
          };
        y._withStripped = !0;
        const S = "Creating An Advanced CLI",
          x = "Introduction",
          C = {
            paths: [
              "/advanced-tutorials/creating-an-advanced-cli",
              "/advanced-tutorials/creating-an-advanced-cli/introduction",
            ],
            meta: { title: S, subtitle: x },
          },
          k = {
            data() {
              return {
                base_url: this.$conf.line.base_url,
                base_uri: "/advanced-tutorials/creating-an-advanced-cli",
                title: S,
                subtitle: x,
              };
            },
          };
        var L = (0, v.Z)(k, y, [], !1, null, null, null);
        L.options.__file =
          "src/modules/line-v0.x/vue/pages/advanced_tutorials/creating_an_advanced_cli/introduction.vue";
        const $ = L.exports;
        var I = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              base_uri: e.base_uri,
              subtitle: e.subtitle,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 1,
                parts: 3,
              },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "First, you are going to write the bread and butter for your command line tool. This starts with creating the main command: ",
              ),
              n("code", [e._v("fm")]),
              e._v("."),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("▾ /path/to/your/project/\n    cli.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("cli.ts")]),
                  e._v(" file."),
                ]),
                n("p", [
                  n("code-block", {
                    attrs: {
                      title: "/path/to/your/project/cli.ts",
                      language: "typescript",
                      line_highlight: "2-5,13-16",
                    },
                  }, [
                    e._v(
                      'import { Line } from "https://deno.land/x/line@' +
                        e._s(e.$conf.line.latest_version) +
                        '/mod.ts";\nimport { CopySubcommand } from "./subcommands/write_subcommand.ts";\nimport { DeleteSubcommand } from "./subcommands/delete_subcommand.ts";\nimport { ReadSubcommand } from "./subcommands/read_subcommand.ts";\nimport { WriteSubcommand } from "./subcommands/write_subcommand.ts";\n \nconst fm = new Line({\n  command: "fm",\n  name: "File Manager",\n  description: "Read, write, copy, and delete files.",\n  version: "v1.0.0",\n  subcommands: [\n    CopySubcommand,\n    DeleteSubcommand,\n    ReadSubcommand,\n    WriteSubcommand,\n  ],\n});\n\nfm.run();',
                    ),
                  ]),
                ], 1),
                n("p", [
                  e._v(
                    "You will notice in the highlighted lines that there are four subcommands. You will create those in the next tutorial part.",
                  ),
                ]),
                n("p", [e._v("Here, your CLI will have the following setup:")]),
                n("ul", [
                  n("li", [
                    n("p", [
                      e._v("Your CLI's main command is "),
                      n("code", [e._v("fm")]),
                      e._v(
                        ". This is what you will type in the terminal to run your command. It is also what Line will use when displaying your help menus.",
                      ),
                    ]),
                  ]),
                  n("li", [
                    n("p", [
                      e._v(
                        'Your CLI\'s name is "File Manager". This is used in the help menu via the ',
                      ),
                      n("code", [e._v("--help")]),
                      e._v(" option."),
                    ]),
                  ]),
                  n("li", [
                    n("p", [
                      e._v(
                        'Your CLI\'s description is "Read, write, copy, and delete files." This is used in the ',
                      ),
                      n("code", [e._v("--help")]),
                      e._v(" option."),
                    ]),
                  ]),
                  n("li", [
                    n("p", [
                      e._v("Your CLI's version is "),
                      n("code", [e._v("v1.0.0")]),
                      e._v(". This is used in the "),
                      n("code", [e._v("--help")]),
                      e._v(" option and the "),
                      n("code", [e._v("--version")]),
                      e._v(" option."),
                    ]),
                  ]),
                  n("li", [
                    n("p", [e._v("Your command will have four subcommands:")]),
                  ]),
                  n("ul", [
                    n("li", [n("p", [n("code", [e._v("CopySubcommand")])])]),
                    n("li", [n("p", [n("code", [e._v("DeleteSubcommand")])])]),
                    n("li", [n("p", [n("code", [e._v("ReadSubcommand")])])]),
                    n("li", [n("p", [n("code", [e._v("WriteSubcommand")])])]),
                  ]),
                ]),
                n("p"),
              ]),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("p", [
              e._v("There are no verification steps for this tutorial part."),
            ]),
            n("div-alert-next-tutorial-part"),
            n("hr"),
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 1,
                parts: 3,
              },
            }),
          ], 1);
        };
        I._withStripped = !0;
        const T = "Creating An Advanced CLI",
          O = "Part 1: Create Your Command",
          A = {
            paths: ["/advanced-tutorials/creating-an-advanced-cli/part-1"],
            meta: { title: T, subtitle: O },
          },
          F = {
            data() {
              return {
                base_url: this.$conf.line.base_url,
                base_uri: "/advanced-tutorials/creating-an-advanced-cli",
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
                title: T,
                subtitle: O,
              };
            },
          };
        var R = (0, v.Z)(F, I, [], !1, null, null, null);
        R.options.__file =
          "src/modules/line-v0.x/vue/pages/advanced_tutorials/creating_an_advanced_cli/part_1.vue";
        const E = R.exports;
        var j = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              base_uri: e.base_uri,
              subtitle: e.subtitle,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 2,
                parts: 3,
              },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "Now that you have your main command set up, you will need to create your four subcommands. Line is a very object-oriented module, so your subcommands will be classes. Specifically, they will be derived classes of Line's ",
              ),
              n("code", [e._v("Subcommand")]),
              e._v(" class."),
            ]),
            n("p", [
              e._v(
                "In this tutorial part, you will create four subcommands. These subcommands will offer the functionality for your CLI. They are:",
              ),
            ]),
            n("ul", [
              n("li", [
                n("p", [
                  n("code", [e._v("CopySubcommand")]),
                  e._v(
                    ": This will be in charge of copying files from one location to another.",
                  ),
                ]),
              ]),
              n("li", [
                n("p", [
                  n("code", [e._v("DeleteSubcommand")]),
                  e._v(": This will be in charge of deleting files."),
                ]),
              ]),
              n("li", [
                n("p", [
                  n("code", [e._v("ReadSubcommand")]),
                  e._v(": This will be in charge of reading files."),
                ]),
              ]),
              n("li", [
                n("p", [
                  n("code", [e._v("WriteSubcommand")]),
                  e._v(": This will be in charge of writing files."),
                ]),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [
                e._v(
                  "▾ /path/to/your/project/\n    ▾ subcommands/\n        copy_subcommand.ts\n        delete_subcommand.ts\n        read_subcommand.ts\n        write_subcommand.ts\n    cli.ts",
                ),
              ]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("CopySubcommand")]),
                  e._v(" class."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/copy_subcommand.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\nexport class CopySubcommand extends Subcommand {\n  public signature = "copy [source] [destination]";\n\n  public description = "Copy a file from one location to another.";\n\n  public options = [];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n    const destination = this.getArgumentValue("destination"); // matches [destination] in the signature\n\n    // Show the help if any of the arguments are missing\n    if (!source || !destination) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      await Deno.copyFile(source, destination);\n      console.log(`Successfully copied \'${source}\' to \'${destination}\'.`);\n    } catch (error) {\n      console.log(error);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("DeleteSubcommand")]),
                  e._v(" class."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/delete_subcommand.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\nexport class DeleteSubcommand extends Subcommand {\n  public signature = "delete [source]";\n\n  public description = "Delete a file.";\n\n  public options = [];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n\n    // Show the help if source is missing\n    if (!source) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      await Deno.remove(source);\n      console.log(`Successfully deleted \'${source}\'.`);\n    } catch (error) {\n      console.log(`Failed to delete \'${source}\'.`);\n      console.log(error);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("ReadSubcommand")]),
                  e._v(" class."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/read_subcommand.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\nexport class ReadSubcommand extends Subcommand {\n  public signature = "read [source]";\n\n  public description = "Read a file.";\n\n  public options = [];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n\n    // Show the help if the source is missing\n    if (!source) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      const decoder = new TextDecoder("utf-8");\n      const data = await Deno.readFile(source);\n      console.log(decoder.decode(data));\n    } catch (error) {\n      console.log(`Failed to read \'${source}\'.`);\n      console.log(error);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("WriteSubcommand")]),
                  e._v(" class."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/write_subcommand.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'export class WriteSubcommand extends Subcommand {\n  public signature = "write [source] [text]";\n\n  public description = "Write text to a file.";\n\n  public options = [];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n    const text = this.getArgumentValue("text"); // matches [text] in the signature\n\n    // Show the help if any of the arguments are missing\n    if (!source || !text) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      Deno.writeFileSync(source, new TextEncoder().encode(text));\n      console.log(`Successfully wrote \'${source}\'.`);\n    } catch (error) {\n      console.log(`Failed to write \'${source}\'.`);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Install your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "$ deno install --allow-read --allow-write --name fm cli.ts",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Run your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "File Manager - Read, write, copy, and delete files.\n\nUSAGE\n\n    fm [option | [[subcommand] [args] [deno flags] [options]]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n\n    copy\n        Copy a file from one location to another.\n    delete\n        Delete a file.\n    read\n        Read a file.\n    write\n        Write text to a file.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("write")]),
                  e._v(" subcommand works."),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v('$ fm write test.txt "hello"'),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("read")]),
                  e._v(" subcommand works by reading the file you just wrote."),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("$ fm read test.txt"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("hello"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("copy")]),
                  e._v(" subcommand works by copying the file you just wrote."),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "$ fm copy test.txt test_copy.txt\n$ fm read test_copy.txt",
                  ),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("hello"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("delete")]),
                  e._v(" subcommand works by deleting the files you wrote."),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("$ fm delete test.txt\n$ fm delete test_copy.txt"),
                ]),
                n("p", [e._v("Try to read the files after deleting them.")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("$ fm read test.txt\n$ fm read test_copy.txt"),
                ]),
                n("p", [
                  e._v("For each "),
                  n("code", [e._v("read")]),
                  e._v(
                    " performed, you should see something similar to the following:",
                  ),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "Failed to read '{filename}.txt'.\nNotFound: No such file or directory (os error 2)\n    at unwrapOpResult (deno:core/core.js:99:13)\n    at async open (deno:runtime/js/40_files.js:46:17)\n    at async Object.readFile (deno:runtime/js/40_read_file.js:19:18)\n    at async ReadSubcommand.handle (file:///subcommands/read_subcommand.ts:21:20)",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Check that your help menus for your subcommands are set up properly.",
                  ),
                ]),
                n("p", [
                  e._v("First, check the "),
                  n("code", [e._v("copy")]),
                  e._v(" subcommand help menu."),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("$ fm copy"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "USAGE\n\n    fm copy [source] [destination] [deno flags] [options]",
                  ),
                ]),
                n("p", [e._v("Now check all other subcommands: ")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("$ fm [subcommand here]"),
                ]),
              ], 1),
            ]),
            n("div-alert-next-tutorial-part"),
            n("hr"),
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 2,
                parts: 3,
              },
            }),
          ], 1);
        };
        j._withStripped = !0;
        const Y = "Creating An Advanced CLI",
          D = "Part 2: Creating The Subcommands",
          M = {
            paths: ["/advanced-tutorials/creating-an-advanced-cli/part-2"],
            meta: { title: Y, subtitle: D },
          },
          G = {
            data() {
              return {
                base_url: this.$conf.line.base_url,
                base_uri: "/advanced-tutorials/creating-an-advanced-cli",
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
                title: Y,
                subtitle: D,
              };
            },
          };
        var B = (0, v.Z)(G, j, [], !1, null, null, null);
        B.options.__file =
          "src/modules/line-v0.x/vue/pages/advanced_tutorials/creating_an_advanced_cli/part_2.vue";
        const V = B.exports;
        var N = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              base_uri: e.base_uri,
              subtitle: e.subtitle,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 3,
                parts: 4,
              },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "Now that you have your subcommands set up, you will be adding some extra functionality to one of your subcommands by giving it an option.",
              ),
            ]),
            n("p", [
              e._v("In this tutorial part, you will add "),
              n("code", [e._v("--output-encoding")]),
              e._v(" as an option to your "),
              n("code", [e._v("read")]),
              e._v(" subcommand. This option will allow you to use your "),
              n("code", [e._v("read")]),
              e._v(
                " subcommand and have it read the contents of a file and output the contents in an encoding of your choice.",
              ),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [
                e._v(
                  "▾ /path/to/your/project/\n    ▾ options/\n        output_encoding_option.ts\n    ▾ subcommands/\n        copy_subcommand.ts\n        delete_subcommand.ts\n        read_subcommand.ts\n        write_subcommand.ts\n    cli.ts",
                ),
              ]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Create the "),
                  n("code", [e._v("OutputEncodingOption")]),
                  e._v(" class."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/options/output_encoding_option.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { SubcommandOption } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\nexport class OutputEncodingOption extends SubcommandOption {\n  public name = "--output-encoding";\n  public description = "Specify the output encoding.";\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Add "),
                  n("code", [e._v("OutputEncodingOption")]),
                  e._v(" as an option to "),
                  n("code", [e._v("ReadSubcommand")]),
                  e._v("."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/read_subcommand.ts",
                    language: "typescript",
                    line_highlight: "9-11",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\nimport { OutputEncodingOption } from "../options/output_encoding_option.ts";\n\nexport class ReadSubcommand extends Subcommand {\n  public signature = "read [source]";\n\n  public description = "Read a file.";\n\n  public options = [\n    OutputEncodingOption,\n  ];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n\n    // Show the help if the source is missing\n    if (!source) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      const decoder = new TextDecoder("utf-8");\n      const data = await Deno.readFile(source);\n      console.log(decoder.decode(data));\n    } catch (error) {\n      console.log(`Failed to read \'${source}\'.`);\n      console.log(error);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Modify "),
                  n("code", [e._v("ReadSubcommand")]),
                  e._v(" to handle the "),
                  n("code", [e._v("--output-encoding")]),
                  e._v(" when it is specified."),
                ]),
                n("code-block", {
                  attrs: {
                    title:
                      "/path/to/your/project/subcommands/read_subcommand.ts",
                    language: "typescript",
                    line_highlight: "23",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\nimport { OutputEncodingOption } from "../options/output_encoding_option.ts";\n\nexport class ReadSubcommand extends Subcommand {\n  public signature = "read [source]";\n\n  public description = "Read a file.";\n\n  public options = [\n    OutputEncodingOption,\n  ];\n\n  public async handle(): Promise<void> {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n\n    // Show the help if the source is missing\n    if (!source) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      const encoding = this.getOptionValue("--output-encoding") ?? "UTF-8";\n      const decoder = new TextDecoder(encoding);\n      const data = await Deno.readFile(source);\n      console.log(decoder.decode(data));\n    } catch (error) {\n      console.log(`Failed to read \'${source}\'.`);\n      console.log(error);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v(
                    "Reinstall your CLI so that it has your newly created option.",
                  ),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "$ deno install --allow-read --allow-write -f --name fm cli.ts",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("read")]),
                  e._v(" subcommand has the "),
                  n("code", [e._v("--output-encoding")]),
                  e._v(" option."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm read"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "USAGE\n\n    fm read [source] [deno flags] [options]\n\nOPTIONS\n\n    --output-encoding\n        Specify the output encoding.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Create a new file.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm write test.txt hello"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("read")]),
                  e._v(" subcommand uses UTF-8 if no option is specified."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm read test.txt"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("hello"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("--output-encoding")]),
                  e._v(" option works with UTF-8."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v('$ fm read test.txt --output-encoding "UTF-8"'),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("hello"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("--output-encoding")]),
                  e._v(" option fails when an invalid encoding is specified."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v('$ fm read test.txt --output-encoding "zoom!"'),
                ]),
                n("p", [
                  e._v("You should see something similar to the following:"),
                ]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "Failed to read 'test.txt'.\nRangeError: The encoding label provided ('zoom!') is invalid.\n    at new TextDecoder (deno:op_crates/web/08_text_encoding.js:4095:15)\n    at ReadSubcommand.handle (file:///subcommands/read_subcommand.ts:24:23)\n    at file:///cli.ts:20:4",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Clean up your project directory.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm delete test.txt"),
                ]),
              ], 1),
            ]),
            n("div-alert-finished-tutorial-series"),
            n("hr"),
            n("breadcrumbs", {
              attrs: {
                base_url: e.base_url + "/#" + e.base_uri,
                part: 3,
                parts: 3,
              },
            }),
          ], 1);
        };
        N._withStripped = !0;
        const W = "Creating An Advanced CLI",
          P = "Part 3: Creating The Option",
          U = {
            paths: ["/advanced-tutorials/creating-an-advanced-cli/part-3"],
            meta: { title: W, subtitle: P },
          },
          H = {
            data() {
              return {
                base_url: this.$conf.line.base_url,
                base_uri: "/advanced-tutorials/creating-an-advanced-cli",
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                ],
                title: W,
                subtitle: P,
              };
            },
          };
        var Z = (0, v.Z)(H, N, [], !1, null, null, null);
        Z.options.__file =
          "src/modules/line-v0.x/vue/pages/advanced_tutorials/creating_an_advanced_cli/part_3.vue";
        const J = Z.exports;
        var q = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("div", [
            n("introduction-header", {
              attrs: {
                heading: "Line",
                description: "A command-line interface (CLI) framework",
              },
            }),
            e._m(0),
            n("div", [
              n("hr"),
              n("h2-hash", [e._v("Quickstart")]),
              n("ol", [
                n("li", [
                  n("p", [
                    e._v(
                      "Create your CLI that will read and write a given file.",
                    ),
                  ]),
                  n("code-block", {
                    attrs: {
                      title: "/path/to/your/project/app.ts",
                      language: "typescript",
                    },
                  }, [
                    e._v(
                      'import { Line, Subcommand } from "https://deno.land/x/line/mod.ts";\n\nconst decoder = new TextDecoder();\nconst encoder = new TextEncoder();\n\nclass Read extends Subcommand {\n  public signature = "read [file]";\n  public description = "Read a file.";\n\n  public handle(): void { // can also be async\n    const file = this.getArgumentValue("file");\n    if (!file) {\n      return console.log("File not specified");\n    }\n    const contents = Deno.readFileSync(file);\n    console.log(decoder.decode(contents));\n  }\n}\n\nclass Write extends Subcommand {\n  public signature = "write [file] [contents]";\n  public description = "Write contents to a file.";\n\n  public handle(): void { // can also be async\n    const file = this.getArgumentValue("file");\n    if (!file) {\n      return console.log("File not specified");\n    }\n    const contents = this.getArgumentValue("contents");\n    if (!contents) {\n      return console.log("Contents not specified");\n    }\n    try {\n      Deno.writeFileSync(file, encoder.encode(contents));\n      console.log("Successfully wrote file.");\n    } catch (error) {\n      console.log(error);\n    }\n  }\n}\n\nconst cli = new Line({\n  command: "fm",\n  name: "File Manager",\n  description: "A file manager.",\n  version: "v1.0.0",\n  subcommands: [\n    Read,\n    Write,\n  ],\n});\n\ncli.run();',
                    ),
                  ]),
                  e._m(1),
                ], 1),
                n("li", [
                  e._m(2),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "bash" },
                  }, [
                    e._v(
                      "$ deno install --allow-read --allow-write --name fm app.ts",
                    ),
                  ]),
                  e._m(3),
                ], 1),
                n("li", [
                  n("p", [e._v("Run your CLI.")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell" },
                  }, [e._v("$ fm")]),
                  n("p", [e._v("You should see the following:")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "text" },
                  }, [
                    e._v(
                      "File Manager - A file manager.\n\nUSAGE\n\n    fm [option | [[subcommand] [args] [deno flags] [options]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n\n    read\n        Read a file.\n    write\n        Write contents to a file.",
                    ),
                  ]),
                ], 1),
              ]),
              n("hr"),
              n("h2-hash", [e._v("Importing")]),
              n("code-block-import", {
                attrs: {
                  name: "Line",
                  repo: "line",
                  version: e.$conf.line.latest_version,
                },
              }),
              n("hr"),
              n("h2-hash", [e._v("Features")]),
              e._m(4),
            ], 1),
          ], 1);
        };
        q._withStripped = !0;
        var K = n(8873), z = n(8674), Q = n(7518), X = n(3927);
        const ee = {
            paths: ["/", "/introduction"],
            meta: { title: "Introduction" },
          },
          te = {
            components: {
              H2Hash: K.Z,
              CodeBlock: z.Z,
              CodeBlockImport: Q.Z,
              IntroductionHeader: X.Z,
            },
            data: () => ({}),
          };
        var ne = (0, v.Z)(
          te,
          q,
          [function () {
            var e = this.$createElement, t = this._self._c || e;
            return t("div", { staticClass: "flex mb-5" }, [
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/line/releases",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Latest Line Release",
                  src:
                    "https://img.shields.io/github/release/drashland/line.svg?color=brightgreen&label=Latest",
                  width: "auto",
                  height: "20",
                },
              })]),
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/line/actions",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "Line CI",
                    src:
                      "https://img.shields.io/github/workflow/status/drashland/line/Master?label=CI",
                    width: "auto",
                    height: "20",
                  },
                }),
              ]),
              t("a", {
                attrs: { href: "https://discord.gg/SgejNXq", target: "_BLANK" },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "Drash Land Discord",
                    src: "https://img.shields.io/badge/Chat-on%20Discord-blue",
                  },
                }),
              ]),
              t("a", {
                attrs: {
                  href: "https://twitter.com/drash_land",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Drash Land Twitter",
                  src:
                    "https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land",
                  width: "auto",
                  height: "20",
                },
              })]),
            ]);
          }, function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("p", [
              e._v("The classes act as your commands (e.g., "),
              n("code", [e._v("fm read")]),
              e._v(") and the "),
              n("code", [e._v("cli")]),
              e._v(" variable acts as your main CLI tool. "),
              n("code", [e._v("cli")]),
              e._v(
                " will handle displaying your CLI's help messages, version, and other pertinent information to make your CLI easy to navigate and use.",
              ),
            ]);
          }, function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("p", [
              e._v("Install your CLI as a binary under the name "),
              n("code", [e._v("fm")]),
              e._v("."),
            ]);
          }, function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("p", [
              e._v("The "),
              n("code", [e._v("--name")]),
              e._v(
                " option value is what will allow your CLI to install as the ",
              ),
              n("code", [e._v("fm")]),
              e._v(" command. Make sure the "),
              n("code", [e._v("command")]),
              e._v(" config when you instantiate "),
              n("code", [e._v("Line")]),
              e._v(" matches the "),
              n("code", [e._v("--name")]),
              e._v(" option value so that your users do not get confused."),
            ]);
          }, function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("ul", [
              n("li", [n("p", [e._v("Zero 3rd party dependencies")])]),
              n("li", [n("p", [e._v("Scalable for large scale CLIs")])]),
              n("li", [n("p", [e._v("Recursive help menus")])]),
            ]);
          }],
          !1,
          null,
          null,
          null,
        );
        ne.options.__file =
          "src/modules/line-v0.x/vue/pages/getting_started.vue";
        const oe = ne.exports;
        var ae = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: this.$conf.line.base_url,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                'A subcommand would not be complete without options. Options (also known as "flags") can provide extra functionality to your subcommands. Line allows you to add as many options to your subcommands as you wish.',
              ),
            ]),
            n("p", [
              e._v(
                "Simply put, options are classes (with a few required properties) that Line registers and instantiates during runtime.",
              ),
            ]),
            n("p", [
              e._v(
                "When you write an option, it is in the form of a class and must extend Line's ",
              ),
              n("code", [e._v("Option")]),
              e._v(
                " class. The following class members are required in your option class(es):",
              ),
            ]),
            n("ul", [
              n("li", [
                n("p", [n("code", [e._v("name")])]),
                n("p", [e._v("This property is the name of the option.")]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("description")])]),
                n("p", [
                  e._v(
                    "This property will explain to users the purpose of the option.",
                  ),
                ]),
              ]),
            ]),
            n("p", [e._v("In this tutorial, you will create one option:")]),
            n("ul", [
              n("li", [
                n("code", [e._v("LanguageOption")]),
                e._v(
                  ": This will be in charge of switching the language based on user input.",
                ),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              e._v(
                "▾ /path/to/your/project/\n  app.ts\n  subcommands.ts\n  options.ts",
              ),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your option class and export it.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/options.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Option } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\n/**\n * Give the option to choose a language.\n */\nexport class LanguageOption extends SubcommandOption {\n  public name = "--language";\n\n  public description = "Choose a language.";\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Import your option, create your subcommand using your option, and export your subcommand.",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/subcommands.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\nimport { LanguageOption } from "./options.ts";\n\n/**\n * Greet users.\n */\nexport class GreetSubcommand extends Subcommand {\n  public signature = "greet [name]";\n\n  public description = "Greet users.";\n\n  public options = [\n    LanguageOption\n  ];\n\n  public handle(): void {\n    const name = this.getArgumentValue("name"); // Matches [name] in the signature\n\n    if (!name) {\n      this.showHelp();\n      return;\n    }\n\n    // Check for the option\n    const language = this.getOptionValue("--language");\n\n    // Change the functionality of the subcommand based on the option\n    let greeting = "Hello";\n    if (language) {\n      switch (language.toLowerCase()) {\n        case "french":\n          greeting = "Bonjour";\n          break;\n        case "italian":\n          greeting = "Ciao";\n          break;\n        case "spanish":\n          greeting = "Hola";\n          break;\n        default:\n          break;\n      }\n    }\n\n    console.log(`${greeting}, ${name}!`);\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Import your subcommand and add them to your CLI application.",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Line } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\nimport { GreetSubcommand } from "./subcommands.ts";\n\nconst cli = new Line({\n  command: "greeter",\n  name: "Greeter",\n  description: "Greet users.",\n  subcommands: [\n    GreetSubcommand,\n  ],\n  version: "v1.0.0",\n});\n\ncli.run();',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Install your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ deno install --name greeter app.ts"),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Run your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "Greeter - Greet users.\n\nUSAGE\n\n    greeter [option | [[subcommand] [args] [deno flags] [options]]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n\n    greet\n        Greet users.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Check that your "),
                  n("code", [e._v("greet")]),
                  e._v(" subcommand has the "),
                  n("code", [e._v("--language")]),
                  e._v(" option."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter greet"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "USAGE\n\n    greeter greet [name] [deno flags] [options]\n\nOPTIONS\n\n    --language\n        Choose a language.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Run the "),
                  n("code", [e._v("greet")]),
                  e._v(" subcommand."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter greet John"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Hello, John!"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Change the language using the "),
                  n("code", [e._v("--language")]),
                  e._v(" option."),
                ]),
                n("p", [e._v("Try "), n("code", [e._v("french")]), e._v(".")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter greet John --language french"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Bonjour, John!"),
                ]),
                n("p", [e._v("Try "), n("code", [e._v("italian")]), e._v(".")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter greet John --language italian"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Ciao, John!"),
                ]),
                n("p", [e._v("Try "), n("code", [e._v("spanish")]), e._v(".")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ greeter greet John --language spanish"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Hola, John!"),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        ae._withStripped = !0;
        const se = {
            paths: ["/tutorials/adding-options"],
            meta: { title: "Adding Options" },
          },
          re = {
            data: () => ({
              title: se.meta.title,
              toc: [
                "Before You Get Started",
                "Folder Structure End State",
                "Steps",
                "Verification",
              ],
            }),
          };
        var ie = (0, v.Z)(re, ae, [], !1, null, null, null);
        ie.options.__file =
          "src/modules/line-v0.x/vue/pages/tutorials/adding_options.vue";
        const le = ie.exports;
        var ce = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: this.$conf.line.base_url,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "A CLI would not be complete without subcommands. Line allows you to add as many subcommands to your CLI as you wish. Subcommands are responsible for adding functionality to your CLI and processing user input.",
              ),
            ]),
            n("p", [
              e._v(
                "Simply put, subcommands are classes (with a few required properties and methods) that Line registers and instantiates during runtime. If user input matches a signature of a registered subcommand, then Line will use that subcommand to process the user input.",
              ),
            ]),
            n("p", [
              e._v(
                "When you write a subcommand, it is in the form of a class and must extend Line's ",
              ),
              n("code", [e._v("Subcommand")]),
              e._v(
                " class. The following class members are required in your subcommand class(es):",
              ),
            ]),
            n("ul", [
              n("li", [
                n("p", [n("code", [e._v("signature")])]),
                n("p", [
                  e._v(
                    "This property will explain to users how the subcommand is to be used. This signature is what will be displayed in the help menus and is what Line uses to match user input.",
                  ),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("description")])]),
                n("p", [
                  e._v(
                    "This property will explain to users the purpose of the subcommand and what it does. This description is what will be displayed in the help menus.",
                  ),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("options")])]),
                n("p", [
                  e._v(
                    'This property holds an array of subcommand options (also known as "flags"). For more information on adding options to subcommands, please see the ',
                  ),
                  n("a", {
                    attrs: {
                      href: e.$conf.line.base_url +
                        "/#/tutorials/adding-options",
                    },
                  }, [e._v("Adding Options")]),
                  e._v(" tutorial."),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("handle()")])]),
                n("p", [
                  e._v(
                    'This method is the bread and butter of the subcommand. This method "handles" user input.',
                  ),
                ]),
              ]),
            ]),
            n("p", [
              e._v("In this tutorial, you will create two subcommands:"),
            ]),
            n("ul", [
              n("li", [
                n("code", [e._v("ReadSubcommand")]),
                e._v(": This will be in charge of reading files."),
              ]),
              n("li", [
                n("code", [e._v("WriteSubcommand")]),
                e._v(": This will be in charge of writing files."),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n  app.ts\n  subcommands.ts"),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Create your subcommand classes and export them."),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/subcommands.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Subcommand } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\n/**\n * Read files.\n */\nexport class ReadSubcommand extends Subcommand {\n  public signature = "read [source]";\n\n  public description = "Read the contents of a file.";\n\n  public options = [];\n\n  public handle(): void {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n\n    if (!source) {\n      this.showHelp();\n      return;\n    }\n\n    const contents = new TextDecoder().decode(Deno.readFileSync(source));\n    console.log(contents);\n  }\n}\n\n/**\n * Write files.\n */\nexport class WriteSubcommand extends Subcommand {\n  public signature = "write [source] [text]";\n\n  public description = "Write text to a file.";\n\n  public options = [];\n\n  public handle(): void {\n    const source = this.getArgumentValue("source"); // matches [source] in the signature\n    const text = this.getArgumentValue("text"); // matches [text] in the signature\n\n    if (!source || !text) {\n      this.showHelp();\n      return;\n    }\n\n    try {\n      Deno.writeFileSync(source, new TextEncoder().encode(text));\n      console.log(`Successfully wrote \'${source}\'.`);\n    } catch (error) {\n      console.log(`Failed to write \'${source}\'.`);\n    }\n  }\n}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Import your subcommands and add them to your CLI application.",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "8-11",
                  },
                }, [
                  e._v(
                    'import { Line } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\nimport { ReadSubcommand, WriteSubcommand } from "./subcommands.ts";\n\nconst cli = new Line({\n  command: "fm",\n  name: "File Manager",\n  description: "Manage your files (e.g., read, write)",\n  subcommands: [\n    ReadSubcommand,\n    WriteSubcommand,\n  ],\n  version: "v1.0.0",\n});\n\ncli.run();',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Install your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "$ deno install --allow-read --allow-write --name fm app.ts",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Run your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v(
                    "File Manager - Manage your files (e.g., read, write)\n\nUSAGE\n\n    fm [option | [[subcommand] [args] [deno flags] [options]]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n\n    read\n        Read the contents of a file.\n    write\n        Write text to a file.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Write a "),
                  n("code", [e._v("hello.txt")]),
                  e._v(" file."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v('$ fm write hello.txt "Hello world"'),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Successfully wrote 'hello.txt'."),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Read the "),
                  n("code", [e._v("hello.txt")]),
                  e._v(" file."),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm read hello.txt"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "text", header: !1 } }, [
                  e._v("Hello world"),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        ce._withStripped = !0;
        const de = {
            paths: ["/tutorials/adding-subcommands"],
            meta: { title: "Adding Subcommands" },
          },
          ue = {
            data: () => ({
              title: de.meta.title,
              toc: [
                "Before You Get Started",
                "Folder Structure End State",
                "Steps",
                "Verification",
              ],
            }),
          };
        var he = (0, v.Z)(ue, ce, [], !1, null, null, null);
        he.options.__file =
          "src/modules/line-v0.x/vue/pages/tutorials/adding_subcommands.vue";
        const me = he.exports;
        var pe = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: this.$conf.line.base_url,
              title: e.title,
              toc: e.toc,
            },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v("In this tutorial, you will create a CLI using the "),
              n("code", [e._v("Line")]),
              e._v(" class. The "),
              n("code", [e._v("Line")]),
              e._v(" class requires a few configs:"),
            ]),
            n("ul", [
              n("li", [
                n("p", [n("code", [e._v("name")])]),
                n("p", [
                  e._v('This is your CLI\'s name (e.g., "File Manager").'),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("description")])]),
                n("p", [
                  e._v(
                    'This is your CLI\'s description (e.g., "A file manager.").',
                  ),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("command")])]),
                n("p", [
                  e._v("This is the name of your command (e.g., "),
                  n("code", [e._v("fm")]),
                  e._v(
                    ") and is what users will type in the command line. This command ",
                  ),
                  n("em", [e._v("must")]),
                  e._v(" match the "),
                  n("code", [e._v("--name")]),
                  e._v(" option value in the "),
                  n("code", [e._v("deno install")]),
                  e._v(" command. See below where we have added the "),
                  n("code", [e._v("^^^^^^^^^")]),
                  e._v(" characters:"),
                ]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "$ deno install --allow-read --allow-write --name fm app.ts\n                                          ^^^^^^^^^",
                  ),
                ]),
                n("p", [
                  e._v("Be sure to tell your users to use the "),
                  n("code", [e._v("deno install")]),
                  e._v(
                    " command correctly so that the command they type in the command line matches the command that shows up in your CLI's help menus.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [n("code", [e._v("subcommands")])]),
                n("p", [
                  e._v(
                    "This is where you define your CLI's subcommands. To learn how to add subcommands, please see the ",
                  ),
                  n("a", {
                    attrs: {
                      href: e.$conf.line.base_url +
                        "/#/tutorials/adding-subcommands",
                    },
                  }, [e._v("Adding Subcommands")]),
                  e._v(" tutorial."),
                ]),
              ]),
              n("li", [
                n("p", [n("code", [e._v("version")])]),
                n("p", [e._v("This is your CLI's version (e.g., v1.0.0).")]),
              ]),
              n("p", [
                e._v(
                  "Putting all of the configs together to make a Line application looks like the following:",
                ),
              ]),
              n(
                "code-block",
                { attrs: { language: "typescript", header: !1 } },
                [e._v(
                  'const cli = new Line({\n  command: "fm",\n  name: "File Manager",\n  description: "A file manager.",\n  subcommands: [],\n  version: "v1.0.0",\n});',
                )],
              ),
            ], 1),
            n("hr"),
            n("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n  app.ts"),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your CLI application.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Line } from "https://deno.land/x/line@' +
                      e._s(e.$conf.line.latest_version) +
                      '/mod.ts";\n\nconst cli = new Line({\n  command: "fm",\n  name: "File Manager",\n  description: "Manage your files (e.g., read, write, delete)",\n  subcommands: [],\n  version: "v1.0.0",\n});\n\ncli.run();',
                  ),
                ]),
                n("p", [
                  e._v("You will notice "),
                  n("code", [e._v("subcommands")]),
                  e._v(
                    " is empty. Although we did not go over adding subcommands in this tutorial, you can learn how to add subcommands in the ",
                  ),
                  n("a", {
                    attrs: {
                      href: e.$conf.line.base_url +
                        "/#/tutorials/adding-subcommands",
                    },
                  }, [e._v("Adding Subcommands")]),
                  e._v(" tutorial."),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Install your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "$ deno install --allow-read --allow-write --name fm app.ts",
                  ),
                ]),
                n("p", [
                  e._v("Remember, your "),
                  n("code", [e._v("command")]),
                  e._v(" config value should match the "),
                  n("code", [e._v("--name")]),
                  e._v(" option value in the "),
                  n("code", [e._v("deno install")]),
                  e._v(
                    " command. Otherwise, your help menus will display your ",
                  ),
                  n("code", [e._v("command")]),
                  e._v(
                    " config value when your actual command is not that value. This would be confusing to users.",
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Run your CLI.")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v("$ fm"),
                ]),
                n("p", [e._v("You should see the following:")]),
                n("code-block", { attrs: { language: "shell", header: !1 } }, [
                  e._v(
                    "File Manager - Manage your files (e.g., read, write, delete)\n\nUSAGE\n\n    fm [option | [[subcommand] [args] [deno flags] [options]]]\n\nOPTIONS\n\n    -h, --help    Show this menu.\n    -v, --version Show this CLI's version.\n\nSUBCOMMANDS\n",
                  ),
                ]),
                n("p", [
                  e._v("Your "),
                  n("code", [e._v("SUBCOMMANDS")]),
                  e._v(
                    " section should be empty. This is expected since we did not go over adding subcommands in this tutorial. To learn how to add subcommands, please see the ",
                  ),
                  n("a", {
                    attrs: {
                      href: e.$conf.line.base_url +
                        "/#/tutorials/adding-subcommands",
                    },
                  }, [e._v("Adding Subcommands")]),
                  e._v(" tutorial."),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        pe._withStripped = !0;
        const _e = {
            paths: ["/tutorials/creating-clis"],
            meta: { title: "Creating CLIs" },
          },
          ve = {
            data: () => ({
              title: _e.meta.title,
              toc: [
                "Before You Get Started",
                "Folder Structure End State",
                "Steps",
                "Verification",
              ],
            }),
          };
        var ge = (0, v.Z)(ve, pe, [], !1, null, null, null);
        ge.options.__file =
          "src/modules/line-v0.x/vue/pages/tutorials/creating_clis.vue";
        const be = ge.exports, fe = [], we = {};
        [o, a, s, r, i, l, c, d].forEach((e) => {
          e.resource.meta && e.resource.meta.error_code
            ? we[e.resource.meta.error_code] = e.default
            : e.resource.paths.forEach((t) => {
              fe.push({ path: t, component: e.default, meta: e.resource.meta });
            });
        }), fe.push({ path: "*", component: we[404] });
        const ye = new w.Z({
          routes: fe,
          scrollBehavior(e, t, n) {
            if (e.hash) return { selector: e.hash, offset: { x: 0, y: 10 } };
          },
        });
        ye.beforeEach((e, t, n) => {
          e.meta || (e.meta = { title: "404 (Not Found)" }),
            e.meta.title || (e.meta.title = "404 (Not Found)"),
            document.title = "Line - " + e.meta.title,
            n();
        }),
          ye.afterEach((e, t) => {
            window.scrollTo(0, 0);
          });
        const Se = ye;
        u.prototype.$conf = window.drash_api_configs;
        const xe = new f();
        u.filter("markdown-it", function (e) {
          return xe.render(e);
        }),
          u.use(w.Z),
          window.app = new u({
            el: "#vue_app_mount",
            components: { VueAppRoot: b },
            router: Se,
          });
      },
    },
    n = {};
  function o(e) {
    var a = n[e];
    if (void 0 !== a) return a.exports;
    var s = n[e] = { id: e, exports: {} };
    return t[e].call(s.exports, s, s.exports, o), s.exports;
  }
  o.m = t,
    e = [],
    o.O = (t, n, a, s) => {
      if (!n) {
        var r = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [n, a, s] = e[d], i = !0, l = 0; l < n.length; l++) {
            (!1 & s || r >= s) && Object.keys(o.O).every((e) => o.O[e](n[l]))
              ? n.splice(l--, 1)
              : (i = !1, s < r && (r = s));
          }
          if (i) {
            e.splice(d--, 1);
            var c = a();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      s = s || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > s; d--) e[d] = e[d - 1];
      e[d] = [n, a, s];
    },
    o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    },
    o.d = (e, t) => {
      for (var n in t) {
        o.o(t, n) && !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }
    },
    o.g = function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    }(),
    o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    o.r = (e) => {
      "undefined" != typeof Symbol && Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    },
    (() => {
      var e = { 614: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var a, s, [r, i, l] = n, c = 0;
          for (a in i) o.o(i, a) && (o.m[a] = i[a]);
          if (l) var d = l(o);
          for (t && t(n); c < r.length; c++) {
            s = r[c], o.o(e, s) && e[s] && e[s][0](), e[r[c]] = 0;
          }
          return o.O(d);
        },
        n = self.webpackChunkwebsite = self.webpackChunkwebsite || [];
      n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })();
  var a = o.O(void 0, [592], () => o(3594));
  a = o.O(a);
})();
