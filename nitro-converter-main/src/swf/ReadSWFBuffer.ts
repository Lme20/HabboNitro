import { ISWF } from './common';
import { readSWFTags } from './ReadSWFTags';
import { SWFBuffer } from './SWFBuffer';

export const ReadSWFBuff = (swfBuffer: SWFBuffer, rawBuffer: Buffer) =>
{
    if(!swfBuffer || !rawBuffer) return null;

    swfBuffer.seek(3);

    if(swfBuffer.length < 9)
    {
        console.error('Buffer is to small, must be greater than 9 bytes.');

        return null;
    }

    const swf: ISWF = {
        version: swfBuffer.readUInt8(),
        fileLength: {
            compressed: rawBuffer.length,
            uncompressed: swfBuffer.readUIntLE(32)
        },
        frameSize: swfBuffer.readRect(),
        frameRate: (swfBuffer.readUIntLE(16) / 256),
        frameCount: swfBuffer.readUIntLE(16),
    };

    swf.tags = readSWFTags(swfBuffer, swf);

    return swf;
};
