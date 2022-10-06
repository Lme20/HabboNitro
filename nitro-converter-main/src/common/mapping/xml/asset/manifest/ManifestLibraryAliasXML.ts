export class ManifestLibraryAliasXML
{
    private _name: string;
    private _link: string;
    private _flipH: boolean;
    private _flipV: boolean;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.link !== undefined) this._link = attributes.link;
            if(attributes.fliph !== undefined) this._flipH = (attributes.fliph === '1');
            if(attributes.flipv !== undefined) this._flipV = (attributes.flipv === '1');
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get link(): string
    {
        return this._link;
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public get flipV(): boolean
    {
        return this._flipV;
    }
}
