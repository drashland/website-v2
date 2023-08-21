(() => {
  var e,
    t = {
      1164: (e, t, s) => {
        (t = s(7705)(!1)).push([
          e.id,
          "a code[data-v-51f7c8fa]{color:#ff7700}a code[data-v-51f7c8fa]:hover{color:#333333}\n",
          "",
        ]), e.exports = t;
      },
      3024: (e, t, s) => {
        var a = s(3379), r = s(1164);
        "string" == typeof (r = r.__esModule ? r.default : r) &&
          (r = [[e.id, r, ""]]);
        var n = { insert: "head", singleton: !1 };
        a(r, n);
        e.exports = r.locals || {};
      },
      7078: (e, t, s) => {
        "use strict";
        var a = {};
        s.r(a), s.d(a, { default: () => I, resource: () => $ });
        var r = {};
        s.r(r), s.d(r, { default: () => N, resource: () => D });
        var n = {};
        s.r(n), s.d(n, { default: () => K, resource: () => G });
        var o = {};
        s.r(o), s.d(o, { default: () => te, resource: () => z });
        var u = {};
        s.r(u), s.d(u, { default: () => ie, resource: () => ne });
        var i = {};
        s.r(i), s.d(i, { default: () => me, resource: () => ce });
        var l = {};
        s.r(l), s.d(l, { default: () => ye, resource: () => ve });
        var h = {};
        s.r(h), s.d(h, { default: () => Me, resource: () => we });
        var c = {};
        s.r(c), s.d(c, { default: () => Ze, resource: () => Ae });
        var d = s(9346),
          p = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("app-root", {
              attrs: {
                sidebar: e.sidebar,
                news_tags: "deno, rhum",
                module: "Rhum",
              },
            });
          };
        p._withStripped = !0;
        var m = s(8646), f = s(8165);
        const _ = {
          components: { AppRoot: m.Z },
          data() {
            return {
              sidebar: {
                api_reference_href:
                  "https://doc.deno.land/https/deno.land/x/rhum@" +
                  this.$conf.rhum.latest_version + "/mod.ts",
                base_url: "/rhum/" + (0, f.b)(),
                github_href: "https://github.com/drashland/rhum",
                logo: "/assets/common/img/logo_rhum.svg",
                menus: {
                  "Getting Started": {
                    Quickstart: "/#quickstart",
                    Importing: "/#importing",
                    Features: "/#features",
                    Articles: "/#articles",
                    FAQ: "/faq",
                  },
                  "Latest News": {},
                  Tutorials: {
                    "Writing Tests": "/tutorials/writing-tests",
                    Stubs: "/tutorials/stubs",
                    Mocks: "/tutorials/mocks",
                    Hooks: "/tutorials/hooks",
                  },
                },
                module: "rhum",
              },
            };
          },
        };
        var v = s(1900), b = (0, v.Z)(_, p, [], !1, null, null, null);
        b.options.__file = "src/modules/rhum-v1.x/vue/app.vue";
        const g = b.exports;
        s(4733);
        var y = s(5589),
          k = s(5908),
          R = function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("page", {
              attrs: { base_url: e.base_url, title: e.title },
            }, [
              s("h2-hash", [e._v("Table Of Contents")]),
              s("ul", { staticClass: "mb-5" }, [
                s("li", [
                  e._v("Properties"),
                  s("ul", [
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.asserts")],
                      ),
                    ], 1),
                  ]),
                ]),
                s("li", [
                  e._v("Methods"),
                  s("ul", [
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.afterAll")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.afterEach")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.beforeAll")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.beforeEach")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.run")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.skip")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.testCase")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.testPlan")],
                      ),
                    ], 1),
                    s("li", [
                      s(
                        "a-code-hash",
                        { attrs: { base_url: e.page_base_url } },
                        [e._v("Rhum.testSuite")],
                      ),
                    ], 1),
                  ]),
                ]),
              ]),
              s("hr"),
              s("h2-hash", [e._v("Properties")]),
              s("code-hash", [e._v("Rhum.asserts")]),
              s("p", [
                e._v("The "),
                s("a", {
                  attrs: {
                    href: "https://deno.land/std/testing/asserts.ts",
                    target: "_BLANK",
                  },
                }, [e._v("asserts")]),
                e._v(" module from the "),
                s("a", {
                  attrs: {
                    href: "https://deno.land/std/testing",
                    target: "_BLANK",
                  },
                }, [e._v("testing")]),
                e._v(" module, but attached to Rhum for accessibility."),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  "Rhum.asserts.assertEquals(true, true); // pass\nRhum.asserts.assertEquals(true, false); // fail",
                )],
              ),
              s("hr"),
              s("h2-hash", [e._v("Methods")]),
              s("code-hash", [e._v("Rhum.afterAll")]),
              s("p", [
                e._v(
                  "Used to define a hook that will execute after all test suites or test cases. If this is used inside of a test plan, then it will execute after all test suites. If this is used inside of a test suite, then it will execute after all test cases.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.afterAll(() => {\n    // Runs once after all test suites in this test plan\n  });\n  Rhum.testSuite("My Suite 1", () => {\n    Rhum.afterAll(() => {\n      // Runs once after all test cases in this test suite\n    });\n    Rhum.testCase("My Test Case 1", () => {\n      ...\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.afterEach")]),
              s("p", [
                e._v(
                  "Used to define a hook that will execute after each test suite or test case. If this is used inside of a test plan, then it will execute after each test suite. If this is used inside of a test suite, then it will execute after each test case.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.afterEach(() => {\n    // Runs after each test suite in this test plan\n  });\n  Rhum.testSuite("My Suite 1", () => {\n    Rhum.afterEach(() => {\n      // Runs after each test case in this test suite\n    });\n    Rhum.testCase("My Test Case 1", () => {\n      ...\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.beforeAll")]),
              s("p", [
                e._v(
                  "Used to define a hook that will execute before all test suites or test cases. If this is used inside of a test plan, then it will execute before all test suites. If this is used inside of a test suite, then it will execute before all test cases.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.beforeAll(() => {\n    // Runs once before all test suites in this test plan\n  });\n  Rhum.testSuite("My Suite 1", () => {\n    Rhum.beforeAll(() => {\n      // Runs once before all test cases in this test suite\n    });\n    Rhum.testCase("My Test Case 1", () => {\n      ...\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.beforeEach")]),
              s("p", [
                e._v(
                  "Used to define a hook that will execute before each test suite or test case. If this is used inside of a test plan, then it will execute before each test suite. If this is used inside of a test suite, then it will execute before each test case.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.beforeEach(() => {\n    // Runs before each test suite in this test plan\n  });\n  Rhum.testSuite("My Suite 1", () => {\n    Rhum.beforeEach(() => {\n      // Runs before each test case in this test suite\n    });\n    Rhum.testCase("My Test Case 1", () => {\n      ...\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.run")]),
              s("p", [e._v("Runs your test plan.")]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  ...\n});\n\nRhum.run();',
                )],
              ),
              s("code-hash", [e._v("Rhum.skip")]),
              s("p", [
                e._v(
                  "Allows a test plan, suite, or case to be skipped when the tests run.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.skip("My Suite 1", () => { // will not run this block\n    Rhum.testCase("My Test Case In Suite 1", () => {\n      ...\n    });\n  });\n  Rhum.testSuite("My Suite 2", () => {\n    Rhum.testCase("My Test Case In Suite 2", () => {\n      ...\n    });\n    Rhum.skip("My Other Test Case In Suite 2", () => { // will not run this block\n      ...\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.testCase")]),
              s("p", [
                e._v(
                  "A test case is grouped by a test suite and it is what makes the assertions - it is the test. You can define multiple test cases under a test suite. Test cases can also be asynchronous. Test cases can only be defined inside of a test suite.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.testSuite("My Suite 1", () => {\n    Rhum.testCase("My Test Case 1", () => {\n      Rhum.assert.assertEquals(something, true);\n    });\n    Rhum.testCase("My Test Case 2", () => {\n      Rhum.assert.assertEquals(something, false);\n    });\n  });\n});',
                )],
              ),
              s("code-hash", [e._v("Rhum.testPlan")]),
              s("p", [
                e._v(
                  "Groups up test suites to describe a test plan. Usually, a test plan is per file and contains the tests suites and test cases for a single file. Test plans are required in order to define a test suite with test cases.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v('Rhum.testPlan("My Plan", () => {\n  ...\n});')],
              ),
              s("code-hash", [e._v("Rhum.testSuite")]),
              s("p", [
                e._v(
                  "A test suite usually describes a method or property name and groups up all test cases for that method or property. You can define multiple test suites under a test plan. Test suites can only be defined inside of a test plan.",
                ),
              ]),
              s(
                "code-block",
                { attrs: { header: !1, language: "typescript" } },
                [e._v(
                  'Rhum.testPlan("My Plan", () => {\n  Rhum.testSuite("My Suite 1", () => {\n    ...\n  });\n  Rhum.testSuite("My Suite 2", () => {\n    ...\n  });\n});',
                )],
              ),
            ], 1);
          };
        R._withStripped = !0;
        var w = s(8873),
          S = s(9215),
          C = s(8674),
          M = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)(
              "code",
              { staticClass: "mb-5", attrs: { id: e.hash } },
              [e._t("default")],
              2,
            );
          };
        M._withStripped = !0;
        const x = {
          computed: {
            hash() {
              return this.$slots.default[0].text.toLowerCase().replace(
                / /g,
                "-",
              ).replace(/\?/g, "").replace(/\./g, "-").replace(/\,/g, "");
            },
          },
        };
        var T = (0, v.Z)(x, M, [], !1, null, null, null);
        T.options.__file = "assets/common/vue/code_hash.vue";
        const A = T.exports;
        var P = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("a", { attrs: { href: e.href } }, [
            s("code", [e._t("default")], 2),
          ]);
        };
        P._withStripped = !0;
        const E = {
          props: { base_url: { type: String, default: "" } },
          computed: {
            href() {
              return this.base_url + "#" + this.hash;
            },
            hash() {
              return this.$slots.default[0].text.toLowerCase().replace(
                / /g,
                "-",
              ).replace(/\?/g, "").replace(/\./g, "-").replace(/\,/g, "");
            },
          },
        };
        s(3024);
        var Z = (0, v.Z)(E, P, [], !1, null, "51f7c8fa", null);
        Z.options.__file = "assets/common/vue/a_code_hash.vue";
        const j = Z.exports,
          H = "API Reference",
          $ = { paths: ["/api-reference"], meta: { title: H } },
          O = {
            components: {
              ACodeHash: j,
              CodeHash: A,
              CodeBlock: C.Z,
              H2Hash: w.Z,
              Page: S.Z,
            },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                page_base_url: this.$conf.rhum.base_url + "/#/api-reference",
                title: H,
              };
            },
          };
        var B = (0, v.Z)(O, R, [], !1, null, null, null);
        B.options.__file = "src/modules/rhum-v1.x/vue/pages/api_reference.vue";
        const I = B.exports;
        var q = function () {
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
        q._withStripped = !0;
        const D = {
            paths: ["/404"],
            meta: { title: "404 (Not Found)", error_code: 404 },
          },
          L = { data: () => ({}) };
        var F = (0, v.Z)(L, q, [], !1, null, null, null);
        F.options.__file = "src/modules/rhum-v1.x/vue/pages/error_404.vue";
        const N = F.exports;
        var Y = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s(
            "page",
            { attrs: { base_url: e.base_url, title: e.title } },
            [
              s("p", [
                s("strong", [
                  e._v(
                    "Why does the CI show a different output than my host machine?",
                  ),
                ]),
              ]),
              s("p", [
                e._v(
                  "Due to the trouble with modifying the output of tests, you will notice the output of your tests in your CI is different than what you see when running tests on your host machine. This is expected. The CI does not like how Rhum changes the way ",
                ),
                s("code", [e._v("Deno.test")]),
                e._v(
                  " outputs results in a prettier manner. So, to make the output readable in the CI, Rhum has to implement a different output method — having the test plans, suites, and cases display on a single line.",
                ),
              ]),
            ],
          );
        };
        Y._withStripped = !0;
        const G = { paths: ["/faq"], meta: { title: "FAQ" } },
          U = {
            components: { H2Hash: w.Z, Page: S.Z },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                title: "FAQ",
              };
            },
          };
        var V = (0, v.Z)(U, Y, [], !1, null, null, null);
        V.options.__file = "src/modules/rhum-v1.x/vue/pages/faq.vue";
        const K = V.exports;
        var W = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("div", [
            s("introduction-header", {
              attrs: {
                heading: "Rhum",
                description: "Rhum is a lightweight testing framework for Deno",
              },
            }),
            e._m(0),
            s("div", [
              s("hr"),
              s("h2-hash", [e._v("Quickstart")]),
              s("ol", [
                s("li", [
                  s("p", [e._v("Write your test file.")]),
                  s("code-block", {
                    attrs: {
                      title: "/path/to/your/project/test.ts",
                      language: "typescript",
                    },
                  }, [
                    e._v(
                      'import { Rhum } from "https://deno.land/x/rhum@' +
                        e._s(e.$conf.rhum.latest_version) +
                        '/mod.ts";\n\nlet value = false;\n\nfunction run() {\n  return true;\n}\n\nasync function close() {\n  value = true;\n  return value;\n}\n\n// 1. Define your test plan (usually the test file\'s name)\n// 2. Define your test suites (usually methods being tested)\n// 3. Define your test cases with assertions\nRhum.testPlan("app_test.ts", () => {\n  Rhum.testSuite("run()", () => {\n    Rhum.testCase("Returns true", () => {\n      const result = run();\n      Rhum.asserts.assertEquals(true, result);\n    });\n  });\n  Rhum.testSuite("close()", () => {\n    Rhum.testCase("Returns true", async () => {\n      const result = await close();\n      Rhum.asserts.assertEquals(true, result);\n    });\n  });\n});\n\nRhum.run(); // <-- make sure to include this so that your tests run via `deno test`',
                    ),
                  ]),
                ], 1),
                s("li", [
                  s("p", [e._v("Run your tests.")]),
                  s("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("$ deno test --allow-env")]),
                ], 1),
                s("li", [
                  s("p", [e._v("View your output.")]),
                  s("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [
                    e._v(
                      "app_test.ts\n    run()\n        Returns true ... ok (4ms)\n    close()\n        Returns true ... ok (1ms)",
                    ),
                  ]),
                ], 1),
              ]),
              s("hr"),
              s("h2-hash", [e._v("Importing")]),
              s("code-block-import", {
                attrs: {
                  name: "Rhum",
                  repo: "rhum",
                  version: e.$conf.rhum.latest_version,
                },
              }),
              s("hr"),
              s("h2-hash", [e._v("Features")]),
              e._m(1),
              s("hr"),
              s("h2-hash", [e._v("Articles")]),
              e._m(2),
            ], 1),
          ], 1);
        };
        W._withStripped = !0;
        var Q = s(7518), X = s(3927);
        const z = {
            paths: ["/", "/introduction"],
            meta: { title: "Introduction" },
          },
          J = {
            components: {
              H2Hash: w.Z,
              CodeBlock: C.Z,
              CodeBlockImport: Q.Z,
              IntroductionHeader: X.Z,
            },
          };
        var ee = (0, v.Z)(
          J,
          W,
          [function () {
            var e = this.$createElement, t = this._self._c || e;
            return t("div", { staticClass: "flex mb-5" }, [
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/rhum/releases",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Latest Rhum Release",
                  src:
                    "https://img.shields.io/github/release/drashland/rhum.svg?color=brightgreen&label=Latest",
                  width: "auto",
                  height: "20",
                },
              })]),
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/rhum/actions",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "Rhum CI",
                    src:
                      "https://img.shields.io/github/workflow/status/drashland/rhum/master?label=CI",
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
                    "https://www.youtube.com/watch?v=WhG5hLrcaVQ&list=PLlFUbR9MhiNU9VlCi97JkahXyDYcL_vUz&ab_channel=drashland",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  attrs: {
                    alt: "Rhum YouTube",
                    src: "https://img.shields.io/badge/Tutorials-YouTube-red",
                    width: "auto",
                    height: "20",
                  },
                }),
              ]),
            ]);
          }, function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("ul", [
              s("li", [s("p", [e._v("Descriptive naming for your tests")])]),
              s("li", [s("p", [e._v("Lightweight")])]),
              s("li", [s("p", [e._v("Zero 3rd party dependencies")])]),
              s("li", [s("p", [e._v("Simple and easy to use")])]),
              s("li", [s("p", [e._v("Asynchronous support")])]),
              s("li", [
                s("p", [
                  e._v("Still uses "),
                  s("code", [e._v("Deno.test")]),
                  e._v(" under the hood"),
                ]),
              ]),
              s("li", [s("p", [e._v("Skip functionality")])]),
              s("li", [s("p", [e._v("Mock requests")])]),
              s("li", [s("p", [e._v("Hooks")])]),
            ]);
          }, function () {
            var e = this, t = e.$createElement, s = e._self._c || t;
            return s("ul", [
              s("li", [
                s("a", {
                  attrs: {
                    href:
                      "https://dev.to/crookse_/why-we-created-rhum-for-testing-deno-projects-33mf",
                  },
                }, [e._v("Why We Created Rhum")]),
              ]),
            ]);
          }],
          !1,
          null,
          null,
          null,
        );
        ee.options.__file =
          "src/modules/rhum-v1.x/vue/pages/getting_started.vue";
        const te = ee.exports;
        var se = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Before You Get Started")]),
            s("p", [
              e._v(
                "Hooks are functions that contain the code that can be executed before or after tests.",
              ),
            ]),
            s("P", [
              e._v(
                "The benefit of this is, if you need to re-define a variable after each test, or if you need to create a user in the database before each test.",
              ),
            ]),
            s("p", [
              e._v(
                "Hooks allow you re-use code, by running it before or after a test case. There are a total of 4 hooks you can use:",
              ),
            ]),
            s("ul", [
              s("li", [
                s("code", [e._v("beforeEach")]),
                e._v(
                  " - A hook to be ran before each cases inside a suite or a suite itself.",
                ),
              ]),
              s("li", [
                s("code", [e._v("beforeAll")]),
                e._v(
                  " - A hook to be ran before all test cases inside a suite or a suite itself.",
                ),
              ]),
              s("li", [
                s("code", [e._v("afterEach")]),
                e._v(
                  " - A hook to be ran after each test case inside a suite or a suite itself",
                ),
              ]),
              s("li", [
                s("code", [e._v("afterAll")]),
                e._v(
                  " - A hook to be ran after all test cases inside a suite or a suite itself",
                ),
              ]),
            ]),
            s("p", [
              e._v(
                "Hooks can be applied to test cases or test suites, meaning before or after every test suite (which would also include every test case in that suite)",
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Creating Before Hooks")]),
            s("p", [
              e._v(
                "Before hooks have many useful purposes such as resetting or creating data before a test case runs. An example of this is creating a new user in the database for each test case to use (if those test cases update the user object)",
              ),
            ]),
            s("p", [e._v("Creating before hooks can be done as follows:")]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                'Rhum.testPlan("My Plan", () => {\n  let val = 0;\n  Rhum.beforeAll(() => { // Defined inside the plan, so it will run before each suite\n    val = 1\n  })\n  Rhum.testSuite("My Suite", () => {\n    // Here, `val` should be 1\n\n    Rhum.beforeEach(() => { // Defined inside a suite, so ran before each test case inside\n      val = 2\n    })\n\n    Rhum.testCase("My Case", () => {\n      // Here, `val` should be 2\n    })\n  })\n})',
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Creating After Hooks")]),
            s("p", [
              e._v(
                "An example of this, can be removing a test user in the database after each test case (if those test cases or before hooks create users)",
              ),
            ]),
            s("p", [e._v("Creating after hooks can be done as follows:")]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                'Rhum.testPlan("My Plan", () => {\n  let val = 0;\n  Rhum.afterAll(() => { // Defined inside the plan, so it will run after each suite\n    val = 1\n  })\n  Rhum.testSuite("My Suite", () => {\n    // Here, `val` should be 0\n\n    Rhum.afterEach(() => { // Defined inside a suite, so ran after each test case inside\n      val = 2\n    })\n\n    Rhum.testCase("My Case", () => {\n      // Here, `val` should be 0\n    })\n  })\n})',
              ),
            ]),
            s("notify", { attrs: { type: "tip" } }, [
              e._v(
                "All four types of hooks can be applied for any test suites or test cases.",
              ),
            ]),
          ], 1);
        };
        se._withStripped = !0;
        var ae = s(7426);
        const re = "Hooks",
          ne = { paths: ["/tutorials/hooks"], meta: { title: re } },
          oe = {
            components: {
              CodeBlock: C.Z,
              H2Hash: w.Z,
              Page: S.Z,
              Notify: ae.Z,
            },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                title: re,
                toc: [
                  "Before You Get Started",
                  "Creating Before Hooks",
                  "Creating After Hooks",
                ],
              };
            },
          };
        var ue = (0, v.Z)(oe, se, [], !1, null, null, null);
        ue.options.__file =
          "src/modules/rhum-v1.x/vue/pages/tutorials/hooks.vue";
        const ie = ue.exports;
        var le = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Before You Get Started")]),
            s("p", [e._v("Rhum defines mocks as follows:")]),
            s("ul", [s("li", [e._v("Mocks register calls they receive")])]),
            s("p", [
              e._v(
                "Unlike stubs, mocks help verify behavior. For example, you can mock an email service class and check to see if it is called in a test.",
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Creating A Mock")]),
            s("p", [e._v("Creating a mock can be done as follows:")]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                'class ToBeMocked { ... }\n\nconst mock = Rhum\n  .mock(ToBeMocked)\n  .withConstructorArgs("someArg") // if the class to be mocked has a constructor and it requires args\n  .create();',
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Checking Calls")]),
            s("p", [
              e._v(
                "Since mocks register calls they receive, you can check to see how many times a mocked object's methods were called by accessing its ",
              ),
              s("code", [e._v("calls")]),
              e._v(
                " property. Below is an example of checking if a math service's ",
              ),
              s("code", [e._v("add()")]),
              e._v(" method was called."),
            ]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                "class MathService {\n  add(num1: number, num2: number): number {\n    return num1 + num2;\n  }\n}\n\nclass MyObj {\n  protected service: MathService;\n  constructor(service: MathService) { ... }\n  add(num1: number, num2: number): number {\n    return this.service.add(num1, num2);\n  }\n}\n\nconst mock = Rhum.mock(MathService).create();\n\nconst myObj = new MyObj(mock);\n\n// Assert that the service's add() method was not called yet\nRhum.asserts.assertEquals(mock.calls.add, 0); // pass\n\n// Assert that the service's add() method was called once\nmyObj.add(1, 1);\nRhum.asserts.assertEquals(mock.calls.add, 1); // pass",
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Mock Constructor Arguments")]),
            s("p", [
              e._v(
                "Mocks can be created with constructor arguments as follows.",
              ),
            ]),
            s("code-block", {
              attrs: {
                header: !1,
                language: "typescript",
                line_highlight: "8",
              },
            }, [
              e._v(
                'class ToBeMocked {\n  constructor(arg1: string, arg2: number) { ... }\n}\n\n// Create a mock with the following constructor args\nconst mock = Rhum\n .mock(ToBeMocked)\n .withConstructorArgs("someStringArg", 1)\n .create();',
              ),
            ]),
          ], 1);
        };
        le._withStripped = !0;
        const he = "Mocks",
          ce = { paths: ["/tutorials/mocks"], meta: { title: he } },
          de = {
            components: { CodeBlock: C.Z, H2Hash: w.Z, Page: S.Z },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                title: he,
                toc: [
                  "Before You Get Started",
                  "Creating A Mock",
                  "Checking Calls",
                  "Mock Constructor Arguments",
                ],
              };
            },
          };
        var pe = (0, v.Z)(de, le, [], !1, null, null, null);
        pe.options.__file =
          "src/modules/rhum-v1.x/vue/pages/tutorials/mocks.vue";
        const me = pe.exports;
        var fe = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Before You Get Started")]),
            s("p", [e._v("Rhum defines stubs as follows:")]),
            s("ul", [
              s("li", [
                e._v("Stubs provide canned answers to calls made during tests"),
              ]),
              s("li", [
                e._v("Stubs do not respond to calls outside the test's scope"),
              ]),
            ]),
            s("p", [
              e._v(
                "Unlike mocks, stubs are used to help verify the state of the system being tested. For example, you can check to see if the system being tested is in a certain state when stubbing an object's property to a certain value.",
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Stubbing Properties")]),
            s("p", [
              e._v("Stubbing an object's properties can be done as follows:"),
            ]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                'class MyObject {\n  public some_property = "someValue";\n}\n\n// Define the object that will have stubbed members as a stubbed object\nconst myStubbedObject = Rhum.stubbed(new MyObject());\n\n// Stub the object\'s some_property property to a certain value\nmyStubbedObject.stub("some_property", "this property is now stubbed");\n\n// Assert that the property was stubbed\nRhum.asserts.assertEquals(myStubbedObject.some_property, "this property is now stubbed"); // pass',
              ),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Stubbing Methods")]),
            s("p", [
              e._v("Stubbing an object's methods can be done as follows:"),
            ]),
            s("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v(
                'class MyObject {\n  public someMethod(): string {\n     return "someValue";\n  }\n}\n\n// Define the object that will have stubbed members as a stubbed object\nconst myStubbedObject = Rhum.stubbed(new MyObject());\n\n// Stub the object\'s someMethod() method to return a certain value\nmyStubbedObject.stub("someMethod", () => { return "stubbed"; });\n\n// Assert that the method was stubbed\nRhum.asserts.assertEquals(myStubbedObject.someMethod(), "stubbed"); // pass',
              ),
            ]),
          ], 1);
        };
        fe._withStripped = !0;
        const _e = "Stubs",
          ve = { paths: ["/tutorials/stubs"], meta: { title: _e } },
          be = {
            components: { CodeBlock: C.Z, H2Hash: w.Z, Page: S.Z },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                title: _e,
                toc: [
                  "Before You Get Started",
                  "Stubbing Properties",
                  "Stubbing Methods",
                ],
              };
            },
          };
        var ge = (0, v.Z)(be, fe, [], !1, null, null, null);
        ge.options.__file =
          "src/modules/rhum-v1.x/vue/pages/tutorials/stubs.vue";
        const ye = ge.exports;
        var ke = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            s("h2-hash", [e._v("Before You Get Started")]),
            s("p", [e._v("There are three parts to a test file:")]),
            s("ul", [
              s("li", [e._v("the test plan;")]),
              s("li", [e._v("the test suites; and")]),
              s("li", [e._v("the test cases")]),
            ]),
            s("h3", [e._v("Test Plans")]),
            s("p", [
              e._v(
                "Test plans describe a set of test suites. A test plan usually has the same name as the test file (e.g., ",
              ),
              s("code", [e._v("mod_test.ts")]),
              e._v("). Test suites are defined inside test plans."),
            ]),
            s("h3", [e._v("Test Suites")]),
            s("p", [
              e._v(
                "Test suites describe a set of test cases. A test suite is usually named after a method or property being tested (e.g., ",
              ),
              s("code", [e._v("myMethod()")]),
              e._v("). Test cases are defined inside test suites."),
            ]),
            s("h3", [e._v("Test Cases")]),
            s("p", [
              e._v("Test cases contain the assertions. They are the tests."),
            ]),
            s("hr"),
            s("folder-structure-end-state", [
              s("code-block", { attrs: { header: !1, language: "text" } }, [
                e._v(
                  "▾ /path/to/your/project/\n    functions.ts\n    functions_test.ts",
                ),
              ]),
            ], 1),
            s("hr"),
            s("h2-hash", [e._v("Steps")]),
            s("ol", [
              s("li", [
                s("p", [e._v("Create your functions file.")]),
                s("code-block", {
                  attrs: {
                    title: "/path/to/your/project/functions.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    "/**\n * Add two numbers together.\n * @param numOne - The first number in the equation.\n * @param numTwo - The second number in the equation.\n * @returns The sum of the specified numbers.\n */\nexport function add(numOne: number, numTwo: number): number {\n  return numOne + numTwo;\n}",
                  ),
                ]),
              ], 1),
              s("li", [
                s("p", [e._v("Create your test file.")]),
                s("code-block", {
                  attrs: {
                    title: "/path/to/your/project/functions_test.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Rhum } from "https://deno.land/x/rhum@' +
                      e._s(e.$conf.rhum.latest_version) +
                      '/mod.ts";\nimport { add } from "./functions.ts";\n\n// Define the test plan\nRhum.testPlan("functions_test.ts", () => {\n\n  // Define the test suite\n  Rhum.testSuite("add()", () => {\n\n    // Define the test case\n    Rhum.testCase("should add two numbers together", () => {\n      const actual = add(2, 2);\n      Rhum.asserts.assertEquals(actual, 4);\n    });\n  });\n});\n\n// Run Rhum\nRhum.run();',
                  ),
                ]),
              ], 1),
            ]),
            s("hr"),
            s("h2-hash", [e._v("Verification")]),
            s("ol", [
              s("li", [
                s("p", [e._v("Run your tests.")]),
                s("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno test")]),
                s("p", [
                  e._v("You should see the output similar to the following:"),
                ]),
                s("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    "Compile file:///.deno.test.ts\nrunning 1 tests\n \nfunctions_test.ts\n    add()\n        should add two numbers together ... ok (3ms)\n \ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (3ms)",
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        ke._withStripped = !0;
        const Re = "Writing Tests",
          we = { paths: ["/tutorials/writing-tests"], meta: { title: Re } },
          Se = {
            components: { CodeBlock: C.Z, H2Hash: w.Z, Page: S.Z },
            data() {
              return {
                base_url: this.$conf.rhum.base_url + "/#",
                title: Re,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var Ce = (0, v.Z)(Se, ke, [], !1, null, null, null);
        Ce.options.__file =
          "src/modules/rhum-v1.x/vue/pages/tutorials/writing_tests.vue";
        const Me = Ce.exports;
        var xe = function () {
          var e = this, t = e.$createElement, s = e._self._c || t;
          return s(
            "page",
            { attrs: { base_url: e.base_url, title: e.title } },
            [
              s("h2-hash", [e._v("About The Tutorials")]),
              s("p", [
                e._v(
                  "The tutorials in the sidebar are ordered (from top to bottom) to help you understand Rhum quickly. Since all tutorials have example code of setting up tests, it is not required that you read the tutorials in order. However, it is greatly recommended.",
                ),
              ]),
            ],
            1,
          );
        };
        xe._withStripped = !0;
        const Te = "Tutorials: Introduction",
          Ae = {
            paths: ["/tutorials", "/tutorials/introduction"],
            meta: { title: Te },
          },
          Pe = {
            components: { H2Hash: w.Z, Page: S.Z },
            data() {
              return { base_url: this.$conf.rhum.base_url + "/#", title: Te };
            },
          };
        var Ee = (0, v.Z)(Pe, xe, [], !1, null, null, null);
        Ee.options.__file = "src/modules/rhum-v1.x/vue/pages/tutorials.vue";
        const Ze = Ee.exports;
        let je = [], He = {};
        [a, r, n, o, u, i, l, h, c].forEach((e) => {
          e.resource.meta && e.resource.meta.error_code
            ? He[e.resource.meta.error_code] = e.default
            : e.resource.paths.forEach((t) => {
              je.push({ path: t, component: e.default, meta: e.resource.meta });
            });
        }), je.push({ path: "*", component: He[404] });
        const $e = new k.Z({
          routes: je,
          scrollBehavior(e, t, s) {
            if (e.hash) return { selector: e.hash, offset: { x: 0, y: 10 } };
          },
        });
        $e.beforeEach((e, t, s) => {
          e.meta || (e.meta = { title: "404 (Not Found)" }),
            e.meta.title || (e.meta.title = "404 (Not Found)"),
            document.title = "Rhum - " + e.meta.title,
            s();
        }),
          $e.afterEach((e, t) => {
            window.scrollTo(0, 0);
          });
        const Oe = $e;
        d.prototype.$conf = window.drash_api_configs;
        const Be = new y();
        d.filter("markdown-it", function (e) {
          return Be.render(e);
        }),
          d.use(k.Z),
          window.app = new d({
            el: "#vue_app_mount",
            components: { VueAppRoot: g },
            router: Oe,
          });
      },
    },
    s = {};
  function a(e) {
    var r = s[e];
    if (void 0 !== r) return r.exports;
    var n = s[e] = { id: e, exports: {} };
    return t[e].call(n.exports, n, n.exports, a), n.exports;
  }
  a.m = t,
    e = [],
    a.O = (t, s, r, n) => {
      if (!s) {
        var o = 1 / 0;
        for (h = 0; h < e.length; h++) {
          for (var [s, r, n] = e[h], u = !0, i = 0; i < s.length; i++) {
            (!1 & n || o >= n) && Object.keys(a.O).every((e) => a.O[e](s[i]))
              ? s.splice(i--, 1)
              : (u = !1, n < o && (o = n));
          }
          if (u) {
            e.splice(h--, 1);
            var l = r();
            void 0 !== l && (t = l);
          }
        }
        return t;
      }
      n = n || 0;
      for (var h = e.length; h > 0 && e[h - 1][2] > n; h--) e[h] = e[h - 1];
      e[h] = [s, r, n];
    },
    a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    },
    a.d = (e, t) => {
      for (var s in t) {
        a.o(t, s) && !a.o(e, s) &&
          Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
      }
    },
    a.g = function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    }(),
    a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    a.r = (e) => {
      "undefined" != typeof Symbol && Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    },
    (() => {
      var e = { 184: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, s) => {
          var r, n, [o, u, i] = s, l = 0;
          for (r in u) a.o(u, r) && (a.m[r] = u[r]);
          if (i) var h = i(a);
          for (t && t(s); l < o.length; l++) {
            n = o[l], a.o(e, n) && e[n] && e[n][0](), e[o[l]] = 0;
          }
          return a.O(h);
        },
        s = self.webpackChunkwebsite = self.webpackChunkwebsite || [];
      s.forEach(t.bind(null, 0)), s.push = t.bind(null, s.push.bind(s));
    })();
  var r = a.O(void 0, [592], () => a(7078));
  r = a.O(r);
})();
