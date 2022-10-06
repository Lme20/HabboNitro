export class ModelDirectionXML
{
    private readonly _id: number;

    constructor(xml: any)
    {
        if(xml.id !== undefined) this._id = parseInt(xml.id);
    }

    public get id(): number
    {
        return this._id;
    }
}
