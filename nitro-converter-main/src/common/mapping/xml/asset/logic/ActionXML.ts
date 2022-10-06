export class ActionXML
{
    private readonly _link: string;
    private readonly _startState: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.link !== undefined) this._link = attributes.link;
            if(attributes.startState !== undefined) this._startState = parseInt(attributes.startState);
        }
    }

    public get link(): string
    {
        return this._link;
    }

    public get startState(): number
    {
        return this._startState;
    }
}
