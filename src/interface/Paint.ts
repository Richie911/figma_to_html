export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface GradientStop {
    position: number;
    color: Color;
}

interface ImageProperties {
    url?: string;
    size: string;
    position: string;
    repeat: string;
}

interface VideoProperties {
    url: string;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
}

interface SolidFill {
    type: "SOLID";
    color: Color;
}

export interface GradientPosition {
    x: number;
    y: number;
}

interface LinearGradientFill {
    type: "GRADIENT_LINEAR";
    gradientStops: GradientStop[];
    gradientHandlePositions: GradientPosition[]
}

interface RadialGradientFill {
    type: "GRADIENT_RADIAL";
    gradientStops: GradientStop[];
    gradientHandlePositions: GradientPosition[]
}

interface AngularGradientFill {
    type: "GRADIENT_ANGULAR";
    gradientStops: GradientStop[];
}

interface DiamondGradientFill {
    type: "GRADIENT_DIAMOND";
    gradientStops: GradientStop[];
    gradientHandlePositions: GradientPosition[]
}

interface ImageFill {
    type: "IMAGE";
    image: ImageProperties;
}

interface EmojiFill {
    type: "EMOJI";
    emoji: string;
}

interface VideoFill {
    type: "VIDEO";
    video: VideoProperties;
}

export type FillTypes =
    | SolidFill
    | LinearGradientFill
    | RadialGradientFill
    | AngularGradientFill
    | DiamondGradientFill
    | ImageFill
    | EmojiFill
    | VideoFill

export type Fill = FillTypes & {
    opacity?: number;
};

