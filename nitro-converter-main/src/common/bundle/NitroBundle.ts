import ByteBuffer from 'bytebuffer';
import { Data, deflate, inflate } from 'pako';
import { BinaryReader } from '../utils';

export class NitroBundle
{
    private readonly _files: Map<string, Buffer>;

    constructor()
    {
        this._files = new Map<string, Buffer>();
    }

    public static from(buffer: ArrayBuffer): NitroBundle
    {
        const nitroBundle = new NitroBundle();
        const binaryReader = new BinaryReader(buffer);

        let fileCount = binaryReader.readShort();

        while(fileCount > 0)
        {
            const fileNameLength = binaryReader.readShort();
            const fileName = binaryReader.readBytes(fileNameLength).toString();
            const fileLength = binaryReader.readInt();
            const buffer = binaryReader.readBytes(fileLength);
            const decompressed = inflate((buffer.toArrayBuffer() as Data));

            nitroBundle.addFile(fileName, Buffer.from(decompressed.buffer));

            fileCount--;
        }

        return nitroBundle;
    }

    public addFile(name: string, data: Buffer): void
    {
        this._files.set(name, data);
    }

    public async toBufferAsync(): Promise<Buffer>
    {
        const buffer = new ByteBuffer();

        buffer.writeUint16(this._files.size);

        for(const file of this._files.entries())
        {
            const fileName = file[0];
            const fileBuffer = file[1];

            buffer.writeUint16(fileName.length);
            buffer.writeString(fileName);

            const compressed = deflate(fileBuffer);
            buffer.writeUint32(compressed.length);
            buffer.append(compressed);
        }

        buffer.flip();

        return buffer.toBuffer();
    }

    public get files(): Map<string, Buffer>
    {
        return this._files;
    }

    public get totalFiles(): number
    {
        return this._files.size;
    }
}
