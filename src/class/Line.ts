import { radToDeg } from "@/utils/sharedMethods";
import { createElement } from "react";

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
    
    getHTML() {
        return `<hr style="color: ${this.color}; width: ${this.width}px; position: ${this.position}; top: ${this.top}px; left: ${this.left}px; transform: rotate(${radToDeg(this.rotation)}deg); />`;
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
}