// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {MyTreeViewProvider} from "./MyTreeViewProvider";
import {MyWebViewPanel} from "./MyWebViewPanel";
import {commands, window, workspace} from "vscode";
import {WorkspaceChangedHandler} from "./WorkspaceChangedHandler";
import { MyVersionTreeViewProvider } from './MyVersionTreeViewProvider';
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-tree-view-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('my-tree-view-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from my-tree-view-extension!');
	});

	context.subscriptions.push(disposable);

	let myTreeViewProvider = new MyTreeViewProvider();
	disposable = vscode.window.registerTreeDataProvider('my-view-id', myTreeViewProvider);
	context.subscriptions.push(disposable);

	let myVersionTreeViewProvider = new MyVersionTreeViewProvider();
	disposable = vscode.window.registerTreeDataProvider('my-version-view-id', myVersionTreeViewProvider);
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('my-tree-view-extension.addItem', () => {
		myTreeViewProvider.addItem();
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('my-tree-view-extension.removeItem', () => {
		myTreeViewProvider.removeItem();
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('my-tree-view-extension.showWebViewPanel', (args) => {
		new MyWebViewPanel(args);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('my-tree-view-extension.showHelloWorldPanel', (args) => {
		let panel = window.createWebviewPanel(
			'my-hello-view',
			'Component Details',
			vscode.ViewColumn.Active,
			{
			  // Enable javascript in the webview
              enableScripts: true,
              // Restrict the webview to only load resources from the `out` directory
              localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'out')]
			}
		);
		new HelloWorldPanel(panel, context.extensionUri);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.workspace.onDidChangeWorkspaceFolders((event: vscode.WorkspaceFoldersChangeEvent) => {
		WorkspaceChangedHandler.handleWorkspaceFoldersChangeEvent(event);
	});
	context.subscriptions.push(disposable);

	disposable = commands.registerCommand('my-tree-view-extension.configureUrl', () => {
		window.showInputBox({
			title: 'Configure a URL',
			prompt: 'Enter your URL',
			placeHolder: 'https://some-url',
			ignoreFocusOut: true,
		}).then((url) => {
			window.showInformationMessage(`${url}`).then(() => Promise.resolve());
			workspace.getConfiguration('myTreeView')
			  .update('url', url)
			  .then(value => {
				  window.showInformationMessage(`Settings updated: ${url}.`).then(() => Promise.resolve());
			  });
		});
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
