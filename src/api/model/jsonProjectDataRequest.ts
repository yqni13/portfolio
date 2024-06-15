export interface JsonProjectDataRequest {
    title: string
    version: string
    type: string
    keywords: string
}

export interface JsonItem {
    [key: string]: JsonProjectDataRequest;
}