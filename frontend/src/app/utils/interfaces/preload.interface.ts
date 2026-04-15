import { ResourceOption } from "../enums/resource-option.enum";

export interface PreloadData {
    option: ResourceOption,
    url: string,
    videoOption?: VideoData
}

export interface VideoData {
    preload: "" | "none" | "metadata" | "auto",
    muted: boolean,
    playsInline: boolean
}