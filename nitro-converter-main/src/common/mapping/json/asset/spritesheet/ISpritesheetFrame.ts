export interface ISpritesheetFrame
{
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    rotated: boolean;
    trimmed: boolean;
    spriteSourceSize: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    sourceSize: {
        w: number;
        h: number;
    };
    pivot: {
        x: number;
        y: number;
    };
}
