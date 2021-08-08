import * as vscode from 'vscode';

import Main from './main';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "cube" is now active!');

	// 获取 注册的命令列表
	const registerCommandList = Main.getRegisterCommandList(context);

	context.subscriptions.push(...registerCommandList);
}

// this method is called when your extension is deactivated
export function deactivate() {}
