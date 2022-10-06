export class ColorLayerXML
{
    private readonly _id: number;
    private readonly _color: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.color !== undefined) this._color = attributes.color;
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get color(): string
    {
        return this._color;
    }
}
