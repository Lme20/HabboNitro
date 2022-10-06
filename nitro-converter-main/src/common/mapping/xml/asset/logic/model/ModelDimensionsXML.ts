export class ModelDimensionsXML
{
    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;
    private readonly _centerZ: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.x !== undefined) this._x = parseFloat(attributes.x);
            if(attributes.y !== undefined) this._y = parseFloat(attributes.y);
            if(attributes.z !== undefined) this._z = parseFloat(attributes.z);
            if(attributes.centerZ !== undefined) this._centerZ = parseFloat(attributes.centerZ);
        }
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get z(): number
    {
        return this._z;
    }

    public get centerZ(): number
    {
        return this._centerZ;
    }
}
