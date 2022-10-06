import { IAssetVisualAnimationSequence } from './IAssetVisualAnimationSequence';

export interface IAssetVisualAnimationLayer
{
    loopCount?: number;
    frameRepeat?: number;
    random?: number;
    frameSequences?: { [index: string]: IAssetVisualAnimationSequence };
}
