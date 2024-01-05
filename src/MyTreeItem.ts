import {ThemeColor, ThemeIcon, TreeItem, TreeItemCollapsibleState, window} from "vscode";

export class MyTreeItem extends TreeItem {

  children: MyTreeItem[] | undefined;

  constructor(label: string, children?: MyTreeItem[]) {
    super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Expanded);
    this.children = children;
    this.iconPath = new ThemeIcon('library', new ThemeColor('my.theme.icon.color'));

    // Tell what to do when this item is clicked
    this.command = {
      title: 'Show Webview Panel',
      command: 'my-tree-view-extension.showWebViewPanel',
      arguments: [{
        label: label,
        content: 'Some additional content'
      }]
    };
  }
}
