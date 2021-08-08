import * as vscode from 'vscode';

import Setting from './setting';

class Main {
    // 获取注册明亮列表
    static getRegisterCommandList(context: vscode.ExtensionContext) {
        const registerCommandList = [];

        registerCommandList.push(Setting.registerCommand(context));

        return registerCommandList;
    }
}

export default Main;
