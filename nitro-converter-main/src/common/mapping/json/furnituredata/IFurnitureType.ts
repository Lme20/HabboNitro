export interface IFurnitureType
{
    id?: number;
    classname?: string;
    revision?: number;
    category?: string;
    defaultdir?: number;
    xdim?: number;
    ydim?: number;
    partcolors?: { color: string[] };
    name?: string;
    description?: string;
    adurl?: string;
    offerid?: number;
    buyout?: boolean;
    rentofferid?: number;
    rentbuyout?: boolean;
    bc?: boolean;
    excludeddynamic?: boolean;
    customparams?: string;
    specialtype?: number;
    canstandon?: boolean;
    cansiton?: boolean;
    canlayon?: boolean;
    furniline?: string;
    environment?: string;
    rare?: boolean;
}
