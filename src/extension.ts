import * as vscode from 'vscode';
import get from 'axios';

/**
 * Determine the specific programming language for
 * documentation based on language source
 */
function makeLanguage(languageId: string) {
    // TypeScript documentation has issues for most
    // symbols so we default to JavaScript instead
    return languageId === 'typescript' ? 'javascript' : languageId;
}

interface MakeRequestUrlParams {
    language: string;
    symbol: string;
}

/**
 * Make request URL for specific
 * to service for documentation
 */
function makeRequestUrl({ language, symbol }: MakeRequestUrlParams) {
    // Only treating cht.sh source for now
    return `https://cht.sh/${language}/${symbol}`;
}

interface MakeTitleParams {
    language: string;
    symbol: string;
}

/**
 * Create display title for documentation webview
 */
function makeTitle({ language, symbol }: MakeTitleParams) {
    return `Documentation (${language}/${symbol})`;
}

/**
 * Get the HTML for a given page URL
 */
async function fetchHtmlContent(url: string) {
    const response = await get(url);
    const { data } = response;
    // We don't get an actual 404 when failing
    const isPageNotFound = data.match(/404 NOT FOUND/);
    return isPageNotFound ? '' : data;
}

interface RenderWebviewParams {
    html: string;
    title: string;
}

/**
 * Create and show panel for static document
 */
function renderWebview({ html, title }: RenderWebviewParams) {
    const panel = vscode.window.createWebviewPanel(
        'documentation',
        title,
        vscode.ViewColumn.Beside,
        {}
    );
    panel.webview.html = html;
}

/**
 * Initialization function called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext) {
    // Any command is also defined in the package.json
    // file where the commandId parameter must match
    const documentation = vscode.commands.registerCommand(
        'extension.documentation',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                throw new Error('No editor available');
            }
            const { document, selection } = editor;
            const { languageId } = document;
            const potentialSymbol = document.getText(selection);
            const programmingLanguage = makeLanguage(languageId);
            const requestUrl = makeRequestUrl({
                language: programmingLanguage,
                symbol: potentialSymbol,
            });
            const webviewTitle = makeTitle({
                language: programmingLanguage,
                symbol: potentialSymbol,
            });
            try {
                const htmlContent = await fetchHtmlContent(requestUrl);
                if (!htmlContent) {
                    vscode.window.showErrorMessage(
                        'Symbol documentation not found'
                    );
                    return;
                }
                renderWebview({
                    html: htmlContent,
                    title: webviewTitle,
                });
            } catch (error) {
                console.error(error);
                vscode.window.showErrorMessage('Unknown documentation error');
            }
        }
    );
    context.subscriptions.push(documentation);
}
