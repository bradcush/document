import * as path from 'path';
import * as assert from 'assert';
import * as vscode from 'vscode';
import { WebviewPanelInfo } from '../../types';

suite('extension', () => {
    // Basic test example when a symbol is not selected
    test('should open general language documentation webview', async () => {
        const sampleFilePath = '../../../src/test/suite/sample.ts';
        const uri = vscode.Uri.file(path.join(__dirname, sampleFilePath));
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document);
        const panelInfo =
            await vscode.commands.executeCommand<WebviewPanelInfo>(
                'extension.documentation'
            );
        assert.strictEqual(panelInfo?.title, 'Documentation (javascript/)');
        const isDocumentation = panelInfo?.html.includes(
            '<title>cheat.sh/js/</title>'
        );
        assert.strictEqual(isDocumentation, true);
    });
});
