import { Fill } from "./Paint";
import { Rectangle } from "./Rectangle";

export interface TextProps {
    fontFamily: string;
    fontSize: number;
    letterSpacing: number;
    lineHeightPx: number;
    lineHeightPercent: number;
    fontWeight: number;
    textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT";
    textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
}