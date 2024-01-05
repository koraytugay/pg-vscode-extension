import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";

export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public static render(extensionUri: vscode.Uri) {
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel("hello-world", "Hello World", vscode.ViewColumn.One, {
        // Empty for now
      });

      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
    }
  }

  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const webviewUri = getUri(webview, extensionUri, ["out", "webview.js"]);

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World!</title>
  <style>
    .red-circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
    }
  </style>
        </head>
        <body>
          <h3>ch.qos.logback : logback-core : 1.2.3</h3>

          <vscode-data-grid aria-label="Basic">
            <vscode-data-grid-row row-type="header">
                <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Match State</vscode-data-grid-cell>
                <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Identification Source</vscode-data-grid-cell>
                <vscode-data-grid-cell cell-type="columnheader" grid-column="3">Hash</vscode-data-grid-cell>
                <vscode-data-grid-cell cell-type="columnheader" grid-column="4">Catalog Date</vscode-data-grid-cell>
            </vscode-data-grid-row>
            <vscode-data-grid-row>
                <vscode-data-grid-cell grid-column="1">Exact</vscode-data-grid-cell>
                <vscode-data-grid-cell grid-column="2">Sonatype</vscode-data-grid-cell>
                <vscode-data-grid-cell grid-column="3">388a269f0f25c1b6adc3</vscode-data-grid-cell>
                <vscode-data-grid-cell grid-column="4">Dec 01, 2023</vscode-data-grid-cell>
            </vscode-data-grid-row>
          </vscode-data-grid>

          <h4>Recommended Versions</h4>
          <ul style="margin-left: -1.5em">
            <li><vscode-link href="#">Select 1.2.4</vscode-link> - Next version with no policy violation</li>
            <li><vscode-link href="#">Select 1.2.5</vscode-link> - Next version with no policy violation for this component and its dependencies</li>
          </ul>

          <vscode-divider></vscode-divider>

          <vscode-panels>
            <vscode-panel-tab id="tab-1">Policy Violations <vscode-badge>3</vscode-badge></vscode-panel-tab>
            <vscode-panel-tab id="tab-2">Security Vulnerabilities <vscode-badge>2</vscode-badge></vscode-panel-tab>
            <vscode-panel-tab id="tab-3">License Information</vscode-panel-tab>
            <vscode-panel-view id="view-1">
                <vscode-data-grid aria-label="Basic" grid-template-columns="1fr 1fr 1fr 4fr">
                    <vscode-data-grid-row row-type="header">
                        <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Threat</vscode-data-grid-cell>
                        <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Policy</vscode-data-grid-cell>
                        <vscode-data-grid-cell cell-type="columnheader" grid-column="3">Constraint</vscode-data-grid-cell>
                        <vscode-data-grid-cell cell-type="columnheader" grid-column="4">Conditions</vscode-data-grid-cell>
                    </vscode-data-grid-row>
                    <vscode-data-grid-row>
                        <vscode-data-grid-cell grid-column="1"><span style="font-size:75%">🔴</span>&nbsp;9</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="2"></vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="3">High risk CVSS score</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="4">Found security vulnerability CVE-2023-6378 with severity &ge; 7 (severity = 7.5)<br/>
                        Found security vulnerability CVE-2023-6378 with severity &lt; 9 (severity = 7.5)</vscode-data-grid-cell>
                    </vscode-data-grid-row>
                    <vscode-data-grid-row>
                        <vscode-data-grid-cell grid-column="1"><span style="font-size:75%">🟠</span>&nbsp;7</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="2">Security-Medium</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="3">Medium risk CVSS score</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="4">Found security vulnerability sonatype-2021-1446 with severity &ge; 4 (severity = 5.9)<br/>
                        Found security vulnerability sonatype-2021-1446 with severity &lt; 7 (severity = 5.9)</vscode-data-grid-cell>
                    </vscode-data-grid-row>
                    <vscode-data-grid-row>
                        <vscode-data-grid-cell grid-column="1"><span class="red-circle"></span>&nbsp;1</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="2">Architecture-Quality</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="3">Version is old</vscode-data-grid-cell>
                        <vscode-data-grid-cell grid-column="4">Found component older than 5 years</vscode-data-grid-cell>
                    </vscode-data-grid-row>
                </vscode-data-grid>
            </vscode-panel-view>
            <vscode-panel-view id="view-2">Security content.</vscode-panel-view>
            <vscode-panel-view id="view-3">License content.</vscode-panel-view>
          </vscode-panels>

          <script type="module" src="${webviewUri}"></script>
        </body>
      </html>
    `;
  }
}
