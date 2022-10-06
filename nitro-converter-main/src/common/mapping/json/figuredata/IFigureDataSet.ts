import { IFigureDataHiddenLayer } from './IFigureDataHiddenLayer';
import { IFigureDataPart } from './IFigureDataPart';

export interface IFigureDataSet
{
    id?: number;
    gender?: string;
    club?: number;
    colorable?: boolean;
    selectable?: boolean;
    preselectable?: boolean;
    sellable?: boolean;
    parts?: IFigureDataPart[];
    hiddenLayers?: IFigureDataHiddenLayer[];
}
