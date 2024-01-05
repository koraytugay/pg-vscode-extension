import vscode, {window} from "vscode";

export class WorkspaceChangedHandler {
  static handleWorkspaceFoldersChangeEvent(event: vscode.WorkspaceFoldersChangeEvent): void {
    event.added.forEach(addedFolder => {
      window.showInformationMessage(`Added: ${addedFolder.uri.fsPath}`).then(() => Promise.resolve());
    });

    event.removed.forEach(removedFolder => {
      window.showInformationMessage(`Removed: ${removedFolder.uri.fsPath}`).then(() => Promise.resolve());
    });
  }
}
