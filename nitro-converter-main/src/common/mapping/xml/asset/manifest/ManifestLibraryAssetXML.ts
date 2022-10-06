import { ManifestLibraryAssetParamXML } from './ManifestLibraryAssetParamXML';

export class ManifestLibraryAssetXML
{
    private readonly _name: string;
    private readonly _mimeType: string;
    private readonly _param: ManifestLibraryAssetParamXML;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.mimeType !== undefined) this._mimeType = attributes.mimeType;
        }

        if(xml.param !== undefined)
        {
            if(xml.param[0] !== undefined) this._param = new ManifestLibraryAssetParamXML(xml.param[0]);
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get param(): ManifestLibraryAssetParamXML
    {
        return this._param;
    }
}
