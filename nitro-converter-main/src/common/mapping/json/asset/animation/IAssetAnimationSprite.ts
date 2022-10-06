import { IAssetAnimationSpriteDirection } from './IAssetAnimationSpriteDirection';

export interface IAssetAnimationSprite
{
    id?: string;
    member?: string;
    directions?: number;
    staticY?: number;
    ink?: number;
    directionList?: IAssetAnimationSpriteDirection[];
}
