import { IAssetAnimation } from './animation';
import { IAsset } from './IAsset';
import { IAssetAlias } from './IAssetAlias';
import { IAssetPalette } from './IAssetPalette';
import { IAssetLogicData } from './logic/IAssetLogicData';
import { ISpritesheetData } from './spritesheet';
import { IAssetVisualizationData } from './visualization';

export interface IAssetData {
    type?: string;
    name?: string;
    visualizationType?: string;
    logicType?: string;
    spritesheet?: ISpritesheetData;
    logic?: IAssetLogicData;
    assets?: { [index: string]: IAsset };
    aliases?: { [index: string]: IAssetAlias };
    animations?: { [index: string]: IAssetAnimation };
    palettes?: { [index: string]: IAssetPalette };
    visualizations?: IAssetVisualizationData[];
}
