(() => {
  "use strict";
  var e,
    t = {
      7900: (e, t, n) => {
        var a = {};
        n.r(a), n.d(a, { default: () => G, resource: () => E });
        var r = {};
        n.r(r), n.d(r, { default: () => V, resource: () => D });
        var s = {};
        n.r(s), n.d(s, { default: () => K, resource: () => U });
        var o = {};
        n.r(o), n.d(o, { default: () => ae, resource: () => ee });
        var l = {};
        n.r(l), n.d(l, { default: () => ce, resource: () => oe });
        var i = {};
        n.r(i), n.d(i, { default: () => ge, resource: () => pe });
        var c = {};
        n.r(c), n.d(c, { default: () => ye, resource: () => fe });
        var h = {};
        n.r(h), n.d(h, { default: () => Ae, resource: () => Te });
        var d = {};
        n.r(d), n.d(d, { default: () => Ee, resource: () => Pe });
        var u = {};
        n.r(u), n.d(u, { default: () => Ne, resource: () => Ge });
        var p = {};
        n.r(p), n.d(p, { default: () => Me, resource: () => Fe });
        var v = {};
        n.r(v), n.d(v, { default: () => ze, resource: () => Ke });
        var _ = {};
        n.r(_), n.d(_, { default: () => st, resource: () => nt });
        var g = {};
        n.r(g), n.d(g, { default: () => dt, resource: () => it });
        var m = n(9346),
          k = function () {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("app-root", {
              attrs: { sidebar: e.sidebar, module: "Wocket" },
            });
          };
        k._withStripped = !0;
        var f = n(8646), b = n(8165);
        const w = {
          components: { AppRoot: f.Z },
          data() {
            return {
              sidebar: {
                api_reference_href:
                  "https://doc.deno.land/https/deno.land/x/wocket@" +
                  this.$conf.wocket.latest_version + "/mod.ts",
                base_url: "/wocket/" + (0, b.b)(),
                github_href: "https://github.com/drashland/wocket",
                logo: "/assets/common/img/logo_wocket.svg",
                menus: {
                  "Getting Started": {
                    Quickstart: "/#quickstart",
                    Importing: "/#importing",
                    Features: "/#features",
                  },
                  Tutorials: {
                    Introduction: "/tutorials/introduction",
                    "Creating a Server": "/tutorials/creating-a-server",
                    "Opening Channels": "/tutorials/opening-channels",
                    "Closing Channels": "/tutorials/closing-channels",
                    "Adding Clients To Channels":
                      "/tutorials/adding-clients-to-channels",
                    "Removing Clients From Channels":
                      "/tutorials/removing-clients-from-channels",
                    "Sending to Specific Clients":
                      "/tutorials/sending-to-specific-clients",
                    "Reserved Event Names": "/tutorials/reserved-event-names",
                  },
                  "Advanced Tutorials": {
                    Introduction: "/advanced-tutorials/introduction",
                    "Creating A Chat App": {
                      Introduction:
                        "/advanced-tutorials/creating-a-chat-app/introduction",
                      "Part 1: Creating The Server":
                        "/advanced-tutorials/creating-a-chat-app/part-1",
                      "Part 2: Opening A Channel":
                        "/advanced-tutorials/creating-a-chat-app/part-2",
                      "Part 3: Creating The Front-End":
                        "/advanced-tutorials/creating-a-chat-app/part-3",
                    },
                  },
                },
                module: "wocket",
              },
            };
          },
        };
        var y = n(1900), C = (0, y.Z)(w, k, [], !1, null, null, null);
        C.options.__file = "src/modules/wocket-v0.x/vue/app.vue";
        const S = C.exports;
        n(4733);
        var T = n(5589),
          $ = n(5908),
          x = function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("page", {
              attrs: {
                base_url: e.base_url,
                subtitle: e.subtitle,
                title: e.title,
              },
            }, [
              n("breadcrumbs", {
                attrs: {
                  base_url: e.base_url + e.base_uri,
                  part: -1,
                  parts: 3,
                },
              }),
              n("hr"),
              n("h2-hash", [e._v("Overview")]),
              n("p", [
                e._v(
                  "In this tutorial series, you will learn how to create a simple chat app powered by Wocket. You will learn how to make a Wocket server handle packet messages between multiple clients.",
                ),
              ]),
              n("p", { staticClass: "mt-10 text-center" }, [
                n("a-get-started", {
                  attrs: { href: e.base_url + e.base_uri + "/part-1" },
                }),
              ], 1),
              n("hr"),
              n("h2-hash", [e._v("End State")]),
              n("p", [e._v("Below is an example of what you will create.")]),
              n("p", [
                n("img", {
                  attrs: {
                    src:
                      "/assets/wocket-v0.x/img/creating_a_chat_app/verification_1.png",
                  },
                }),
              ]),
              n("hr"),
              n("breadcrumbs", {
                attrs: {
                  base_url: e.base_url + e.base_uri,
                  part: -1,
                  parts: 3,
                },
              }),
            ], 1);
          };
        x._withStripped = !0;
        var A = n(8873), Z = n(9215), I = n(8674), P = n(7359), O = n(6107);
        const j = "Creating A Chat App",
          E = {
            paths: [
              "/advanced-tutorials/creating-a-chat-app",
              "/advanced-tutorials/creating-a-chat-app/introduction",
            ],
            meta: { title: j },
          },
          B = {
            components: {
              AGetStarted: O.Z,
              Breadcrumbs: P.Z,
              Page: Z.Z,
              H2Hash: A.Z,
            },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                base_uri: "/advanced-tutorials/creating-a-chat-app",
                title: j,
                subtitle: "Introduction",
              };
            },
          };
        var Y = (0, y.Z)(B, x, [], !1, null, null, null);
        Y.options.__file =
          "src/modules/wocket-v0.x/vue/pages/advanced_tutorials/creating_a_chat_app/introduction.vue";
        const G = Y.exports;
        var H = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              subtitle: e.subtitle,
              title: e.title,
            },
          }, [
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 1, parts: 3 },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "In this tutorial part, you will create a server and verify that it can respond.",
              ),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("ping")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("> ping")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< pong"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("pong")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("> pong")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< ping"),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("test")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("> test")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< Server started on 127.0.0.1:1777."),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send an "),
                  n("code", [e._v("id")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("> id")]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< Client ID: 4"),
                ]),
              ], 1),
            ]),
            n("div-alert-next-tutorial-part"),
            n("hr"),
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 1, parts: 3 },
            }),
          ], 1);
        };
        H._withStripped = !0;
        var R = n(1783);
        const N = "Creating A Chat App",
          D = {
            paths: ["/advanced-tutorials/creating-a-chat-app/part-1"],
            meta: { title: N },
          },
          W = {
            components: {
              Breadcrumbs: P.Z,
              CodeBlock: I.Z,
              DivAlertNextTutorialPart: R.Z,
              Page: Z.Z,
              H2Hash: A.Z,
            },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                base_uri: "/advanced-tutorials/creating-a-chat-app",
                title: N,
                subtitle: "Part 1: Creating The Server",
              };
            },
          };
        var F = (0, y.Z)(W, H, [], !1, null, null, null);
        F.options.__file =
          "src/modules/wocket-v0.x/vue/pages/advanced_tutorials/creating_a_chat_app/part_1.vue";
        const V = F.exports;
        var L = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              subtitle: e.subtitle,
              title: e.title,
            },
          }, [
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 2, parts: 3 },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "In this tutorial part, you will open the channel that will be used by clients.",
              ),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Import the "),
                  n("code", [e._v("Packet")]),
                  e._v(
                    " class, open the General channel, and add a packet handler for it (see the highlighted code).",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "1,16-23",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the General channel and add the General channel\'s packet handler\nserver.on("General", (packet: Packet) => {\n    // Send the incoming message to all clients in the General channel\n    server.to("General", packet.message);\n});',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to the General channel.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v('> {"connect_to":["General"]}')]),
              ], 1),
              n("li", [
                n("p", [e._v("Send a packet to the General channel.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v('> {"send_packet":{"to":"General","message":"test"}}'),
                ]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v('< {"from":"Server","to":"General","message":"test"}'),
                ]),
              ], 1),
              n("p", [e._v("You can now move on to the next tutorial part.")]),
            ]),
            n("div-alert-next-tutorial-part"),
            n("hr"),
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 2, parts: 3 },
            }),
          ], 1);
        };
        L._withStripped = !0;
        const M = "Creating A Chat App",
          U = {
            paths: ["/advanced-tutorials/creating-a-chat-app/part-2"],
            meta: { title: M },
          },
          J = {
            components: {
              Breadcrumbs: P.Z,
              CodeBlock: I.Z,
              DivAlertNextTutorialPart: R.Z,
              H2Hash: A.Z,
              Page: Z.Z,
            },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                base_uri: "/advanced-tutorials/creating-a-chat-app",
                title: M,
                subtitle: "Part 1: Opening A Channel",
              };
            },
          };
        var q = (0, y.Z)(J, L, [], !1, null, null, null);
        q.options.__file =
          "src/modules/wocket-v0.x/vue/pages/advanced_tutorials/creating_a_chat_app/part_2.vue";
        const K = q.exports;
        var Q = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: {
              base_url: e.base_url,
              subtitle: e.subtitle,
              title: e.title,
            },
          }, [
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 3, parts: 3 },
            }),
            n("hr"),
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "In this tutorial part, you will create the front-end of your application.",
              ),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [
                e._v(
                  "â–¾ /path/to/your/project/\n    app.ts\n    chat.js\n    index.html",
                ),
              ]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [
                  e._v("Create your "),
                  n("code", [e._v("index.html")]),
                  e._v(" file."),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/index.html",
                    language: "html",
                  },
                }, [e._v(e._s(e.index))]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Create your "),
                  n("code", [e._v("chat.js")]),
                  e._v(
                    " file. This file will contain the code that handles your client connections.",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/chat.js",
                    language: "javascript",
                  },
                }, [
                  e._v(
                    '// Create WebSocket connection.\nconst socket = new WebSocket("ws://127.0.0.1:1777");\n\n// Connection opened\nsocket.addEventListener("open", function (event) {\n  console.log("Connected!");\n  // Connect to the General channel\n  socket.send(JSON.stringify({\n    connect_to:["General"]\n  }));\n});\n\n// Listen for messages\nsocket.addEventListener("message", function (event) {\n  try {\n    addMessageToList(event);\n  } catch (error) {\n    console.log(event.data);\n  }\n});\n\n// When the "send message" button is clicked, execute the following.\ndocument.getElementById("send_message").addEventListener("click", () => {\n  socket.send(JSON.stringify({\n    send_packet: {\n      to: "General",\n      message: {\n        user_name: document.getElementById("user_name").value,\n        user_message: document.getElementById("user_message").value\n      }\n    }\n  }));\n});\n\n/**\n * Add a message to the messages list.\n * @param {Object} event\n */\nfunction addMessageToList(event) {\n  const parsedMessage = JSON.parse(event.data);\n  const messageString = `${parsedMessage.message.user_name}: ${parsedMessage.message.user_message}`;\n  const li = document.createElement("li");\n  li.className = "message";\n  li.appendChild(document.createTextNode(messageString));\n  document.getElementById("messages_list").appendChild(li);\n  // Scroll to the last message\n  document.getElementById("messages_container").scrollTop = document.getElementById("messages_container").scrollHeight;\n}',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Open up your "),
                  n("code", [e._v("index.html")]),
                  e._v(
                    " file in your browser. This browser window will be your first client. If you open your browser's console, you should see that you are connected to the server and connected to the General channel.",
                  ),
                ]),
              ]),
              n("li", [
                n("p", [
                  e._v("Open up your "),
                  n("code", [e._v("index.html")]),
                  e._v(
                    " file in another browser window. This browser window will be your second client.",
                  ),
                ]),
              ]),
              n("li", [
                n("p", [
                  e._v(
                    "Send messages between the two browser windows (aka clients).",
                  ),
                ]),
              ]),
            ]),
            n("div-alert-finished-tutorial-series"),
            n("hr"),
            n("breadcrumbs", {
              attrs: { base_url: e.base_url + e.base_uri, part: 3, parts: 3 },
            }),
          ], 1);
        };
        Q._withStripped = !0;
        var X = n(7886);
        const z = "Creating A Chat App",
          ee = {
            paths: ["/advanced-tutorials/creating-a-chat-app/part-3"],
            meta: { title: z },
          },
          te = {
            components: {
              Breadcrumbs: P.Z,
              CodeBlock: I.Z,
              DivAlertFinishedTutorialSeries: X.Z,
              H2Hash: A.Z,
              Page: Z.Z,
            },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                base_uri: "/advanced-tutorials/creating-a-chat-app",
                title: z,
                subtitle: "Part 1: Opening A Channel",
                index:
                  '<!DOCTYPE html>\n<html class="h-full w-full">\n  <head>\n    <title>Wocket</title>\n    <meta charset="utf-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">\n  </head>\n  <style>\n    body { font-family: "Courier New"; }\n    #messages_container { height: 350px; }\n    .message {\n      border-bottom: 1px solid #000000;\n      padding: 5px;\n    }\n  </style>\n  <body>\n    <div class="mx-auto border border-black mt-10 p-2" id="container" style="max-width: 500px">\n      <div class="font-bold bg-black text-white text-center p-3" id="banner">Wocket Chat</div>\n      <div class="overflow-x-auto" id="messages_container">\n        <ul id="messages_list"></ul>\n      </div>\n      <div class="flex">\n        <input class="w-1/2 border border-black p-2 mr-1" id="user_name" type="text" placeholder="user name" />\n        <input class="w-1/2 border border-black p-2" id="user_message" type="text" placeholder="message" />\n      </div>\n      <button class="p-2 text-white bg-black w-full mt-1" id="send_message">send message</button>\n    </body>\n    <script src="chat.js"><\/script>\n</html>',
              };
            },
          };
        var ne = (0, y.Z)(te, Q, [], !1, null, null, null);
        ne.options.__file =
          "src/modules/wocket-v0.x/vue/pages/advanced_tutorials/creating_a_chat_app/part_3.vue";
        const ae = ne.exports;
        var re = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("About The Advanced Tutorials")]),
            n("p", [
              e._v(
                "The advanced tutorials assume you have read through the all of the tutorials in the Tutorials section. Understanding the tutorials in the Tutorials section is crucial to understanding all the moving parts in the advanced tutorials. Please make sure you meet this prerequisite before moving on to an advanced tutorial.",
              ),
            ]),
            n("p", [
              e._v(
                "All advanced tutorials come as a series of tutorial parts. The parts are ordered in a way to help you build towards the tutorial's end state from scratch. In each part, you will see a Folder Structure End State section. That section shows you what your project's folder structure should look like by the time you finish the part you are on. In addition, there will be a Verification section (the last section of each part) to help you match your end state to the tutorial's end state.",
              ),
            ]),
          ], 1);
        };
        re._withStripped = !0;
        const se = "Advanced Tutorials: Introduction",
          oe = {
            paths: ["/advanced-tutorials", "/advanced-tutorials/introduction"],
            meta: { title: se },
          },
          le = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url,
                title: se,
                toc: ["About The Advanced Tutorials"],
              };
            },
          };
        var ie = (0, y.Z)(le, re, [], !1, null, null, null);
        ie.options.__file =
          "src/modules/wocket-v0.x/vue/pages/advanced_tutorials/introduction.vue";
        const ce = ie.exports;
        var he = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("div", [
            n("introduction-header", {
              attrs: {
                heading: "Wocket",
                description: "Wocket is a WebSocket library for Deno",
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
                      "Create your server and allow it to handle a single channel named Channel 1.",
                    ),
                  ]),
                  n("code-block", {
                    attrs: {
                      title: "/path/to/your/project/app.ts",
                      language: "typescript",
                    },
                  }, [
                    e._v(
                      'import { Server } from "https://deno.land/x/wocket@' +
                        e._s(e.$conf.wocket.latest_version) +
                        '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);',
                    ),
                  ]),
                ], 1),
                n("li", [
                  n("p", [e._v("Run your server.")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("$ deno run --allow-net app.ts")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("Server started on ws://127.0.0.1:1777")]),
                ], 1),
                n("li", [
                  e._m(1),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("$ npm install -g wscat")]),
                ], 1),
                n("li", [
                  n("p", [e._v("Connect to your server.")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
                ], 1),
                n("li", [
                  n("p", [e._v("Ping your server.")]),
                  n("code-block", {
                    attrs: { title: "Terminal", language: "shell-session" },
                  }, [e._v("> ping\n\n< pong")]),
                ], 1),
              ]),
              n("hr"),
              n("h2-hash", [e._v("Importing")]),
              n("code-block-import", {
                attrs: {
                  name: "Server",
                  repo: "wocket",
                  version: e.$conf.wocket.latest_version,
                },
              }),
              n("hr"),
              n("h2-hash", [e._v("Features")]),
              e._m(2),
            ], 1),
          ], 1);
        };
        he._withStripped = !0;
        var de = n(7518), ue = n(3927);
        const pe = {
            paths: ["/", "/introduction"],
            meta: { title: "Introduction" },
          },
          ve = {
            components: {
              H2Hash: A.Z,
              CodeBlock: I.Z,
              CodeBlockImport: de.Z,
              IntroductionHeader: ue.Z,
            },
            data: () => ({}),
          };
        var _e = (0, y.Z)(
          ve,
          he,
          [function () {
            var e = this.$createElement, t = this._self._c || e;
            return t("div", { staticClass: "flex mb-5" }, [
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/wocket/releases",
                  target: "_BLANK",
                },
              }, [t("img", {
                staticClass: "mr-1",
                attrs: {
                  alt: "Latest Wocket Release",
                  src:
                    "https://img.shields.io/github/release/drashland/wocket.svg?color=brightgreen&label=Latest",
                  width: "auto",
                  height: "20",
                },
              })]),
              t("a", {
                attrs: {
                  href: "https://github.com/drashland/wocket/actions",
                  target: "_BLANK",
                },
              }, [
                t("img", {
                  staticClass: "mr-1",
                  attrs: {
                    alt: "Wocket CI",
                    src:
                      "https://img.shields.io/github/workflow/status/drashland/wocket/master?label=CI",
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
              e._v("Install "),
              n("code", [e._v("wscat")]),
              e._v(" or similar client to interact with your server."),
            ]);
          }, function () {
            var e = this, t = e.$createElement, n = e._self._c || t;
            return n("ul", [
              n("li", [n("p", [e._v("JSON encoding")])]),
              n("li", [n("p", [e._v("Zero 3rd party dependencies")])]),
            ]);
          }],
          !1,
          null,
          null,
          null,
        );
        _e.options.__file =
          "src/modules/wocket-v0.x/vue/pages/getting_started.vue";
        const ge = _e.exports;
        var me = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "Adding clients to channels can be done using the following call:",
              ),
            ]),
            n("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v('server.addClientToChannel("Channel Name", clientId);'),
            ]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("create a server;")]),
              n("li", [
                e._v(
                  "Open two channels and have one client call the server to tell it to add the other client to a channel.",
                ),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Add a packet handler to the Actions channel (see the highlighted code).",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "21-40",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the Channel 1 channel so that it can be closed via the Actions channel\nserver.on("Channel 1", (packet: Packet) => {});\n\n// Open the Actions channel and add a handler for packets sent to the Actions channel. This handler will be\n// executed every time a packet is sent to the Actions channel. In this\n// handler, we are parsing the packet and taking an action based on the\n// specified message.\nserver.on("Actions", (packet: Packet) => {\n  const message = packet.message as {[k: string]: string};\n  if (message.action && message.channel) {\n    try {\n      if (message.action == "add_client_to_channel") {\n        server.addClientToChannel(message.channel, parseInt(message.client_id));\n        server.to(\n          "Actions",\n          `Client #${message.client_id} was added to the ${message.channel} channel.`\n        );\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  }\n});',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect the first client to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Connect the second client to your server and get its ID.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> id")]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("< Client ID: 5")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Using the first client, connect to the Actions channel.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v('> {"connect_to":["Actions"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v("> Connected to Actions.")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Using the first client, send a packet to the Actions channel to add the second client to Channel 1. Make sure you use the correct client ID!",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [
                  e._v(
                    '> {"send_packet":{"to":"Actions","message":{"action":"add_client_to_channel","client_id":"5","channel":"Channel 1"}}}',
                  ),
                ]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v(
                    '< {"from":"Server","to":"Actions","message":"Client #5 was added to the Channel 1 channel."}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Using the second client, disconnect from Channel 1."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v('> {"disconnect_from":["Channel 1"]}')]),
                n("p", [
                  e._v(
                    "If the second client was connected, you should receive the following response:",
                  ),
                ]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< Disconnected from Channel 1."),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        me._withStripped = !0;
        const ke = "Add Clients To Channels",
          fe = {
            paths: ["/tutorials/adding-clients-to-channels"],
            meta: { title: ke },
          },
          be = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: ke,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var we = (0, y.Z)(be, me, [], !1, null, null, null);
        we.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/adding_clients_to_channels.vue";
        const ye = we.exports;
        var Ce = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v("Closing channels can be done using the following call:"),
            ]),
            n("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v('server.closeChannel("Channel Name");'),
            ]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("create a server;")]),
              n("li", [e._v("open two channels;")]),
              n("li", [e._v("open one client connection; and")]),
              n("li", [
                e._v(
                  "have the client call the server to tell it to close one of the channels.",
                ),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Open 2 channels and add a packet handler to the Actions channel (see the highlighted code).",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "21-37",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the Channel 1 channel so that it can be closed via the Actions channel\nserver.on("Channel 1", (packet:  Packet) => {});\n\n// Open the Actions channel and add a handler for packets sent to the Actions channel. This handler will be\n// executed every time a packet is sent to the Actions channel. In this\n// handler, we are parsing the message and taking an action based on the\n// specified message.\nserver.on("Actions", (packet: Packet) => {\n  const message = packet.message as {[k: string]: string};\n  if (message.action && message.channel) {\n    try {\n      if (message.action == "close_channel") {\n        server.closeChannel(message.channel);\n        server.to("Actions", `${message.channel} closed.`);\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  }\n});',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to Channel 1.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v('> {"connect_to":["Actions", "Channel 1"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v("< Connected to Actions.\n< Connected to Channel 1."),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Send a packet to the Actions channel to close Channel 1.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [
                  e._v(
                    '> {"send_packet":{"to":"Actions","message":{"action":"close_channel","channel":"Channel 1"}}}',
                  ),
                ]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v(
                    '< {"from":"Server","to":"Actions","message":"Channel 1 closed."}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Try disconnecting from Channel 1. The channel should not be found since it was closed.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "text" },
                }, [e._v('> {"disconnect_from":["Channel 1"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", { attrs: { header: !1, language: "text" } }, [
                  e._v('< Channel "Channel 1" not found.'),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        Ce._withStripped = !0;
        const Se = "Closing Channels",
          Te = { paths: ["/tutorials/closing-channels"], meta: { title: Se } },
          $e = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: Se,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var xe = (0, y.Z)($e, Ce, [], !1, null, null, null);
        xe.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/closing_channels.vue";
        const Ae = xe.exports;
        var Ze = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "In this tutorial, you will create a very basic server that can handle ",
              ),
              n("code", [e._v("ping")]),
              e._v(", "),
              n("code", [e._v("pong")]),
              e._v(", and "),
              n("code", [e._v("test")]),
              e._v(" packets."),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n// Or use startTLS for SSL support\n// server.runTLS({\n//   hostname: "127.0.0.1",\n//   port: 1777,\n//   certFile: "path/to/cert.crt",\n//   keyFile: "path/to/key.key"\n// })\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("ping")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> ping")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< pong")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("pong")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> pong")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< ping")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send a "),
                  n("code", [e._v("test")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> test")]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< Server started on 127.0.0.1:1777.")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Send an "),
                  n("code", [e._v("id")]),
                  e._v(" packet."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> id")]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< Client ID: 4")]),
              ], 1),
            ]),
          ], 1);
        };
        Ze._withStripped = !0;
        const Ie = "Creating A Server",
          Pe = { paths: ["/tutorials/creating-a-server"], meta: { title: Ie } },
          Oe = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: Ie,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var je = (0, y.Z)(Oe, Ze, [], !1, null, null, null);
        je.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/creating_a_server.vue";
        const Ee = je.exports;
        var Be = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("About The Tutorials")]),
            n("p", [
              e._v(
                "The tutorials in the sidebar are ordered (from top to bottom) in a way that will help you understand Wocket quickly â€” from creating a server to interacting with it. Since all tutorials have example code of setting up and starting a server, it is not required that you read the tutorials in order. However, it is greatly recommended.",
              ),
            ]),
            n("hr"),
            n("h2-hash", [e._v("wscat")]),
            n("p", [
              e._v(
                "All tutorials have a Verification section where you will interact with a server. The Verification section requires that you install ",
              ),
              n("code", [e._v("wscat")]),
              e._v(" globally. To install "),
              n("code", [e._v("wscat")]),
              e._v(", run the following command:"),
            ]),
            n("code-block", {
              attrs: { title: "Terminal", language: "shell-session" },
            }, [e._v("$ npm install -g wscat")]),
            n("p", [
              e._v("Once you have installed "),
              n("code", [e._v("wscat")]),
              e._v(", you can use it through the command line via "),
              n("code", [e._v("wscat")]),
              e._v(" command."),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Definitions")]),
            n("ul", [
              n("li", [
                n("p", [n("strong", [e._v("Channel")])]),
                n("p", [
                  e._v(
                    'A channel is the same thing as a room or an event. In Wocket, we use the term "channel", so please keep that in mind.',
                  ),
                ]),
              ]),
              n("li", [
                n("p", [n("strong", [e._v("Packet")])]),
                n("p", [
                  e._v(
                    "A packet is an object containing a sender, a receiver, and a message. It is an advanced form of a message. In Wocket, we use the term packets to describe the data that is being sent and received. A packet has the following fields:",
                  ),
                ]),
                n("ul", [
                  n("li", [
                    n("p", [n("strong", [n("code", [e._v("from")])])]),
                    n("p", [
                      e._v(
                        "The entity sending the packet. This entity can be a client or the server.",
                      ),
                    ]),
                  ]),
                  n("li", [
                    n("p", [n("strong", [n("code", [e._v("to")])])]),
                    n("p", [
                      e._v(
                        "The entity receiving the packet. This entity can be a client or a channel.",
                      ),
                    ]),
                  ]),
                  n("li", [
                    n("p", [n("strong", [n("code", [e._v("message")])])]),
                    n("p", [
                      e._v(
                        "The packet's message. This can be anything (e.g., a string, a number, binary data, or even a JSON object).",
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Sending Packets")]),
            n("p", [
              e._v(
                "At times, you will be sending certain packets to a server using ",
              ),
              n("code", [e._v("wscat")]),
              e._v(
                ". There are multiple packets that a Wocket server listens to. On receipt of one of the packets below, it will respond as stated below.",
              ),
            ]),
            n("ul", [
              n("li", [
                n("p", [n("strong", [n("code", [e._v("ping")])])]),
                n("p", [
                  e._v(
                    "Sending a ping packet will result in a pong packet from the server. The packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("> ping")]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("pong")])])]),
                n("p", [
                  e._v(
                    "Sending a pong packet will result in a ping packet from the server. This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("> pong")]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("test")])])]),
                n("p", [
                  e._v(
                    "Sending a test packet will result in the server responding with its address information (e.g., Server started on 127.0.0.1:1777.). This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("> test")]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("id")])])]),
                n("p", [
                  e._v(
                    "Sending an id packet will result in the server responding with the client's ID (e.g., Client ID: 5.). This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("> id")]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("connect_to")])])]),
                n("p", [
                  e._v(
                    "This packet allows you to connect to channels. This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v(
                    '> { "connect_to": ["channel name", "another channel", "some other channel"] }',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("disconnect_from")])])]),
                n("p", [
                  e._v(
                    "This packet allows you to disconnect from channels. This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v(
                    '> { "disconnect_from": ["channel name", "another channel", "some other channel"] }',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [n("strong", [n("code", [e._v("send_packet")])])]),
                n("p", [
                  e._v(
                    "This packet is used to send more complex packets. The server will respond based on a specified packet handler. You will learn more about the packet handlers in the tutorials. This packet is written as follows:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v(
                    '> { "send_packet": { "to": "channel name", "message": "some message" } }',
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        Be._withStripped = !0;
        const Ye = "Tutorials: Introduction",
          Ge = {
            paths: ["/tutorials", "/tutorials/introduction"],
            meta: { title: Ye },
          },
          He = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: Ye,
                toc: [
                  "About The Tutorials",
                  "wscat",
                  "Definitions",
                  "Sending Packets",
                ],
              };
            },
          };
        var Re = (0, y.Z)(He, Be, [], !1, null, null, null);
        Re.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/introduction.vue";
        const Ne = Re.exports;
        var De = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v("Opening channels can be done using the following call:"),
            ]),
            n("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v('server.on("Channel Name", (packet: Packet) => {});'),
            ]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("create a server;")]),
              n("li", [e._v("open one channel; and")]),
              n("li", [e._v("add a packet handler to that channel.")]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Add a packet handler to Channel 1 (see the highlighted code).",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "19-31",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the Channel 1 channel and add a handler for packets sent to Channel 1. This handler will be executed\n// every time a packet is sent to Channel 1. In this handler, we are just\n// confirming receipt of the message and sending the message to Channel 1. Any\n// client connected to Channel 1 will receive the message. In this tutorial,\n// your client will be connected to Channel 1 and will receive the message\n// below.\nserver.on("Channel 1", (packet: Packet) => {\n  console.log(packet);\n  server.to(\n    "Channel 1",\n    `Message received from client #${packet.from}: ${packet.message}`,\n  );\n});',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect to Channel 1.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v('> {"connect_to":["Channel 1"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< Connected to Channel 1.")]),
              ], 1),
              n("li", [
                n("p", [e._v("Send a packet to Channel 1.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    '> {"send_packet":{"to":"Channel 1","message":"Hello World!"}}',
                  ),
                ]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v(
                    '< {"from":"Server","to":"Channel 1","message":"Message received from client #4: Hello World!"}',
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        De._withStripped = !0;
        const We = "Opening Channels",
          Fe = { paths: ["/tutorials/opening-channels"], meta: { title: We } },
          Ve = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: We,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var Le = (0, y.Z)(Ve, De, [], !1, null, null, null);
        Le.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/opening_channels.vue";
        const Me = Le.exports;
        var Ue = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "Removing clients from channels can be done using the following call:",
              ),
            ]),
            n("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v('server.removeClientFromChannel("Channel Name", clientId);'),
            ]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("create a server;")]),
              n("li", [e._v("open two client connections; and")]),
              n("li", [
                e._v(
                  "have one client call the server to tell it to remove the other client from a channel.",
                ),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Add a packet handler to the Actions channel (see the highlighted code).",
                  ),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "21-40",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the "Channel 1" channel\nserver.on("Channel 1", (packet: Packet) => {})\n\n// Open the "Actions" channel and add a handler for packets sent to the Actions channel. This handler will be\n// executed every time a packet is sent to the Actions channel. In this\n// handler, we are parsing the message and taking an action based on the\n// specified message.\nserver.on("Actions", (packet: Packet) => {\n  const message = packet.message as {[k: string]: string};\n  if (message.action && message.channel) {\n    try {\n      if (message.action == "remove_client_from_channel") {\n        server.removeClientFromChannel(message.channel, parseInt(message.client_id));\n        server.to(\n          "Actions",\n          `Client #${message.client_id} was removed from the ${message.channel} channel.`\n        );\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  }\n});',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [e._v("Connect the first client to your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Connect the second client to your server and get its ID.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ wscat -c ws://127.0.0.1:1777")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> id")]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("< Client ID: 5")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Using the second client, connect to Channel 1."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v('> {"connect_to":["Channel 1"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("< Connected to Channel 1.")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Using the first client, connect to the Actions channel.",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v('> {"connect_to":["Actions"]}')]),
                n("p", [e._v("You should receive the following response:")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("> Connected to Actions.")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v(
                    "Using the first client, send a packet to the Actions channel to remove the second client from Channel 1. Make sure you use the correct client ID!",
                  ),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    '> {"send_packet":{"to":"Actions","message":{"action":"remove_client_from_channel","client_id":"5","channel":"Channel 1"}}}',
                  ),
                ]),
                n("p", [
                  e._v(
                    "You should receive a response similar to the following:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [
                  e._v(
                    '< {"from":"Server","to":"Actions","message":"Client #5 was removed from the Channel 1 channel."}',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Using the second client, disconnect from Channel 1."),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v('> {"disconnect_from":["Channel 1"]}')]),
                n("p", [
                  e._v(
                    "If the second client was removed, you should receive the following response:",
                  ),
                ]),
                n("code-block", {
                  attrs: { header: !1, language: "shell-session" },
                }, [e._v("< Not connected to Channel 1.")]),
              ], 1),
            ]),
          ], 1);
        };
        Ue._withStripped = !0;
        var Je = n(8060);
        const qe = "Removing Clients From Channels",
          Ke = {
            paths: ["/tutorials/removing-clients-from-channels"],
            meta: { title: qe },
          },
          Qe = {
            components: {
              CodeBlock: I.Z,
              H2Hash: A.Z,
              Page: Z.Z,
              FolderStructureEndState: Je.Z,
            },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: qe,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var Xe = (0, y.Z)(Qe, Ue, [], !1, null, null, null);
        Xe.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/removing_clients_from_channels.vue";
        const ze = Xe.exports;
        var et = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [e._v("The following list of reserved event names are:")]),
            n("ul", [
              n("li", [
                n("code", [e._v("connect")]),
                e._v(
                  " - Can be listened on, fires when a client connects to your Wocket server",
                ),
              ]),
              n("li", [
                n("code", [e._v("disconnect")]),
                e._v(
                  " - Can be listened on, fires when a client disconnects from your Wocket server",
                ),
              ]),
            ]),
            n("p", [e._v("These events are handled internally by Wocket.")]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("create a server;")]),
              n("li", [
                e._v("Listen on the "),
                n("code", [e._v("connect")]),
                e._v(" and "),
                n("code", [e._v("disconnect")]),
                e._v(" event names"),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nawait server.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("Create your listeners for the reserved event names."),
                ]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "16-25",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nawait server.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Channel is already open, but we can create a listener\nserver.on("connect", (packet: Packet) => {\n  console.log("A client connected");\n  // Do something here...\n});\n// Channel is already open, but we can create a listener\nserver.on("disconnect", (packet: Packet) => {\n  console.log("A client disconnected");\n  // Do something here...\n});',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Create a client.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "26-29",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n// Create the server\nconst server = new Server();\n\n// Run the server\nawait server.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Channel is already open, but we can create a listener\nserver.on("connect", (packet: Packet) => {\n  console.log("A client connected");\n  // Do something here...\n});\n// Channel is already open, but we can create a listener\nserver.on("disconnect", (packet: Packet) => {\n  console.log("A client disconnected");\n  // Do something here...\n});\n\nconst client = new WebSocket(`ws://${server.hostname}:${server.port}`);\nclient.onopen = function () {\n  client.close()\n}',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("The output in your shell should look like this:"),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    "Server started on ws://127.0.0.1:1777\nA client connected\nA client disconnected",
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        et._withStripped = !0;
        const tt = "Reserved Event Names",
          nt = {
            paths: ["/tutorials/reserved-event-names"],
            meta: { title: tt },
          },
          at = {
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: tt,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var rt = (0, y.Z)(at, et, [], !1, null, null, null);
        rt.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/reserved_event_names.vue";
        const st = rt.exports;
        var ot = function () {
          var e = this, t = e.$createElement, n = e._self._c || t;
          return n("page", {
            attrs: { base_url: e.base_url, title: e.title, toc: e.toc },
          }, [
            n("h2-hash", [e._v("Before You Get Started")]),
            n("p", [
              e._v(
                "Sending packets to specific clients can be done using the following call:",
              ),
            ]),
            n("code-block", { attrs: { header: !1, language: "typescript" } }, [
              e._v('server.to("the channel", "hello from server", id);'),
            ]),
            n("p", [e._v("In this tutorial, you will:")]),
            n("ul", [
              n("li", [e._v("Create your server.")]),
              n("li", [
                e._v(
                  "Create two clients and send a packet from one client to the other.",
                ),
              ]),
            ]),
            n("hr"),
            n("folder-structure-end-state", [
              n("code-block", {
                attrs: { header: !1, language: "text", line_numbers: !1 },
              }, [e._v("â–¾ /path/to/your/project/\n    app.ts")]),
            ], 1),
            n("hr"),
            n("h2-hash", [e._v("Steps")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Create your server.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                  },
                }, [
                  e._v(
                    'import { Packet, Server } from "https://deno.land/x/wocket@' +
                      e._s(e.$conf.wocket.latest_version) +
                      '/mod.ts";\n\n// Create the server\nconst server = new Server();\n\n// Run the server\nserver.run({\n  hostname: "127.0.0.1",\n  port: 1777,\n});\n\nconsole.log(\n  `Server started on ws://${server.hostname}:${server.port}`,\n);\n\n// Open the channel\nserver.on("chat", (packet: Packet) => {\n  const id = Number(packet.message)\n  server.to("chat", `Hello from ${packet.from.id}`, id);\n})',
                  ),
                ]),
              ], 1),
              n("li", [
                n("p", [e._v("Create the two clients.")]),
                n("code-block", {
                  attrs: {
                    title: "/path/to/your/project/app.ts",
                    language: "typescript",
                    line_highlight: "6-30",
                  },
                }, [
                  e._v(
                    'server.on("chat", (packet: Packet) => {\n  const id = Number(packet.message)\n  server.to("chat", `Hello from ${packet.from.id}`, id);\n})\n\nconst clientOne = new WebSocket(`ws://${server.hostname}:${server.port}`);\nconst clientTwo = new WebSocket(`ws://${server.hostname}:${server.port}`);\n\nclientOne.onopen = function () {\n  clientOne.send(JSON.stringify({\n    connect_to: ["chat"]\n  }));\n};\n\nclientTwo.onopen = function () {\n  clientTwo.send(JSON.stringify({\n    connect_to: ["chat"]\n  }));\n  clientTwo.send(JSON.stringify({\n    send_packet: {\n      to: "chat",\n      message: 4\n    }\n  }))\n};\n\nclientOne.onmessage = function (message) {\n  console.log(\'Client one got message!\');\n  console.log(message.data);\n};',
                  ),
                ]),
              ], 1),
            ]),
            n("hr"),
            n("h2-hash", [e._v("Verification")]),
            n("ol", [
              n("li", [
                n("p", [e._v("Run your server.")]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [e._v("$ deno run --allow-net app.ts")]),
              ], 1),
              n("li", [
                n("p", [
                  e._v("You should see the following in your terminal:"),
                ]),
                n("code-block", {
                  attrs: { title: "Terminal", language: "shell-session" },
                }, [
                  e._v(
                    'Server started on ws://127.0.0.1:1777\nClient one got message!\n{"from":"Server","to":"chat","message":"Hello from 5"}',
                  ),
                ]),
              ], 1),
            ]),
          ], 1);
        };
        ot._withStripped = !0;
        const lt = "Sending to Specific Clients",
          it = {
            paths: ["/tutorials/sending-to-specific-clients"],
            meta: { title: lt },
          },
          ct = {
            components: { CodeBlock: I.Z, H2Hash: A.Z, Page: Z.Z },
            data() {
              return {
                base_url: this.$conf.wocket.base_url + "/#",
                title: lt,
                toc: [
                  "Before You Get Started",
                  "Folder Structure End State",
                  "Steps",
                  "Verification",
                ],
              };
            },
          };
        var ht = (0, y.Z)(ct, ot, [], !1, null, null, null);
        ht.options.__file =
          "src/modules/wocket-v0.x/vue/pages/tutorials/sending_to_specific_clients.vue";
        const dt = ht.exports;
        let ut = [], pt = {};
        [a, r, s, o, l, i, c, h, d, u, p, v, _, g].forEach((e) => {
          e.resource.meta && e.resource.meta.error_code
            ? pt[e.resource.meta.error_code] = e.default
            : e.resource.paths.forEach((t) => {
              ut.push({ path: t, component: e.default, meta: e.resource.meta });
            });
        }), ut.push({ path: "*", component: pt[404] });
        const vt = new $.Z({
          routes: ut,
          scrollBehavior(e, t, n) {
            if (e.hash) return { selector: e.hash, offset: { x: 0, y: 10 } };
          },
        });
        vt.beforeEach((e, t, n) => {
          e.meta || (e.meta = { title: "404 (Not Found)" }),
            e.meta.title || (e.meta.title = "404 (Not Found)"),
            document.title = "Wocket - " + e.meta.title,
            n();
        }),
          vt.afterEach((e, t) => {
            window.scrollTo(0, 0);
          });
        const _t = vt;
        m.prototype.$conf = window.drash_api_configs;
        const gt = new T();
        m.filter("markdown-it", function (e) {
          return gt.render(e);
        }),
          m.use($.Z),
          window.app = new m({
            el: "#vue_app_mount",
            components: { VueAppRoot: S },
            router: _t,
          });
      },
    },
    n = {};
  function a(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var s = n[e] = { id: e, exports: {} };
    return t[e].call(s.exports, s, s.exports, a), s.exports;
  }
  a.m = t,
    e = [],
    a.O = (t, n, r, s) => {
      if (!n) {
        var o = 1 / 0;
        for (h = 0; h < e.length; h++) {
          for (var [n, r, s] = e[h], l = !0, i = 0; i < n.length; i++) {
            (!1 & s || o >= s) && Object.keys(a.O).every((e) => a.O[e](n[i]))
              ? n.splice(i--, 1)
              : (l = !1, s < o && (o = s));
          }
          if (l) {
            e.splice(h--, 1);
            var c = r();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      s = s || 0;
      for (var h = e.length; h > 0 && e[h - 1][2] > s; h--) e[h] = e[h - 1];
      e[h] = [n, r, s];
    },
    a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    },
    a.d = (e, t) => {
      for (var n in t) {
        a.o(t, n) && !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
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
      var e = { 462: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var r, s, [o, l, i] = n, c = 0;
          for (r in l) a.o(l, r) && (a.m[r] = l[r]);
          if (i) var h = i(a);
          for (t && t(n); c < o.length; c++) {
            s = o[c], a.o(e, s) && e[s] && e[s][0](), e[o[c]] = 0;
          }
          return a.O(h);
        },
        n = self.webpackChunkwebsite = self.webpackChunkwebsite || [];
      n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n));
    })();
  var r = a.O(void 0, [592], () => a(7900));
  r = a.O(r);
})();
