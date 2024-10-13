
import { createElement } from 'react';
import { Effect } from "@/interface/Effect";
import { FrameProps } from "@/interface/Frame";
import { Fill, GradientPosition } from "@/interface/Paint";

export class Frame {
    boundingBox: FrameProps['absoluteBoundingBox'];
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
    children: FrameProps[];
    frame: FrameProps;
    visible: boolean;
    type: "FRAME" | "RECTANGLE" | "ELLIPSE" | "VECTOR" | "REGULAR_POLYGON";
    opacity?: number;
    rotationInRadians?: number;


    constructor(frame: FrameProps, image?: string) {
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
    }
    private setBackground(fill: Fill[]) {
        if (fill[0]?.type === 'SOLID') {
            return `rgba(${fill[0].color.r * 255}, ${fill[0].color.g * 255}, ${fill[0].color.b * 255}, ${fill[0].color.a})`
        }
        else if (fill[0]?.type === 'GRADIENT_LINEAR') {
            const fills = fill[0].gradientStops.map((stop) => {
                return `rgba(${stop.color.r * 255}, ${stop.color.g * 255}, ${stop.color.b * 255}, ${stop.color.a}) ${stop.position * 100}%`;
            });
            return `linear-gradient(${this.calculateGradientDirection(fill[0].gradientHandlePositions)}, ${fills.join(', ')})`;
        }
        else if (fill[0]?.type === 'GRADIENT_RADIAL') {
            const fills = fill[0].gradientStops.map((stop) => {
                return `rgba(${stop.color.r * 255}, ${stop.color.g * 255}, ${stop.color.b * 255}, ${stop.color.a}) ${stop.position * 100}%`;
            });
            return `radial-gradient(${this.determineGradientShapeAndCenter(fill[0].gradientHandlePositions)}, ${fills.join(', ')})`;
        }
        else if (fill[0]?.type === 'GRADIENT_ANGULAR') {
            const fills = fill[0].gradientStops.map((stop) => {
                return `rgba(${stop.color.r * 255}, ${stop.color.g * 255}, ${stop.color.b * 255}, ${stop.color.a}) ${stop.position * 100}%`;
            });
            return `conic-gradient(${fills.join(', ')})`;
        }
        else if (fill[0]?.type === 'GRADIENT_DIAMOND') {
            const fills = fill[0].gradientStops.map((stop) => {
                return `rgba(${stop.color.r * 255}, ${stop.color.g * 255}, ${stop.color.b * 255}, ${stop.color.a}) ${stop.position * 100}%`;
            });
            return `linear-gradient( ${fills.join(', ')})`;
        }
        else if (fill[0]?.type === 'IMAGE') {
            return `url(https://www.shutterstock.com/shutterstock/photos/2179364083/display_1500/stock-photo-no-picture-available-placeholder-thumbnail-icon-illustration-design-2179364083.jpg)`;
        }
        return '';
    }

    private determineGradientShapeAndCenter(gradientHandlePositions: GradientPosition[]) {
        if (!gradientHandlePositions || gradientHandlePositions.length < 2) {
            throw new Error('Insufficient handle positions');
        }

        // Determine the center of the gradient
        const centerHandle = gradientHandlePositions[0];
        const centerX = Number(centerHandle.x.toFixed(2));
        const centerY = Number(centerHandle.y.toFixed(2));

        // Determine if the gradient is circle or ellipse
        const distancesFromCenter = gradientHandlePositions.slice(2).map(handle => {
            console.log(handle);
            return Math.sqrt(Math.pow(Number(handle.x.toFixed(2)) - centerX, 2) + Math.pow(Number(handle.y.toFixed(2)) - centerY, 2));
        });
        // console.log(distancesFromCenter);

        // Assume circle if all distances are approximately the same
        const tolerance = 0.01; // tolerance for floating-point comparison
        const firstDistance = distancesFromCenter[0];
        const isCircle = distancesFromCenter.every(distance => Math.abs(distance - firstDistance) < tolerance);

        // Determine shape
        const shape = isCircle ? 'circle' : 'ellipse';

        return shape;
    }

    private calculateGradientDirection(gradientHandlePositions: GradientPosition[]) {
        if (gradientHandlePositions.length < 2) {
            throw new Error("At least two gradient handle positions are required.");
        }

        const start = gradientHandlePositions[0];
        const end = gradientHandlePositions[1];
        const vectorX = end.x - start.x;
        const vectorY = end.y - start.y;
        const angleInRadians = Math.atan2(vectorY, vectorX);
        const angleInDegrees = (angleInRadians * 180) / Math.PI;

        return `${Math.round(angleInDegrees) - 90}deg`;
    }

    private getBoxShadow(effects: Effect[]) {
        const shadow = effects[0];
        if (shadow?.type === 'DROP_SHADOW') {
            return `${shadow.offset?.x}px ${shadow.offset?.y}px ${shadow.radius}px ${shadow.spread}px rgba(${shadow.color?.r * 255}, ${shadow.color?.g * 255}, ${shadow.color?.b * 255}, ${shadow.color?.a})`;
        } else if (shadow?.type === 'INNER_SHADOW') {
            return `${shadow.offset?.x}px ${shadow.offset?.y}px ${shadow.radius}px ${shadow.spread}px rgba(${shadow.color?.r * 255}, ${shadow.color?.g * 255}, ${shadow.color?.b * 255}, ${shadow.color?.a}) inset`;
        } else if (shadow?.type === 'BACKGROUND_BLUR') {
            return `${shadow.radius}px`;
        }
        return 'none';
    }

    CreateReactComponent = () => {
        return this.CreateReactElement(this.frame);
    }
    is90Or270(radians: number) {
        // Convert radians to degrees
        const degrees = radians * (180 / Math.PI);
        
        if(Math.abs(degrees) === 90 || Math.abs(degrees) === -90) {
        return Math.abs(degrees) % 90 === 0;
        }
      }
    private getWidth() {
        if(this.type === "REGULAR_POLYGON") {
            return 0;
        }
        if(this.rotation && this.is90Or270(this.rotation)) {
            return this.boundingBox.height;
        }
        return this.boundingBox.width;
    }
    private getHeight() {
        if(this.type === "REGULAR_POLYGON" || this.type === "VECTOR") {
            return 0;
        }
        if(this.rotation && this.is90Or270(this.rotation)) {
            return this.boundingBox.width;
        }
        return this.boundingBox.height;
    }

    private CreateReactElement(frame: FrameProps, parentBoundingBox?: Rectangle) {
        const top = parentBoundingBox ? frame.absoluteBoundingBox.y - parentBoundingBox.y : 10;
        const left = parentBoundingBox ? frame.absoluteBoundingBox.x - parentBoundingBox.x : 10;
        this.updateFrameProperties(frame);

        return frame.visible !== false && createElement(
            'div',
            {
                style: {
                    width: `${this.getWidth()}px`,
                    height: `${this.getHeight()}px`,
                    position: parentBoundingBox ? 'absolute' : 'relative',
                    top: this.type === "VECTOR" ? `${top + (this.boundingBox.height / 2) - 10}px` : `${top}px`,      // Use calculated top position
                    left: `${left}px`,    // Use calculated left position
                    transform: `rotate(${this.rotation || 0}rad)`,
                    borderTopLeftRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[0]}px` : `${this.borderRadius}px`,
                    borderTopRightRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[1]}px` : `${this.borderRadius}px`,
                    borderBottomRightRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[2]}px` : `${this.borderRadius}px`,
                    borderBottomLeftRadius: this.type === 'ELLIPSE' ? '50%' : this.borderRadii ? `${this.borderRadii[3]}px` : `${this.borderRadius}px`,
                    background: this.type === "REGULAR_POLYGON" ? 'none' : this.setBackground(this.fill),
                    opacity: this.fill[0]?.opacity || this.opacity || 1,
                    borderTopWidth: `${this.individualStrokeWeights?.top || this.borderWidth}px`,
                    borderRightWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.right || this.borderWidth}px`,
                    borderBottomWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${this.boundingBox.width * 0.866}px` : `${this.individualStrokeWeights?.bottom || this.borderWidth}px`,
                    borderLeftWidth: this.type === "VECTOR" ? 0 : this.type === "REGULAR_POLYGON" ? `${(this.boundingBox.width - (this.boundingBox.width * 0.15)) / 2}px` : `${this.individualStrokeWeights?.left || this.borderWidth}px`,
                    borderTopColor: this.strokes.length > 0 ? this.setBackground(this.strokes) : 'transparent',
                    borderRightColor: this.strokes.length > 0 ? this.setBackground(this.strokes) : 'transparent',
                    borderLeftColor: this.strokes.length > 0 ? this.setBackground(this.strokes) : 'transparent',
                    borderBottomColor: this.strokes.length > 0 ? this.setBackground(this.strokes) : this.type === "REGULAR_POLYGON" ? `${this.setBackground(this.fill)}` : 'transparent',
                    borderStyle: this.strokeDashes ? 'dashed' : 'solid',
                    boxShadow: this.effect ? this.getBoxShadow(this.effect) : 'none',
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


    private updateFrameProperties(frame: FrameProps) {
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

    private CreateChildren(children: FrameProps[], parentBoundingBox: Rectangle): JSX.Element[] {
        return children.map((child) => {
            let Div = new Frame(child);
            return Div.CreateReactElement(child, parentBoundingBox);
        }).filter((element) => element !== false);
    }

    // CreateChildren(children: FrameProps[], parentBoundingBox: Rectangle): JSX.Element[] {
    //     return children.map((child) => {
    //         const Div = new Frame(child);
    //         // Pass the parent's bounding box to the child's CreateReactElement method
    //         return Div.CreateReactElement(child, parentBoundingBox);
    //     });
    // }

}
