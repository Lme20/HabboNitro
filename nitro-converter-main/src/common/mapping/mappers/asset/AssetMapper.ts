import { IMAGE_SOURCES } from '../../../../swf';
import { IAsset, IAssetData, IAssetPalette } from '../../json';
import { AssetsXML, AssetXML, PaletteXML } from '../../xml';
import { Mapper } from './Mapper';

export class AssetMapper extends Mapper
{
    public static mapXML(assets: any, output: IAssetData): void
    {
        if(!assets || !output) return;

        AssetMapper.mapAssetsXML(new AssetsXML(assets.assets), output);
    }

    private static mapAssetsXML(xml: AssetsXML, output: IAssetData): void
    {
        if(!xml || !output) return;

        if(xml.assets !== undefined)
        {
            if(xml.assets.length)
            {
                output.assets = {};

                AssetMapper.mapAssetsAssetXML(xml.assets, output.assets);
            }
        }

        if(xml.palettes !== undefined)
        {
            if(xml.palettes.length)
            {
                output.palettes = {};

                AssetMapper.mapAssetsPaletteXML(xml.palettes, output.palettes);
            }
        }
    }

    private static mapAssetsAssetXML(xml: AssetXML[], output: { [index: string]: IAsset }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const assetXML of xml)
        {
            const asset: IAsset = {};

            if(assetXML.name !== undefined)
            {
                if(assetXML.name.startsWith('sh_')) continue;

                if(assetXML.name.indexOf('_32_') >= 0) continue;

                if(assetXML.source !== undefined)
                {
                    asset.source = assetXML.source;

                    if(IMAGE_SOURCES.has(assetXML.source)) asset.source = IMAGE_SOURCES.get(assetXML.source) as string;
                }

                if(assetXML.name !== undefined)
                {
                    if(IMAGE_SOURCES.has(assetXML.name)) asset.source = IMAGE_SOURCES.get(assetXML.name) as string;
                }

                if(assetXML.x !== undefined) asset.x = assetXML.x;
                if(assetXML.y !== undefined) asset.y = assetXML.y;
                if(assetXML.flipH !== undefined) asset.flipH = assetXML.flipH;
                if(assetXML.flipV !== undefined) asset.flipV = assetXML.flipV;
                if(assetXML.usesPalette !== undefined) asset.usesPalette = assetXML.usesPalette;

                output[assetXML.name] = asset;
            }
        }
    }

    private static mapAssetsPaletteXML(xml: PaletteXML[], output: { [index: string]: IAssetPalette }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const paletteXML of xml)
        {
            const palette: IAssetPalette = {};

            if(paletteXML.id !== undefined) palette.id = paletteXML.id;
            if(paletteXML.source !== undefined) palette.source = paletteXML.source;
            if(paletteXML.master !== undefined) palette.master = paletteXML.master;
            if(paletteXML.tags !== undefined) palette.tags = paletteXML.tags;
            if(paletteXML.breed !== undefined) palette.breed = paletteXML.breed;
            if(paletteXML.colorTag !== undefined) palette.colorTag = paletteXML.colorTag;
            if(paletteXML.color1 !== undefined) palette.color1 = paletteXML.color1;
            if(paletteXML.color2 !== undefined) palette.color2 = paletteXML.color2;

            output[paletteXML.id.toString()] = palette;
        }
    }
}
