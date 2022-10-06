import { IAssetAnimationFrame } from './IAssetAnimationFrame';

export interface IAssetAnimationOverride
{
    name?: string;
    override?: string;
    frames?: IAssetAnimationFrame[];
}
