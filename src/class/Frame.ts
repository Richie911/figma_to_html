
import { createElement } from 'react';
import { Effect } from "@/interface/Effect";
import { ElementProps } from "@/interface/Frame";
import { Fill, GradientPosition } from "@/interface/Paint";
import {  Text } from './Text';
import { Rectangle } from '@/interface/Rectangle';
import { Line } from './Line';
import { getBoxShadow, getHeight, getWidth, setColor } from '@/utils/sharedMethods';

export class Element {
    boundingBox: ElementProps['absoluteBoundingBox'];
    rotation?: number;
    borderRadius?: number;
    borderWidth?: number;
    borderRadii?: number[];
    strokes: Fill[];
    fill: Fill[];
    thumbnailUrl?: string;
    strokeDashes?: number[];
    individualStrokeWeights?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    effect?: Effect[];
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    gap?: number;
    layoutMode?: "HORIZONTAL" | "VERTICAL";
    layoutWrap?: "NO_WRAP" | "WRAP";
    counterAxisAlignItems?: "CENTER" | "MAX";
    primaryAxisAlignItems?: "CENTER" | "MAX";
    counterAxisSpacing?: number;
    counterAxisAlignContent?: "AUTO";
    children: ElementProps[];
    frame: ElementProps;
    visible: boolean;
    type: "FRAME" | "RECTANGLE" | "ELLIPSE" | "VECTOR" | "REGULAR_POLYGON" | "LINE" | "TEXT";
    opacity?: number;
    rotationInRadians?: number;
    textContent: string;
    strokeWeight?: number;


    constructor(frame: ElementProps) {
        this.frame = frame;
        this.boundingBox = frame?.absoluteBoundingBox;
        this.fill = frame?.fills || [];
        this.strokes = frame?.strokes || [];
        this.rotation = frame?.rotation;
        this.borderRadius = frame?.cornerRadius;
        this.borderWidth = frame?.strokes?.length > 0 ? frame?.strokeWeight : 0;
        this.borderRadii = frame?.rectangleCornerRadii;
        this.strokeDashes = frame?.strokeDashes;
        this.individualStrokeWeights = frame?.individualStrokeWeights;
        this.effect = frame?.effects;
        this.paddingLeft = frame?.paddingLeft;
        this.paddingRight = frame?.paddingRight;
        this.paddingTop = frame?.paddingTop;
        this.paddingBottom = frame?.paddingBottom;
        this.gap = frame?.itemSpacing;
        this.layoutMode = frame?.layoutMode;
        this.layoutWrap = frame?.layoutWrap;
        this.counterAxisAlignItems = frame?.counterAxisAlignItems;
        this.primaryAxisAlignItems = frame?.primaryAxisAlignItems;
        this.counterAxisSpacing = frame?.counterAxisSpacing;
        this.counterAxisAlignContent = frame?.counterAxisAlignContent;
        this.children = frame?.children || [];
        this.visible = frame?.visible;
        this.type = frame?.type;
        this.opacity = frame?.opacity;
        this.textContent = frame?.name;
        this.strokeWeight = frame?.strokeWeight;
    }

    private CreateReactElement(frame: ElementProps, parentBoundingBox?: Rectangle) {
        const top = parentBoundingBox ? frame.absoluteBoundingBox.y - parentBoundingBox.y : 10;
        const left = parentBoundingBox ? frame.absoluteBoundingBox.x - parentBoundingBox.x : 10;
        const position = parentBoundingBox ? 'absolute' : 'relative';
        this.updateFrameProperties(frame);


        

        if(this.type === "LINE") {
            const line = new Line(getWidth(this.type, this.boundingBox, this.rotation), setColor(this.strokes), position, top, left, this.rotation, this.strokeWeight);
            return line.getReactComponent();
        }
        if (this.type === "TEXT") {
            const text = new Text( getWidth(this.type, this.boundingBox, this.rotation), getHeight(this.type, this.boundingBox , this.rotation), setColor(this.fill), position, top, left, this.textContent, frame.style);
                    
            return text.getReactComponent();
        }
        return frame.visible !== false && createElement(
            'div',
            {
                style: {
                    width: `${getWidth(this.type, this.boundingBox, this.rotation)}px`,
                    height: `${getHeight(this.type, this.boundingBox, this.rotation)}px`,
                    position: parentBoundingBox ? 'absolute' : 'relative',
                    top: this.type === "VECTOR" ? `${top + (this.boundingBox.height / 2) - 10}px` : `${top}px`,      // Use calculated top position
                    left: `${left}px`,    // Use calculated left position
                    transform: `rotate(${this.rotation || 0}rad)`,
                    borderTopLeftRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[0]}px` : `${this.borderRadius}px`,
                    borderTopRightRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[1]}px` : `${this.borderRadius}px`,
                    borderBottomRightRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[2]}px` : `${this.borderRadius}px`,
                    borderBottomLeftRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[3]}px` : `${this.borderRadius}px`,
                    background: this.type === "REGULAR_POLYGON" ? 'none' : setColor(this.fill),
                    opacity: this.fill[0]?.opacity || this.opacity || 1,
                    borderTopWidth: `${this.individualStrokeWeights?.top || this.borderWidth}px`,
                    borderRightWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.right || this.borderWidth}px`,
                    borderBottomWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${this.boundingBox.width * 0.866}px` : `${this.individualStrokeWeights?.bottom || this.borderWidth}px`,
                    borderLeftWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.left || this.borderWidth}px`,
                    borderTopColor: this.strokes.length > 0 ? setColor(this.strokes) : 'transparent',
                    borderRightColor: this.strokes.length > 0 ? setColor(this.strokes) : 'transparent',
                    borderLeftColor: this.strokes.length > 0 ? setColor(this.strokes) : 'transparent',
                    borderBottomColor: this.strokes.length > 0 ? setColor(this.strokes) : this.type === "REGULAR_POLYGON" ? `${setColor(this.fill)}` : 'transparent',
                    borderStyle: this.strokeDashes ? 'dashed' : 'solid',
                    boxShadow: this.effect ? getBoxShadow(this.effect) : 'none',
                    filter: this.effect && this.effect[0]?.type === "LAYER_BLUR" ? `blur(${this.effect[0].radius}px)` : 'none',
                    backdropFilter: this.effect && this.effect[0]?.type === "BACKGROUND_BLUR" ? `blur(${this.effect[0].radius}px)` : 'none',
                    display: this.layoutMode ? 'flex' : 'block',
                    flexDirection: this.layoutMode === 'VERTICAL' ? 'column' : 'row',
                    flexWrap: this.layoutWrap === 'NO_WRAP' ? 'nowrap' : 'wrap',
                    justifyContent: this.primaryAxisAlignItems === 'CENTER' ? 'center' : this.primaryAxisAlignItems === 'MAX' ? 'flex-end' : 'flex-start',
                    alignItems: this.counterAxisAlignItems === 'CENTER' ? 'center' : this.counterAxisAlignItems === 'MAX' ? 'flex-end' : 'flex-start',
                    gap: `${this.gap || 0}px`,
                    padding: `${this.paddingTop || 0}px ${this.paddingRight || 0}px ${this.paddingBottom || 0}px ${this.paddingLeft || 0}px`,
                    alignContent: this.counterAxisAlignContent === 'AUTO' ? 'stretch' : 'flex-start',
                    columnGap: `${this.counterAxisSpacing || 0}px`,
                    rowGap: `${this.counterAxisSpacing || 0}px`,
                    
                    // marginBottom: this.type === "VECTOR" ? `${this.boundingBox.height * 0.01}px` : '0',
                },
            },
            this.CreateChildren(this.children, frame.absoluteBoundingBox)
        );
    }
    getHtmlElement = (frame: ElementProps, parentBoundingBox?: Rectangle): string => {
        const top = parentBoundingBox ? frame.absoluteBoundingBox.y - parentBoundingBox.y : 10;
        const left = parentBoundingBox ? frame.absoluteBoundingBox.x - parentBoundingBox.x : 10;
        const position = parentBoundingBox ? 'absolute' : 'relative';

        if(this.type === "LINE") {
            const line = new Line(getWidth(this.type, this.boundingBox, this.rotation), setColor(this.strokes), position, top, left, this.rotation, this.strokeWeight);
            return line.getHTML();
        }
        if (this.type === "TEXT") {
            const text = new Text(getWidth(this.type, this.boundingBox, this.rotation), getHeight(this.type, this.boundingBox , this.rotation), setColor(this.fill), position, top, left, this.textContent, frame.style);
            return text.getHTML();
        }
        return `<div style="
        width: ${getWidth(this.type, this.boundingBox, this.rotation)}px;
        height: ${getHeight(this.type, this.boundingBox, this.rotation)}px;
        position: ${parentBoundingBox ? 'absolute' : 'relative'};
        top: ${this.type === "VECTOR" ? `${top + (this.boundingBox.height / 2) - 10}px` : `${top}px`};
        left: ${left}px;
        transform: rotate(${this.rotation || 0}rad);
        border-top-left-radius: ${this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[0]}px` : `${this.borderRadius}px`};
        border-top-right-radius: ${this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[1]}px` : `${this.borderRadius}px`};
        border-bottom-right-radius: ${this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[2]}px` : `${this.borderRadius}px`};
        border-bottom-left-radius: ${this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[3]}px` : `${this.borderRadius}px`};
        background: ${this.type === "REGULAR_POLYGON" ? 'none' : setColor(this.fill)};
        opacity: ${this.fill[0]?.opacity || this.opacity || 1};
        border-top-width: ${this.individualStrokeWeights?.top || this.borderWidth}px;
        border-right-width: ${this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.right || this.borderWidth}px`};
        border-bottom-width: ${this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${this.boundingBox.width * 0.866}px` : `${this.individualStrokeWeights?.bottom || this.borderWidth}px`};
        border-left-width: ${this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.left || this.borderWidth}px`};
        border-top-color: ${this.strokes.length > 0 ? setColor(this.strokes) : 'transparent'};
        border-right-color: ${this.strokes.length > 0 ? setColor(this.strokes) : 'transparent'};
        border-left-color: ${this.strokes.length > 0 ? setColor(this.strokes) : 'transparent'};
        border-bottom-color: ${this.strokes.length > 0 ? setColor(this.strokes) : this.type === "REGULAR_POLYGON" ? `${setColor(this.fill)}` : 'transparent'};
        border-style: ${this.strokeDashes ? 'dashed' : 'solid'};
        box-shadow: ${this.effect ? getBoxShadow(this.effect) : 'none'};
        filter: ${this.effect && this.effect[0]?.type === "LAYER_BLUR" ? `blur(${this.effect[0].radius}px)` : 'none'};
        backdrop-filter: ${this.effect && this.effect[0]?.type === "BACKGROUND_BLUR" ? `blur(${this.effect[0].radius}px)` : 'none'};
        display: ${this.layoutMode ? 'flex' : 'block'};
        flex-direction: ${this.layoutMode === 'VERTICAL' ? 'column' : 'row'};
        flex-wrap: ${this.layoutWrap === 'NO_WRAP' ? 'nowrap' : 'wrap'};
        justify-content: ${this.primaryAxisAlignItems === 'CENTER' ? 'center' : this.primaryAxisAlignItems === 'MAX' ? 'flex-end' : 'flex-start'};
        align-items: ${this.counterAxisAlignItems === 'CENTER' ? 'center' : this.counterAxisAlignItems === 'MAX' ? 'flex-end' : 'flex-start'};
        gap: ${this.gap || 0}px;
        padding: ${this.paddingTop || 0}px ${this.paddingRight || 0}px ${this.paddingBottom || 0}px ${this.paddingLeft || 0}px;
        align-content: ${this.counterAxisAlignContent === 'AUTO' ? 'stretch' : 'flex-start'};
        column-gap: ${this.counterAxisSpacing || 0}px;
        row-gap: ${this.counterAxisSpacing || 0}px;
    ">
        ${this.CreateHtmlChildren(this.children, frame.absoluteBoundingBox)}
    </div>`;
    }


    private updateFrameProperties(frame: ElementProps) {
        this.boundingBox = frame.absoluteBoundingBox;
        this.fill = frame?.fills || [];
        this.strokes = frame?.strokes || [];
        this.rotation = frame?.rotation;
        this.borderRadius = frame?.cornerRadius;
        this.borderWidth = frame?.strokes?.length > 0 ? frame?.strokeWeight : 0;
        this.borderRadii = frame?.rectangleCornerRadii;
        this.strokeDashes = frame?.strokeDashes;
        this.individualStrokeWeights = frame?.individualStrokeWeights;
        this.effect = frame?.effects;
        this.paddingLeft = frame?.paddingLeft;
        this.paddingRight = frame?.paddingRight;
        this.paddingTop = frame?.paddingTop;
        this.paddingBottom = frame?.paddingBottom;
        this.gap = frame?.itemSpacing;
        this.layoutMode = frame?.layoutMode;
        this.layoutWrap = frame?.layoutWrap;
        this.counterAxisAlignItems = frame?.counterAxisAlignItems;
        this.primaryAxisAlignItems = frame?.primaryAxisAlignItems;
        this.counterAxisSpacing = frame?.counterAxisSpacing;
        this.counterAxisAlignContent = frame?.counterAxisAlignContent;
        this.children = frame?.children || [];
    }

    private CreateChildren(children: ElementProps[], parentBoundingBox: Rectangle): JSX.Element[] {
        return children.map((child) => {
            let Div = new Element(child);
            return Div.CreateReactElement(child, parentBoundingBox);
        }).filter((element) => element !== false);
    }
    private CreateHtmlChildren(children: ElementProps[], parentBoundingBox: Rectangle ): string {
        return children.map((child) => {
            let Div = new Element(child);
            return Div.getHtmlElement(child,parentBoundingBox );
        }).join('');
    }
    CreateReactComponent = () => {
        return this.CreateReactElement(this.frame);
    }
    createHtmlComponent = () => {
        return this.getHtmlElement(this.frame);
    }
}
