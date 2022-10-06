import { ModelDimensionsXML } from './ModelDimensionsXML';
import { ModelDirectionXML } from './ModelDirectionXML';

export class ModelXML
{
    private readonly _dimensions: ModelDimensionsXML;
    private readonly _directions: ModelDirectionXML[];

    constructor(xml: any)
    {
        if(xml.dimensions !== undefined)
        {
            if(xml.dimensions[0] !== undefined) this._dimensions = new ModelDimensionsXML(xml.dimensions[0]);
        }

        if((xml.directions !== undefined) && Array.isArray(xml.directions))
        {
            this._directions = [];

            for(const directionParent of xml.directions)
            {
                if(Array.isArray(directionParent.direction)) for(const direction of directionParent.direction) this._directions.push(new ModelDirectionXML(direction.$));
            }
        }
    }

    public get dimensions(): ModelDimensionsXML
    {
        return this._dimensions;
    }

    public get directions(): ModelDirectionXML[]
    {
        return this._directions;
    }
}
