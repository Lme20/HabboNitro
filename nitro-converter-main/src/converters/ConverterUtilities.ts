import ora from 'ora';
import { singleton } from 'tsyringe';
import { Configuration, File, FileUtilities, NitroBundle } from '../common';
import { GenerateNitroBundleFromSwf, SWFDownloader } from '../swf';
import { EffectMapConverter } from './EffectMapConverter';
import { FigureMapConverter } from './FigureMapConverter';
import { FurnitureDataConverter } from './FurnitureDataConverter';

@singleton()
export class ConverterUtilities
{
    private static BUNDLE_TYPES: string[] = [ 'furniture', 'figure', 'effect', 'pet', 'generic' ];
    private static DOWNLOAD_SWF_TYPES: string[] = [ 'furniture', 'figure', 'effect', 'pet' ];

    constructor(
        private readonly _furnitureDataConverter: FurnitureDataConverter,
        private readonly _figureMapConverter: FigureMapConverter,
        private readonly _effectMapConverter: EffectMapConverter,
        private readonly _configuration: Configuration)
    {}

    public async downloadSwfTypes(): Promise<void>
    {
        const floorOnly = (this._configuration.getBoolean('convert.furniture.floor.only') || false);
        const wallOnly = (this._configuration.getBoolean('convert.furniture.wall.only') || false);

        for(const downloadType of ConverterUtilities.DOWNLOAD_SWF_TYPES)
        {
            if(!this._configuration.getBoolean(`convert.${ downloadType }`)) continue;

            const now = Date.now();
            const spinner = ora(`Preparing ${ downloadType }`).start();
            const downloadBase = this.getDownloadBaseUrl(downloadType);
            const saveDirectory = await FileUtilities.getDirectory(`./assets/bundled/${ downloadType }`);
            const classNamesWithRevisions = await this.getClassNamesWithRevision(downloadType, floorOnly, wallOnly);
            const classNames = Object.keys(classNamesWithRevisions);

            if(classNames && classNames.length)
            {
                const totalClassNames = classNames.length;

                for(let i = 0; i < totalClassNames; i++)
                {
                    const className = classNames[i];
                    const revision = (classNamesWithRevisions[className] || '-1');

                    try
                    {
                        const saveFile = new File(`${ saveDirectory.path }/${ className }.nitro`);

                        if(saveFile.exists()) continue;

                        spinner.text = `Converting: ${ className } (${ (i + 1) } / ${ totalClassNames })`;
                        spinner.render();

                        const downloadUrl = SWFDownloader.getDownloadUrl(downloadBase, className, revision);
                        const habboAssetSwf = await SWFDownloader.downloadFromUrl(downloadUrl);

                        if(!habboAssetSwf)
                        {
                            console.log();
                            console.error(`Invalid SWF: ${ className }`);

                            continue;
                        }

                        const nitroBundle = await GenerateNitroBundleFromSwf(habboAssetSwf);

                        await saveFile.writeData(await nitroBundle.toBufferAsync());

                        spinner.text = `Converted: ${ className }`;
                        spinner.render();
                    }

                    catch (error)
                    {
                        console.log();
                        console.error(`Error Converting: ${ className } - ${ error.message }`);

                        continue;
                    }
                }
            }

            spinner.succeed(`Finished ${ downloadType } in ${ Date.now() - now }ms`);
        }
    }

    public getDownloadBaseUrl(type: string): string
    {
        switch(type)
        {
            case 'furniture':
                return this._configuration.getValue('dynamic.download.furniture.url');
            case 'figure':
                return this._configuration.getValue('dynamic.download.figure.url');
            case 'effect':
                return this._configuration.getValue('dynamic.download.effect.url');
            case 'pet':
                return this._configuration.getValue('dynamic.download.pet.url');
        }

        return null;
    }

    public async getClassNamesWithRevision(type: string, floorOnly: boolean = false, wallOnly: boolean = false): Promise<{ [index: string ]: string }>
    {
        switch(type)
        {
            case 'furniture':
                return await this._furnitureDataConverter.getClassNamesAndRevisions(floorOnly, wallOnly);
            case 'figure':
                return await this._figureMapConverter.getClassNamesAndRevisions();
            case 'effect':
                return await this._effectMapConverter.getClassNamesAndRevisions();
            case 'pet': {
                const entries: { [index: string]: string } = {};
                const classNames = this._configuration.getValue('pet.configuration').split(',');

                for(const className of classNames) entries[className] = '-1';

                return entries;
            }
        }

        return null;
    }

    public async extractNitroFromFolder(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing Extraction').start();
        const extractBaseDirectory = await FileUtilities.getDirectory('./assets/extract');
        const extractedBaseDirectory = await FileUtilities.getDirectory('./assets/extracted');

        for await (const type of ConverterUtilities.BUNDLE_TYPES)
        {
            const extractTypeDirectory = await FileUtilities.getDirectory(`${ extractBaseDirectory.path }/${ type }`);
            const extractedTypeDirectory = await FileUtilities.getDirectory(`${ extractedBaseDirectory.path }/${ type }`);
            const files = await extractTypeDirectory.getFileList();

            for await (const name of files)
            {
                const [ className, extension, ...rest ] = name.split('.');

                try
                {
                    spinner.text = `Extracting: ${ className }`;
                    spinner.render();

                    const saveDirectory = await FileUtilities.getDirectory(`${ extractedTypeDirectory.path }/${ className }`);

                    const file = new File(`${ extractTypeDirectory.path }/${ name }`);

                    if(extension === 'nitro')
                    {
                        const nitroBundle = NitroBundle.from((await file.getContentsAsBuffer()).buffer);

                        for await (const [ bundleName, bundleBuffer ] of nitroBundle.files.entries())
                        {
                            const saveFile = new File(`${ saveDirectory.path }/${ bundleName }`);

                            await saveFile.writeData(bundleBuffer);
                        }

                        spinner.text = `Extracted: ${ className }`;
                        spinner.render();
                    }
                }

                catch (error)
                {
                    console.log();
                    console.error(`Error Extracting: ${ name } - ${ error.message }`);
                }
            }
        }

        spinner.succeed(`Extraction: Finished in ${ Date.now() - now }ms`);
    }

    public async convertSwfFromFolder(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing SWF Extraction').start();
        const swfBaseDirectory = await FileUtilities.getDirectory('./assets/swf');
        const bundledBaseDirectory = await FileUtilities.getDirectory('./assets/bundled');

        for await (const type of ConverterUtilities.BUNDLE_TYPES)
        {
            const swfTypeDirectory = await FileUtilities.getDirectory(`${ swfBaseDirectory.path }/${ type }`);
            const bundledTypeDirectory = await FileUtilities.getDirectory(`${ bundledBaseDirectory.path }/${ type }`);
            const files = await swfTypeDirectory.getFileList();

            for await (const name of files)
            {
                const [ className, extension, ...rest ] = name.split('.');

                try
                {
                    spinner.text = `Extracting SWF: ${ className }`;
                    spinner.render();

                    const downloadUrl = `${ swfTypeDirectory.path }/${ className }.swf`;
                    const habboAssetSwf = await SWFDownloader.downloadFromUrl(downloadUrl);

                    if(!habboAssetSwf)
                    {
                        console.log();
                        console.error(`Invalid SWF: ${ downloadUrl }`);

                        continue;
                    }

                    const nitroBundle = await GenerateNitroBundleFromSwf(habboAssetSwf);

                    if(!nitroBundle)
                    {
                        console.log();
                        console.error(`Invalid SWF Bundle: ${ downloadUrl }`);

                        continue;
                    }

                    const saveFile = new File(`${ bundledTypeDirectory.path }/${ className }.nitro`);

                    await saveFile.writeData(await nitroBundle.toBufferAsync());

                    spinner.text = `Extracted SWF: ${ className }`;
                    spinner.render();
                }

                catch (error)
                {
                    console.log();
                    console.error(`Error Extracting: ${ name } - ${ error.message }`);
                }
            }
        }

        spinner.succeed(`SWF Extraction: Finished in ${ Date.now() - now }ms`);
    }

    public async bundleExtractedFromFolder(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing Bundler').start();
        const bundleBaseDirectory = await FileUtilities.getDirectory('./assets/extracted');
        const bundledBaseDirectory = await FileUtilities.getDirectory('./assets/bundled');

        for await (const type of ConverterUtilities.BUNDLE_TYPES)
        {
            const bundleTypeDirectory = await FileUtilities.getDirectory(`${ bundleBaseDirectory.path }/${ type }`);
            const bundledTypeDirectory = await FileUtilities.getDirectory(`${ bundledBaseDirectory.path }/${ type }`);
            const files = await bundleTypeDirectory.getFileList();

            for await (const name of files)
            {
                const [ className, extension, ...rest ] = name.split('.');

                try
                {
                    const bundleDirectory = new File(`${ bundleTypeDirectory.path }/${ name }`);

                    if(!await bundleDirectory.isDirectory()) continue;

                    spinner.text = `Bundling: ${ className }`;
                    spinner.render();

                    const nitroBundle = new NitroBundle();
                    const childFiles = await bundleDirectory.getFileList();

                    if(childFiles && childFiles.length)
                    {
                        for await (const childName of childFiles)
                        {
                            const childFile = new File(`${ bundleDirectory.path }/${ childName }`);

                            nitroBundle.addFile(childName, await childFile.getContentsAsBuffer());
                        }
                    }

                    if(nitroBundle.totalFiles)
                    {
                        const saveFile = new File(`${ bundledTypeDirectory.path }/${ className }.nitro`);

                        await saveFile.writeData(await nitroBundle.toBufferAsync());
                    }
                    else
                    {
                        console.log();
                        console.error(`Error Bundling: ${ name } - The bundle was empty`);

                        continue;
                    }

                    spinner.text = `Bundled: ${ name }`;
                    spinner.render();
                }

                catch (error)
                {
                    console.log();
                    console.error(`Error Bundling: ${ name } - ${ error.message }`);
                }
            }
        }

        spinner.succeed(`Bundler: Finished in ${ Date.now() - now }ms`);
    }
}
