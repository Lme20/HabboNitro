export class BinaryReader
{
    private _position: number;
    private _dataView: DataView;

    constructor(buffer: ArrayBuffer)
    {
        this._position = 0;
        this._dataView = new DataView(buffer);
    }

    public readByte(): number
    {
        const byte = this._dataView.getInt8(this._position);

        this._position++;

        return byte;
    }

    public readBytes(length: number): BinaryReader
    {
        const buffer = new BinaryReader(this._dataView.buffer.slice(this._position, this._position + length));

        this._position += length;

        return buffer;
    }

    public readShort(): number
    {
        const short = this._dataView.getInt16(this._position);

        this._position += 2;

        return short;
    }

    public readInt(): number
    {
        const int = this._dataView.getInt32(this._position);

        this._position += 4;

        return int;
    }

    public remaining(): number
    {
        return this._dataView.byteLength - this._position;
    }

    public toString(encoding?: string): string
    {
        return new TextDecoder().decode(this._dataView.buffer);
    }

    public toArrayBuffer(): ArrayBuffer
    {
        return this._dataView.buffer;
    }
}
