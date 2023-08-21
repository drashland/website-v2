(() => {
  "use strict";
  var e,
    t = {
      2638: (e, t, s) => {
        var n = {};
        s.r(n), s.d(n, { default: () => C, resource: () => N });
        var o = {};
        s.r(o), s.d(o, { default: () => H, resource: () => Z });
        var a = {};
        s.r(a), s.d(a, { default: () => R, resource: () => q });
        var r = {};
        s.r(r), s.d(r, { default: () => W, resource: () => G });
        var l = {};
        s.r(l), s.d(l, { default: () => ee, resource: () => X });
        var d = {};
        s.r(d), s.d(d, { default: () => ae, resource: () => se });
        var i = {};
        s.r(i), s.d(i, { default: () => ce, resource: () => le });
        var c = {};
        s.r(c), s.d(c, { default: () => ge, resource: () => he });
        var m = {};
        s.r(m), s.d(m, { default: () => xe, resource: () => we });
        var p = s(9346),
          u = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("app-root", {
              attrs: {
                sidebar: e.sidebar,
                news_tags: "deno, dmm",
                module: "dmm",
              },
            });
          };
        u._withStripped = !0;
        var h = s(8646), v = s(8165);
        const _ = {
          components: { AppRoot: h.Z },
          data: () => ({
            sidebar: {
              base_url: "/dmm/" + (0, v.b)(),
              github_href: "https://github.com/drashland/dmm",
              logo: "/assets/common/img/logo_dmm.svg",
              menus: {
                "Getting Started": {
                  Quickstart: "/#quickstart",
                  Usage: "/#usage",
                  Features: "/#features",
                  FAQ: "/faq",
                },
                "Latest News": {},
                Tutorials: {
                  "Automate Updating Dependencies":
                    "/tutorials/automate-updating-dependencies",
                },
                "CLI Commands": {
                  check: "/cli-commands/check",
                  help: "/cli-commands/help",
                  info: "/cli-commands/info",
                  update: "/cli-commands/update",
                  version: "/cli-commands/version",
                },
              },
              module: "dmm",
            },
          }),
        };
        var g = s(1900), f = (0, g.Z)(_, u, [], !1, null, null, null);
        f.options.__file = "src/modules/dmm-v1.x/vue/app.vue";
        const b = f.exports;
        s(4733);
        var w = s(5589),
          k = s(5908),
          y = function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("page", {
              attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
            }, [
              s("h2-hash", [e._v("Description")]),
              s("p", [
                e._v("The "),
                s("code", [e._v("check")]),
                e._v(" command will check if:"),
              ]),
              s("ul", [
                s("li", [e._v("all of your dependencies can be updated; and")]),
                s("li", [e._v("shows what dependencies are out of date.")]),
              ]),
              s("p", [
                e._v("This command requires the following permissions:"),
              ]),
              s("ul", [
                s("li", [
                  s("code", [e._v("--allow-net")]),
                  e._v(
                    ": dmm uses HTTP requests to fetch information on the given module.",
                  ),
                ]),
                s("li", [
                  s("code", [e._v("--allow-read")]),
                  e._v(
                    ": dmm needs to read your dependency file to gather the dependencies you have.",
                  ),
                ]),
              ]),
              s("hr"),
              s("h2-hash", [e._v("Example Usage")]),
              s("h3", [e._v("Check a single dependency.")]),
              s("p", [
                e._v(
                  "In this example, we are checking the dependency passed to the ",
                ),
                s("code", [e._v("check")]),
                e._v(" command."),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ cat deps.ts")]),
              s("code-block", {
                attrs: {
                  title: "/path/to/your/project/dep.ts",
                  language: "typescript",
                },
              }, [
                e._v(
                  'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date',
                ),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ dmm check http")]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [
                e._v(
                  "INFO Reading deps.ts to gather your dependencies...\nINFO Comparing versions...\nINFO http can be updated from 0.55.0 to " +
                    e._s(e.$conf.deno_std.latest_version) +
                    "\nTo update, run:\n    dmm update http",
                ),
              ]),
              s("h3", [e._v("Check multiple dependencies.")]),
              s("p", [
                e._v(
                  "In this example, we are checking the dependencies passed to the ",
                ),
                s("code", [e._v("check")]),
                e._v(" command."),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ cat deps.ts")]),
              s("code-block", {
                attrs: {
                  title: "/path/to/your/project/dep.ts",
                  language: "typescript",
                },
              }, [
                e._v(
                  'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date\nimport { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date',
                ),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ dmm check http drash")]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [
                e._v(
                  "INFO Reading deps.ts to gather your dependencies...\nINFO Comparing versions...\nINFO http can be updated from 0.55.0 to " +
                    e._s(e.$conf.deno_std.latest_version) +
                    "\nINFO drash can be updated from v1.0.7 to " +
                    e._s(e.$conf.drash.latest_version) +
                    "\nTo update, run:\n    dmm update http drash",
                ),
              ]),
              s("h3", [e._v("Check all dependencies.")]),
              s("p", [
                e._v(
                  "In this example, we are checking all dependencies by not passing any arguments to the ",
                ),
                s("code", [e._v("update")]),
                e._v(" command."),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ cat deps.ts")]),
              s("code-block", {
                attrs: {
                  title: "/path/to/your/project/dep.ts",
                  language: "typescript",
                },
              }, [
                e._v(
                  'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date\nimport { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date',
                ),
              ]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [e._v("$ dmm check")]),
              s("code-block", {
                attrs: { title: "Terminal", language: "shell-session" },
              }, [
                e._v(
                  "INFO Reading deps.ts to gather your dependencies...\nINFO Comparing versions...\nINFO http can be updated from 0.55.0 to " +
                    e._s(e.$conf.deno_std.latest_version) +
                    "\nINFO drash can be updated from v1.0.7 to " +
                    e._s(e.$conf.drash.latest_version) +
                    "\nTo update, run:\n    dmm update http drash",
                ),
              ]),
            ], 1);
          };
        y._withStripped = !0;
        var x = s(8873), $ = s(9215), T = s(8674);
        const I = "check",
          N = { paths: ["/cli-commands/check"], meta: { title: I } },
          O = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: I,
                toc: ["Description", "Example Usage"],
              };
            },
          };
        var F = (0, g.Z)(O, y, [], !1, null, null, null);
        F.options.__file =
          "src/modules/dmm-v1.x/vue/pages/cli_commands/check.vue";
        const C = F.exports;
        var D = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Description")]),
            s("p", [
              e._v("The "),
              s("code", [e._v("help")]),
              e._v(" command will give information on how to use dmm."),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Example Usage")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ dmm --help")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [
              e._v(
                "A module manager for Deno.\n\nUSAGE\n\n    deno install --allow-net='cdn.deno.land,api.deno.land,x.nest.land' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@" +
                  e._s(e.$conf.dmm.latest_version) +
                  "/mod.ts\n    dmm [SUBCOMMAND]\n\nSUBCOMMANDS\n\n    check [modules]\n        Checks the specified modules for newer version. Will check all if modules are\n        omitted.\n\n    update [modules]\n        Updates the specified modules to the newest version. Will update all if modules\n        are omitted.\n\n    info [modules]\n        Displays information about the given modules, be it std or 3rd party. The 3rd\n        party module must be referenced at https://deno.land/x/\n\n    help, --help\n        Prints the help message\n\n    version, --version\n        Prints the current dmm version\n\n\nEXAMPLE USAGE\n\n    Install dmm\n        deno install --allow-net='cdn.deno.land,api.deno.land,x.nest.land' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@" +
                  e._s(e.$conf.dmm.latest_version) +
                  "/mod.ts\n\n    Check a single module\n        dmm check fs\n\n    Update a single module\n        dmm update fs\n\n    Get information about a module\n        dmm info http",
              ),
            ]),
          ], 1);
        };
        D._withStripped = !0;
        const E = "help",
          Z = { paths: ["/cli-commands/help"], meta: { title: E } },
          U = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: E,
                toc: ["Description", "Example Usage"],
              };
            },
          };
        var S = (0, g.Z)(U, D, [], !1, null, null, null);
        S.options.__file =
          "src/modules/dmm-v1.x/vue/pages/cli_commands/help.vue";
        const H = S.exports;
        var A = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Description")]),
            s("p", [
              e._v("The "),
              s("code", [e._v("info")]),
              e._v(
                " command will fetch information on any module, be it 3rd party or Deno Standard.",
              ),
            ]),
            s("p", [e._v("This command requires the following permission:")]),
            s("ul", [
              s("li", [
                s("code", [e._v("--allow-net")]),
                e._v(
                  ": dmm uses HTTP requests to fetch information on the given module(s).",
                ),
              ]),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Example Usage")]),
            s("ul", [
              s("li", [
                s("p", [
                  e._v("Get information on a "),
                  s("code", [e._v("http")]),
                  e._v(" std module and drash 3rd part module."),
                ]),
                s("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ dmm info http drash")]),
                s("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    "INFO Information on http\n\n  - Name: http\n  - Description: Cannot retrieve descriptions for std modules\n  - deno.land Link: https://deno.land/std@" +
                      e._s(e.$conf.deno_std.latest_version) +
                      '/http\n  - GitHub Repository: https://github.com/denoland/deno/tree/master/std/http\n  - Import Statement: import * as http from "https://deno.land/std@' +
                      e._s(e.$conf.deno_std.latest_version) +
                      '/http";\n  - Latest Version: ' +
                      e._s(e.$conf.deno_std.latest_version) +
                      "\n\nINFO Information on drash\n\n  - Name: drash\n  - Description: A REST microframework for Deno's HTTP server with zero 3rd party dependencies.\n  - deno.land Link: https://deno.land/x/drash@" +
                      e._s(e.$conf.drash.latest_version) +
                      '\n  - GitHub Repository: https://github.com/drashland/deno-drash\n  - Import Statement: import * as drash from "https://deno.land/x/drash@' +
                      e._s(e.$conf.drash.latest_version) +
                      '";\n  - Latest Version: ' +
                      e._s(e.$conf.drash.latest_version),
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        A._withStripped = !0;
        const j = "info",
          q = { paths: ["/cli-commands/info"], meta: { title: j } },
          L = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: j,
                toc: ["Description", "Example Usage"],
              };
            },
          };
        var P = (0, g.Z)(L, A, [], !1, null, null, null);
        P.options.__file =
          "src/modules/dmm-v1.x/vue/pages/cli_commands/info.vue";
        const R = P.exports;
        var B = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Description")]),
            s("p", [
              e._v("The "),
              s("code", [e._v("update")]),
              e._v(
                " command will update your out-of-date dependencies if there are newer releases available. The way this works is, dmm will check the version on your imported/exported dependencies and compare them with the latest version.",
              ),
            ]),
            s("p", [
              e._v("This command requires the following permissions:"),
              s("ul", [
                s("li", [
                  s("code", [e._v("--allow-net")]),
                  e._v(
                    ": dmm uses HTTP requests to fetch information on the given module.",
                  ),
                ]),
                s("li", [
                  s("code", [e._v("--allow-read")]),
                  e._v(
                    ": dmm needs to read your dependency file to gather the dependencies you have.",
                  ),
                ]),
                s("li", [
                  s("code", [e._v("--allow-write")]),
                  e._v(": dmm will update the version strings inside your "),
                  s("code", [e._v("deps.ts")]),
                  e._v("."),
                ]),
              ]),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Example Usage")]),
            s("h3", [e._v("Update a single dependency.")]),
            s("p", [
              e._v(
                "In this example, we are updating the dependency passed to the ",
              ),
              s("code", [e._v("update")]),
              e._v(" command."),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ cat deps.ts")]),
            s("code-block", {
              attrs: {
                title: "/path/to/your/project/dep.ts",
                language: "typescript",
              },
            }, [
              e._v(
                'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date',
              ),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ dmm update http")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [
              e._v(
                "INFO Reading deps.ts to gather your dependencies...\nINFO Checking if your modules can be updated...\nINFO http was updated from 0.55.0 to " +
                  e._s(e.$conf.deno_std.latest_version),
              ),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ cat deps.ts")]),
            s("code-block", {
              attrs: {
                title: "/path/to/your/project/dep.ts",
                language: "typescript",
              },
            }, [
              e._v(
                'import { serve } from "https://deno.land/std@' +
                  e._s(e.$conf.deno_std.latest_version) +
                  '/http/server.ts"; // now up to date',
              ),
            ]),
            s("h3", [e._v("Update multiple dependencies.")]),
            s("p", [
              e._v(
                "In this example, we are updating the dependencies passed to the ",
              ),
              s("code", [e._v("update")]),
              e._v(" command."),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ cat deps.ts")]),
            s("code-block", {
              attrs: {
                title: "/path/to/your/project/dep.ts",
                language: "typescript",
              },
            }, [
              e._v(
                'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date\nimport { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date',
              ),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ dmm update http drash")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [
              e._v(
                "INFO Reading deps.ts to gather your dependencies...\nINFO Checking if your modules can be updated...\nINFO http was updated from 0.55.0 to " +
                  e._s(e.$conf.deno_std.latest_version) +
                  "\nINFO drash was updated from v1.0.7 to " +
                  e._s(e.$conf.drash.latest_version),
              ),
            ]),
            s("h3", [e._v("Update all dependencies.")]),
            s("p", [
              e._v(
                "In this example, we are updating all dependencies by not passing any arguments to the ",
              ),
              s("code", [e._v("update")]),
              e._v(" command."),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ cat deps.ts")]),
            s("code-block", {
              attrs: {
                title: "/path/to/your/project/dep.ts",
                language: "typescript",
              },
            }, [
              e._v(
                'import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date\nimport { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date',
              ),
            ]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ dmm update")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [
              e._v(
                "INFO Reading deps.ts to gather your dependencies...\nINFO Checking if your modules can be updated...\nINFO http was updated from 0.55.0 to " +
                  e._s(e.$conf.deno_std.latest_version) +
                  "\nINFO drash was updated from v1.0.7 to " +
                  e._s(e.$conf.drash.latest_version),
              ),
            ]),
          ], 1);
        };
        B._withStripped = !0;
        const M = "update",
          G = { paths: ["/cli-commands/update"], meta: { title: M } },
          Q = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: M,
                toc: ["Description", "Example Usage"],
              };
            },
          };
        var K = (0, g.Z)(Q, B, [], !1, null, null, null);
        K.options.__file =
          "src/modules/dmm-v1.x/vue/pages/cli_commands/update.vue";
        const W = K.exports;
        var Y = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Description")]),
            s("p", [
              e._v("The "),
              s("code", [e._v("version")]),
              e._v(" command will display the current version of dmm."),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Example Usage")]),
            s("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [
              e._v("$ dmm version\ndmm " + e._s(e.$conf.dmm.latest_version)),
            ]),
          ], 1);
        };
        Y._withStripped = !0;
        const V = "version",
          X = { paths: ["/cli-commands/version"], meta: { title: V } },
          z = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: V,
                toc: ["Description", "Example Usage"],
              };
            },
          };
        var J = (0, g.Z)(z, Y, [], !1, null, null, null);
        J.options.__file =
          "src/modules/dmm-v1.x/vue/pages/cli_commands/version.vue";
        const ee = J.exports;
        var te = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("div", [
            s("h1", [e._v("404 (Not Found)")]),
            s("p", [
              e._v("URI "),
              s("code", [e._v(e._s(e.$route.path))]),
              e._v(" doesn't exist."),
            ]),
          ]);
        };
        te._withStripped = !0;
        const se = {
            paths: ["/404"],
            meta: { title: "404 (Not Found)", error_code: 404 },
          },
          ne = { data: () => ({}) };
        var oe = (0, g.Z)(ne, te, [], !1, null, null, null);
        oe.options.__file = "src/modules/dmm-v1.x/vue/pages/error_404.vue";
        const ae = oe.exports;
        var re = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s(
            "page",
            { attrs: { base_url: e.base_url, title: e.title } },
            [s("p", [
              s("strong", [
                e._v(
                  "Feel free to make suggestions to this page by visiting our",
                ),
                s("a", {
                  attrs: {
                    href: "https://discord.gg/SgejNXq",
                    target: "_blank",
                  },
                }, [e._v(" Discord")]),
                e._v("."),
              ]),
            ])],
          );
        };
        re._withStripped = !0;
        const le = { paths: ["/faq"], meta: { title: "FAQ" } },
          de = {
            components: { H2Hash: x.Z, Page: $.Z },
            data() {
              return { base_url: this.$conf.dmm.base_url, title: "FAQ" };
            },
          };
        var ie = (0, g.Z)(de, re, [], !1, null, null, null);
        ie.options.__file = "src/modules/dmm-v1.x/vue/pages/faq.vue";
        const ce = ie.exports;
        var me = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("div", [
            s("introduction-header", {
              attrs: {
                heading: "dmm",
                description: "dmm is a lightweight module manager",
              },
            }),
            e._m(0),
            s("div", [
              s("hr"),
              s("h2-hash", [e._v("Quickstart")]),
              s("ol", [
                s("li", [
                  e._m(1),
                  s("code-block", {
                    attrs: {
                      title: "/path/to/your/project/deps.ts",
                      language: "typescript",
                    },
                  }, [
                    e._v(
                      'import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";\nimport { red } from "https://deno.land/std@0.55.0/fmt/colors.ts";',
                    ),
                  ]),
                ], 1),
                s("li", [
                  s("p", [e._v("Update your dependencies.")]),
                  s("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [
                    e._v(
                      "$ deno run \\\n    --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' \\\n    --allow-read='.' \\\n    --allow-write='deps.ts' \\\n    https://deno.land/x/dmm@" +
                        e._s(e.$conf.dmm.latest_version) +
                        "/mod.ts \\\n    update",
                    ),
                  ]),
                  s("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [
                    e._v(
                      "INFO Reading deps.ts to gather your dependencies...\nINFO Checking if your modules can be updated...\nINFO drash was updated from v1.0.0 to " +
                        e._s(e.$conf.drash.latest_version) +
                        "\nINFO testing was updated from 0.55.0 to " +
                        e._s(e.$conf.deno_std.latest_version),
                    ),
                  ]),
                ], 1),
              ]),
              s("hr"),
              s("h2-hash", [e._v("Usage")]),
              s("p", [e._v("There are two ways you can use this module:")]),
              s("ol", [
                s("li", [
                  e._m(2),
                  s("p", [
                    s("code-block", {
                      attrs: { title: "Terminal", language: "shell-session" },
                    }, [
                      e._v(
                        "$ deno install \\\n  --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' \\\n  --allow-read='.' \\\n  --allow-write='deps.ts' \\\n  https://deno.land/x/dmm@" +
                          e._s(e.$conf.dmm.latest_version) + "/mod.ts",
                      ),
                    ]),
                  ], 1),
                  s("p", [
                    s("code-block", {
                      attrs: { title: "Terminal", language: "shell-session" },
                    }, [e._v("$ dmm help")]),
                  ], 1),
                ]),
                s("li", [
                  s("p", [e._v("Run it through a URL.")]),
                  s("p", [
                    s("code-block", {
                      attrs: { title: "Terminal", language: "shell-session" },
                    }, [
                      e._v(
                        "$ deno run \\\n  --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' \\\n  --allow-read='.' \\\n  --allow-write='deps.ts' \\\n  https://deno.land/x/dmm@" +
                          e._s(e.$conf.dmm.latest_version) +
                          "/mod.ts \\\n  help",
                      ),
                    ]),
                  ], 1),
                ]),
              ]),
              s("hr"),
              s("h2-hash", [e._v("Features")]),
              e._m(3),
            ], 1),
          ], 1);
        };
        me._withStripped = !0;
        var pe = s(7518), ue = s(3927);
        const he = {
            paths: ["/", "/introduction"],
            meta: { title: "Introduction" },
          },
          ve = {
            components: {
              H2Hash: x.Z,
              CodeBlock: T.Z,
              CodeBlockImport: pe.Z,
              IntroductionHeader: ue.Z,
            },
          };
        var _e = (0, g.Z)(
          ve,
          me,
          [function () {
            var e = this.$createElement, t = this._self._c || e;
            return t("div", { staticClass: "flex mb-5" }, [
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/dmm/releases",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Latest dmm Release",
                  src:
                    "https://img.shields.io/github/release/drashland/dmm.svg?color=brightgreen&label=Latest",
                  width: "auto",
                  height: "20",
                },
              })]),
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/dmm/actions",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "dmm CI",
                    src:
                      "https://img.shields.io/github/workflow/status/drashland/dmm/master?label=CI",
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
              t("a", {
                attrs: {
                  href:
                    "https://www.youtube.com/playlist?list=PLlFUbR9MhiNWQtNUWzcsMcI5AQHE18IAD",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  attrs: {
                    alt: "dmm YouTube",
                    src: "https://img.shields.io/badge/Tutorials-YouTube-red",
                    width: "auto",
                    height: "20",
                  },
                }),
              ]),
            ]);
          }, function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("p", [
              e._v("Make sure you have out of date dependencies inside your "),
              s("code", [e._v("deps.ts")]),
              e._v(" file."),
            ]);
          }, function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("p", [
              e._v("You can install it through the "),
              s("code", [e._v("deno")]),
              e._v(" command:"),
            ]);
          }, function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("ul", [
              s("li", [s("p", [e._v("Gives information on modules")])]),
              s("li", [
                s("p", [e._v("Checks if your dependencies are out of date")]),
              ]),
              s("li", [s("p", [e._v("Zero 3rd party dependencies")])]),
              s("li", [
                s("p", [e._v("Updates dependencies in a simple manner")]),
              ]),
              s("li", [
                s("p", [
                  e._v("Only reads and writes to your "),
                  s("code", [e._v("deps.ts")]),
                  e._v(" file"),
                ]),
              ]),
              s("li", [
                s("p", [
                  e._v("Looks up modules on the following registries:"),
                  s("ul", [
                    s("li", [s("code", [e._v("https://deno.land/std/")])]),
                    s("li", [s("code", [e._v("https://deno.land/x/")])]),
                    s("li", [s("code", [e._v("https://x.nest.land/")])]),
                    s("li", [
                      s("code", [e._v("https://raw.githubusercontent.com")]),
                    ]),
                  ]),
                ]),
              ]),
            ]);
          }],
          !1,
          null,
          null,
          null,
        );
        _e.options.__file =
          "src/modules/dmm-v1.x/vue/pages/getting_started.vue";
        const ge = _e.exports;
        var fe = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Description")]),
            s("p", [
              e._v(
                "You can use Dmm to automatically update your dependencies. As Dmm can update dependencies, all you need is a new workflow, and every Sunday, the workflow will run, update your dependencies (if they can be) and make a pull request for you to review!",
              ),
            ]),
            s("p", [
              e._v(
                "Note: This tutorial will explain how to use Dmm as a 'bumper', but will not explain the ins and outs of a workflow file. For this, refer to GitHub's documentation.",
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Example")]),
            s("code-block", {
              attrs: {
                title: "/path/to/your/project/.github/workflows/bumper.yml",
                language: "yaml",
              },
            }, [
              e._v(
                "name: Update dependencies and bump version numbers\n\non:\n  schedule:\n    # Runs at 00:00 UTC every day\n    - cron: '0 0 * * *'\n\njobs:\n\n  update:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v2\n\n    - name: Install Deno\n      uses: denolib/setup-deno@master\n\n    - name: Update dmm\n      run: |\n        deno run --allow-read --allow-write --allow-net https://deno.land/x/dmm/mod.ts update\n        cd tests\n        deno run --allow-read --allow-write --allow-net https://deno.land/x/dmm/mod.ts update\n\n    - name: Create pull request\n      uses: peter-evans/create-pull-request@v3\n      with:\n        token: " +
                  e._s(e.token) +
                  "\n        commit-message: 'Update dependencies'\n        title: 'chore: Update dependencies'\n        body: 'This pull request was auto-generated by GitHub Actions.'\n        branch: update-dependencies",
              ),
            ]),
            s("p", [
              e._v(
                "dmm will automatically run a sweep of checks on the repository's dependencies daily and create a pull request if updates are found.",
              ),
            ]),
            s("p", [
              e._v(
                "Of course, if there are no dependencies to update, Dmm will not change any files. If no files are modified, then a pull request will not be made, and there are no changes to commit.",
              ),
            ]),
            s("p", [
              e._v(
                "Here are some screenshots for a pull request being opened in on of our repositories:",
              ),
            ]),
            s("hr"),
            s("img", {
              attrs: { src: "/assets/dmm-v1.x/img/bumper_pr_overview.png" },
            }),
            s("hr"),
            s("img", {
              attrs: {
                src: "/assets/dmm-v1.x/img/bumper_pr_files_changed.png",
              },
            }),
          ], 1);
        };
        fe._withStripped = !0;
        const be = "Automate Updating Dependencies",
          we = {
            paths: ["/tutorials/automate-updating-dependencies"],
            meta: { title: be },
          },
          ke = {
            components: { CodeBlock: T.Z, H2Hash: x.Z, Page: $.Z },
            data() {
              return {
                base_url: this.$conf.dmm.base_url,
                title: be,
                toc: ["Description", "Example"],
                token: "${{ secrets.TOKEN }}",
              };
            },
          };
        var ye = (0, g.Z)(ke, fe, [], !1, null, null, null);
        ye.options.__file =
          "src/modules/dmm-v1.x/vue/pages/tutorials/automate_updating_dependencies.vue";
        const xe = ye.exports;
        let $e = [], Te = {};
        [n, o, a, r, l, d, i, c, m].forEach((e) => {
          e.resource.meta && e.resource.meta.error_code
            ? Te[e.resource.meta.error_code] = e.default
            : e.resource.paths.forEach((t) => {
              $e.push({ path: t, component: e.default, meta: e.resource.meta });
            });
        }), $e.push({ path: "*", component: Te[404] });
        const Ie = new k.Z({
          routes: $e,
          scrollBehavior(e, t, s) {
            if (e.hash) return { selector: e.hash, offset: { x: 0, y: 10 } };
          },
        });
        Ie.beforeEach((e, t, s) => {
          e.meta || (e.meta = { title: "404 (Not Found)" }),
            e.meta.title || (e.meta.title = "404 (Not Found)"),
            document.title = "dmm - " + e.meta.title,
            s();
        }),
          Ie.afterEach((e, t) => {
            window.scrollTo(0, 0);
          });
        const Ne = Ie;
        p.prototype.$conf = window.drash_api_configs;
        const Oe = new w();
        p.filter("markdown-it", function (e) {
          return Oe.render(e);
        }),
          p.use(k.Z),
          window.app = new p({
            el: "#vue_app_mount",
            components: { VueAppRoot: b },
            router: Ne,
          });
      },
    },
    s = {};
  function n(e) {
    var o = s[e];
    if (void 0 !== o) return o.exports;
    var a = s[e] = { id: e, exports: {} };
    return t[e].call(a.exports, a, a.exports, n), a.exports;
  }
  n.m = t,
    e = [],
    n.O = (t, s, o, a) => {
      if (!s) {
        var r = 1 / 0;
        for (c = 0; c < e.length; c++) {
          for (var [s, o, a] = e[c], l = !0, d = 0; d < s.length; d++) {
            (!1 & a || r >= a) && Object.keys(n.O).every((e) => n.O[e](s[d]))
              ? s.splice(d--, 1)
              : (l = !1, a < r && (r = a));
          }
          if (l) {
            e.splice(c--, 1);
            var i = o();
            void 0 !== i && (t = i);
          }
        }
        return t;
      }
      a = a || 0;
      for (var c = e.length; c > 0 && e[c - 1][2] > a; c--) e[c] = e[c - 1];
      e[c] = [s, o, a];
    },
    n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    },
    n.d = (e, t) => {
      for (var s in t) {
        n.o(t, s) && !n.o(e, s) &&
          Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
      }
    },
    n.g = function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    }(),
    n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    n.r = (e) => {
      "undefined" != typeof Symbol && Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    },
    (() => {
      var e = { 106: 0 };
      n.O.j = (t) => 0 === e[t];
      var t = (t, s) => {
          var o, a, [r, l, d] = s, i = 0;
          for (o in l) n.o(l, o) && (n.m[o] = l[o]);
          if (d) var c = d(n);
          for (t && t(s); i < r.length; i++) {
            a = r[i], n.o(e, a) && e[a] && e[a][0](), e[r[i]] = 0;
          }
          return n.O(c);
        },
        s = self.webpackChunkwebsite = self.webpackChunkwebsite || [];
      s.forEach(t.bind(null, 0)), s.push = t.bind(null, s.push.bind(s));
    })();
  var o = n.O(void 0, [592], () => n(2638));
  o = n.O(o);
})();
