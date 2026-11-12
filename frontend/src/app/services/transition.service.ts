import { Injectable } from "@angular/core";
import { RippleEffectData, RippleParams } from "../utils/interfaces/transition.interface";

@Injectable({
    providedIn: 'root'
})
export class TransitionService {

    applyRippleEffect(data: RippleEffectData) {
        const trigger = data.trigger;
        const box = trigger?.getBoundingClientRect();
        let x = 0;
        let y = 0;

        // In case of navigation by key: start from top left.
        if (data.event) {
            x = data.event.detail || !box
                ? data.event.clientX
                : box.left + box.width / 2;
            y = data.event.detail || !box
                ? data.event.clientY
                : box.top + box.height / 2;
        }

        const radius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y),
        );

        const transition = document.startViewTransition(() => {
            data.fn();
        });

        const params: RippleParams = { x: x, y: y, maxRadius: radius };

        transition.ready.then(() => {
            document.documentElement.animate(
                this.createRippleEffect(params),
                {
                    duration: data.duration,
                    easing: data.easing,
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    }

    createRippleEffect(params: RippleParams): Keyframe[] {
        if (!params.options) {
            params.options = {
                frames: 70,
                points: 150,
                lobes: 9,
                amplitude: 0.035,
                swirl: 3
            };
        }

        const easeOut = (time: number) => 1 - Math.pow(1 - time, 3);
        const keyframes: Keyframe[] = [];

        for (let f = 0; f < params.options.frames; f++) {
            const time = f / params.options.frames;
            const radius = params.maxRadius * 1.1 * easeOut(time);
            const amp = params.maxRadius * params.options.amplitude * Math.sin(Math.PI * time);
            const phase = time * Math.PI * 2 * params.options.swirl;
            const coords: string[] = [];

            for (let i = 0; i < params.options.points; i++) {
                const angle = (i / params.options.points) * Math.PI * 2;
                const r = radius + amp * Math.sin(params.options.lobes * angle + phase);
                const px = (params.x + r * Math.cos(angle)).toFixed(1);
                const py = (params.y + r * Math.sin(angle)).toFixed(1);
                coords.push(`${px}px ${py}px`);
            }

            keyframes.push({ clipPath: `polygon(${coords.join(', ')})` });
        }

        return keyframes;
    }
}