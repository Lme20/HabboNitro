import { EffectMapEffectXML } from './EffectMapEffectXML';

export class EffectMapXML
{
    private _effect: EffectMapEffectXML[];

    constructor(xml: any)
    {
        if(xml.effect !== undefined)
        {
            if(Array.isArray(xml.effect))
            {
                this._effect = [];

                for(const library of xml.effect) this._effect.push(new EffectMapEffectXML(library));
            }
        }
    }

    public get effects(): EffectMapEffectXML[]
    {
        return this._effect;
    }
}
