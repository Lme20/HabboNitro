import { AnimationLayerXML } from './AnimationLayerXML';

export class AnimationXML
{
    private readonly _id: number;
    private readonly _transitionTo: number;
    private readonly _transitionFrom: number;
    private readonly _immediateChangeFrom: string;
    private readonly _randomStart: boolean;
    private readonly _layers: AnimationLayerXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.transitionTo !== undefined) this._transitionTo = parseInt(attributes.transitionTo);
            if(attributes.transitionFrom !== undefined) this._transitionFrom = parseInt(attributes.transitionFrom);
            if(attributes.immediateChangeFrom !== undefined) this._immediateChangeFrom = attributes.immediateChangeFrom;
            if(attributes.randomStart !== undefined) this._randomStart = (attributes.randomStart === '1');
        }

        if((xml.animationLayer !== undefined) && Array.isArray(xml.animationLayer))
        {
            this._layers = [];

            for(const animationLayer of xml.animationLayer) this._layers.push(new AnimationLayerXML(animationLayer));
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get transitionTo(): number
    {
        return this._transitionTo;
    }

    public get transitionFrom(): number
    {
        return this._transitionFrom;
    }

    public get immediateChangeFrom(): string
    {
        return this._immediateChangeFrom;
    }

    public get randomStart(): boolean
    {
        return this._randomStart;
    }

    public get layers(): AnimationLayerXML[]
    {
        return this._layers;
    }
}
