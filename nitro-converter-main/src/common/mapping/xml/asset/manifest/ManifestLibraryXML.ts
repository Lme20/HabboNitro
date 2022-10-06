import { ManifestLibraryAliasXML } from './ManifestLibraryAliasXML';
import { ManifestLibraryAssetXML } from './ManifestLibraryAssetXML';

export class ManifestLibraryXML
{
    private readonly _name: string;
    private readonly _version: string;
    private readonly _assets: ManifestLibraryAssetXML[];
    private readonly _aliases: ManifestLibraryAliasXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.version !== undefined) this._version = attributes.version;
        }

        if((xml.assets !== undefined) && Array.isArray(xml.assets))
        {
            this._assets = [];

            for(const assetParent of xml.assets)
            {
                if(Array.isArray(assetParent.asset)) for(const asset of assetParent.asset) this._assets.push(new ManifestLibraryAssetXML(asset));
            }
        }

        if((xml.aliases !== undefined) && Array.isArray(xml.aliases))
        {
            this._aliases = [];

            for(const aliasParent of xml.aliases)
            {
                if(Array.isArray(aliasParent.alias)) for(const alias of aliasParent.alias) this._aliases.push(new ManifestLibraryAliasXML(alias));
            }
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get version(): string
    {
        return this._version;
    }

    public get assets(): ManifestLibraryAssetXML[]
    {
        return this._assets;
    }

    public get aliases(): ManifestLibraryAliasXML[]
    {
        return this._aliases;
    }
}
