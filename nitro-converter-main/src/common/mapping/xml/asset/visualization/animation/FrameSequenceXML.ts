import { FrameXML } from './FrameXML';

export class FrameSequenceXML
{
    private readonly _loopCount: number;
    private readonly _random: number;

    private readonly _frames: FrameXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.loopCount !== undefined) this._loopCount = parseInt(attributes.loopCount);
            if(attributes.random !== undefined) this._random = parseInt(attributes.random);
        }

        if((xml.frame !== undefined) && Array.isArray(xml.frame))
        {
            this._frames = [];

            for(const frame of xml.frame) this._frames.push(new FrameXML(frame));
        }
    }

    public get loopCount(): number
    {
        return this._loopCount;
    }

    public get random(): number
    {
        return this._random;
    }

    public get frames(): FrameXML[]
    {
        return this._frames;
    }
}
