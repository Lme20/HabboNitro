import { IAssetVisualAnimationSequenceFrameOffset } from './IAssetVisualAnimationSequenceFrameOffset';

export interface IAssetVisualAnimationSequenceFrame
{
    id?: number;
    x?: number;
    y?: number;
    randomX?: number;
    randomY?: number;
    offsets?: { [index: string]: IAssetVisualAnimationSequenceFrameOffset };
}
