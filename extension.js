const vscode = require('vscode');

exports.activate = (ctx) => {
    const disposable = vscode.commands.registerCommand('extension.showWiki', HandleCall);
    ctx.subscriptions.push(disposable);
};

function HandleCall() {
    const text = getWord();

    if (!text || text.length > 64) {
        vscode.window.showWarningMessage('Selection is empty');
        return;
    }

    const url = `https://community.bistudio.com/wiki/${text}`;
    vscode.env.openExternal(vscode.Uri.parse(url));
}

function getWord() {

    const editor = vscode.window.activeTextEditor;
    const sel = editor.selection;

    if (!sel.isEmpty) {
        return editor.document.getText(sel);
    }

    const cursor = sel.start;
    const range = editor.document.getWordRangeAtPosition(cursor);
    const currentWord = editor.document.getText(range);

    return currentWord;
}