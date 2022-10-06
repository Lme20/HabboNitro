export class AddXML
{
    private readonly _id: string;
    private readonly _align: string;
    private readonly _blend: string;
    private readonly _ink: number;
    private readonly _base: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.align !== undefined) this._align = attributes.align;
            if(attributes.blend !== undefined) this._blend = attributes.blend;
            if(attributes.ink !== undefined) this._ink = parseInt(attributes.ink);
            if(attributes.base !== undefined) this._base = attributes.base;
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get align(): string
    {
        return this._align;
    }

    public get blend(): string
    {
        return this._blend;
    }

    public get ink(): number
    {
        return this._ink;
    }

    public get base(): string
    {
        return this._base;
    }
}
