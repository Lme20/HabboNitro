import { IFigureMapLibraryPart } from './IFigureMapLibraryPart';

export interface IFigureMapLibrary
{
    id?: string;
    revision?: number;
    parts?: IFigureMapLibraryPart[];
}
