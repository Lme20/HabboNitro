import { IParticleSystemParticle } from './IParticleSystemParticle';
import { IParticleSystemSimulation } from './IParticleSystemSimulation';

export interface IParticleSystemEmitter
{
    id?: number;
    name?: string;
    spriteId?: number;
    maxNumParticles?: number;
    particlesPerFrame?: number;
    burstPulse?: number;
    fuseTime?: number;
    simulation?: IParticleSystemSimulation;
    particles?: IParticleSystemParticle[];
}
