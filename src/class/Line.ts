import { radToDeg } from "@/utils/sharedMethods";
import { createElement } from "react";
import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";

export class Line {
    width: number;
    height?: number;
    color: string;
    position: string;
    top: number;
    left: number;
    rotation?: number;
    
    constructor(width: number, color: string, position:string, top: number, left: number, rotation?: number, strokeWeight?: number) {
        this.width = width;
        this.height = strokeWeight;
        this.color = color;
        this.position = position;
        this.top = top;
        this.left = left;
        this.rotation = rotation
    }
    
    getInlineHTMLCSS() {
        return `<hr style="color: ${this.color}; width: ${this.width}px; position: ${this.position}; top: ${this.top}px; left: ${this.left}px; transform: rotate(${radToDeg(this.rotation)}deg); />`;
    }
    getInlineHTMLCSSReact() {
        return `<hr style={{color: ${this.color}, width: ${this.width}px, position: ${this.position}, top: ${this.top}px, left: ${this.left}px, transform: rotate(${radToDeg(this.rotation)}deg)}} />`;
    }
    getReactComponent() {
        return createElement(
            'hr',
            {
            style: {
                background: this.color,
                width: `${this.width}px`,
                position: this.position,
                top: `${this.top}px`,
                left: `${this.left}px`,
                transform: `rotate(${radToDeg(this.rotation)}deg)`,
                height: `${this.height}px`,
                border: 0
            }
            }
        );
    }
    getHTMLCSSReact() {
        const className = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], style: 'capital' });
        const html = `<hr className="classes.line${className}" />`;
        const css =  `.line${className} {
            background: ${this.color};
            width: ${this.width}px;
            height: ${this.height}px;
            position: ${this.position};
            top: ${this.top}px;
            left: ${this.left}px;
            transform: rotate(${radToDeg(this.rotation)}deg);
            border: 0;
        }`;
        return { html, css };
    }
    getHTML() {
        
    }
}