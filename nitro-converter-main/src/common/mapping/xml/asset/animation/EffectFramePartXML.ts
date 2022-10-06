import { EffectFramePartItemXML } from './EffectFramePartItemXML';

export class EffectFramePartXML
{
    private readonly _id: string;
    private readonly _frame: number;
    private readonly _base: string;
    private readonly _action: string;
    private readonly _dx: number;
    private readonly _dy: number;
    private readonly _dz: number;
    private readonly _dd: number;

    private readonly _items: EffectFramePartItemXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.frame !== undefined) this._frame = parseInt(attributes.frame);
            if(attributes.base !== undefined) this._base = attributes.base;
            if(attributes.action !== undefined) this._action = attributes.action;
            if(attributes.dx !== undefined) this._dx = parseInt(attributes.dx);
            if(attributes.dy !== undefined) this._dy = parseInt(attributes.dy);
            if(attributes.dz !== undefined) this._dz = parseInt(attributes.dz);
            if(attributes.dd !== undefined) this._dd = parseInt(attributes.dd);
        }

        if(xml.item !== undefined)
        {
            if(Array.isArray(xml.item))
            {
                this._items = [];

                for(const item of xml.item) this._items.push(new EffectFramePartItemXML(item));
            }
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get frame(): number
    {
        return this._frame;
    }

    public get base(): string
    {
        return this._base;
    }

    public get action(): string
    {
        return this._action;
    }

    public get dx(): number
    {
        return this._dx;
    }

    public get dy(): number
    {
        return this._dy;
    }

    public get dz(): number
    {
        return this._dz;
    }

    public get dd(): number
    {
        return this._dd;
    }

    public get items(): EffectFramePartItemXML[]
    {
        return this._items;
    }
}
