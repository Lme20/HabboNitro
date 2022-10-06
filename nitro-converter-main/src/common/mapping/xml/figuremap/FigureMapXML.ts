import { FigureLibraryXML } from './FigureLibraryXML';

export class FigureMapXML
{
    private _librares: FigureLibraryXML[];

    constructor(xml: any)
    {
        if(xml.lib !== undefined)
        {
            if(Array.isArray(xml.lib))
            {
                this._librares = [];

                for(const lib in xml.lib)
                {
                    const library = xml.lib[lib];

                    this._librares.push(new FigureLibraryXML(library));
                }
            }
        }
    }

    public get libraries(): FigureLibraryXML[]
    {
        return this._librares;
    }
}
