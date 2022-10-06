import { FigureDataColorXML } from './FigureDataColorXML';

export class FigureDataPaletteXML
{
    private _id: number;
    private _colors: FigureDataColorXML[];

    constructor(xml: any)
    {
        if(xml.color !== undefined)
        {
            if(Array.isArray(xml.color))
            {
                this._colors = [];

                for(const col in xml.color)
                {
                    const color = xml.color[col];

                    this._colors.push(new FigureDataColorXML(color));
                }
            }
        }

        const attributes = xml.$;

        this._id = ((attributes && parseInt(attributes.id)) || 0);
    }

    public get id(): number
    {
        return this._id;
    }

    public get colors(): FigureDataColorXML[]
    {
        return this._colors;
    }
}
