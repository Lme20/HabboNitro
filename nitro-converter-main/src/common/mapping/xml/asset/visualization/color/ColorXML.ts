import { ColorLayerXML } from './ColorLayerXML';

export class ColorXML
{
    private readonly _id: number;
    private readonly _layers: ColorLayerXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.id !== undefined) this._id = parseInt(attributes.id);
        }

        if((xml.colorLayer !== undefined) && Array.isArray(xml.colorLayer))
        {
            this._layers = [];

            for(const colorLayer of xml.colorLayer) this._layers.push(new ColorLayerXML(colorLayer));
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get layers(): ColorLayerXML[]
    {
        return this._layers;
    }
}
