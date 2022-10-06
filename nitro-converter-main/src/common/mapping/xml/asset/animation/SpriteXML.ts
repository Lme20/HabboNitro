import { DirectionXML } from './DirectionXML';

export class SpriteXML
{
    private readonly _id: string;
    private readonly _member: string;
    private readonly _directions: number;
    private readonly _staticY: number;
    private readonly _ink: number;

    private readonly _directionList: DirectionXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.member !== undefined) this._member = attributes.member;
            if(attributes.directions !== undefined) this._directions = parseInt(attributes.directions);
            if(attributes.staticY !== undefined) this._staticY = parseInt(attributes.staticY);
            if(attributes.ink !== undefined) this._ink = parseInt(attributes.ink);
        }

        if(xml.direction !== undefined)
        {
            if(Array.isArray(xml.direction))
            {
                this._directionList = [];

                for(const direction of xml.direction) this._directionList.push(new DirectionXML(direction));
            }
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get member(): string
    {
        return this._member;
    }

    public get directions(): number
    {
        return this._directions;
    }

    public get staticY(): number
    {
        return this._staticY;
    }

    public get ink(): number
    {
        return this._ink;
    }

    public get directionList(): DirectionXML[]
    {
        return this._directionList;
    }
}
