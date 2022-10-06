import { ICustomVars } from './IAssetLogicCustomVars';
import { IAssetLogicPlanetSystem } from './IAssetLogicPlanetSystem';
import { ISoundSample } from './ISoundSample';
import { IAssetLogicModel } from './model/IAssetLogicModel';
import { IParticleSystem } from './particlesystem';

export interface IAssetLogicData
{
    model?: IAssetLogicModel;
    maskType?: string;
    credits?: string;
    soundSample?: ISoundSample;
    action?: { link?: string, startState?: number };
    planetSystems?: IAssetLogicPlanetSystem[];
    particleSystems?: IParticleSystem[];
    customVars?: ICustomVars;
}
