export interface IJsonProjectDataRequest {
    title: string
    version: string
    type: string
    keywords: string
    technology?: never,
    cardScreenPath: string,
    githublink: string,
    techURLs: string[],
    techImgClasses: string[]
}

export interface IJsonItem {
    [key: string]: IJsonProjectDataRequest;
}