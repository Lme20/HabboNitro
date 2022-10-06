export class MaskXML
{
    private readonly _type: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.type !== undefined) this._type = attributes.type;
        }
    }

    public get type(): string
    {
        return this._type;
    }
}
