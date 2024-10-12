import { Effect } from "./Effect";
import { Fill } from "./Paint";

export interface FrameProps {
    id: string;
    name: string;
    type: "FRAME" | "RECTANGLE" | "ELLIPSE" | "VECTOR" | "REGULAR_POLYGON";
    absoluteBoundingBox: Rectangle;
    fills: Fill[];
    strokes: Fill[];
    rotation?: number;
    cornerRadius?: number;
    strokeWeight?: number;
    rectangleCornerRadii?: number[];
    thumbnailUrl?: string;
    strokeDashes?: number[];
    individualStrokeWeights?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    effects?: Effect[];
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    itemSpacing?: number; //gap
    layoutMode?: "HORIZONTAL" | "VERTICAL"; // flex direction
    layoutWrap?: "NO_WRAP" | "WRAP"; // flex wrap
    counterAxisAlignItems?: "CENTER" | "MAX";
    primaryAxisAlignItems?: "CENTER" | "MAX";
    counterAxisSpacing?: number;
    counterAxisAlignContent?: "AUTO",
    children: FrameProps[];
    visible: boolean;
    opacity?: number;
}