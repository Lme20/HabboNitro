import { IAssetVisualAnimation } from './animation/IAssetVisualAnimation';
import { IAssetColor } from './color/IAssetColor';
import { IAssetGesture } from './gestures/IAssetGesture';
import { IAssetVisualizationDirection } from './IAssetVisualizationDirection';
import { IAssetVisualizationLayer } from './IAssetVisualizationLayer';
import { IAssetPosture } from './postures/IAssetPosture';

export interface IAssetVisualizationData
{
    size?: number;
    layerCount?: number;
    angle?: number;
    layers?: { [index: string]: IAssetVisualizationLayer };
    colors?: { [index: string]: IAssetColor };
    directions?: { [index: string]: IAssetVisualizationDirection };
    animations?: { [index: string]: IAssetVisualAnimation };
    defaultPosture?: string;
    postures?: { defaultPosture?: string, postures?: IAssetPosture[] };
    gestures?: IAssetGesture[];
}
