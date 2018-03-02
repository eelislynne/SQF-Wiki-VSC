// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sqf-wiki" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.showWiki', function () {
        // The code you place here will be executed every time your command is executed

        HandleCall();
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


function HandleCall() {
    var func = "";
    if (!editor.selection.isEmpty) {
        var text = editor.document.getText(editor.selection);

        var parts = text.split(" ");
        func = parts[0];

        var url = "https://community.bistudio.com/wiki/" + func;
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
    } else {
        vscode.window.showWarningMessage("Selection is empty");
    }
}