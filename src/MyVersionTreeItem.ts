import {ThemeColor, ThemeIcon, TreeItem, TreeItemCollapsibleState, window} from "vscode";

export class MyVersionTreeItem extends TreeItem {

  children: MyVersionTreeItem[] | undefined;

  constructor(label: string, children?: MyVersionTreeItem[]) {
    super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Expanded);
    this.children = children;
    this.iconPath = new ThemeIcon('tag', new ThemeColor('my.theme.icon.color.yellow'));

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
