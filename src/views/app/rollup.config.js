/*
 * @Author: 季晓东
 * @Date: 2021-08-10 20:15:17
 * @LastEditors: 季晓东
 * @LastEditTime: 2021-08-10 20:21:18
 * @Description:
 * @FilePath: /rollup-demo/rollup.config.js
 */
import babel from "@rollup/plugin-babel";
import html from './plugins/rollup-plugin-inner-html';

export default {
  input: "./src/main.js",
  output: {
    file: "./dist/bundle.js",
    format: "iife",
  },
  plugins: [
    babel({
      presets: ["@vue/babel-preset-jsx"],
    }),
		html()
  ],
};
