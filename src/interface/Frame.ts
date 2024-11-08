import { Effect } from "./Effect";
import { Fill } from "./Paint";
import { Rectangle } from "./Rectangle";
import { TextProps } from "./Text";

export interface ElementProps {
    id: string;
    name: string;
    type: "FRAME" | "RECTANGLE" | "ELLIPSE" | "VECTOR" | "REGULAR_POLYGON" | "TEXT" | "LINE";
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
    children: ElementProps[];
    visible: boolean;
    opacity?: number;
    style: TextProps;
}