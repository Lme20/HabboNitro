import { ImageBundle } from '../common';
import { HabboAssetSWF } from './HabboAssetSWF';
import { PackImages } from './PackImages';

export const IMAGE_SOURCES: Map<string, string> = new Map();

export const GenerateSpriteSheet = async (habboAssetSWF: HabboAssetSWF, convertCase: boolean = false) =>
{
    const tagList = habboAssetSWF.symbolTags();
    const names: string[] = [];
    const tags: number[] = [];

    let documentClass = habboAssetSWF.getDocumentClass();

    if(convertCase) documentClass = (documentClass.replace(/(?:^|\.?)([A-Z])/g, (x,y) => ('_' + y.toLowerCase().replace(/^_/, ''))));

    for(const tag of tagList)
    {
        names.push(...tag.names);
        tags.push(...tag.tags);
    }

    const imageBundle = new ImageBundle();

    const imageTags = habboAssetSWF.imageTags();

    for(const imageTag of imageTags)
    {
        if(tags.includes(imageTag.characterId))
        {
            for(let i = 0; i < tags.length; i++)
            {
                if(tags[i] != imageTag.characterId) continue;

                if(names[i] == imageTag.className) continue;

                if(imageTag.className.startsWith('sh_')) continue;

                if(imageTag.className.indexOf('_32_') >= 0) continue;

                IMAGE_SOURCES.set(names[i].substring(documentClass.length + 1), imageTag.className.substring(documentClass.length + 1));
            }
        }

        if(imageTag.className.startsWith('sh_')) continue;

        if(imageTag.className.indexOf('_32_') >= 0) continue;

        let className = imageTag.className;

        if(convertCase) className = ((className.replace(/(?:^|\.?)([A-Z])/g, (x,y) => ('_' + y.toLowerCase().replace(/^_/, '')))).substring(1));

        imageBundle.addImage(className, imageTag.imgData);
    }

    if(!imageBundle.images.length) return null;

    return await PackImages(documentClass, imageBundle, convertCase);
};
