import { CharacterTag } from './CharacterTag';
import { ITag } from './ITag';

export class DefineBinaryDataTag extends CharacterTag implements ITag
{
    private readonly _tag: number;
    private readonly _reserved: number;
    private readonly _binaryData: string;
    private readonly _binaryDataBuffer: Buffer;

    constructor(buffer: Buffer)
    {
        super();

        this._tag = buffer.readUInt16LE(0);
        this._reserved = buffer.readUInt32LE(2);
        const start = 6; //short 2 + int 4
        const end = buffer.length;
        const binary = buffer.slice(start, end);

        this._binaryData = binary.toString('utf-8');
        this._binaryDataBuffer = binary;

        this.characterId = this._tag;
    }

    public get code(): number
    {
        return 87;
    }

    public get tag(): number
    {
        return this._tag;
    }

    public get reserved(): number
    {
        return this._reserved;
    }

    public get binaryData(): string
    {
        return this._binaryData;
    }

    public get binaryDataBuffer(): Buffer
    {
        return this._binaryDataBuffer;
    }
}
