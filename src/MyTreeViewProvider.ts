import {ProviderResult, TreeDataProvider, window} from "vscode";
import { MyTreeItem } from "./MyTreeItem";
import * as vscode from "vscode";

export class MyTreeViewProvider implements TreeDataProvider<MyTreeItem> {

  counter = 3;

  data: MyTreeItem[];

  private eventEmitter: vscode.EventEmitter<MyTreeItem | undefined> = new vscode.EventEmitter<MyTreeItem | undefined>();

  readonly onDidChangeTreeData: vscode.Event<MyTreeItem | undefined> = this.eventEmitter.event;

  constructor() {
    this.data = [];
    this.data.push(new MyTreeItem('CVE-2019-12900', [new MyTreeItem('CVE-2022-42004')]));
    this.data.push(new MyTreeItem('CVE-2023-50164', undefined));
  }

  getChildren(element?: MyTreeItem): ProviderResult<MyTreeItem[]> {
    if (!element) {
      return this.data;
    }
    return element.children;
  }

  getTreeItem(element: MyTreeItem): MyTreeItem | Thenable<MyTreeItem> {
    return element;
  }

  addItem() {
    window.showInformationMessage("Item added!").then(() => Promise.resolve());
    this.data.push(new MyTreeItem('my-item-' + this.counter));
    this.counter++;
    this.eventEmitter.fire(undefined);
  }

  removeItem() {
    if (this.data.length === 0) {
      return;
    }
    window.showInformationMessage("Item removed!").then(() => Promise.resolve());
    this.data.pop();
    this.counter--;
    this.eventEmitter.fire(undefined);
  }
}
