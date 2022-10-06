import { FigureDataPaletteXML } from './FigureDataPaletteXML';
import { FigureDataSetTypeXML } from './FigureDataSetTypeXML';

export class FigureDataXML
{
    private _colorPalettes: FigureDataPaletteXML[];
    private _sets: FigureDataSetTypeXML[];

    constructor(xml: any)
    {
        if(xml.colors !== undefined && xml.colors[0].palette !== undefined)
        {
            const paletteArr = xml.colors[0].palette;

            if(Array.isArray(paletteArr))
            {
                this._colorPalettes = [];

                for(const pal in paletteArr)
                {
                    const palette = paletteArr[pal];

                    this._colorPalettes.push(new FigureDataPaletteXML(palette));
                }
            }
        }

        if(xml.sets !== undefined && xml.sets[0].settype !== undefined)
        {
            const setTypeArr =  xml.sets[0].settype;

            if(Array.isArray(setTypeArr))
            {
                this._sets = [];

                for(const set in setTypeArr)
                {
                    const setType = setTypeArr[set];

                    this._sets.push(new FigureDataSetTypeXML(setType));
                }
            }
        }
    }

    public get colorPalettes(): FigureDataPaletteXML[]
    {
        return this._colorPalettes;
    }

    public get sets(): FigureDataSetTypeXML[]
    {
        return this._sets;
    }
}
