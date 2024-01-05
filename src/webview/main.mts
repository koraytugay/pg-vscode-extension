import { provideVSCodeDesignSystem, 
    vsCodeLink, vsCodeBadge, vsCodeDivider,
    vsCodeDataGrid, vsCodeDataGridRow, vsCodeDataGridCell, 
    vsCodePanels, vsCodePanelTab, vsCodePanelView } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(
    vsCodeLink(),
    vsCodeBadge(),
    vsCodeDivider(),
    vsCodeDataGrid(),
    vsCodeDataGridRow(),
    vsCodeDataGridCell(),
    vsCodePanels(), 
    vsCodePanelTab(), 
    vsCodePanelView()
    );
