import { IFurnitureType } from './IFurnitureType';

export class IFurnitureData
{
    roomitemtypes?: {
        furnitype: IFurnitureType[]
    };
    wallitemtypes?: {
        furnitype: IFurnitureType[]
    };
}
