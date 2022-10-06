export class AssetXML
{
    private readonly _name: string;
    private readonly _source: string;
    private readonly _x: number;
    private readonly _y: number;
    private readonly _flipH: boolean;
    private readonly _flipV: boolean;
    private readonly _usesPalette: boolean;

    constructor(asset: any)
    {
        const attributes = asset.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.source !== undefined) this._source = attributes.source;
            if(attributes.x !== undefined) this._x = parseInt(attributes.x);
            if(attributes.x !== undefined) this._y = parseInt(attributes.y);
            if(attributes.flipH !== undefined) this._flipH = (attributes.flipH === '1');
            if(attributes.flipV !== undefined) this._flipV = (attributes.flipV === '1');
            if(attributes.usesPalette !== undefined) this._usesPalette = (attributes.usesPalette === '1');
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get source(): string
    {
        return this._source;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public get flipV(): boolean
    {
        return this._flipV;
    }

    public get usesPalette(): boolean
    {
        return this._usesPalette;
    }
}
