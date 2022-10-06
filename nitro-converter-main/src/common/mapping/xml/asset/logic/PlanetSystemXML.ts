import { PlanetSystemObjectXML } from './particlesystem/PlanetSystemObjectXML';

export class PlanetSystemXML
{
    private readonly _objects: PlanetSystemObjectXML[];

    constructor(xml: any)
    {
        if((xml.object !== undefined) && Array.isArray(xml.object))
        {
            this._objects = [];

            for(const object of xml.object) this._objects.push(new PlanetSystemObjectXML(object));
        }
    }

    public get objects(): PlanetSystemObjectXML[]
    {
        return this._objects;
    }
}
