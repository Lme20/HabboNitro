
export class ParticleSystemSimulationXML
{
    private _force: number;
    private _direction: number;
    private _gravity: number;
    private _airFriction: number;
    private _shape: string;
    private _energy: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.force !== undefined) this._force = parseFloat(attributes.force);
            if(attributes.direction !== undefined) this._direction = parseFloat(attributes.direction);
            if(attributes.gravity !== undefined) this._gravity = parseFloat(attributes.gravity);
            if(attributes.airfriction !== undefined) this._airFriction = parseFloat(attributes.airfriction);
            if(attributes.shape !== undefined) this._shape = attributes.shape;
            if(attributes.energy !== undefined) this._energy = parseFloat(attributes.energy);
        }
    }

    public get force(): number
    {
        return this._force;
    }

    public get direction(): number
    {
        return this._direction;
    }

    public get gravity(): number
    {
        return this._gravity;
    }

    public get airFriction(): number
    {
        return this._airFriction;
    }

    public get shape(): string
    {
        return this._shape;
    }

    public get energy(): number
    {
        return this._energy;
    }
}
