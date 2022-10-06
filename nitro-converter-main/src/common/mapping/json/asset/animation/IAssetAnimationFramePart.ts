import { IAssetAnimationFramePartItem } from './IAssetAnimationFramePartItem';

export interface IAssetAnimationFramePart
{
    id?: string;
    frame?: number;
    base?: string;
    action?: string;
    dx?: number;
    dy?: number;
    dz?: number;
    dd?: number;
    items?: IAssetAnimationFramePartItem[];
}
