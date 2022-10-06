import { FrameSequenceXML } from './FrameSequenceXML';

export class AnimationLayerXML
{
    private readonly _id: number;
    private readonly _loopCount: number;
    private readonly _frameRepeat: number;
    private readonly _random: number;
    private readonly _randomStart: number;

    private readonly _frameSequences: FrameSequenceXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
            if(attributes.loopCount !== undefined) this._loopCount = parseInt(attributes.loopCount);
            if(attributes.frameRepeat !== undefined) this._frameRepeat = parseInt(attributes.frameRepeat);
            if(attributes.random !== undefined) this._random = parseInt(attributes.random);
            if(attributes.randomStart !== undefined) this._randomStart = parseInt(attributes.randomStart);
        }

        if((xml.frameSequence !== undefined) && Array.isArray(xml.frameSequence))
        {
            this._frameSequences = [];

            for(const frameSequence of xml.frameSequence) this._frameSequences.push(new FrameSequenceXML(frameSequence));
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get loopCount(): number
    {
        return this._loopCount;
    }

    public get frameRepeat(): number
    {
        return this._frameRepeat;
    }

    public get random(): number
    {
        return this._random;
    }

    public get randomStart(): number
    {
        return this._randomStart;
    }

    public get frameSequences(): FrameSequenceXML[]
    {
        return this._frameSequences;
    }
}
