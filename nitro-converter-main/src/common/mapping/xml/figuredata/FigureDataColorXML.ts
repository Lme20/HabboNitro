export class FigureDataColorXML
{
    private _id: number;
    private _index: number;
    private _club: number;
    private _selectable: boolean;
    private _hexCode: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        this._id = ((attributes && parseInt(attributes.id)) || 0);
        this._index = ((attributes && parseInt(attributes.index)) || 0);
        this._club = ((attributes && parseInt(attributes.club)) || 0);
        this._selectable = ((attributes && parseInt(attributes.selectable) === 1) || false);

        this._hexCode = ((xml && xml._) || '');
    }

    public get id(): number
    {
        return this._id;
    }

    public get index(): number
    {
        return this._index;
    }

    public get club(): number
    {
        return this._club;
    }

    public get selectable(): boolean
    {
        return this._selectable;
    }

    public get hexCode(): string
    {
        return this._hexCode;
    }
}
