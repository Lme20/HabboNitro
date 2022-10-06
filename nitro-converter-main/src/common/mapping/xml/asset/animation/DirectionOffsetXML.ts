export class DirectionOffsetXML
{
    private readonly _offset: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.offset !== undefined) this._offset = parseInt(attributes.offset);
        }
    }

    public get offset(): number
    {
        return this._offset;
    }
}
