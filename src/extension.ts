import * as vscode from 'vscode';

/**
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext) {
    // Log to the vscode developer console
    console.log('Extension activated');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand(
        'extension.hello',
        () => {
            // Code executed when command executed
            // Display a message box to the user
            vscode.window.showInformationMessage('Hello');
        }
    );
    context.subscriptions.push(disposable);
}
