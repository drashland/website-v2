<script>
  import Prism from 'prismjs';

  // Styling  for the code blocks
  import "prismjs/themes/prism-tomorrow.css" // The css styling for our code blocks

  // Supported languages
  import "prismjs/components/prism-bash.min.js" // needed for highlighting commands for shell-session
  import "prismjs/components/prism-shell-session.min.js"
  import "prismjs/components/prism-typescript.min.js"
  import "prismjs/components/prism-docker.min.js"
  import "prismjs/components/prism-javascript.min.js"
  import "prismjs/components/prism-json.min.js"
  import "prismjs/components/prism-jsx.min.js"
  import "prismjs/components/prism-tsx.min.js"
  import "prismjs/components/prism-nginx.min.js"
  import "prismjs/components/prism-yaml.min.js"
  import "prismjs/components/prism-apacheconf.min.js"

  // General css
  import "prismjs/plugins/line-numbers/prism-line-numbers.css"

  // Support line highlights
  import "prismjs/plugins/line-highlight/prism-line-highlight.min.js"
  import "prismjs/plugins/line-highlight/prism-line-highlight.css"

  // Support clipboard
  import "prismjs/plugins/toolbar/prism-toolbar.css"
  import "prismjs/plugins/toolbar/prism-toolbar.min.js"

export default {
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    line_highlight: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
    },
    line_numbers: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$root.$on("is-mobile", () => {
      this.is_mobile = true;
    });
    this.$root.$on("is-not-mobile", () => {
      this.is_mobile = false;
    });
  },
  data() {
    return {
      is_mobile: false,
    };
  },
  mounted() {
    Prism.highlightAll();
  }
}
// For safari, highlighted lines of code appear buggy - the 'highlight' is slightly above the line of code eg not aligned.
// PrismJS seems to set a `top: xxpx` property on highlighted code. How you can do this is: inspect the whole code block elements and expand it, and scroll down to the bottom - whilst you may think the style would be applied in order, it isn't, and there are separate tags at the end of the main code block element that are used to style the highlighting.
// It seems that adding 5% of the existing `top` property on those elements fixes it for safari
window.addEventListener("DOMContentLoaded", () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes("safari") === false || ua.includes("chrome") === true) {
    return
  }
  const highlightedElems = document.querySelectorAll(".line-highlight")
  for (const elem of highlightedElems) {
    const top = elem.style.top
    const [size] = top.split("px")
    const newSize = Number(size) * (1 + 0.05) // + 5%
    elem.style.top = newSize + "px"
  }
})


/**
 * Taken from `mode_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js`,
 * so we can strip out the `$` signs from `shell-session` languages when copying.
 * Any changes made to the original file (when taken from the node_modules folder),
 * are mentioned below
 */

(function () {
  if (typeof self === "undefined" || !self.Prism || !self.document) {
    return;
  }

  if (!Prism.plugins.toolbar) {
    console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");

    return;
  }

  var ClipboardJS = window.ClipboardJS || undefined;

  if (!ClipboardJS && typeof require === "function") {
    ClipboardJS = require("clipboard");
  }

  var callbacks = [];

  if (!ClipboardJS) {
    var script = document.createElement("script");
    var head = document.querySelector("head");

    script.onload = function () {
      ClipboardJS = window.ClipboardJS;

      if (ClipboardJS) {
        while (callbacks.length) {
          callbacks.pop()();
        }
      }
    };

    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js";
    head.appendChild(script);
  }

  Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (env) {
    var linkCopy = document.createElement("button");
    linkCopy.textContent = "Copy";

    var element = env.element;

    if (!ClipboardJS) {
      callbacks.push(registerClipboard);
    } else {
      registerClipboard();
    }

    return linkCopy;

    function registerClipboard() {
      var clip = new ClipboardJS(linkCopy, {
        "text": function () {
          // START OF MODIFICATION TO ORIGINAL FILE
          if (element.className.indexOf("shell-session") > -1) {
            const lines = element.textContent.split("\n");
            const linesWithoutDollar = [];
            for (let line of lines) {
              if (line.indexOf("$") === 0) {
                line = line.slice(2);
              }
              linesWithoutDollar.push(line);
            }
            return linesWithoutDollar.join("\n");
          }
          // END OF MODIFICATION TO ORIGINAL FILE
          return element.textContent;
        },
      });

      clip.on("success", function () {
        linkCopy.textContent = "Copied!";

        resetText();
      });
      clip.on("error", function () {
        linkCopy.textContent = "Press Ctrl+C to copy";

        resetText();
      });
    }

    function resetText() {
      setTimeout(function () {
        linkCopy.textContent = "Copy";
      }, 5000);
    }
  });
})();
</script>

<style lang="scss" scoped>
[data-line] {
  padding: 1em;
}
.header {
  font-size: .85rem;
  border-radius: 1rem 1rem 0 0;
  background-color: #454545;
  color: #ffffff;
  padding: .5rem;
}
code.header {
  border-radius: 0;
  line-height: 1rem;
}
.body {
  font-size: .85rem;
  border-radius: 0 0 1rem 1rem;
  margin: 0;
}
.body.no-header {
  border-radius: 1rem;
}
.is-mobile {
  margin-left: -2rem;
  margin-right: -2rem;
}
</style>

<style lang="scss">
ul .code-block.is-mobile,
ol .code-block.is-mobile {
  margin-left: -4rem;
}
.line-highlight:after,
.line-highlight:before {
  display: none;
}
pre.header {
  white-space: normal;
  overflow-wrap: anywhere;
}
</style>

<template lang="pug">
div.code-block.mb-5(
  :class="{'is-mobile': is_mobile}"
)
  pre.header.mb-0.p-4(v-if="header !== false")
    code.header {{ title }}
  pre.body(
    :data-line="line_highlight"
    :class="{'no-header': header === false, 'line-numbers': line_numbers}"
    )
    code(:class="'language-' + language")
      slot
</template>
