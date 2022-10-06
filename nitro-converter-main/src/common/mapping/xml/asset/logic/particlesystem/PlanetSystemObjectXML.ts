export class PlanetSystemObjectXML
{
    private readonly _id: number;
    private readonly _name: string;
    private readonly _parent: string;
    private readonly _radius: number;
    private readonly _arcSpeed: number;
    private readonly _arcOffset: number;
    private readonly _blend: number;
    private readonly _height: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.parent !== undefined) this._parent = attributes.parent;
            if(attributes.radius !== undefined) this._radius = parseFloat(attributes.radius);
            if(attributes.arcspeed !== undefined) this._arcSpeed = parseFloat(attributes.arcspeed);
            if(attributes.arcoffset !== undefined) this._arcOffset = parseFloat(attributes.arcoffset);
            if(attributes.blend !== undefined) this._blend = parseFloat(attributes.blend);
            if(attributes.height !== undefined) this._height = parseFloat(attributes.height);
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get parent(): string
    {
        return this._parent;
    }

    public get radius(): number
    {
        return this._radius;
    }

    public get arcSpeed(): number
    {
        return this._arcSpeed;
    }

    public get arcOffset(): number
    {
        return this._arcOffset;
    }

    public get blend(): number
    {
        return this._blend;
    }

    public get height(): number
    {
        return this._height;
    }
}
