import { ParticleSystemParticleXML } from './ParticleSystemParticleXML';
import { ParticleSystemSimulationXML } from './ParticleSystemSimulationXML';

export class ParticleSystemEmitterXML
{
    private _id: number;
    private _name: string;
    private _spriteId: number;
    private _maxNumParticles: number;
    private _particlesPerFrame: number;
    private _burstPulse: number = 1;
    private _fuseTime: number;
    private _simulation: ParticleSystemSimulationXML;
    private _particles: ParticleSystemParticleXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.name !== undefined) this._name = attributes.name;
            if(attributes.sprite_id !== undefined) this._spriteId = parseInt(attributes.sprite_id);
            if(attributes.max_num_particles !== undefined) this._maxNumParticles = parseInt(attributes.max_num_particles);
            if(attributes.particles_per_frame !== undefined) this._particlesPerFrame = parseInt(attributes.particles_per_frame);
            if(attributes.burst_pulse !== undefined) this._burstPulse = parseInt(attributes.burst_pulse);
            if(attributes.fuse_time !== undefined) this._fuseTime = parseInt(attributes.fuse_time);
        }

        if(xml.simulation !== undefined)
        {
            if(xml.simulation[0] !== undefined) this._simulation = new ParticleSystemSimulationXML(xml.simulation[0]);
        }

        if((xml.particles !== undefined) && (xml.particles[0] !== undefined) && Array.isArray(xml.particles[0].particle))
        {
            this._particles = [];

            for(const particle of xml.particles[0].particle) this._particles.push(new ParticleSystemParticleXML(particle));
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get spriteId(): number
    {
        return this._spriteId;
    }

    public get maxNumParticles(): number
    {
        return this._maxNumParticles;
    }

    public get particlesPerFrame(): number
    {
        return this._particlesPerFrame;
    }

    public get burstPulse(): number
    {
        return this._burstPulse;
    }

    public get fuseTime(): number
    {
        return this._fuseTime;
    }

    public get simulation(): ParticleSystemSimulationXML
    {
        return this._simulation;
    }

    public get particles(): ParticleSystemParticleXML[]
    {
        return this._particles;
    }
}
