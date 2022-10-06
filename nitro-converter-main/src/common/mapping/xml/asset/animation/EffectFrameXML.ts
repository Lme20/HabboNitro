import { EffectFramePartXML } from './EffectFramePartXML';

export class EffectFrameXML
{
    private readonly _repeats: number;
    private readonly _fxs: EffectFramePartXML[];
    private readonly _bodyParts: EffectFramePartXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.repeats !== undefined) this._repeats = parseInt(attributes.repeats);
        }

        if(xml.fx !== undefined)
        {
            if(Array.isArray(xml.fx))
            {
                this._fxs = [];

                for(const fx of xml.fx) this._fxs.push(new EffectFramePartXML(fx));
            }
        }

        if(xml.bodypart !== undefined)
        {
            if(Array.isArray(xml.bodypart))
            {
                this._bodyParts = [];

                for(const bodypart of xml.bodypart) this._bodyParts.push(new EffectFramePartXML(bodypart));
            }
        }
    }

    public get repeats(): number
    {
        return this._repeats;
    }

    public get fxs(): EffectFramePartXML[]
    {
        return this._fxs;
    }

    public get bodyParts(): EffectFramePartXML[]
    {
        return this._bodyParts;
    }
}
