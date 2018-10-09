import fs from "fs";
import path from "path";
import { minify } from "uglify-js";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import saveLicense from "uglify-save-license";
import stripBanner from "rollup-plugin-strip-banner";
import resolve from "rollup-plugin-node-resolve";

const copyright = fs.readFileSync(path.join("resources", "COPYRIGHT"), "utf-8");

const SRC_DIR = path.resolve("src");
const DIST_DIR = path.resolve("dist");

export default {
  input: path.join(SRC_DIR, "saga-monitor.js"),
  output: {
    name: "Sagamonitor",
    banner: copyright,
    exports: "named",
    file: path.join(DIST_DIR, "saga-monitor.js"),
    format: "umd"
  },
  plugins: [
    json(),
    stripBanner(),
    babel({
      exclude: "**/node_modules/**",
      babelrc: false
    }),
    resolve(),
    commonjs(),
    {
      name: "uglify",
      transformBundle(code) {
        const result = minify(code, {
          fromString: true,
          mangle: { toplevel: true },
          output: { max_line_len: 2048, comments: saveLicense },
          compress: { comparisons: true, pure_getters: true, unsafe: true }
        });

        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }

        fs.writeFileSync(path.join(DIST_DIR, "saga-monitor.min.js"), result.code, "utf8");
      }
    }
  ]
};
