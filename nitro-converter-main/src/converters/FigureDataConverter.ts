import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { parseStringPromise } from 'xml2js';
import { Configuration, FigureDataMapper, FileUtilities, IConverter, IFigureData } from '../common';

@singleton()
export class FigureDataConverter implements IConverter
{
    public figureData: IFigureData = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing FigureData').start();
        const url = this._configuration.getValue('figuredata.load.url');
        const content = await FileUtilities.readFileAsString(url);

        this.figureData = ((!content.startsWith('{')) ? await this.mapXML2JSON(await parseStringPromise(content.replace(/&/g,'&amp;'))) : JSON.parse(content));

        const directory = await FileUtilities.getDirectory('./assets/gamedata');
        const path = directory.path + '/FigureData.json';

        await writeFile(path, JSON.stringify(this.figureData), 'utf8');

        spinner.succeed(`FigureData: Finished in ${ Date.now() - now }ms`);
    }

    private async mapXML2JSON(xml: any): Promise<IFigureData>
    {
        if(!xml) return null;

        const output: IFigureData = {};

        FigureDataMapper.mapXML(xml, output);

        return output;
    }

    public get converterType(): string
    {
        return 'FigureData';
    }
}
