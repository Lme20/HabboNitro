import { IEffectMap, IEffectMapLibrary } from '../json';
import { EffectMapEffectXML, EffectMapXML } from '../xml';
import { Mapper } from './asset';

export class EffectMapMapper extends Mapper
{
    public static mapXML(xml: any, output: IEffectMap): void
    {
        if(!xml || !output) return;

        if(xml.map !== undefined) EffectMapMapper.mapEffectMapXML(new EffectMapXML(xml.map), output);
    }

    private static mapEffectMapXML(xml: EffectMapXML, output: IEffectMap): void
    {
        if(!xml || !output) return;

        if(xml.effects !== undefined)
        {
            if(xml.effects.length)
            {
                output.effects = [];

                EffectMapMapper.mapEffectMapLibrariesXML(xml.effects, output.effects);
            }
        }
    }

    private static mapEffectMapLibrariesXML(xml: EffectMapEffectXML[], output: IEffectMapLibrary[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const libraryXML of xml)
        {
            const library: IEffectMapLibrary = {};

            if(libraryXML.id !== undefined) library.id = libraryXML.id;
            if(libraryXML.lib !== undefined) library.lib = libraryXML.lib;
            if(libraryXML.type !== undefined) library.type = libraryXML.type;
            if(libraryXML.revision !== undefined) library.revision = libraryXML.revision;

            output.push(library);
        }
    }
}
