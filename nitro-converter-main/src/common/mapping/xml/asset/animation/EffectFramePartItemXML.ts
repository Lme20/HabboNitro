export class EffectFramePartItemXML
{
    private readonly _id: string;
    private readonly _base: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.base !== undefined) this._base = attributes.base;
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get base(): string
    {
        return this._base;
    }
}
