export class GestureXML
{
    private readonly _id: string;
    private readonly _animationId: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.animationId !== undefined) this._animationId = parseInt(attributes.animationId);
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get animationId(): number
    {
        return this._animationId;
    }
}
