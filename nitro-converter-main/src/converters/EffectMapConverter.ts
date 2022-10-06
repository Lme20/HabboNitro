import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { parseStringPromise } from 'xml2js';
import { Configuration, EffectMapMapper, FileUtilities, IConverter, IEffectMap } from '../common';

@singleton()
export class EffectMapConverter implements IConverter
{
    private _effectMap: IEffectMap = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing EffectMap').start();
        const url = this._configuration.getValue('effectmap.load.url');
        const content = await FileUtilities.readFileAsString(url);

        this._effectMap = ((!content.startsWith('{')) ? await this.mapXML2JSON(await parseStringPromise(content.replace(/&/g,'&amp;'))) : JSON.parse(content));

        const directory = await FileUtilities.getDirectory('./assets/gamedata');
        const path = directory.path + '/EffectMap.json';

        await writeFile(path, JSON.stringify(this._effectMap), 'utf8');

        spinner.succeed(`EffectMap: Finished in ${ Date.now() - now }ms`);
    }

    private async mapXML2JSON(xml: any): Promise<IEffectMap>
    {
        if(!xml) return null;

        const output: IEffectMap = {};

        EffectMapMapper.mapXML(xml, output);

        return output;
    }

    public async getClassNamesAndRevisions(): Promise<{ [index: string]: string }>
    {
        const entries: { [index: string]: string } = {};

        if(this._effectMap.effects)
        {
            for(const library of this._effectMap.effects) entries[library.lib] = '-1';
        }

        return entries;
    }
}
