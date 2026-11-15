import { EasingFnOption } from "../enums/easing-fn.enum";

export interface RippleParams {
    x: number,
    y: number,
    maxRadius: number,
    options?: RippleOptions
}

export interface RippleOptions {
    frames: number,
    points: number,
    lobes: number,
    amplitude: number,
    swirl: number
}

export interface RippleEffectData {
    event?: MouseEvent,
    trigger?: HTMLElement,
    duration: number,
    easing: EasingFnOption,
    fn: CallableFunction,
    options?: RippleOptions
}