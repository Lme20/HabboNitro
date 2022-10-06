import { ManifestLibraryXML } from './ManifestLibraryXML';

export class ManifestXML
{
    private readonly _library: ManifestLibraryXML;

    constructor(xml: any)
    {
        if(xml.library !== undefined)
        {
            if(xml.library[0] !== undefined) this._library = new ManifestLibraryXML(xml.library[0]);
        }
    }

    public get library(): ManifestLibraryXML
    {
        return this._library;
    }
}
