import { ParticleSystemObjectXML } from './ParticleSystemObjectXML';

export class ParticleSystemXML
{
    private readonly _objects: ParticleSystemObjectXML[];

    constructor(xml: any)
    {
        if((xml.particlesystem !== undefined) && Array.isArray(xml.particlesystem))
        {
            this._objects = [];

            for(const object of xml.particlesystem) this._objects.push(new ParticleSystemObjectXML(object));
        }
    }

    public get objects(): ParticleSystemObjectXML[]
    {
        return this._objects;
    }
}
