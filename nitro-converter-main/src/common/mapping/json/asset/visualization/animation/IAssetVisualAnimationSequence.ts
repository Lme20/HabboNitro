import { IAssetVisualAnimationSequenceFrame } from './IAssetVisualAnimationSequenceFrame';

export interface IAssetVisualAnimationSequence
{
    loopCount?: number;
    random?: number;
    frames?: { [index: string]: IAssetVisualAnimationSequenceFrame };
}
