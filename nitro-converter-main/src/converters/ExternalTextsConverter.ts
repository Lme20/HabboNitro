import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { Configuration, FileUtilities, IConverter, IExternalTexts } from '../common';

@singleton()
export class ExternalTextsConverter implements IConverter
{
    public externalTexts: IExternalTexts = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing ExternalTexts').start();
        const url = this._configuration.getValue('external.texts.url');
        const content = await FileUtilities.readFileAsString(url);

        this.externalTexts = ((!content.startsWith('{')) ? await this.mapText2JSON(content) : JSON.parse(content));

        const directory = await FileUtilities.getDirectory('./assets/gamedata');
        const path = directory.path + '/ExternalTexts.json';

        await writeFile(path, JSON.stringify(this.externalTexts), 'utf8');

        spinner.succeed(`ExternalTexts: Finished in ${ Date.now() - now }ms`);
    }

    private async mapText2JSON(text: string): Promise<IExternalTexts>
    {
        if(!text) return null;

        const output: IExternalTexts = {};

        const parts = text.split(/\r?\n/);

        for(const part of parts)
        {
            const [ key, ...value ] = part.split('=');

            output[key] = value.join();
        }

        return output;
    }

    public get converterType(): string
    {
        return 'ExternalTexts';
    }
}
