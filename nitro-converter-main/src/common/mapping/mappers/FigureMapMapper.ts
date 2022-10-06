import { IFigureMap, IFigureMapLibrary, IFigureMapLibraryPart } from '../json';
import { FigureLibraryPartXML, FigureLibraryXML, FigureMapXML } from '../xml';
import { Mapper } from './asset';

export class FigureMapMapper extends Mapper
{
    public static mapXML(xml: any, output: IFigureMap): void
    {
        if(!xml || !output) return;

        if(xml.map !== undefined) FigureMapMapper.mapFigureMapXML(new FigureMapXML(xml.map), output);
    }

    private static mapFigureMapXML(xml: FigureMapXML, output: IFigureMap): void
    {
        if(!xml || !output) return;

        if(xml.libraries !== undefined)
        {
            if(xml.libraries.length)
            {
                output.libraries = [];

                FigureMapMapper.mapFigureMapLibrariesXML(xml.libraries, output.libraries);
            }
        }
    }

    private static mapFigureMapLibrariesXML(xml: FigureLibraryXML[], output: IFigureMapLibrary[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const libraryXML of xml)
        {
            const library: IFigureMapLibrary = {};

            if(libraryXML.id !== undefined) library.id = libraryXML.id;
            if(libraryXML.revision !== undefined) library.revision = libraryXML.revision;

            if(libraryXML.parts !== undefined)
            {
                if(libraryXML.parts.length)
                {
                    library.parts = [];

                    FigureMapMapper.mapFigureMapLibraryPartsXML(libraryXML.parts, library.parts);
                }
            }

            output.push(library);
        }
    }

    private static mapFigureMapLibraryPartsXML(xml: FigureLibraryPartXML[], output: IFigureMapLibraryPart[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const libraryPartXML of xml)
        {
            const libraryPart: IFigureMapLibraryPart = {};

            if(libraryPartXML.id !== undefined) libraryPart.id = libraryPartXML.id;
            if(libraryPartXML.type !== undefined) libraryPart.type = libraryPartXML.type;

            output.push(libraryPart);
        }
    }
}
