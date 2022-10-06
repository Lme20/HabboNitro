export class DirectionXML
{
    private readonly _id: number;
    private readonly _dx: number;
    private readonly _dy: number;
    private readonly _dz: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.dx !== undefined) this._dx = parseInt(attributes.dx);
            if(attributes.dy !== undefined) this._dy = parseInt(attributes.dy);
            if(attributes.dz !== undefined) this._dz = parseInt(attributes.dz);
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get dx(): number
    {
        return this._dx;
    }

    public get dy(): number
    {
        return this._dy;
    }

    public get dz(): number
    {
        return this._dz;
    }
}
