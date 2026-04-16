import { ResourceOption } from "../enums/resource-option.enum";

export interface PreloadData {
    option: ResourceOption,
    url: string,
    videoOption?: VideoDetails
}

export interface VideoDetails {
    preload: "" | "none" | "metadata" | "auto",
    muted: boolean,
    playsInline: boolean
}