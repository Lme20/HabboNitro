import { AddXML } from './AddXML';
import { AvatarXML } from './AvatarXML';
import { DirectionOffsetXML } from './DirectionOffsetXML';
import { EffectFrameXML } from './EffectFrameXML';
import { OverrideXML } from './OverrideXML';
import { RemoveXML } from './RemoveXML';
import { ShadowXML } from './ShadowXML';
import { SpriteXML } from './SpriteXML';

export class EffectAnimationXML
{
    private readonly _name: string;
    private readonly _desc: string;
    private readonly _resetOnToggle: boolean;

    private readonly _directions: DirectionOffsetXML[];
    private readonly _shadows: ShadowXML[];
    private readonly _adds: AddXML[];
    private readonly _removes: RemoveXML[];
    private readonly _sprites: SpriteXML[];
    private readonly _frames: EffectFrameXML[];
    private readonly _avatars: AvatarXML[];
    private readonly _overrides: OverrideXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.desc !== undefined) this._desc = attributes.desc;
            if(attributes.resetOnToggle !== undefined) this._resetOnToggle = (attributes.resetOnToggle === 'true');
        }

        if(xml.direction !== undefined)
        {
            if(Array.isArray(xml.direction))
            {
                this._directions = [];

                for(const direction of xml.direction) this._directions.push(new DirectionOffsetXML(direction));
            }
        }

        if(xml.shadow !== undefined)
        {
            if(Array.isArray(xml.shadow))
            {
                this._shadows = [];

                for(const shadow of xml.shadow) this._shadows.push(new ShadowXML(shadow));
            }
        }

        if(xml.add !== undefined)
        {
            if(Array.isArray(xml.add))
            {
                this._adds = [];

                for(const add of xml.add) this._adds.push(new AddXML(add));
            }
        }

        if(xml.remove !== undefined)
        {
            if(Array.isArray(xml.remove))
            {
                this._removes = [];

                for(const remove of xml.remove) this._removes.push(new RemoveXML(remove));
            }
        }

        if(xml.sprite !== undefined)
        {
            if(Array.isArray(xml.sprite))
            {
                this._sprites = [];

                for(const sprite of xml.sprite) this._sprites.push(new SpriteXML(sprite));
            }
        }

        if(xml.frame !== undefined)
        {
            if(Array.isArray(xml.frame))
            {
                this._frames = [];

                for(const frame of xml.frame) this._frames.push(new EffectFrameXML(frame));
            }
        }

        if(xml.avatar !== undefined)
        {
            if(Array.isArray(xml.avatar))
            {
                this._avatars = [];

                for(const avatar of xml.avatar) this._avatars.push(new AvatarXML(avatar));
            }
        }

        if(xml.override !== undefined)
        {
            if(Array.isArray(xml.override))
            {
                this._overrides = [];

                for(const override of xml.override) this._overrides.push(new OverrideXML(override));
            }
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get desc(): string
    {
        return this._desc;
    }

    public get resetOnToggle(): boolean
    {
        return this._resetOnToggle;
    }

    public get directions(): DirectionOffsetXML[]
    {
        return this._directions;
    }

    public get shadows(): ShadowXML[]
    {
        return this._shadows;
    }

    public get adds(): AddXML[]
    {
        return this._adds;
    }

    public get removes(): RemoveXML[]
    {
        return this._removes;
    }

    public get sprites(): SpriteXML[]
    {
        return this._sprites;
    }

    public get frames(): EffectFrameXML[]
    {
        return this._frames;
    }

    public get avatars(): AvatarXML[]
    {
        return this._avatars;
    }

    public get overrides(): OverrideXML[]
    {
        return this._overrides;
    }
}
