export class AvatarXML
{
    private readonly _ink: number;
    private readonly _foreground: string;
    private readonly _background: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.ink !== undefined) this._ink = parseInt(attributes.ink);
            if(attributes.foreground !== undefined) this._foreground = attributes.foreground;
            if(attributes.background !== undefined) this._background = attributes.background;
        }
    }

    public get ink(): number
    {
        return this._ink;
    }

    public get foreground(): string
    {
        return this._foreground;
    }

    public get background(): string
    {
        return this._background;
    }
}
