export class SoundSampleXML
{
    private readonly _id: number;
    private readonly _noPitch: boolean;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.nopitch !== undefined) this._noPitch = attributes.nopitch === 'true';
        }
    }

    public get id(): number
    {
        return this._id;
    }

    get noPitch(): boolean
    {
        return this._noPitch;
    }
}
