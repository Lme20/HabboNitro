import { IFigureData, IFigureDataColor, IFigureDataHiddenLayer, IFigureDataPalette, IFigureDataPart, IFigureDataSet, IFigureDataSetType } from '../json';
import { FigureDataColorXML, FigureDataHiddenLayerXML, FigureDataPaletteXML, FigureDataPartXML, FigureDataSetTypeXML, FigureDataSetXML, FigureDataXML } from '../xml';
import { Mapper } from './asset';

export class FigureDataMapper extends Mapper
{
    public static mapXML(xml: any, output: IFigureData): void
    {
        if(!xml || !output) return;

        if(xml.figuredata !== undefined) FigureDataMapper.mapFigureDataXML(new FigureDataXML(xml.figuredata), output);
    }

    private static mapFigureDataXML(xml: FigureDataXML, output: IFigureData): void
    {
        if(!xml || !output) return;

        if(xml.colorPalettes !== undefined)
        {
            if(xml.colorPalettes.length)
            {
                output.palettes = [];

                FigureDataMapper.mapFigureDataColorPalettesXML(xml.colorPalettes, output.palettes);
            }
        }

        if(xml.sets !== undefined)
        {
            if(xml.sets.length)
            {
                output.setTypes = [];

                FigureDataMapper.mapFigureDataSetTypes(xml.sets, output.setTypes);
            }
        }
    }

    private static mapFigureDataColorPalettesXML(xml: FigureDataPaletteXML[], output: IFigureDataPalette[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const paletteXML of xml)
        {
            const palette: IFigureDataPalette = {};

            if(paletteXML.id !== undefined) palette.id = paletteXML.id;

            if(paletteXML.colors !== undefined)
            {
                if(paletteXML.colors.length)
                {
                    palette.colors = [];

                    FigureDataMapper.mapFigureDataPaletteColorsXML(paletteXML.colors, palette.colors);
                }
            }

            output.push(palette);
        }
    }

    private static mapFigureDataPaletteColorsXML(xml: FigureDataColorXML[], output: IFigureDataColor[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const colorXML of xml)
        {
            const color: IFigureDataColor = {};

            if(colorXML.id !== undefined) color.id = colorXML.id;
            if(colorXML.index !== undefined) color.index = colorXML.index;
            if(colorXML.club !== undefined) color.club = colorXML.club;
            if(colorXML.selectable !== undefined) color.selectable = colorXML.selectable;
            if(colorXML.hexCode !== undefined) color.hexCode = colorXML.hexCode;

            output.push(color);
        }
    }

    private static mapFigureDataSetTypes(xml: FigureDataSetTypeXML[], output: IFigureDataSetType[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const setTypeXML of xml)
        {
            const setType: IFigureDataSetType = {};

            if(setTypeXML.type !== undefined) setType.type = setTypeXML.type;
            if(setTypeXML.paletteId !== undefined) setType.paletteId = setTypeXML.paletteId;
            if(setTypeXML.mandatoryF0 !== undefined) setType.mandatory_f_0 = setTypeXML.mandatoryF0;
            if(setTypeXML.mandatoryF1 !== undefined) setType.mandatory_f_1 = setTypeXML.mandatoryF1;
            if(setTypeXML.mandatoryM0 !== undefined) setType.mandatory_m_0 = setTypeXML.mandatoryM0;
            if(setTypeXML.mandatoryM1 !== undefined) setType.mandatory_m_1 = setTypeXML.mandatoryM1;

            if(setTypeXML.sets !== undefined)
            {
                if(setTypeXML.sets.length)
                {
                    setType.sets = [];

                    FigureDataMapper.mapFigureDataSets(setTypeXML.sets, setType.sets);
                }
            }

            output.push(setType);
        }
    }

    private static mapFigureDataSets(xml: FigureDataSetXML[], output: IFigureDataSet[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const setXML of xml)
        {
            const setType: IFigureDataSet = {};

            if(setXML.id !== undefined) setType.id = setXML.id;
            if(setXML.gender !== undefined) setType.gender = setXML.gender;
            if(setXML.club !== undefined) setType.club = setXML.club;
            if(setXML.colorable !== undefined) setType.colorable = setXML.colorable;
            if(setXML.selectable !== undefined) setType.selectable = setXML.selectable;
            if(setXML.preselectable !== undefined) setType.preselectable = setXML.preselectable;
            if(setXML.sellable !== undefined) setType.sellable = setXML.sellable;

            if(setXML.parts !== undefined)
            {
                if(setXML.parts.length)
                {
                    setType.parts = [];

                    FigureDataMapper.mapFigureDataParts(setXML.parts, setType.parts);
                }
            }

            if(setXML.hiddenLayers !== undefined)
            {
                if(setXML.hiddenLayers.length)
                {
                    setType.hiddenLayers = [];

                    FigureDataMapper.mapFigureDataHiddenLayers(setXML.hiddenLayers, setType.hiddenLayers);
                }
            }

            output.push(setType);
        }
    }

    private static mapFigureDataParts(xml: FigureDataPartXML[], output: IFigureDataPart[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const partXML of xml)
        {
            const part: IFigureDataPart = {};

            if(partXML.id !== undefined) part.id = partXML.id;
            if(partXML.type !== undefined) part.type = partXML.type;
            if(partXML.colorable !== undefined) part.colorable = partXML.colorable;
            if(partXML.index !== undefined) part.index = partXML.index;
            if(partXML.colorIndex !== undefined) part.colorindex = partXML.colorIndex;

            output.push(part);
        }
    }

    private static mapFigureDataHiddenLayers(xml: FigureDataHiddenLayerXML[], output: IFigureDataHiddenLayer[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const hiddenLayerXML of xml)
        {
            const hiddenLayer: IFigureDataHiddenLayer = {};

            if(hiddenLayerXML.partType !== undefined) hiddenLayer.partType = hiddenLayerXML.partType;

            output.push(hiddenLayer);
        }
    }
}
