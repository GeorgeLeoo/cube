import * as vscode from 'vscode';
import * as fs from 'fs';

class File {
    /**
    * 通过路径获取 html
    * @param path 
    * @returns 
    */
    static getFileContent = (path: string) => {
        try {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
            
            const content = fs.readFileSync(path);
        
            return content.toString();
        } catch (err) {
            vscode.window.showErrorMessage('插件已损坏，请过重新安装次插件');
            return '';
        }
    };
}

export default File;