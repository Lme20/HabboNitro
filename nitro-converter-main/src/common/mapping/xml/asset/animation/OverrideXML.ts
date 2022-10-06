import { EffectFrameXML } from './EffectFrameXML';

export class OverrideXML
{
    private readonly _name: string;
    private readonly _override: string;

    private readonly _frames: EffectFrameXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.override !== undefined) this._override = attributes.override;
        }

        if(xml.frame !== undefined)
        {
            if(Array.isArray(xml.frame))
            {
                this._frames = [];

                for(const frame of xml.frame) this._frames.push(new EffectFrameXML(frame));
            }
        }
    }

    public get name(): string
    {
        return this._name;
    }

    public get override(): string
    {
        return this._override;
    }

    public get frames(): EffectFrameXML[]
    {
        return this._frames;
    }
}
