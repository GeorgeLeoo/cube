import * as fs from "fs";
import * as minify from "html-minifier";

const readFileContent = (path) => {
  const data = fs.readFileSync(path);

  return data.toString();
};

export default function myExample() {
  return {
    name: "inner html",
    buildEnd() {

      let htmlContent = readFileContent(__dirname + "/index.html");
      const jsContent = readFileContent(__dirname + "/dist/bundle.js");

      htmlContent = htmlContent.replace("{main}", jsContent);

      // htmlContent = minify.minify(htmlContent, {
      //   minifyCSS: true,
      //   collapseWhitespace: true,
      //   conservativeCollapse: true,
      //   minifyJS: true,
      //   removeComments: true,
      // });

      fs.writeFileSync(__dirname + "/dist/index.html", htmlContent);
    },
  };
}
