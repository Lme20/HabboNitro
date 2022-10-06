import { GenerateSpriteSheet } from './GenerateSpritesheet';
import { HabboAssetSWF } from './HabboAssetSWF';
import { SWFUtilities } from './SWFUtilities';

export const GenerateNitroBundleFromSwf = async (habboAssetSWF: HabboAssetSWF, assetType: string = null) =>
{
    if(!habboAssetSWF) return null;

    const spriteBundle = await GenerateSpriteSheet(habboAssetSWF);
    const assetData = await SWFUtilities.mapXML2JSON(habboAssetSWF, assetType);

    if(assetData) assetData.name = habboAssetSWF.getDocumentClass();

    return SWFUtilities.createNitroBundle(assetData.name, assetData, spriteBundle);
};
