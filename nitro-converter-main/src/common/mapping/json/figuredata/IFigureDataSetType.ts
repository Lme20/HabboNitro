import { IFigureDataSet } from './IFigureDataSet';

export interface IFigureDataSetType
{
    type?: string;
    paletteId?: number;
    mandatory_m_0?: boolean;
    mandatory_f_0?: boolean;
    mandatory_m_1?: boolean;
    mandatory_f_1?: boolean;
    sets?: IFigureDataSet[];
}
