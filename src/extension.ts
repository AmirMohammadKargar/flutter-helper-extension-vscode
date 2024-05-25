import * as vscode from "vscode";
import { types, typesWithTemp } from "./constant/temp-types";
const fs = require("fs");

async function createFile() {
  const options = types.map((label) => ({
    label,
    temp: typesWithTemp[label],
  }));
  const tempPicked = await vscode.window.showQuickPick(options, {
    ignoreFocusOut: true,
  });

  const pathQuery = await vscode.window.showInputBox({
    placeHolder: "Write a relative path for your file like: feature/test/shop",
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

  if (vscode.workspace.workspaceFolders) {
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const filePath = vscode.Uri.file(`${wsPath}/${pathQuery}/${fileName}.dart`);
    const wsedit = new vscode.WorkspaceEdit();

    wsedit.createFile(filePath, { ignoreIfExists: false });
    wsedit.insert(filePath, new vscode.Position(0, 0), tempPicked?.temp || "");

    try {
      await vscode.workspace.applyEdit(wsedit);
      vscode.window.showInformationMessage(`Created a new file: ${filePath}`);
      const doc = await vscode.workspace.openTextDocument(filePath);
      await vscode.window.showTextDocument(doc);
    } catch (error) {
      vscode.window.showErrorMessage(`Error creating the file: ${error}`);
    }
  } else {
    vscode.window.showInformationMessage("There is no folder in the workspace");
  }
}

async function createFeatureDirectory() {
  const pathQuery = await vscode.window.showInputBox({
    placeHolder:
      "Write a relative path for your feature like: feature/test/shop",
    prompt: "Create Feature Directories.",
  });

  const featureName = await vscode.window.showInputBox({
    placeHolder: "Write your feature name",
  });

  if (!pathQuery || !featureName) {
    vscode.window.showErrorMessage(
      "A path and feature name are mandatory to execute this action"
    );
    return;
  }

  if (vscode.workspace.workspaceFolders) {
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const featurePath = `${wsPath}/${pathQuery}/${featureName}`;
    const directories = [
      "/domain",
      "/domain/repositories",
      "/domain/usecases",
      "/domain/entities",
      "/data",
      "/data/datasources",
      "/data/repositories",
      "/data/models",
      "/presentation",
      "/presentation/pages",
      "/presentation/managers",
      "/presentation/widgets",
    ];

    try {
      directories.forEach((dir) => {
        fs.mkdirSync(`${featurePath}${dir}`, { recursive: true });
      });
      vscode.window.showInformationMessage(
        `Feature directories created at: ${featurePath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Error creating directories: ${error}`);
    }
  } else {
    vscode.window.showInformationMessage("There is no folder in the workspace");
  }
}

export function activate(context: vscode.ExtensionContext) {
  const createFileCommand = vscode.commands.registerCommand(
    "flutter-helper.createFile",
    createFile
  );

  const createFeatDirCommand = vscode.commands.registerCommand(
    "flutter-helper.createFeatDir",
    createFeatureDirectory
  );

  context.subscriptions.push(createFileCommand, createFeatDirCommand);
}

export function deactivate() {}
