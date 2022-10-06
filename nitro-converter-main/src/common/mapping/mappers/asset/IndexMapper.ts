import { IAssetData } from '../../json';
import { IndexXML } from '../../xml';
import { Mapper } from './Mapper';

export class IndexMapper extends Mapper
{
    public static mapXML(index: any, output: IAssetData): void
    {
        if(!index || !output) return;

        IndexMapper.mapIndexXML(new IndexXML(index.object), output);
    }

    private static mapIndexXML(indexXML: IndexXML, output: IAssetData): void
    {
        if(!indexXML || !output) return;

        if(indexXML.type !== undefined) output.name = indexXML.type;
        if(indexXML.logic !== undefined) output.logicType = indexXML.logic;
        if(indexXML.visualization !== undefined) output.visualizationType = indexXML.visualization;
    }
}
