import { Rectangle } from "@/interface/Rectangle";
import { TextProps } from "@/interface/Text";
import { createElement } from "react";

export class Text {
    fontFamily: string;
    fontSize: number;
    letterSpacing: number;
    lineHeightPx: number;
    fontWeight: number;
    textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT";
    textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
    name: string;
    width: number;
    height: number;
    color: string;
    position: string;
    top: number;
    left: number;
    
    constructor( width: number, height: number, color: string, position:string, top: number, left: number, textContent: string, text: TextProps,) {
        this.fontFamily = text.fontFamily;
        this.fontSize = text.fontSize;
        this.letterSpacing = text.letterSpacing;
        this.lineHeightPx = text.lineHeightPx;
        this.fontWeight = text.fontWeight;
        this.textAlignHorizontal = text.textAlignHorizontal;
        this.textAlignVertical = text.textAlignVertical;
        this.name = textContent;
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = position;
        this.top = top;
        this.left = left;
    }

    getReactComponent() {
        return  createElement(
            'p',
            {
                style: {
                    fontFamily: `${this.fontFamily}`,
                    fontSize: `${this.fontSize}px`,
                    letterSpacing: `${this.letterSpacing}px`,
                    lineHeight: `${this.lineHeightPx}px`,
                    fontWeight: this.fontWeight,
                    textAlign: this.textAlignHorizontal,
                    color: this.color,
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    position: this.position,
                    top: `${this.top}px`,      
                    left: `${this.left}px`,    
                }
            },
            this.name

        )
    }
    getHTML() {
        return `<p style="font-family: ${this.fontFamily}; font-size: ${this.fontSize}px; letter-spacing: ${this.letterSpacing}px; line-height: ${this.lineHeightPx}px; font-weight: ${this.fontWeight}; text-align: ${this.textAlignHorizontal}; color: ${this.color}; width: ${this.width}px; height: ${this.height}px; position: ${this.position}; top: ${this.top}px; left: ${this.left}px;">${this.name}</p>`;
    }
}