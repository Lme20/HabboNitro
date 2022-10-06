export class FigureDataPartXML
{
    private _id: number;
    private _type: string;
    private _colorable: boolean;
    private _index: number;
    private _colorindex: number;

    constructor(xml: any)
    {
        const attributes = xml.$;

        this._id = ((attributes && parseInt(attributes.id)) || 0);
        this._type = ((attributes && attributes.type) || '');
        this._colorable = ((attributes && parseInt(attributes.colorable) === 1) || false);
        this._index = ((attributes && parseInt(attributes.index)) || 0);
        this._colorindex = ((attributes && parseInt(attributes.colorindex)) || 0);
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): string
    {
        return this._type;
    }

    public get colorable(): boolean
    {
        return this._colorable;
    }

    public get index(): number
    {
        return this._index;
    }

    public get colorIndex(): number
    {
        return this._colorindex;
    }
}
