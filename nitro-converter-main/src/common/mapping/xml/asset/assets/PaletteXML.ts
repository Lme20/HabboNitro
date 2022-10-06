export class PaletteXML
{
    private readonly _id: number;
    private readonly _source: string;
    private readonly _master: boolean;
    private readonly _tags: string[];
    private readonly _breed: number;
    private readonly _colorTag: number;
    private readonly _color1: string;
    private readonly _color2: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.source !== undefined) this._source = attributes.source;
            if(attributes.master !== undefined) this._master = (attributes.master === 'true') ? true : false;
            if(attributes.tags !== undefined) this._tags = attributes.tags.split(',');
            if(attributes.breed !== undefined) this._breed = parseInt(attributes.breed);
            if(attributes.colortag !== undefined) this._colorTag = parseInt(attributes.colortag);
            if(attributes.color1 !== undefined) this._color1 = attributes.color1;
            if(attributes.color2 !== undefined) this._color2 = attributes.color2;
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get source(): string
    {
        return this._source;
    }

    public get master(): boolean
    {
        return this._master;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public get breed(): number
    {
        return this._breed;
    }

    public get colorTag(): number
    {
        return this._colorTag;
    }

    public get color1(): string
    {
        return this._color1;
    }

    public get color2(): string
    {
        return this._color2;
    }
}
