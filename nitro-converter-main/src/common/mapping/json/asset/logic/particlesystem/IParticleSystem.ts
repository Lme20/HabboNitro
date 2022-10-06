import { IParticleSystemEmitter } from './IParticleSystemEmitter';

export interface IParticleSystem
{
    size?: number;
    canvasId?: number;
    offsetY?: number;
    blend?: number;
    bgColor?: string;
    emitters?: IParticleSystemEmitter[];
}
