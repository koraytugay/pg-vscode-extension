import {ProviderResult, TreeDataProvider, window} from "vscode";
import { MyVersionTreeItem } from "./MyVersionTreeItem";
import * as vscode from "vscode";

export class MyVersionTreeViewProvider implements TreeDataProvider<MyVersionTreeItem> {

  counter = 3;

  data: MyVersionTreeItem[];

  private eventEmitter: vscode.EventEmitter<MyVersionTreeItem | undefined> = new vscode.EventEmitter<MyVersionTreeItem | undefined>();

  readonly onDidChangeTreeData: vscode.Event<MyVersionTreeItem | undefined> = this.eventEmitter.event;

  constructor() {
    this.data = [];
    this.data.push(new MyVersionTreeItem('CVE-2019-12900', undefined));
    this.data.push(new MyVersionTreeItem('CVE-2023-50164', undefined));
  }

  getChildren(element?: MyVersionTreeItem): ProviderResult<MyVersionTreeItem[]> {
    if (!element) {
      return this.data;
    }
    return element.children;
  }

  getTreeItem(element: MyVersionTreeItem): MyVersionTreeItem | Thenable<MyVersionTreeItem> {
    return element;
  }
}
