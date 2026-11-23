import { Injectable } from "@angular/core";
import { InitDelays } from "../utils/interfaces/init.interface";

@Injectable({
    providedIn: 'root'
})
export class InitService {

    readonly delays: InitDelays = {
        startMosaic: 750,
        startLogo: 500,
        stopMosaic: 2000,
        startOutro: 250,
        shineAnimation: 3000,
        total: 0
    };

    constructor() {
        this.mapTotalInitDelay();
    }

    private mapTotalInitDelay() {
        let sum = 0;
        Object.values(this.delays).forEach((val: number) => {
            sum += val;
        });

        this.delays.total = sum - 100;
    }
}