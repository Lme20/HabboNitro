import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { parseStringPromise } from 'xml2js';
import { Configuration, FileUtilities, FurnitureDataMapper, IConverter, IFurnitureData } from '../common';

@singleton()
export class FurnitureDataConverter implements IConverter
{
    public furnitureData: IFurnitureData = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing FurnitureData').start();
        const url = this._configuration.getValue('furnidata.load.url');
        const content = await FileUtilities.readFileAsString(url);

        this.furnitureData = ((!content.startsWith('{')) ? await this.mapXML2JSON(await parseStringPromise(content.replace(/&/g,'&amp;'))) : JSON.parse(content));

        const directory = await FileUtilities.getDirectory('./assets/gamedata');
        const path = directory.path + '/FurnitureData.json';

        await writeFile(path, JSON.stringify(this.furnitureData), 'utf8');

        spinner.succeed(`FurnitureData: Finished in ${ Date.now() - now }ms`);
    }

    private async mapXML2JSON(xml: any): Promise<IFurnitureData>
    {
        if(!xml) return null;

        const output: IFurnitureData = {};

        FurnitureDataMapper.mapXML(xml, output);

        return output;
    }

    public async getClassNamesAndRevisions(floorOnly: boolean = false, wallOnly: boolean = false): Promise<{ [index: string]: string }>
    {
        if(!this.furnitureData) return null;

        const both = (!floorOnly && !wallOnly);
        const entries: { [index: string]: string } = {};

        if((both || floorOnly) && this.furnitureData.roomitemtypes)
        {
            if(this.furnitureData.roomitemtypes.furnitype)
            {
                for(const furniType of this.furnitureData.roomitemtypes.furnitype)
                {
                    const className = furniType.classname.split('*')[0];
                    const revision = furniType.revision;

                    entries[className] = revision.toString();
                }
            }
        }

        if((both || wallOnly) && this.furnitureData.wallitemtypes)
        {
            if(this.furnitureData.wallitemtypes.furnitype)
            {
                for(const furniType of this.furnitureData.wallitemtypes.furnitype)
                {
                    const className = furniType.classname.split('*')[0];
                    const revision = furniType.revision;

                    entries[className] = revision.toString();
                }
            }
        }

        return entries;
    }

    public get converterType(): string
    {
        return 'FurnitureData';
    }
}
