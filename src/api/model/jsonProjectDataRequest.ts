export interface IJsonProjectDataRequest {
    title: string
    version: string
    type: string
    keywords: string
    technology?: never
}

export interface IJsonItem {
    [key: string]: IJsonProjectDataRequest;
}