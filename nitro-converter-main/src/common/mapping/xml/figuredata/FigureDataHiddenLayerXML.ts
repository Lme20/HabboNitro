export class FigureDataHiddenLayerXML
{
    private _partType: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        this._partType = ((attributes && attributes.parttype) || '');
    }

    public get partType(): string
    {
        return this._partType;
    }
}
