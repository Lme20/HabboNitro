export class LayerXML
{
    private readonly _id: number;
    private readonly _alpha: number;
    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;
    private readonly _ink: string;
    private readonly _tag: string;
    private readonly _ignoreMouse: boolean;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.alpha !== undefined) this._alpha = parseInt(attributes.alpha);
            if(attributes.x !== undefined) this._x = parseInt(attributes.x);
            if(attributes.y !== undefined) this._y = parseInt(attributes.y);
            if(attributes.z !== undefined) this._z = parseInt(attributes.z);
            if(attributes.ink !== undefined) this._ink = attributes.ink;
            if(attributes.tag !== undefined) this._tag = attributes.tag;

            if(attributes.ignoreMouse !== undefined) this._ignoreMouse = (attributes.ignoreMouse === '1');
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get alpha(): number
    {
        return this._alpha;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get z(): number
    {
        return this._z;
    }

    public get ink(): string
    {
        return this._ink;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public get ignoreMouse(): boolean
    {
        return this._ignoreMouse;
    }
}
