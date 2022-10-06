export class FigureLibraryPartXML
{
    private _id: number;
    private _type: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.type !== undefined) this._type = attributes.type;
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): string
    {
        return this._type;
    }
}
