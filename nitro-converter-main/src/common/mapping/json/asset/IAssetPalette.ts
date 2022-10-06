export interface IAssetPalette
{
    id?: number;
    source?: string;
    master?: boolean;
    tags?: string[];
    breed?: number;
    colorTag?: number;
    color1?: string;
    color2?: string;
    rgb?: [ number, number, number ][];
}
