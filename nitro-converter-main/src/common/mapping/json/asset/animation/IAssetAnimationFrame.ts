import { IAssetAnimationFramePart } from './IAssetAnimationFramePart';

export interface IAssetAnimationFrame
{
    repeats?: number;
    fxs?: IAssetAnimationFramePart[];
    bodyparts?: IAssetAnimationFramePart[];
}
