import {ViewColumn, WebviewPanel, window, workspace} from "vscode";

class VulnerabilityDetailsDto {
  public description: string;
  public identifier: string;

  constructor(description: string, identifier: string) {
    this.description = description;
    this.identifier = identifier;
  }
}

export class MyWebViewPanel {

  private panel: WebviewPanel;

  constructor(args: any) {
    this.panel = window.createWebviewPanel(
        'my-view-type',
        args.label,
        ViewColumn.Active,
        {
          enableScripts: true
        }
    );

    // Receive message from webview
    this.panel.webview.onDidReceiveMessage(
        message => {
          window.showInformationMessage(message.command + ' - ' + message.text);
        }
    );

    let content = args.content;

    // Read and append the url from configuration
    let url = `${workspace.getConfiguration('myTreeView').get('url')}`;
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    fetch(`${url}/api/v2/vulnerabilities/${args.label}`)
      .then(value => value.json())
      .then(data => {
        let vulnerabilityDetailsDto = data as VulnerabilityDetailsDto;
        this.panel.webview.html = this.getWebviewHtml(vulnerabilityDetailsDto.identifier, content, url, vulnerabilityDetailsDto.description);
        // Send message to webview
        this.panel.webview.postMessage({ text: 'Fetch successful!' });
      })
      .catch(reason => {
        this.panel.webview.html = this.getWebviewHtml(args.label, content, url, 'Not Found!');
        // Send message to webview
        this.panel.webview.postMessage({ text: 'Fetch failed!' });
      });
  }

  private getWebviewHtml(identifier: string, content: string, url: string, description: string) {
    return /*html*/ `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="main">
                  <h1>${identifier}</h1>
                  <div>This is your additional content: ${content}!</div>
                  <br/>
                  <div>This is the URL configured: ${url}</div>
                  <br/>
                  <div>${description}</div>
                  <br/>
                  <div id='sub'></div>
                  <br/>
                  <div id='received'></div>
                </div>
            <script>
              (function() {
                document.getElementById('sub').innerHTML = 'Populated by script!';
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                  command: 'Message Command',
                  text: 'Identifier: ${identifier}'
                });
              }())
            </script>
            <script>
              window.addEventListener('message', event => {
                const message = event.data;
                document.getElementById('received').innerHTML = message.text;
             });
            </script>
            </body>
            </html>`;
  }
}
