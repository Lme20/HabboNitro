export class ShadowXML
{
    private readonly _id: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
        }
    }

    public get id(): string
    {
        return this._id;
    }
}
