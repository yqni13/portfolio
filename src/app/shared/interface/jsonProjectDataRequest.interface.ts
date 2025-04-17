// Use declared interface to represent server-side JSON
export declare interface JsonProjectDataRequest {
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

export type JsonItem = Record<string, JsonProjectDataRequest>;