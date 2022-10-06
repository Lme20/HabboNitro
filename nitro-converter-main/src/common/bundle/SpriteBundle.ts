import { ISpritesheetData } from '../mapping';

export class SpriteBundle
{
    private _spritesheet: ISpritesheetData;
    private _imageData: { name: string, buffer: Buffer };

    public get spritesheet(): ISpritesheetData
    {
        return this._spritesheet;
    }

    public set spritesheet(spritesheet: ISpritesheetData)
    {
        this._spritesheet = spritesheet;
    }

    public get imageData(): { name: string, buffer: Buffer}
    {
        return this._imageData;
    }

    public set imageData(imageData: { name: string, buffer: Buffer })
    {
        this._imageData = imageData;
    }
}
