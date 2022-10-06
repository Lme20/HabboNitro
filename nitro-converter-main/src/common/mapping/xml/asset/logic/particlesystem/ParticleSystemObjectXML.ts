import { ParticleSystemEmitterXML } from './ParticleSystemEmitterXML';

export class ParticleSystemObjectXML
{
    private readonly _size: number;
    private readonly _canvasId: number;
    private readonly _offsetY: number;
    private readonly _blend: number;
    private readonly _bgColor: string;
    private readonly _emitters: ParticleSystemEmitterXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.size !== undefined) this._size = parseInt(attributes.size);
            if(attributes.canvas_id !== undefined) this._canvasId = parseInt(attributes.canvas_id);
            if(attributes.offset_y !== undefined) this._offsetY = parseFloat(attributes.offset_y);
            if(attributes.blend !== undefined) this._blend = parseFloat(attributes.blend);
            if(attributes.bgcolor !== undefined) this._bgColor = attributes.bgcolor;
        }

        if((xml.emitter !== undefined) && Array.isArray(xml.emitter))
        {
            this._emitters = [];

            for(const emitter of xml.emitter) this._emitters.push(new ParticleSystemEmitterXML(emitter));
        }
    }

    public get size(): number
    {
        return this._size;
    }

    public get canvasId(): number
    {
        return this._canvasId;
    }

    public get offsetY(): number
    {
        return this._offsetY;
    }

    public get blend(): number
    {
        return this._blend;
    }

    public get bgColor(): string
    {
        return this._bgColor;
    }

    public get emitters(): ParticleSystemEmitterXML[]
    {
        return this._emitters;
    }
}
