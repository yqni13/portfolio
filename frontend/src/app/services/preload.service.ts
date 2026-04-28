import { Injectable } from "@angular/core";
import { ResourceOption } from "../utils/enums/resource-option.enum";
import { PreloadData, VideoDetails } from "../utils/interfaces/preload.interface";

@Injectable({
    providedIn: 'root'
})
export class PreloadService {

    async preloadSingle(data: PreloadData): Promise<void> {
        switch(data.option) {
            case(ResourceOption.VIDEO): {
                await this.loadVideo(data.url, data.videoOption!);
                break;
            }
            case(ResourceOption.IMG):
            default:
                await this.loadImg(data.url);
        }
    }

    async preloadMultiple(data: PreloadData[]): Promise<void[]> {
        return Promise.all(data.map((entry: PreloadData) => this.preloadSingle(entry)));
    }

    private loadImg(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => reject(`Image not found from path: ${url}`)
        })
    }

    private loadVideo(url: string, option: VideoDetails): Promise<void> {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = option.preload;
            video.src = url;
            video.muted = option.muted;
            video.playsInline = option.playsInline;

            const cleanup = () => {
                video.removeEventListener('loadeddata', onDataLoad);
                video.removeEventListener('error', onError);
            };

            const onDataLoad = () => {
                cleanup();
                resolve();
            };

            const onError = () => {
                cleanup();
                reject(new Error(`Video failed to load from path: ${url}`));
            };

            video.addEventListener('loadeddata', onDataLoad);
            video.addEventListener('error', onError);
            video.load();
        })
    }
}