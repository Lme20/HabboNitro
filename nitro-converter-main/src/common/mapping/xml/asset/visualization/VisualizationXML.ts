import { VisualizationDataXML } from './VisualizationDataXML';

export class VisualizationXML
{
    private readonly _type: string;
    private readonly _visualizations: VisualizationDataXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.type !== undefined) this._type = attributes.type;
        }

        if((xml.graphics !== undefined) && Array.isArray(xml.graphics))
        {
            this._visualizations = [];

            for(const graphic of xml.graphics)
            {
                if(Array.isArray(graphic.visualization)) for(const visualization of graphic.visualization) this._visualizations.push(new VisualizationDataXML(visualization));
            }
        }
    }

    public get type(): string
    {
        return this._type;
    }

    public get visualizations(): VisualizationDataXML[]
    {
        return this._visualizations;
    }
}
