import { IFigureDataPalette } from './IFigureDataPalette';
import { IFigureDataSetType } from './IFigureDataSetType';

export interface IFigureData
{
    palettes?: IFigureDataPalette[];
    setTypes?: IFigureDataSetType[];
}
