export class FrameOffsetXML
{
    private readonly _direction: number;
    private readonly _x: number;
    private readonly _y: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.direction !== undefined) this._direction = parseInt(attributes.direction);
            if(attributes.x !== undefined) this._x = parseInt(attributes.x);
            if(attributes.y !== undefined) this._y = parseInt(attributes.y);
        }
    }

    public get direction(): number
    {
        return this._direction;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }
}
