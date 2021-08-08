import * as vscode from 'vscode';

import Command from './command';
import File from './file';

class Setting {
    static registerCommand = (context: vscode.ExtensionContext) => {
        let webViewPanel = null;

        // 设置HTML内容
        const path = context.extensionPath + "/src/views/index.html";
        
        return vscode.commands.registerCommand(Command.SETTING, () => {
            // 创建并显示新的webview
            webViewPanel = vscode.window.createWebviewPanel(
                "CubeSetting", // 只供内部使用，这个webview的标识
                "Cube Setting", // 给用户显示的面板标题
                vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
                {
                    enableScripts: true,
                } // Webview选项
            );

            webViewPanel.webview.html = File.getFileContent(path);

        });
    };
}

export default Setting;
