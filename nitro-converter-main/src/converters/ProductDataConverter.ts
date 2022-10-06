import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { Configuration, FileUtilities, IConverter, IProductData } from '../common';

@singleton()
export class ProductDataConverter implements IConverter
{
    public productData: IProductData = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(args: string[] = []): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing ProductData').start();
        const url = this._configuration.getValue('productdata.load.url');
        const content = await FileUtilities.readFileAsString(url);

        this.productData = ((!content.startsWith('{')) ? await this.mapText2JSON(content) : JSON.parse(content));

        const directory = await FileUtilities.getDirectory('./assets/gamedata');
        const path = directory.path + '/ProductData.json';

        await writeFile(path, JSON.stringify(this.productData), 'utf8');

        spinner.succeed(`ProductData: Finished in ${ Date.now() - now }ms`);
    }

    private async mapText2JSON(text: string): Promise<IProductData>
    {
        if(!text) return null;

        const output: IProductData = {
            productdata: {
                product: []
            }
        };

        text = text.replace(/"{1,}/g, '');

        const parts = text.split(/\n\r{1,}|\n{1,}|\r{1,}/mg);

        for(const part of parts)
        {
            const set = part.match(/\[+?((.)*?)\]/g);

            if(set)
            {
                for(const entry of set)
                {
                    let value = entry.replace(/\[{1,}/mg, '');
                    value = entry.replace(/\]{1,}/mg, '');

                    value = value.replace('[[', '');
                    value = value.replace('[', '');

                    const pieces = value.split(',');
                    const code = pieces.shift();
                    const name = pieces.shift();
                    const description = pieces.join(',');

                    output.productdata.product.push({ code, name, description });
                }
            }
        }

        return output;
    }

    public get converterType(): string
    {
        return 'ProductData';
    }
}
