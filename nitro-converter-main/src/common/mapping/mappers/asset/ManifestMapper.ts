import { IMAGE_SOURCES } from '../../../../swf';
import { IAsset, IAssetAlias, IAssetData } from '../../json';
import { ManifestLibraryAliasXML, ManifestLibraryAssetParamXML, ManifestLibraryAssetXML, ManifestLibraryXML, ManifestXML } from '../../xml';
import { Mapper } from './Mapper';

export class ManifestMapper extends Mapper
{
    public static mapXML(manifest: any, output: IAssetData): void
    {
        if(!manifest || !output) return;

        ManifestMapper.mapManifestXML(new ManifestXML(manifest.manifest), output);
    }

    private static mapManifestXML(xml: ManifestXML, output: IAssetData): void
    {
        if(!xml || !output) return;

        if(xml.library !== undefined) ManifestMapper.mapManifestLibraryXML(xml.library, output);
    }

    private static mapManifestLibraryXML(xml: ManifestLibraryXML, output: IAssetData): void
    {
        if(!xml || !output) return;

        if(xml.assets !== undefined)
        {
            if(xml.assets.length)
            {
                output.assets = {};

                ManifestMapper.mapManifestLibraryAssetXML(xml.assets, output.assets);
            }
        }

        if(xml.aliases !== undefined)
        {
            if(xml.aliases.length)
            {
                output.aliases = {};

                ManifestMapper.mapManifestLibraryAliasXML(xml.aliases, output.aliases);
            }
        }
    }

    private static mapManifestLibraryAssetXML(xml: ManifestLibraryAssetXML[], output: { [index: string]: IAsset }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const libraryAssetXML of xml)
        {
            const asset: IAsset = {};

            if(libraryAssetXML.name !== undefined)
            {
                if(libraryAssetXML.name.startsWith('sh_')) continue;

                if(libraryAssetXML.name.indexOf('_32_') >= 0) continue;

                if(libraryAssetXML.param !== undefined) ManifestMapper.mapManifestLibraryAssetParamXML(libraryAssetXML.param, asset);

                if(IMAGE_SOURCES.has(libraryAssetXML.name)) asset.source = IMAGE_SOURCES.get(libraryAssetXML.name);

                output[libraryAssetXML.name] = asset;
            }
        }
    }

    private static mapManifestLibraryAssetParamXML(xml: ManifestLibraryAssetParamXML, output: IAsset): void
    {
        if(!xml || !output) return;

        if(xml.value !== undefined)
        {
            const split = xml.value.split(',');

            output.x = parseInt(split[0]);
            output.y = parseInt(split[1]);
        }
    }

    private static mapManifestLibraryAliasXML(xml: ManifestLibraryAliasXML[], output: { [index: string]: IAssetAlias }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const libraryAliasXML of xml)
        {
            const alias: IAssetAlias = {};

            if(libraryAliasXML.name !== undefined)
            {
                if(libraryAliasXML.link !== undefined)
                {
                    if(libraryAliasXML.link.startsWith('sh_')) continue;

                    if(libraryAliasXML.link.indexOf('_32_') >= 0) continue;

                    alias.link = libraryAliasXML.link;
                }

                if(libraryAliasXML.flipH !== undefined) alias.flipH = libraryAliasXML.flipH;
                if(libraryAliasXML.flipH !== undefined) alias.flipV = libraryAliasXML.flipV;

                output[libraryAliasXML.name] = alias;
            }
        }
    }
}
