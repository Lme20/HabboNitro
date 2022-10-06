import { FrameOffsetXML } from './FrameOffsetXML';

export class FrameXML
{
    private readonly _id: string;
    private readonly _x: number;
    private readonly _y: number;
    private readonly _randomX: number;
    private readonly _randomY: number;

    private readonly _offsets: FrameOffsetXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.x !== undefined) this._x = parseInt(attributes.x);
            if(attributes.y !== undefined) this._y = parseInt(attributes.y);
            if(attributes.randomX !== undefined) this._randomX = parseInt(attributes.randomX);
            if(attributes.randomY !== undefined) this._randomY = parseInt(attributes.randomY);
        }

        if((xml.offsets !== undefined) && Array.isArray(xml.offsets))
        {
            this._offsets = [];

            for(const offsetParent of xml.offsets)
            {
                if(Array.isArray(offsetParent.offset)) for(const offset of offsetParent.offset) this._offsets.push(new FrameOffsetXML(offset));
            }
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get randomX(): number
    {
        return this._randomX;
    }

    public get randomY(): number
    {
        return this._randomY;
    }

    public get offsets(): FrameOffsetXML[]
    {
        return this._offsets;
    }
}
