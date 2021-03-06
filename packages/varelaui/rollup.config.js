import path from "path";
import cssnao from "cssnano";
import json from "@rollup/plugin-json";
import autoprefixer from "autoprefixer";
import alias from "@rollup/plugin-alias";
import vuePlugin from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// 处理 apply 以及内置 mixin
import tailwindcss from "tailwindcss";
import postcssImport from "postcss-import";

const globals = {
  vue: "Vue",
  axios: "Axios",
  lodash: "_",
};
const terserPlugin = terser({
  output: {
    comments: false, // 移除注释
  },
  compress: {
    warnings: false,
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ["console.log"], //移除console
  },
});
export default {
  input: path.resolve(__dirname, "src/index.ts"),
  output: [
    {
      format: "umd", // umd格式
      file: path.resolve(__dirname, "./lib/index.js"), // 输出文件
      name: "varela-ui",
      exports: "named",
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
    },
    {
      format: "umd", // umd格式
      file: path.resolve(__dirname, "./lib/index.min.js"), // 输出文件
      name: "varela-ui",
      exports: "named",
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
      plugins: [terserPlugin],
    },
    {
      format: "esm", // esm格式
      file: path.resolve(__dirname, "./lib/index.esm.js"), // 输出文件
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
    },
    {
      format: "esm", // esm格式
      file: path.resolve(__dirname, "./lib/index.esm.min.js"), // 输出文件
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
      plugins: [terserPlugin],
    },
  ],
  plugins: [
    json(),
    // 配合 commnjs 解析第三方模块
    nodeResolve({
      mainFields: ["module", "jsnext:main", "main", "browser"],
      extensions: [".vue", ".ts", ".tsx", ".js"],
    }),
    typescript({
      abortOnError: false,
    }),
    alias({
      resolve: [".js", ".jsx", ".ts", ".tsx"],
      entries: {
        "@": path.resolve(__dirname, "./src"),
      },
    }),
    vuePlugin(),
    postcss({
      plugins: [autoprefixer, cssnao(), postcssImport(), tailwindcss()],
      extract: "css/index.min.css",
      extensions: [".scss", ".css", ".less"],
    }),
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs({
      include: ["node_modules/**/*"],
    }),
    babel({
      babelHelpers: "runtime",
      // 只转换源代码，不运行外部依赖
      exclude: "node_modules/**",
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
  ],
  external: ["vue", "axios", "lodash"],
};
