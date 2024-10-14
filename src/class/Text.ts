import { Rectangle } from "@/interface/Rectangle";
import { TextProps } from "@/interface/Text";
import { roundNumbers } from "@/utils/sharedMethods";
import { createElement } from "react";
import { uniqueNamesGenerator,  adjectives, colors, animals } from 'unique-names-generator';

export class Text {
    fontFamily: string;
    fontSize: number;
    letterSpacing: number;
    lineHeightPx: number;
    fontWeight: number;
    textAlignHorizontal: string;
    textAlignVertical: string;
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
        this.lineHeightPx = roundNumbers(text.lineHeightPx);
        this.fontWeight = text.fontWeight;
        this.textAlignHorizontal = text.textAlignHorizontal.toLowerCase();
        this.textAlignVertical = text.textAlignVertical.toLowerCase();
        this.name = textContent;
        this.width = width;
        this.height = height;
        this.color = color;
        this.position = position;
        this.top = roundNumbers(top);
        this.left = roundNumbers(left);
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
    getInlineHTMLCSS() {
        return `<p style="font-family: ${this.fontFamily}; font-size: ${this.fontSize}px; letter-spacing: ${this.letterSpacing}px; line-height: ${this.lineHeightPx}px; font-weight: ${this.fontWeight}; text-align: ${this.textAlignHorizontal}; color: ${this.color}; width: ${this.width}px; height: ${this.height}px; position: ${this.position}; top: ${this.top}px; left: ${this.left}px;">${this.name}</p>`;
    }
    getInlineHTMLCSSReact() {
        return `<p style={{fontFamily: '${this.fontFamily}', fontSize: '${this.fontSize}px', letterSpacing: '${this.letterSpacing}px', lineHeight: '${this.lineHeightPx}px', fontWeight: '${this.fontWeight}', textAlign: '${this.textAlignHorizontal}', color: '${this.color}', width: '${this.width}px', height: '${this.height}px', position: '${this.position}', top: '${this.top}px', left: '${this.left}px'}}>${this.name}</p>`;
    }
    getHTMLCSSReact() {
        const className = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], style: 'capital' });
        const html = `<p className={classes.paragraph${className}}>${this.name}</p>`;
        const css =  `.paragraph${className} {
            font-family: ${this.fontFamily};
            font-size: ${this.fontSize}px;
            letter-spacing: ${this.letterSpacing}px;
            line-height: ${this.lineHeightPx}px;
            font-weight: ${this.fontWeight};
            text-align: ${this.textAlignHorizontal};
            color: ${this.color};
            width: ${this.width}px;
            height: ${this.height}px;
            position: ${this.position};
            top: ${this.top}px;
            left: ${this.left}px;
        }`;
        return { html, css };
    }
}