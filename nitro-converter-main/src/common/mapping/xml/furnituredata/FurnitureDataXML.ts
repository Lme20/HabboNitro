import { FurnitureTypeXML } from './FurnitureTypeXML';

export class FurnitureDataXML
{
    private _floorItems: FurnitureTypeXML[];
    private _wallItems: FurnitureTypeXML[];

    constructor(xml: any)
    {
        if(!xml) return;

        if(xml.roomitemtypes !== undefined)
        {
            this._floorItems = [];

            for(const roomitemtype of xml.roomitemtypes)
            {
                const furniTypes = roomitemtype.furnitype;

                if(furniTypes !== undefined)
                {
                    if(Array.isArray(furniTypes)) for(const furniType of furniTypes) this._floorItems.push(new FurnitureTypeXML('floor', furniType));
                }
            }
        }

        if(xml.wallitemtypes !== undefined)
        {
            this._wallItems = [];

            for(const wallitemtype of xml.wallitemtypes)
            {
                const furniTypes = wallitemtype.furnitype;

                if(furniTypes !== undefined)
                {
                    if(Array.isArray(furniTypes)) for(const furniType of furniTypes) this._wallItems.push(new FurnitureTypeXML('wall', furniType));
                }
            }
        }
    }

    public get floorItems(): FurnitureTypeXML[]
    {
        return this._floorItems;
    }

    public get wallItems(): FurnitureTypeXML[]
    {
        return this._wallItems;
    }
}
