import * as vscode from "vscode";
import * as fs from "fs";
import Utils from "./utils/Utils";

class File {
  /**
   * 是否存在某一路径
   * @param path
   * @returns
   */
  static hasDir = (path: string) => {
    return new Promise((resolve) => {
      fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  /**
   * 读取某一文件内容
   * @param path
   * @returns
   */
  static readFileContent = (path: string) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  };

  /**
   * 通过路径获取 html 内容
   * @param path
   * @returns
   */
  static getFileContent = (path: string) => {
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      console.log(path, err);
      vscode.window.showErrorMessage("插件已损坏，请过重新安装次插件");
      return "";
    }

    try {
      const content = fs.readFileSync(path);

      return content.toString();
    } catch (err) {
      return "";
    }
  };

  /**
   * 读取文件模板内容
   * @param path
   * @returns
   */
  static getFileTemplateContent = (path: string) => {
    //   文件模板集合
    let fileTemplateContentList = [];

    // 文件模板路径
    let fileTemplateContentPath = path + "/.snippet";

    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      console.error(fileTemplateContentPath + "no access!");

      console.log(path, err);
      return "";
    }

    // 读取文件模板路径下的所有文件
    const files = fs.readdirSync(fileTemplateContentPath);

    //   遍历 files
    for (let i = 0; i < files.length; i++) {
      //   获得当前 第 i 个 文件路径
      const filePath = fileTemplateContentPath + "/" + files[i];
      // 通过 require 获取这个文件
      const fileTemplateContent = require(filePath);

      // 给这个文件在添加路径属性
      fileTemplateContent.path = filePath;
      // 给你这个文件添加 处理后的 code
      fileTemplateContent.code = Utils.transformBodyToCode(
        fileTemplateContent.body
      );

      fileTemplateContentList.push(fileTemplateContent);
    }

    return fileTemplateContentList;
  };
}

export default File;
