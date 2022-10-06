import 'reflect-metadata';
import { container } from 'tsyringe';
import { FileUtilities } from './common';
import { Configuration } from './common/config/Configuration';
import { IConverter } from './common/converters/IConverter';
import { ConverterUtilities } from './converters/ConverterUtilities';
import { EffectMapConverter } from './converters/EffectMapConverter';
import { ExternalTextsConverter } from './converters/ExternalTextsConverter';
import { FigureDataConverter } from './converters/FigureDataConverter';
import { FigureMapConverter } from './converters/FigureMapConverter';
import { FurnitureDataConverter } from './converters/FurnitureDataConverter';
import { ProductDataConverter } from './converters/ProductDataConverter';

(async () =>
{
    try
    {
        const configurationContent = await FileUtilities.readFileAsString('./configuration.json');
        const config = container.resolve(Configuration);

        await config.init(JSON.parse(configurationContent));

        const converters = [
            FurnitureDataConverter,
            FigureDataConverter,
            ProductDataConverter,
            ExternalTextsConverter,
            EffectMapConverter,
            FigureMapConverter
        ];

        const bundle = (process.argv.indexOf('--bundle') >= 0);
        const extract = (process.argv.indexOf('--extract') >= 0);
        const convertSwf = (process.argv.indexOf('--convert-swf') >= 0);
        const skip = (bundle || extract || convertSwf);

        if (skip)
        {
            const extractor = container.resolve(ConverterUtilities);

            bundle && await extractor.bundleExtractedFromFolder();
            extract && await extractor.extractNitroFromFolder();
            convertSwf && await extractor.convertSwfFromFolder();

            process.exit();
        }

        for (const converterClass of converters)
        {
            const converter = (container.resolve<any>(converterClass) as IConverter);

            await converter.convertAsync();
        }

        const utilities = container.resolve(ConverterUtilities);

        await utilities.downloadSwfTypes();

        process.exit();
    }

    catch (e)
    {
        console.error(e);
    }
})();
