export interface MakeRequestUrlParams {
    language: string;
    symbol: string;
}

export interface MakeTitleParams {
    language: string;
    symbol: string;
}

export interface RenderWebviewParams {
    html: string;
    title: string;
}

export interface WebviewPanelInfo {
    title: string;
    html: string;
}
