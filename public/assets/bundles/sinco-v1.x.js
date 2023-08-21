(() => {
  "use strict";
  var e,
    t = {
      8590: (e, t, o) => {
        var s = {};
        o.r(s), o.d(s, { default: () => B, resource: () => T });
        var a = {};
        o.r(a), o.d(a, { default: () => j, resource: () => O });
        var n = {};
        o.r(n), o.d(n, { default: () => G, resource: () => P });
        var r = {};
        o.r(r), o.d(r, { default: () => Z, resource: () => q });
        var i = {};
        o.r(i), o.d(i, { default: () => X, resource: () => K });
        var l = {};
        o.r(l), o.d(l, { default: () => ne, resource: () => oe });
        var c = {};
        o.r(c), o.d(c, { default: () => he, resource: () => le });
        var u = {};
        o.r(u), o.d(u, { default: () => me, resource: () => ve });
        var h = o(9346),
          d = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("app-root", {
              attrs: { sidebar: e.sidebar, module: "sinco" },
            });
          };
        d._withStripped = !0;
        var p = o(8646), v = o(8165);
        const _ = {
          components: { AppRoot: p.Z },
          data() {
            return {
              sidebar: {
                api_reference_href:
                  "https://doc.deno.land/https/deno.land/x/sinco@" +
                  this.$conf.sinco.latest_version + "/mod.ts",
                base_url: "/sinco/" + (0, v.b)(),
                github_href: "https://github.com/drashland/sinco",
                logo: "/assets/common/img/logo_sinco.svg",
                menus: {
                  "Getting Started": {
                    Quickstart: "/#quickstart",
                    Importing: "/#importing",
                    Features: "/#features",
                  },
                  Tutorials: {
                    "Click Elements": "/tutorials/clicking-elements",
                    "Get And Set Input Value":
                      "/tutorials/get-and-set-input-value",
                    "Visit Pages": "/tutorials/visit-pages",
                    Waiting: "/tutorials/waiting",
                    "Custom Assertions": "/tutorials/custom-assertions",
                    "Evaluate The Page": "/tutorials/evaluate-page",
                    "Using Within Docker": "/tutorials/using-within-docker",
                  },
                },
                module: "sinco",
              },
            };
          },
        };
        var g = o(1900), m = (0, g.Z)(_, d, [], !1, null, null, null);
        m.options.__file = "src/modules/sinco-v1.x/vue/app.vue";
        const w = m.exports;
        o(4733);
        var f = o(5589),
          y = o(5908),
          b = function () {
            var e = this, t = e.$createElement, o = e._self._c || t;
            return o("div", [
              o("introduction-header", {
                attrs: {
                  heading: "Sinco",
                  description:
                    "Sinco is a browser testing and automation tool for Deno",
                },
              }),
              e._m(0),
              o("div", [
                o("hr"),
                o("h2-hash", [e._v("Quickstart")]),
                o("ol", [
                  o("li", [
                    o("p", [
                      e._v(
                        "Create a test file and start interacting with the browser",
                      ),
                    ]),
                    o("code-block", {
                      attrs: {
                        title: "/path/to/your/project/test.ts",
                        language: "typescript",
                      },
                    }, [
                      e._v(
                        'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                          e._s(e.$conf.sinco.latest_version) +
                          '/mod.ts";\nimport { assertEquals } from "https://deno.land/std@' +
                          e._s(e.$conf.deno_std.latest_version) +
                          '/testing/asserts.ts";\n\nDeno.test("My test", async () => {\n  // Setup\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build(); // Creates the headless browser\n  await Sinco.goTo("https://chromestatus.com"); // Go to this page\n\n  // Do any actions and assertions, in any order\n  await Sinco.assertUrlIs("https://chromestatus.com/features");\n  await Sinco.type(\'input[placeholder="Filter"]\', "Hello");\n  await Sinco.waitForAnchorChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features#Hello");\n  const value = await Sinco.getInputValue(\'input[placeholder="Filter"]\');\n  assertEquals(value, "Hello");\n  await Sinco.click(\'a[href="/features/schedule"]\');\n  await Sinco.waitForPageChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");\n  await Sinco.assertSee("Release timeline");\n\n  // Once finished, close\n  await Sinco.done();\n})',
                      ),
                    ]),
                  ], 1),
                  o("li", [
                    o("p", [e._v("Run your test.")]),
                    o("code-block", {
                      attrs: { title: "Terminal", language: "shell-session" },
                    }, [e._v("$ deno test --allow-net --allow-run test.ts")]),
                  ], 1),
                ]),
                o("hr"),
                o("h2-hash", [e._v("Importing")]),
                o("code-block-import", {
                  attrs: {
                    name: "HeadlessBrowser",
                    repo: "sinco",
                    version: e.$conf.sinco.latest_version,
                  },
                }),
                o("hr"),
                o("h2-hash", [e._v("Features")]),
                e._m(1),
              ], 1),
            ], 1);
          };
        b._withStripped = !0;
        var S = o(8873), k = o(8674), x = o(7518), C = o(3927);
        const T = {
            paths: ["/", "/introduction"],
            meta: { title: "Introduction" },
          },
          E = {
            components: {
              H2Hash: S.Z,
              CodeBlock: k.Z,
              CodeBlockImport: x.Z,
              IntroductionHeader: C.Z,
            },
            data: () => ({}),
          };
        var I = (0, g.Z)(
          E,
          b,
          [function () {
            var e = this.$createElement, t = this._self._c || e;
            return t("div", { staticClass: "flex mb-5" }, [
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/sinco/releases",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Latest Sinco Release",
                  src:
                    "https://img.shields.io/github/release/drashland/sinco.svg?color=brightgreen&label=Latest",
                  width: "auto",
                  height: "20",
                },
              })]),
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/sinco/actions",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "Sinco CI",
                    src:
                      "https://img.shields.io/github/workflow/status/drashland/sinco/master?label=CI",
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
            var e = this, t = e.$createElement, o = e._self._c || t;
            return o("ul", [
              o("li", [o("p", [e._v("Zero 3rd party dependencies")])]),
              o("li", [o("p", [e._v("Click elements")])]),
              o("li", [o("p", [e._v("Type into input fields")])]),
              o("li", [o("p", [e._v("Get input field values")])]),
              o("li", [o("p", [e._v("Waiting")])]),
              o("li", [o("p", [e._v("Visit Pages")])]),
              o("li", [o("p", [e._v("Evaluating JavaScript on the page")])]),
              o("li", [o("p", [e._v("Docker support")])]),
              o("li", [
                o("p", [e._v("Assertions")]),
                o("ul", [
                  o("li", [e._v("Assert url is")]),
                  o("li", [e._v("Assert see")]),
                ]),
              ]),
            ]);
          }],
          !1,
          null,
          null,
          null,
        );
        I.options.__file =
          "src/modules/sinco-v1.x/vue/pages/getting_started.vue";
        const B = I.exports;
        var $ = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v("Sinco provides the method "),
              o("code", [e._v(".click()")]),
              e._v(
                " that will allow you to click any element on the page by the given selector.",
              ),
            ]),
            o("p", [e._v("Example selectors could be:")]),
            o("ul", [
              o("li", [o("code", [e._v(".click('a[href=\"/user\"]');")])]),
              o("li", [o("code", [e._v(".click('button#submit');")])]),
            ]),
            o("p", [
              e._v("The "),
              o("code", [e._v(".click()")]),
              e._v(" method will take any valid selector."),
            ]),
            o("p", [
              e._v(
                "If there is any problem with clicking an element by the selector, such as the element not existing, Sinco will throw an error for you.",
              ),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance; and")]),
              o("li", [e._v("Click a link;")]),
              o("li", [e._v("Assert the page was changed.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.click(\'a[href="/features/schedule"]\');\n  await Sinco.waitForPageChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you will click an element matching the ",
                  ),
                  o("code", [e._v('a[href="/features/schedule"]')]),
                  e._v(
                    " selector, which will send you to a different page. To assert this, you are going to use ",
                  ),
                  o("code", [e._v(".assertUrlIs()")]),
                  e._v(
                    " to assert the page you are currently on, has now changed.",
                  ),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test --allow-run --allow-net app_test.ts")]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        $._withStripped = !0;
        const A = "Creating an Extensive Test",
          O = { paths: ["/tutorials/clicking-elements"], meta: { title: A } },
          H = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: A,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var D = (0, g.Z)(H, $, [], !1, null, null, null);
        D.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/clicking_elements.vue";
        const j = D.exports;
        var F = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v(
                "Sinco provides some utility methods that act as wrappers for Deno's ",
              ),
              o("code", [e._v("std/testing")]),
              e._v(
                " assertions. These methods will run a query on the DOM and make an assertion. You do not need to assert these yourself.",
              ),
            ]),
            o("p", [e._v("The methods it provides are:")]),
            o("ul", [
              o("li", [
                o("code", [e._v("assertUrlIs")]),
                e._v(
                  " - This will assert that the URL for the page matches a given parameter",
                ),
              ]),
              o("li", [
                o("code", [e._v("assertSee")]),
                e._v(
                  " - This method will assert that the given text exists inside the page",
                ),
              ]),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance;")]),
              o("li", [e._v("Assert the url for the page; and")]),
              o("li", [e._v("Assert text exists inside the DOM (page).")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.assertUrlIs("https://chromestatus.com/features");\n  await Sinco.assertSee("Chrome versions");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you are going to assert that the page you are on is as expected. Note that ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(" will redirect to "),
                  o("code", [e._v("https://chromestatus.com/features")]),
                  e._v(", which is why you have added the "),
                  o("code", [e._v("/features")]),
                  e._v(
                    " value to the end of the expected URL. You will assert that and also assert that you can see some given text on the page, and in this example, it is ",
                  ),
                  o("code", [e._v("Chrome Versions")]),
                  e._v("."),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test --allow-run --allow-net app_test.ts")]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        F._withStripped = !0;
        const R = "Custom Assertions",
          P = { paths: ["/tutorials/custom-assertions"], meta: { title: R } },
          U = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: R,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var V = (0, g.Z)(U, F, [], !1, null, null, null);
        V.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/custom_assertions.vue";
        const G = V.exports;
        var N = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v("Sinco provides the method "),
              o("code", [e._v(".evaluatePage()")]),
              e._v(" that can run JavaScript against the context of the page."),
            ]),
            o("p", [
              e._v("You can pass in a string ("),
              o("code", [e._v(".evaluatePage(`1 + 2`)")]),
              e._v(") or a function ("),
              o("code", [e._v(".evaluatePage(() => document.title )")]),
              e._v(")."),
            ]),
            o("p", [e._v("Example evaluations could be:")]),
            o("ul", [
              o("li", [
                e._v("Querying the DOM (getting the child of an element)"),
              ]),
              o("li", [e._v("Returning the page title")]),
              o("li", [e._v("Adding elements to the page")]),
              o("li", [e._v("Run equations")]),
              o("li", [
                e._v(
                  "Anything you could write in a client side JavaScript file or in the console, you can do here!",
                ),
              ]),
            ]),
            o("p", [
              e._v(
                "If there was an error with the code you tried to evaluate, Sinco will throw an error.",
              ),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance; and")]),
              o("li", [e._v("Go to a website;")]),
              o("li", [e._v("Gather some information about the page;")]),
              o("li", [e._v("Run a basic sum;")]),
              o("li", [e._v("Update the DOM.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\nimport { assertEquals } from "https://deno.land/std@' +
                      e._s(e.$conf.deno_std.latest_version) +
                      '/testing/asserts.ts"\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  const pageTitle = await Sinco.evaluatePage(() => {\n    return document.title;\n  })\n  const sum = await Sinco.evaluatePage(`1 + 10`);\n  const oldBodyLength = await Sinco.evaluatePage(() => {\n    return document.body.children.length;\n  })\n  const newBodyLength = await Sinco.evaluatePage(() => {\n    const p = document.createElement("p");\n    p.textContent = "Hello world!"\n    document.body.appendChild(p);\n    return document.body.children.length;\n  })\n  await Sinco.done();\n  assertEquals(pageTitle, "Chrome Platform Status");\n  assertEquals(sum, 11);\n  assertEquals(oldBodyLength, 7);\n  assertEquals(newBodyLength, 8);\n})',
                  ),
                ]),
                o("p", [
                  e._v("Within the function you can pass to "),
                  o("code", [e._v("evaluatePage()")]),
                  e._v(
                    ", you have full access to the DOM, meaning you can write client side JavaScript like you normally would, for example:",
                  ),
                ]),
                o("code-block", {
                  attrs: { title: "", language: "typescript" },
                }, [
                  e._v(
                    'await Sinco.evaluatePage(() => {\n  const form = document.querySelector("form");\n  const submitButton = document.getElementById("submit");\n  const href = window.location.href;\n  const savedValue = localStorage.getItem("id");\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you will evaluate a few scripts that will get the document title and create a new element on the page. You will then assert that the page title is as expected, and also that a new element was added to the DOM.",
                  ),
                ]),
              ], 1),
              o("li", [
                o("p", [e._v("Create your config")]),
                o("p", [
                  e._v("A "),
                  o("code", [e._v("tsconfig.json")]),
                  e._v(
                    " file is required when targeting the DOM (using document syntax) to tell Deno that this is valid.",
                  ),
                ]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/tsconfig.json",
                    language: "json",
                  },
                }, [
                  e._v(
                    '{\n  "compilerOptions": {\n    "lib": ["dom", "deno.ns"]\n  }\n}',
                  ),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    "$ deno test --allow-run --allow-net --config tsconfig.json app_test.ts",
                  ),
                ]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        N._withStripped = !0;
        const M = "Evaluate The Page",
          q = { paths: ["/tutorials/evaluate-page"], meta: { title: M } },
          L = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: M,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var Y = (0, g.Z)(L, N, [], !1, null, null, null);
        Y.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/evaluate_page.vue";
        const Z = Y.exports;
        var W = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v(
                "Sinco provides a method to get the value associated with an ",
              ),
              o("code", [e._v("input")]),
              e._v(" element that is present on the page."),
            ]),
            o("p", [
              e._v(
                "Sinco provides another method for setting the value of an ",
              ),
              o("code", [e._v("input")]),
              e._v(" element by a selector."),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance;")]),
              o("li", [e._v("Set the value for an input element;")]),
              o("li", [
                e._v(
                  "Get the value associated with a specific input element; and",
                ),
              ]),
              o("li", [e._v("Assert that value is correct.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\nimport { assertEquals } from "https://deno.land/std@' +
                      e._s(e.$conf.deno_std.latest_version) +
                      '/testing/asserts.ts";\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.type(\'input[placeholder="Filter"]\', "hello world");\n  const val = await Sinco.getInputValue(\'input[placeholder="Filter"]\');\n  assertEquals(val, "hello world");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "In this tutorial, you are creating a new browser instance that is pointing to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ", then you will type a value into an input field, just so the field is populated with a value. After, you will get the value from that input field and assert it equals the value you typed.",
                  ),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test --allow-run --allow-net app_test.ts")]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        W._withStripped = !0;
        const J = "Get And Set Input Value",
          K = {
            paths: ["/tutorials/get-and-set-input-value"],
            meta: { title: J },
          },
          Q = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: J,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var z = (0, g.Z)(Q, W, [], !1, null, null, null);
        z.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/get_and_set_input_value.vue";
        const X = z.exports;
        var ee = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v(
                "Sinco provides support for running your tests inside Docker. It only requires just over half a dozen lines inside a dockerfile to install the chrome-driver and you should be ready to go.",
              ),
            ]),
            o("p", [
              e._v(
                "Other than that, there are no other changes required, and the rest of Sinco's documentation still applies.",
              ),
            ]),
            o("P", [
              e._v(
                "The ability to run your Browser tests from within a docker container is very useful, because (as containers can be networked together), you could go to your website, test your ",
              ),
              o("code", [e._v("/register")]),
              e._v(
                " page works when creating a user, and then clean up (delete the user) from your database - whether that's importing your 'User model' and deleting it manually.",
              ),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [
                e._v(
                  "Create a docker container, that installs Deno and chrome-driver; and",
                ),
              ]),
              o("li", [
                e._v("Create a headless browser instance from within Docker;"),
              ]),
              o("li", [e._v("Go to a page;")]),
              o("li", [e._v("Assert that you are on the expected web page.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v(
                "▾ /path/to/your/project/\n    docker-compose.yml\n    app.dockerfile\n    ▾ src/\n        app_test.ts",
              ),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your dockerfile.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.dockerfile",
                    language: "dockerfile",
                  },
                }, [
                  e._v(
                    'FROM debian:stable-slim\n\n# Install chrome driver\nRUN apt update -y && apt clean -y\nRUN apt install gnupg -y\nENV CHROME_VERSION "google-chrome-stable"\nRUN sed -i -- \'s&deb http://deb.debian.org/debian jessie-updates main&#deb http://deb.debian.org/debian jessie-updates main&g\' /etc/apt/sources.list \\\n  && apt-get update && apt-get install wget -y\nRUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \\\n  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list \\\n  && apt-get update && apt-get -qqy install ${CHROME_VERSION:-google-chrome-stable}\n\n# Install deno\nRUN apt install curl unzip -y\nRUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh\nRUN export DENO_INSTALL="/root/.local"\nRUN export PATH="$DENO_INSTALL/bin:$PATH"',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here, you are using a very small image (debian-slim) as your baseline for your docker container. Then you install the chrome-driver, which allows Sinco to create a headless browser instance. Then you install Deno, because whilst you may have Deno installed on your host machine, it won't be from within docker unless you tell it to.",
                  ),
                ]),
              ], 1),
              o("li", [
                o("p", [e._v("Create your docker compose file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/docker-compose.yml",
                    language: "yaml",
                  },
                }, [
                  e._v(
                    "version: '3'\n\nservices:\n  chrome:\n    container_name: my_app\n    build:\n      context: .\n      dockerfile: app.dockerfile\n    volumes:\n      - ./src:/var/www/my-app\n    command: bash -c \"deno test --allow-run --allow-net\"\n    working_dir: /var/www/my-app",
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here, you are creating your docker-compose file, which will start/run your container, and execute your test file.",
                  ),
                ]),
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/src/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.click(\'a[href="/features/schedule"]\');\n  await Sinco.waitForPageChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you will click an element matching the ",
                  ),
                  o("code", [e._v('a[href="/features/schedule"]')]),
                  e._v(
                    " selector, which will send you to a different page. To assert this, you are going to use ",
                  ),
                  o("code", [e._v(".assertUrlIs()")]),
                  e._v(
                    " to assert the page you are currently on, has now changed.",
                  ),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ docker-compose build\n$ docker-compose up")]),
              ], 1),
              o("li", [
                o("p", [
                  e._v(
                    "All of your tests should pass, and your docker container should exit successfully.",
                  ),
                ]),
              ]),
            ]),
          ], 1);
        };
        ee._withStripped = !0;
        const te = "Using Within Docker",
          oe = {
            paths: ["/tutorials/using-within-docker"],
            meta: { title: te },
          },
          se = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: te,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var ae = (0, g.Z)(se, ee, [], !1, null, null, null);
        ae.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/using_within_docker.vue";
        const ne = ae.exports;
        var re = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v("Sinco provides the method "),
              o("code", [e._v(".goTo()")]),
              e._v(
                " that will navigate your browser client to the web page specified. This method will wait until the page has loaded.",
              ),
            ]),
            o("p", [e._v("Example pages could be:")]),
            o("ul", [
              o("li", [o("code", [e._v("https://github.com")])]),
              o("li", [o("code", [e._v("www.google.com")])]),
            ]),
            o("p", [
              e._v(
                "If there was an error navigating to the page (page doesn't exist), then Sinco will throw an error",
              ),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance; and")]),
              o("li", [e._v("Go to a website;")]),
              o("li", [e._v("Assert the url is correct.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\n\nDeno.test("My web app works as expected", async () => {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.assertUrlIs("https://chromestatus.com/features");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you will assert that the url for the page is as expected. Do note that navigating to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(" redirects to "),
                  o("code", [e._v("https://chromestatus.com/features")]),
                  e._v(", which is why the url inside our assertion ("),
                  o("code", [e._v("assertUrlIs()")]),
                  e._v(") is different than the one we passed into "),
                  o("code", [e._v("goTo()")]),
                  e._v("."),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test --allow-run --allow-net app_test.ts")]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        re._withStripped = !0;
        const ie = "Visit Pages",
          le = { paths: ["/tutorials/visit-pages"], meta: { title: ie } },
          ce = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: ie,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var ue = (0, g.Z)(ce, re, [], !1, null, null, null);
        ue.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/visit_pages.vue";
        const he = ue.exports;
        var de = function () {
          var e = this, t = e.$createElement, o = e._self._c || t;
          return o("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            o("h2-hash", [e._v("Before You Get Started")]),
            o("p", [
              e._v(
                "Sinco provides methods to wait in specific scenarios, such as waiting for the page to change after clicking a button, or waiting for an anchor change on the uri. These help in ensuring your following code matches what the page should be, so say for example, you click a button that changes the page after 5 seconds. The ",
              ),
              o("code", [e._v("waitForPageChange()")]),
              e._v(
                " method will wait for this, so your other actions and assertions aren't trying to run whilst the new page hasn't loaded yet.",
              ),
            ]),
            o("p", [e._v("The following methods Sinco provides are:")]),
            o("ul", [
              o("li", [o("code", [e._v("waitForPageChange()")])]),
              o("li", [o("code", [e._v("waitForAnchorChange()")])]),
            ]),
            o("p", [
              e._v("The "),
              o("code", [e._v("waitForPageChange()")]),
              e._v(
                " method will wait for the page to change, eg clicking an anchor tag that directs the user to a new uri.",
              ),
            ]),
            o("p", [
              e._v("The "),
              o("code", [e._v("waitForAnchorChange()")]),
              e._v(
                " method will wait for the uri to contain a href. This can be useful when typing into an input field changes the uri (eg ",
              ),
              o("code", [e._v("/users")]),
              e._v(" to "),
              o("code", [e._v("/users#Simon")]),
              e._v(
                ") and the DOM reflects that, such as displaying the Simon useron the page.",
              ),
            ]),
            o("p", [e._v("In this tutorial, you will:")]),
            o("ul", [
              o("li", [e._v("Create a headless browser instance; and")]),
              o("li", [e._v("Go to a website;")]),
              o("li", [e._v("Wait for the page to change on a click;")]),
              o("li", [e._v("Wait for the uri to change to contain a href.")]),
            ]),
            o("hr"),
            o("folder-structure-end-state", [
              e._v("▾ /path/to/your/project/\n    app_test.ts"),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Steps")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Create your test file.")]),
                o("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { HeadlessBrowser } from "https://deno.land/x/sinco@' +
                      e._s(e.$conf.sinco.latest_version) +
                      '/mod.ts";\n\nDeno.test("My web app works as expected", async function () {\n  const Sinco = new HeadlessBrowser();\n  await Sinco.build();\n  await Sinco.goTo("https://chromestatus.com");\n  await Sinco.assertUrlIs("https://chromestatus.com/features");\n  await Sinco.type(\'input[placeholder="Filter"]\', "Hello");\n  await Sinco.waitForAnchorChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features#Hello");\n  await Sinco.click(\'a[href="/features/schedule"]\');\n  await Sinco.waitForPageChange();\n  await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");\n  await Sinco.done();\n})',
                  ),
                ]),
                o("p", [
                  e._v(
                    "Here you are going to create your headless browser instance, and navigate to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(
                    ". Once the page has loaded, you will assert that the url for the page is as expected. Do note that navigating to ",
                  ),
                  o("code", [e._v("https://chromestatus.com")]),
                  e._v(" redirects to "),
                  o("code", [e._v("https://chromestatus.com/features")]),
                  e._v(", which is why the url inside our assertion ("),
                  o("code", [e._v("assertUrlIs()")]),
                  e._v(") is different than the one we passed into "),
                  o("code", [e._v("goTo()")]),
                  e._v("."),
                ]),
              ], 1),
            ]),
            o("hr"),
            o("h2-hash", [e._v("Verification")]),
            o("ol", [
              o("li", [
                o("p", [e._v("Run your test.")]),
                o("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test --allow-run --allow-net app_test.ts")]),
              ], 1),
              o("li", [o("p", [e._v("All of your tests should pass.")])]),
            ]),
          ], 1);
        };
        de._withStripped = !0;
        const pe = "Waiting",
          ve = { paths: ["/tutorials/waiting"], meta: { title: pe } },
          _e = {
            components: {},
            data() {
              return {
                base_url: this.$conf.sinco.base_url,
                title: pe,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var ge = (0, g.Z)(_e, de, [], !1, null, null, null);
        ge.options.__file =
          "src/modules/sinco-v1.x/vue/pages/tutorials/waiting.vue";
        const me = ge.exports;
        let we = [], fe = {};
        [s, a, n, r, i, l, c, u].forEach((e) => {
          e.resource.meta && e.resource.meta.error_code
            ? fe[e.resource.meta.error_code] = e.default
            : e.resource.paths.forEach((t) => {
              we.push({ path: t, component: e.default, meta: e.resource.meta });
            });
        }), we.push({ path: "*", component: fe[404] });
        const ye = new y.Z({
          routes: we,
          scrollBehavior(e, t, o) {
            if (e.hash) return { selector: e.hash, offset: { x: 0, y: 10 } };
          },
        });
        ye.beforeEach((e, t, o) => {
          e.meta || (e.meta = { title: "404 (Not Found)" }),
            e.meta.title || (e.meta.title = "404 (Not Found)"),
            document.title = "Sinco - " + e.meta.title,
            o();
        }),
          ye.afterEach((e, t) => {
            window.scrollTo(0, 0);
          });
        const be = ye;
        h.prototype.$conf = window.drash_api_configs;
        const Se = new f();
        h.filter("markdown-it", function (e) {
          return Se.render(e);
        }),
          h.use(y.Z),
          window.app = new h({
            el: "#vue_app_mount",
            components: { VueAppRoot: w },
            router: be,
          });
      },
    },
    o = {};
  function s(e) {
    var a = o[e];
    if (void 0 !== a) return a.exports;
    var n = o[e] = { id: e, exports: {} };
    return t[e].call(n.exports, n, n.exports, s), n.exports;
  }
  s.m = t,
    e = [],
    s.O = (t, o, a, n) => {
      if (!o) {
        var r = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [o, a, n] = e[u], i = !0, l = 0; l < o.length; l++) {
            (!1 & n || r >= n) && Object.keys(s.O).every((e) => s.O[e](o[l]))
              ? o.splice(l--, 1)
              : (i = !1, n < r && (r = n));
          }
          if (i) {
            e.splice(u--, 1);
            var c = a();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      n = n || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > n; u--) e[u] = e[u - 1];
      e[u] = [o, a, n];
    },
    s.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return s.d(t, { a: t }), t;
    },
    s.d = (e, t) => {
      for (var o in t) {
        s.o(t, o) && !s.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      }
    },
    s.g = function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    }(),
    s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    s.r = (e) => {
      "undefined" != typeof Symbol && Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    },
    (() => {
      var e = { 628: 0 };
      s.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var a, n, [r, i, l] = o, c = 0;
          for (a in i) s.o(i, a) && (s.m[a] = i[a]);
          if (l) var u = l(s);
          for (t && t(o); c < r.length; c++) {
            n = r[c], s.o(e, n) && e[n] && e[n][0](), e[r[c]] = 0;
          }
          return s.O(u);
        },
        o = self.webpackChunkwebsite = self.webpackChunkwebsite || [];
      o.forEach(t.bind(null, 0)), o.push = t.bind(null, o.push.bind(o));
    })();
  var a = s.O(void 0, [592], () => s(8590));
  a = s.O(a);
})();
