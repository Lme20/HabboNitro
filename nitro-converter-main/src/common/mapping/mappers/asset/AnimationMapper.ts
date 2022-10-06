import { IAssetAnimation, IAssetAnimationAdd, IAssetAnimationAvatar, IAssetAnimationDirection, IAssetAnimationFrame, IAssetAnimationFramePart, IAssetAnimationFramePartItem, IAssetAnimationOverride, IAssetAnimationRemove, IAssetAnimationShadow, IAssetAnimationSprite, IAssetAnimationSpriteDirection, IAssetData } from '../../json';
import { AddXML, AvatarXML, DirectionOffsetXML, EffectAnimationXML, EffectFramePartItemXML, EffectFramePartXML, EffectFrameXML, OverrideXML, RemoveXML, ShadowXML, SpriteXML } from '../../xml';
import { Mapper } from './Mapper';

export class AnimationMapper extends Mapper
{
    public static mapXML(animation: any, output: IAssetData): void
    {
        if(!animation || !output) return;

        if(animation.animation !== undefined)
        {
            output.animations = {};

            AnimationMapper.mapAnimationXML(new EffectAnimationXML(animation.animation), output.animations);
        }
    }

    private static mapAnimationXML(xml: EffectAnimationXML, output: { [index: string]: IAssetAnimation }): void
    {
        if(!xml || !output) return;

        const animation: IAssetAnimation = {};

        if(xml.name !== undefined) animation.name = xml.name;
        if(xml.desc !== undefined) animation.desc = xml.desc;
        if(xml.resetOnToggle !== undefined) animation.resetOnToggle = xml.resetOnToggle;

        if(xml.directions !== undefined)
        {
            if(xml.directions.length)
            {
                animation.directions = [];

                AnimationMapper.mapAnimationDirectionsXML(xml.directions, animation.directions);
            }
        }

        if(xml.shadows !== undefined)
        {
            if(xml.shadows.length)
            {
                animation.shadows = [];

                AnimationMapper.mapAnimationShadowsXML(xml.shadows, animation.shadows);
            }
        }

        if(xml.adds !== undefined)
        {
            if(xml.adds.length)
            {
                animation.adds = [];

                AnimationMapper.mapAnimationAddsXML(xml.adds, animation.adds);
            }
        }

        if(xml.removes !== undefined)
        {
            if(xml.removes.length)
            {
                animation.removes = [];

                AnimationMapper.mapAnimationRemovesXML(xml.removes, animation.removes);
            }
        }

        if(xml.sprites !== undefined)
        {
            if(xml.sprites.length)
            {
                animation.sprites = [];

                AnimationMapper.mapAnimationSpritesXML(xml.sprites, animation.sprites);
            }
        }

        if(xml.frames !== undefined)
        {
            if(xml.frames.length)
            {
                animation.frames = [];

                AnimationMapper.mapAnimationFramesXML(xml.frames, animation.frames);
            }
        }

        if(xml.avatars !== undefined)
        {
            if(xml.avatars.length)
            {
                animation.avatars = [];

                AnimationMapper.mapAnimationAvatarsXML(xml.avatars, animation.avatars);
            }
        }

        if(xml.overrides !== undefined)
        {
            if(xml.overrides.length)
            {
                animation.overrides = [];

                AnimationMapper.mapAnimationOverridesXML(xml.overrides, animation.overrides);
            }
        }

        output[xml.desc] = animation;
    }

    private static mapAnimationDirectionsXML(xml: DirectionOffsetXML[], output: IAssetAnimationDirection[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const offsetXML of xml)
        {
            const direction: IAssetAnimationDirection = {};

            if(offsetXML.offset !== undefined) direction.offset = offsetXML.offset;

            output.push(direction);
        }
    }

    private static mapAnimationShadowsXML(xml: ShadowXML[], output: IAssetAnimationShadow[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const shadowXML of xml)
        {
            const shadow: IAssetAnimationShadow = {};

            if(shadowXML.id !== undefined) shadow.id = shadowXML.id;

            output.push(shadow);
        }
    }

    private static mapAnimationAddsXML(xml: AddXML[], output: IAssetAnimationAdd[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const addXML of xml)
        {
            const add: IAssetAnimationAdd = {};

            if(addXML.id !== undefined) add.id = addXML.id;
            if(addXML.align !== undefined) add.align = addXML.align;
            if(addXML.blend !== undefined) add.blend = addXML.blend;
            if(addXML.ink !== undefined) add.ink = addXML.ink;
            if(addXML.base !== undefined) add.base = addXML.base;

            output.push(add);
        }
    }

    private static mapAnimationRemovesXML(xml: RemoveXML[], output: IAssetAnimationRemove[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const removeXML of xml)
        {
            const remove: IAssetAnimationRemove = {};

            if(removeXML.id !== undefined) remove.id = removeXML.id;

            output.push(remove);
        }
    }

    private static mapAnimationSpritesXML(xml: SpriteXML[], output: IAssetAnimationSprite[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const spriteXML of xml)
        {
            const sprite: IAssetAnimationSprite = {};

            if(spriteXML.id !== undefined) sprite.id = spriteXML.id;
            if(spriteXML.directions !== undefined) sprite.directions = spriteXML.directions;
            if(spriteXML.member !== undefined) sprite.member = spriteXML.member;
            if(spriteXML.ink !== undefined) sprite.ink = spriteXML.ink;
            if(spriteXML.staticY !== undefined) sprite.staticY = spriteXML.staticY;

            if(spriteXML.directionList !== undefined)
            {
                if(spriteXML.directionList.length)
                {
                    sprite.directionList = [];

                    for(const directionXML of spriteXML.directionList)
                    {
                        const direction: IAssetAnimationSpriteDirection = {};

                        if(directionXML.id !== undefined) direction.id = directionXML.id;
                        if(directionXML.dx !== undefined) direction.dx = directionXML.dx;
                        if(directionXML.dy !== undefined) direction.dy = directionXML.dy;
                        if(directionXML.dz !== undefined) direction.dz = directionXML.dz;

                        sprite.directionList.push(direction);
                    }
                }
            }

            output.push(sprite);
        }
    }

    private static mapAnimationFramesXML(xml: EffectFrameXML[], output: IAssetAnimationFrame[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const frameXML of xml)
        {
            const frame: IAssetAnimationFrame = {};

            if(frameXML.repeats !== undefined) frame.repeats = frameXML.repeats;

            if(frameXML.fxs !== undefined)
            {
                if(frameXML.fxs.length)
                {
                    frame.fxs = [];

                    AnimationMapper.mapAnimationFramesPartXML(frameXML.fxs, frame.fxs);
                }
            }

            if(frameXML.bodyParts !== undefined)
            {
                if(frameXML.bodyParts.length)
                {
                    frame.bodyparts = [];

                    AnimationMapper.mapAnimationFramesPartXML(frameXML.bodyParts, frame.bodyparts);
                }
            }

            output.push(frame);
        }
    }

    private static mapAnimationFramesPartXML(xml: EffectFramePartXML[], output: IAssetAnimationFramePart[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const framePartXML of xml)
        {
            const framePart: IAssetAnimationFramePart = {};

            if(framePartXML.id !== undefined) framePart.id = framePartXML.id;
            if(framePartXML.frame !== undefined) framePart.frame = framePartXML.frame;
            if(framePartXML.base !== undefined) framePart.base = framePartXML.base;
            if(framePartXML.action !== undefined) framePart.action = framePartXML.action;
            if(framePartXML.dx !== undefined) framePart.dx = framePartXML.dx;
            if(framePartXML.dy !== undefined) framePart.dy = framePartXML.dy;
            if(framePartXML.dz !== undefined) framePart.dz = framePartXML.dz;
            if(framePartXML.dd !== undefined) framePart.dd = framePartXML.dd;

            if(framePartXML.items !== undefined)
            {
                if(framePartXML.items.length)
                {
                    framePart.items = [];

                    AnimationMapper.mapAnimationFramesPartItemXML(framePartXML.items, framePart.items);
                }
            }

            output.push(framePart);
        }
    }

    private static mapAnimationFramesPartItemXML(xml: EffectFramePartItemXML[], output: IAssetAnimationFramePartItem[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const framePartItemXML of xml)
        {
            const item: IAssetAnimationFramePartItem = {};

            if(framePartItemXML.id !== undefined) item.id = framePartItemXML.id;
            if(framePartItemXML.base !== undefined) item.base = framePartItemXML.base;

            output.push(item);
        }
    }

    private static mapAnimationAvatarsXML(xml: AvatarXML[], output: IAssetAnimationAvatar[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const avatarXML of xml)
        {
            const avatar: IAssetAnimationAvatar = {};

            if(avatarXML.background !== undefined) avatar.background = avatarXML.background;
            if(avatarXML.foreground !== undefined) avatar.foreground = avatarXML.foreground;
            if(avatarXML.ink !== undefined) avatar.ink = avatarXML.ink;

            output.push(avatar);
        }
    }

    private static mapAnimationOverridesXML(xml: OverrideXML[], output: IAssetAnimationOverride[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const overrideXML of xml)
        {
            const override: IAssetAnimationOverride = {};

            if(overrideXML.name !== undefined) override.name = overrideXML.name;
            if(overrideXML.override !== undefined) override.override = overrideXML.override;

            if(overrideXML.frames !== undefined)
            {
                if(overrideXML.frames.length)
                {
                    override.frames = [];

                    AnimationMapper.mapAnimationFramesXML(overrideXML.frames, override.frames);
                }
            }

            output.push(override);
        }
    }
}
