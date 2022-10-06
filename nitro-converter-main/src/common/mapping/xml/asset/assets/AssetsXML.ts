import { AssetXML } from './AssetXML';
import { PaletteXML } from './PaletteXML';

export class AssetsXML
{
    private readonly _assets: AssetXML[];
    private readonly _palettes: PaletteXML[];

    constructor(xml: any)
    {
        if(xml.asset !== undefined)
        {
            if(Array.isArray(xml.asset))
            {
                this._assets = [];

                for(const asset of xml.asset) this._assets.push(new AssetXML(asset));
            }
        }

        if(xml.palette !== undefined)
        {
            if(Array.isArray(xml.palette))
            {
                this._palettes = [];

                for(const palette of xml.palette) this._palettes.push(new PaletteXML(palette));
            }
        }
    }

    public get assets(): AssetXML[]
    {
        return this._assets;
    }

    public get palettes(): PaletteXML[]
    {
        return this._palettes;
    }
}
