import { Color } from "./Paint";

export interface Effect {
    type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
    visible?: boolean;
    radius?: number;
    color: Color;
    offset?: {
        x: number;
        y: number;
    };
    spread?: number;
}