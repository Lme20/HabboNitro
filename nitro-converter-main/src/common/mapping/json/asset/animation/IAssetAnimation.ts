import { IAssetAnimationAdd } from './IAssetAnimationAdd';
import { IAssetAnimationAvatar } from './IAssetAnimationAvatar';
import { IAssetAnimationDirection } from './IAssetAnimationDirection';
import { IAssetAnimationFrame } from './IAssetAnimationFrame';
import { IAssetAnimationOverride } from './IAssetAnimationOverride';
import { IAssetAnimationRemove } from './IAssetAnimationRemove';
import { IAssetAnimationShadow } from './IAssetAnimationShadow';
import { IAssetAnimationSprite } from './IAssetAnimationSprite';

export interface IAssetAnimation
{
    name?: string;
    desc?: string;
    resetOnToggle?: boolean;
    directions?: IAssetAnimationDirection[];
    shadows?: IAssetAnimationShadow[];
    adds?: IAssetAnimationAdd[];
    removes?: IAssetAnimationRemove[];
    sprites?: IAssetAnimationSprite[];
    frames?: IAssetAnimationFrame[];
    avatars?: IAssetAnimationAvatar[];
    overrides?: IAssetAnimationOverride[];
}
