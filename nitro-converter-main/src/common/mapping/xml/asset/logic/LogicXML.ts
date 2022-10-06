import { ActionXML } from './ActionXML';
import { CreditsXML } from './CreditsXML';
import { CustomVarsXML } from './CustomVarsXML';
import { MaskXML } from './MaskXML';
import { ModelXML } from './model';
import { ParticleSystemXML } from './particlesystem';
import { PlanetSystemXML } from './PlanetSystemXML';
import { SoundSampleXML } from './SoundSampleXML';

export class LogicXML
{
    private readonly _type: string;
    private readonly _model: ModelXML;
    private readonly _action: ActionXML;
    private readonly _mask: MaskXML;
    private readonly _credits: CreditsXML;
    private readonly _soundSample: SoundSampleXML;
    private readonly _planetSystem: PlanetSystemXML;
    private readonly _particleSystem: ParticleSystemXML;
    private readonly _customVars: CustomVarsXML;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.type !== undefined) this._type = attributes.type;
        }

        if(xml.model !== undefined)
        {
            if(xml.model[0] !== undefined) this._model = new ModelXML(xml.model[0]);
        }

        if(xml.action !== undefined)
        {
            if(xml.action[0] !== undefined) this._action = new ActionXML(xml.action[0]);
        }

        if(xml.mask !== undefined)
        {
            if(xml.mask[0] !== undefined) this._mask = new MaskXML(xml.mask[0]);
        }

        if(xml.credits !== undefined)
        {
            if(xml.credits[0] !== undefined) this._credits = new CreditsXML(xml.credits[0]);
        }

        if(xml.sound !== undefined)
        {
            if(xml.sound[0] !== undefined) this._soundSample = new SoundSampleXML(xml.sound[0].sample[0]);
        }

        if(xml.planetsystem !== undefined)
        {
            if(xml.planetsystem[0] !== undefined) this._planetSystem = new PlanetSystemXML(xml.planetsystem[0]);
        }

        if(xml.particlesystems !== undefined)
        {
            if(xml.particlesystems[0] !== undefined) this._particleSystem = new ParticleSystemXML(xml.particlesystems[0]);
        }

        if(xml.customvars !== undefined)
        {
            if(xml.customvars[0] !== undefined) this._customVars = new CustomVarsXML(xml.customvars[0]);
        }
    }

    public get type(): string
    {
        return this._type;
    }

    public get model(): ModelXML
    {
        return this._model;
    }

    public get action(): ActionXML
    {
        return this._action;
    }

    public get mask(): MaskXML
    {
        return this._mask;
    }

    public get credits(): CreditsXML
    {
        return this._credits;
    }

    public get soundSample(): SoundSampleXML
    {
        return this._soundSample;
    }

    public get planetSystem(): PlanetSystemXML
    {
        return this._planetSystem;
    }

    public get particleSystem(): ParticleSystemXML
    {
        return this._particleSystem;
    }

    public get customVars(): CustomVarsXML
    {
        return this._customVars;
    }
}
