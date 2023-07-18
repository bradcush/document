# Document

Visual Studio Code extension for viewing documentation from
[cheat.sh](https://cht.sh) directly inside VS Code using a webview.
Documentation is supported for most programming languages based on the current
file type and selected symbol in the focused document.

## Using document

There two different ways to use document

- Run the "Documentation" command on any file type without a selection to open
  general language documentation in a webview based on the file type
- Run the "Documentation" command on any file type with a selection to open
  specific language documentation in a webview based on the file type and
  selection (Built-in language symbols should be used for best results)

### Running the "Documentation" command

- Selecting "Document" from the Command Palette
- Right-clicking a selection and choosing "Document" from the menu
- Using the shortcut `Shift+Ctrl+I` or `Shift+Cmd+I` with or without selection

## Running the project

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm:watch` to compile the code
  - Run the extension in a new VS Code window

## Packaging

- Install vsce globally running `npm install -g vsce`
- Ensure current directory is the `document` project
- Run `vsce package` to create `vsix` format

## Testing

End-to-end testing using an instance of VS Code

- Run `npm test` to start the Mocha test suite
- VS Code will be downloaded if needed automatically
