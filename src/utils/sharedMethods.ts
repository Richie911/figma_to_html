import { Effect } from "@/interface/Effect";
import { Fill, GradientPosition } from "@/interface/Paint";
import { Rectangle } from "@/interface/Rectangle";

export function roundNumbers(num?: number) {
    if(num === undefined) {
        return 0;
    }
    return Math.round(num);
}

export function getWidth(type: string,  boundingBox: Rectangle, rotation?: number) {
    if(type === "REGULAR_POLYGON") {
        return 0;
    }
    if(rotation && is90Or270(rotation)) {
        return roundNumbers(boundingBox.height) ;
    }
    return roundNumbers(boundingBox.width);
}
export function getHeight(type: string, boundingBox: Rectangle, rotation?: number,) {
    if(type === "REGULAR_POLYGON" || type === "VECTOR") {
        return 0;
    }
    if(rotation && is90Or270(rotation)) {
        return roundNumbers(boundingBox.width);
    }
    return roundNumbers(boundingBox.height);
}
export function is90Or270(radians: number) {
    // Convert radians to degrees
    const degrees = radians * (180 / Math.PI);
    
    if(Math.abs(degrees) === 90 || Math.abs(degrees) === -90) {
    return Math.abs(degrees) % 90 === 0;
    }
  }

  export function radToDeg(radians?: number) {
    if(radians === undefined) {
      return 0;
    }
    return  90 + (90 -(radians * (180 / Math.PI)));
  }
export function getLineTopPosition (height?: number) {
    if(height === undefined) {
      return 0;
    }
    return height / 2;
}
export function getLineLeftPosition (left: number,  type: string, boundingBox: Rectangle, rotation?: number,) {
    const deg = radToDeg(rotation);
    if(Math.round(deg) % 90 === 0) {
      return left - getLineTopPosition(getHeight(type, boundingBox, rotation));
    }
    return left;
}
export function determineGradientShapeAndCenter(gradientHandlePositions: GradientPosition[]) {
    if (!gradientHandlePositions || gradientHandlePositions.length < 2) {
        throw new Error('Insufficient handle positions');
    }

    // Determine the center of the gradient
    const centerHandle = gradientHandlePositions[0];
    const centerX = Number(centerHandle.x.toFixed(2));
    const centerY = Number(centerHandle.y.toFixed(2));

    // Determine if the gradient is circle or ellipse
    const distancesFromCenter = gradientHandlePositions.slice(2).map(handle => {
        return Math.sqrt(Math.pow(Number(handle.x.toFixed(2)) - centerX, 2) + Math.pow(Number(handle.y.toFixed(2)) - centerY, 2));
    });

    // Assume circle if all distances are approximately the same
    const tolerance = 0.01; // tolerance for floating-point comparison
    const firstDistance = distancesFromCenter[0];
    const isCircle = distancesFromCenter.every(distance => Math.abs(distance - firstDistance) < tolerance);

    // Determine shape
    const shape = isCircle ? 'circle' : 'ellipse';

    return shape;
}

export function calculateGradientDirection(gradientHandlePositions: GradientPosition[]) {
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
export function setColor(fill: Fill[]) {
    if (fill[0]?.type === 'SOLID') {
        return `rgba(${roundNumbers(fill[0].color.r * 255)}, ${roundNumbers(fill[0].color.g * 255)}, ${roundNumbers(fill[0].color.b * 255)}, ${roundNumbers(fill[0].color.a)})`
    }
    else if (fill[0]?.type === 'GRADIENT_LINEAR') {
        const fills = fill[0].gradientStops.map((stop) => {
            return `rgba(${roundNumbers(stop.color.r * 255)}, ${roundNumbers(stop.color.g * 255)}, ${roundNumbers(stop.color.b * 255)}, ${roundNumbers(stop.color.a)}) ${roundNumbers(stop.position * 100)}%`;
        });
        return `linear-gradient(${calculateGradientDirection(fill[0].gradientHandlePositions)}, ${fills.join(', ')})`;
    }
    else if (fill[0]?.type === 'GRADIENT_RADIAL') {
        const fills = fill[0].gradientStops.map((stop) => {
            return `rgba(${roundNumbers(stop.color.r * 255)}, ${roundNumbers(stop.color.g * 255)}, ${roundNumbers(stop.color.b * 255)}, ${roundNumbers(stop.color.a)}) ${roundNumbers(stop.position * 100)}%`;
        });
        return `radial-gradient(${determineGradientShapeAndCenter(fill[0].gradientHandlePositions)}, ${fills.join(', ')})`;
    }
    else if (fill[0]?.type === 'GRADIENT_ANGULAR') {
        const fills = fill[0].gradientStops.map((stop) => {
            return `rgba(${roundNumbers(stop.color.r * 255)}, ${roundNumbers(stop.color.g * 255)}, ${roundNumbers(stop.color.b * 255)}, ${roundNumbers(stop.color.a)}) ${roundNumbers(stop.position * 100)}%`;
        });
        return `conic-gradient(${fills.join(', ')})`;
    }
    else if (fill[0]?.type === 'GRADIENT_DIAMOND') {
        const fills = fill[0].gradientStops.map((stop) => {
            return `rgba(${roundNumbers(stop.color.r * 255)}, ${roundNumbers(stop.color.g * 255)}, ${roundNumbers(stop.color.b * 255)}, ${roundNumbers(stop.color.a)}) ${roundNumbers(stop.position * 100)}%`;
        });
        return `linear-gradient( ${fills.join(', ')})`;
    }
    else if (fill[0]?.type === 'IMAGE') {
        return `url(https://www.shutterstock.com/shutterstock/photos/2179364083/display_1500/stock-photo-no-picture-available-placeholder-thumbnail-icon-illustration-design-2179364083.jpg)`;
    }
    return '';
}
export function getBoxShadow(effects: Effect[]) {
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