import * as vscode from "vscode";
import repositoryTemp from "./templates/repository.temp";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "flutter-helper.repository",
    async () => {
      const pathQuery = await vscode.window.showInputBox({
        placeHolder:
          "Write a relative path for your file like: feature/test/shop",
        prompt: "Create Repository file.",
      });
      const fileName = await vscode.window.showInputBox({
        placeHolder: "Write your filename",
      });

      if (!pathQuery || !fileName) {
        vscode.window.showErrorMessage(
          "A path and filename are mandatory to execute this action"
        );
        return;
      }

      const wsedit = new vscode.WorkspaceEdit();

      if (vscode.workspace.workspaceFolders) {
        const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const filePath = vscode.Uri.file(
          `${wsPath}/${pathQuery}/${fileName}.dart`
        );

        vscode.window.showInformationMessage(filePath.toString());

        wsedit.createFile(filePath, { ignoreIfExists: false });
        wsedit.insert(filePath, new vscode.Position(0, 0), repositoryTemp);

        try {
          await vscode.workspace.applyEdit(wsedit);

          vscode.window.showInformationMessage(
            `Created a new file: ${filePath}`
          );

          const openPath = vscode.Uri.file(filePath.path);
          const doc = await vscode.workspace.openTextDocument(openPath);
          await vscode.window.showTextDocument(doc);
        } catch (error: any) {
          vscode.window.showErrorMessage(
            `Error creating the file: ${error.message}`
          );
        }
      } else {
        vscode.window.showInformationMessage(
          "There is no folder in the workspace"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
