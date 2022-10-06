import { IAssetVisualAnimationLayer } from './IAssetVisualAnimationLayer';

export interface IAssetVisualAnimation
{
    transitionTo?: number;
    transitionFrom?: number;
    immediateChangeFrom?: string;
    randomStart?: boolean;
    layers?: { [index: string]: IAssetVisualAnimationLayer };
}
