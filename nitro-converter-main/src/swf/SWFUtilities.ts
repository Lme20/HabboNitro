import { wrap } from 'bytebuffer';
import { parseStringPromise } from 'xml2js';
import { AnimationMapper, AssetMapper, IAssetData, IndexMapper, LogicMapper, ManifestMapper, NitroBundle, SpriteBundle, VisualizationMapper } from '../common';
import { HabboAssetSWF } from './HabboAssetSWF';
import { DefineBinaryDataTag } from './tags';

export class SWFUtilities
{
    private static removeComments(data: string): string
    {
        return data.replace(/<!--.*?-->/sg, '');
    }

    public static createNitroBundle(className: string, assetData: IAssetData, spriteBundle: SpriteBundle): NitroBundle
    {
        if(spriteBundle && (spriteBundle.spritesheet !== undefined)) assetData.spritesheet = spriteBundle.spritesheet;

        const nitroBundle = new NitroBundle();

        nitroBundle.addFile((className + '.json'), Buffer.from(JSON.stringify(assetData)));

        if(spriteBundle && (spriteBundle.imageData !== undefined)) nitroBundle.addFile(spriteBundle.imageData.name, spriteBundle.imageData.buffer);

        return nitroBundle;
    }

    public static getBinaryData(habboAssetSWF: HabboAssetSWF, type: string, documentNameTwice: boolean, snakeCase: boolean = false): DefineBinaryDataTag
    {
        let binaryName  = habboAssetSWF.getFullClassName(type, documentNameTwice, snakeCase);
        let tag         = habboAssetSWF.getBinaryTagByName(binaryName);

        if(!tag)
        {
            binaryName  = habboAssetSWF.getFullClassNameSnake(type, documentNameTwice, true);
            tag         = habboAssetSWF.getBinaryTagByName(binaryName);
        }

        return tag;
    }

    public static async getManifestXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'manifest', false, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static async getIndexXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'index', false, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static async getAssetsXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'assets', true, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static async getLogicXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'logic', true, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static async getVisualizationXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'visualization', true, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static async getAnimationXML(habboAssetSWF: HabboAssetSWF, snakeCase: boolean = false): Promise<any>
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, 'animation', false, snakeCase);

        if(!binaryData) return null;

        return await parseStringPromise(this.removeComments(binaryData.binaryData));
    }

    public static getPalette(habboAssetSWF: HabboAssetSWF, paletteName: string): [ number, number, number ][]
    {
        const binaryData = SWFUtilities.getBinaryData(habboAssetSWF, paletteName, false);

        if(!binaryData || !binaryData.binaryDataBuffer) return null;

        const byteBuffer = wrap(binaryData.binaryDataBuffer);

        const paletteColors: [ number, number, number ][] = [];

        let R = 0;
        let G = 0;
        let B = 0;
        let counter = 1;

        while((binaryData.binaryDataBuffer.length - byteBuffer.offset) > 0)
        {
            if(counter == 1) R = byteBuffer.readUint8();

            else if(counter == 2) G = byteBuffer.readUint8();

            else if(counter == 3)
            {
                B = byteBuffer.readUint8();

                paletteColors.push([ R, G, B ]);

                counter = 0;
            }

            counter++;
        }

        return paletteColors;
    }

    public static async mapXML2JSON(habboAssetSWF: HabboAssetSWF, assetType: string, snakeCase: boolean = false): Promise<IAssetData>
    {
        if(!habboAssetSWF) return null;

        const output: IAssetData = {};

        if(assetType) output.type = assetType;

        const indexXML = await this.getIndexXML(habboAssetSWF, snakeCase);

        if(indexXML) IndexMapper.mapXML(indexXML, output);

        const manifestXML = await this.getManifestXML(habboAssetSWF, snakeCase);

        if(manifestXML) ManifestMapper.mapXML(manifestXML, output);

        const assetXML = await this.getAssetsXML(habboAssetSWF, snakeCase);

        if(assetXML)
        {
            AssetMapper.mapXML(assetXML, output);

            if(output.palettes !== undefined)
            {
                for(const paletteId in output.palettes)
                {
                    const palette = output.palettes[paletteId];

                    const paletteColors = this.getPalette(habboAssetSWF, palette.source);

                    if(!paletteColors)
                    {
                        delete output.palettes[paletteId];

                        continue;
                    }

                    const rgbs: [ number, number, number ][] = [];

                    for(const rgb of paletteColors) rgbs.push([ rgb[0], rgb[1], rgb[2] ]);

                    palette.rgb = rgbs;
                }
            }
        }

        const animationXML = await this.getAnimationXML(habboAssetSWF, snakeCase);

        if(animationXML) AnimationMapper.mapXML(animationXML, output);

        const logicXML = await this.getLogicXML(habboAssetSWF, snakeCase);

        if(logicXML) LogicMapper.mapXML(logicXML, output);

        const visualizationXML = await this.getVisualizationXML(habboAssetSWF, snakeCase);

        if(visualizationXML) VisualizationMapper.mapXML(visualizationXML, output);

        return output;
    }
}
