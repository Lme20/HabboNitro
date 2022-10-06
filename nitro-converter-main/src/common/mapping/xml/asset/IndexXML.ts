export class IndexXML
{
    private readonly _type: string;
    private readonly _visualization: string;
    private readonly _logic: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.type !== undefined) this._type = attributes.type;
            if(attributes.visualization !== undefined) this._visualization = attributes.visualization;
            if(attributes.logic !== undefined) this._logic = attributes.logic;
        }
    }

    public get type(): string
    {
        return this._type;
    }

    public get visualization(): string
    {
        return this._visualization;
    }

    public get logic(): string
    {
        return this._logic;
    }
}
