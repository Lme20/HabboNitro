import { IAssetColorLayer } from './IAssetColorLayer';

export interface IAssetColor
{
    layers?: { [index: string]: IAssetColorLayer };
}
