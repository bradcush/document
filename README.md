# Document

Visual Studio Code extension for viewing documentation directly inside VS Code
using a webview. Documentation is supported for most programming languages
based on the current file type and seclected symbol in the focused document.

## Running the project

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm: watch` to compile the code
  - Run the extension in a new VS Code window

## Packaging

- Install vsce globally running `npm install -g vsce`
- Ensure current directory is the `document` project
- Run `vsce package` to create `vsix` format

## Testing

End-to-end testing using an instance of VS Code

- Run `npm test` to start the Mocha test suite
- VS Code will be downloaded if needed automatically
