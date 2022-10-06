
export class ParticleSystemParticleXML
{
    private readonly _isEmitter: boolean;
    private readonly _lifeTime: number;
    private readonly _fade: boolean;
    private readonly _frames: string[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.is_emitter !== undefined) this._isEmitter = (attributes.is_emitter === 'true');
            if(attributes.lifetime !== undefined) this._lifeTime = parseInt(attributes.lifetime);
            if(attributes.fade !== undefined) this._fade = (attributes.fade === 'true');
        }

        if((xml.frame !== undefined) && Array.isArray(xml.frame))
        {
            this._frames = [];

            for(const frame of xml.frame) this._frames.push(frame.$.name);
        }
    }

    public get isEmitter(): boolean
    {
        return this._isEmitter;
    }

    public get lifeTime(): number
    {
        return this._lifeTime;
    }

    public get fade(): boolean
    {
        return this._fade;
    }

    public get frames(): string[]
    {
        return this._frames;
    }
}
