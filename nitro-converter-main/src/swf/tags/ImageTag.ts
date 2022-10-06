import { CharacterTag } from './CharacterTag';
import { ITag } from './ITag';

export class ImageTag extends CharacterTag implements ITag
{
    constructor(
        protected _characterId: number,
        private _code: number,
        private _imgType: string,
        private _imgData: Buffer,
        private _imgWidth: number = 0,
        private _imgHeight: number = 0
    )
    {
        super(_characterId);
    }

    public get code(): number
    {
        return this._code;
    }

    public get imgType(): string
    {
        return this._imgType;
    }

    public get imgData(): Buffer
    {
        return this._imgData;
    }

    public get imgWidth(): number
    {
        return this._imgWidth;
    }

    public get imgHeight(): number
    {
        return this._imgHeight;
    }
}
