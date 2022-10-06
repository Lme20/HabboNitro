import { IFurnitureData, IFurnitureType } from '../json';
import { FurnitureDataXML, FurnitureTypeXML } from '../xml';
import { Mapper } from './asset';

export class FurnitureDataMapper extends Mapper
{
    public static mapXML(xml: any, output: IFurnitureData): void
    {
        if(!xml || !output) return;

        if(xml.furnidata !== undefined) FurnitureDataMapper.mapFurnitureDataXML(new FurnitureDataXML(xml.furnidata), output);
    }

    private static mapFurnitureDataXML(xml: FurnitureDataXML, output: IFurnitureData): void
    {
        if(!xml || !output) return;

        if(xml.floorItems !== undefined)
        {
            if(xml.floorItems.length)
            {
                output.roomitemtypes = {
                    furnitype: []
                };

                FurnitureDataMapper.mapFurnitureTypesXML(xml.floorItems, output.roomitemtypes.furnitype, 'floor');
            }
        }

        if(xml.wallItems !== undefined)
        {
            if(xml.wallItems.length)
            {
                output.wallitemtypes = {
                    furnitype: []
                };

                FurnitureDataMapper.mapFurnitureTypesXML(xml.wallItems, output.wallitemtypes.furnitype, 'wall');
            }
        }
    }

    private static mapFurnitureTypesXML(xml: FurnitureTypeXML[], output: IFurnitureType[], type: string): void
    {
        if(!xml || !xml.length || !output) return;

        for(const typeXML of xml)
        {
            const furnitureType: IFurnitureType = {};

            furnitureType.id         = typeXML.id;
            furnitureType.classname  = typeXML.classname;
            furnitureType.revision   = typeXML.revision;
            furnitureType.category   = typeXML.category;

            if(type === 'floor')
            {
                furnitureType.defaultdir = typeXML.defaultdir;
                furnitureType.xdim       = typeXML.xdim;
                furnitureType.ydim       = typeXML.ydim;
                furnitureType.partcolors = typeXML.partcolors;
            }

            furnitureType.name               = typeXML.name;
            furnitureType.description        = typeXML.description;
            furnitureType.adurl              = typeXML.adurl;
            furnitureType.offerid            = typeXML.offerid;
            furnitureType.buyout             = typeXML.buyout;
            furnitureType.rentofferid        = typeXML.rentofferid;
            furnitureType.rentbuyout         = typeXML.rentbuyout;
            furnitureType.bc                 = typeXML.bc;
            furnitureType.excludeddynamic    = typeXML.excludeddynamic;
            furnitureType.customparams       = typeXML.customparams;
            furnitureType.specialtype        = typeXML.specialtype;

            if(type === 'floor')
            {
                furnitureType.canstandon = typeXML.canstandon;
                furnitureType.cansiton   = typeXML.cansiton;
                furnitureType.canlayon   = typeXML.canlayon;
            }

            furnitureType.furniline      = typeXML.furniline;
            furnitureType.environment    = typeXML.environment;
            furnitureType.rare           = typeXML.rare;

            output.push(furnitureType);
        }
    }
}
