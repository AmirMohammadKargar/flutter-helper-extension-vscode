import * as vscode from "vscode";
import { types, typesWithTemp } from "./constant/temp-types";
const fs = require("fs");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "flutter-helper.createFile",
    async () => {
      const options = types.map((label) => ({
        label,
        temp: typesWithTemp[label],
      }));
      const tempPicked = await vscode.window.showQuickPick(options, {
        ignoreFocusOut: true,
      });

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
        wsedit.insert(filePath, new vscode.Position(0, 0), tempPicked?.temp!);

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

  disposable = vscode.commands.registerCommand(
    "flutter-helper.createFeatDir",
    async () => {
      const pathQuery = await vscode.window.showInputBox({
        placeHolder:
          "Write a relative path for your feature like: feature/test/shop",
        prompt: "Create Feature Directories.",
      });

      const featureName = await vscode.window.showInputBox({
        placeHolder: "Write your featureName",
      });

      if (!pathQuery || !featureName) {
        vscode.window.showErrorMessage(
          "A path and filename are mandatory to execute this action"
        );
        return;
      }

      if (vscode.workspace.workspaceFolders) {
        const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const forderPath = vscode.Uri.file(
          `${wsPath}/${pathQuery}/${featureName}`
        );
        try {
          fs.mkdirSync(forderPath.fsPath);
        } catch (err) {
          fs.mkdirSync(`${wsPath}/${pathQuery}`);
          fs.mkdirSync(forderPath.fsPath);
        }
        fs.mkdirSync(forderPath.fsPath + "/domain");
        fs.mkdirSync(forderPath.fsPath + "/domain/repositories");
        fs.mkdirSync(forderPath.fsPath + "/domain/usecases");
        fs.mkdirSync(forderPath.fsPath + "/domain/entities");
        fs.mkdirSync(forderPath.fsPath + "/data");
        fs.mkdirSync(forderPath.fsPath + "/data/datasources");
        fs.mkdirSync(forderPath.fsPath + "/data/repositories");
        fs.mkdirSync(forderPath.fsPath + "/data/models");
        fs.mkdirSync(forderPath.fsPath + "/presentation");
        fs.mkdirSync(forderPath.fsPath + "/presentation/pages");
        fs.mkdirSync(forderPath.fsPath + "/presentation/managers");
        fs.mkdirSync(forderPath.fsPath + "/presentation/widgets");
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
