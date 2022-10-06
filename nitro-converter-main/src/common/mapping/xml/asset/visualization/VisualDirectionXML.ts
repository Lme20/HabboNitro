import { LayerXML } from './LayerXML';

export class VisualDirectionXML
{
    private readonly _id: number;
    private readonly _layers: LayerXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
        }

        if((xml.layer !== undefined) && Array.isArray(xml.layer))
        {
            this._layers = [];

            for(const layer of xml.layer) this._layers.push(new LayerXML(layer));
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get layers(): LayerXML[]
    {
        return this._layers;
    }
}
