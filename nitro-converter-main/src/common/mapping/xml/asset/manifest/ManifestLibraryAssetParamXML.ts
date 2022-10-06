export class ManifestLibraryAssetParamXML
{
    private readonly _value: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            this._value = attributes.value;
        }
    }

    public get value(): string
    {
        return this._value;
    }
}
