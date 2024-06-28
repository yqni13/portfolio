export interface IJsonProjectDataRequest {
    title: string
    version: string
    type: string
    keywords: string
    technology: string,
    cardScreenPath: string,
    githublink: string,
    techURLs: string[],
    techImgClasses: string[]
}

export type IJsonItem = Record<string, IJsonProjectDataRequest>;