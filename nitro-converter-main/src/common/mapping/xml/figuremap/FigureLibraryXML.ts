import { FigureLibraryPartXML } from './FigureLibraryPartXML';

export class FigureLibraryXML
{
    private _id: string;
    private _revision: number;
    private _parts: FigureLibraryPartXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.revision !== undefined) this._revision = parseInt(attributes.revision);
        }

        if(xml.part !== undefined)
        {
            if(Array.isArray(xml.part))
            {
                this._parts = [];

                for(const partId in xml.part)
                {
                    const part = xml.part[partId];

                    this._parts.push(new FigureLibraryPartXML(part));
                }
            }
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get revision(): number
    {
        return this._revision;
    }

    public get parts(): FigureLibraryPartXML[]
    {
        return this._parts;
    }
}
