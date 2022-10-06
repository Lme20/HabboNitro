
export class EffectMapEffectXML
{
    private _id: string;
    private _lib: string;
    private _type: string;
    private _revision: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.lib !== undefined) this._lib = attributes.lib;
            if(attributes.type !== undefined) this._type = attributes.type;
            if(attributes.revision !== undefined) this._revision = parseInt(attributes.revision);
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get lib(): string
    {
        return this._lib;
    }

    public get type(): string
    {
        return this._type;
    }

    public get revision(): number
    {
        return this._revision;
    }
}
