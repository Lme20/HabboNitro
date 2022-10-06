import * as lzma from 'lzma-purejs';
import { Stream } from 'stream';
import { promisify } from 'util';
import { unzip } from 'zlib';
import { ReadSWFBuff } from './ReadSWFBuffer';
import { SWFBuffer } from './SWFBuffer';

export const UncompressSWF = async (rawBuffer: Buffer) =>
{
    if(!Buffer.isBuffer(rawBuffer)) return null;

    let compressedBuffer = rawBuffer.slice(8);

    switch(rawBuffer[0])
    {
        case 0x43: { // zlib compressed
            const buffer = await (promisify(unzip)(compressedBuffer));

            if(!Buffer.isBuffer(buffer)) return null;

            return ReadSWFBuff(new SWFBuffer(buffer), rawBuffer);
        }
        case 0x46: // uncompressed
            return ReadSWFBuff(new SWFBuffer(rawBuffer), rawBuffer);
        case 0x5a: { // LZMA compressed
            const lzmaProperties = compressedBuffer.slice(4, 9);
            compressedBuffer = compressedBuffer.slice(9);

            const inputStream = new Stream();

            let inputPos = 0;

            //@ts-ignore
            inputStream.readByte = () =>
            {
                return inputPos >= compressedBuffer.length ? -1 : compressedBuffer[inputPos++];
            };

            const outputStream = new Stream();

            let outputBuffer = Buffer.alloc(16384);
            let outputPos = 0;

            //@ts-ignore
            outputStream.writeByte = (_byte: number) =>
            {
                if(outputPos >= outputBuffer.length)
                {
                    const newBuffer = Buffer.alloc(outputBuffer.length * 2);

                    outputBuffer.copy(newBuffer);
                    outputBuffer = newBuffer;
                }

                outputBuffer[outputPos++] = _byte;

                return true;
            };

            //@ts-ignore
            outputStream.getBuffer = () =>
            {
                // trim buffer
                if(outputPos !== outputBuffer.length)
                {
                    const newBuffer = Buffer.alloc(outputPos);
                    outputBuffer.copy(newBuffer, 0, 0, outputPos);
                    outputBuffer = newBuffer;
                }

                return outputBuffer;
            };

            lzma.decompress(lzmaProperties, inputStream, outputStream, -1);

            //@ts-ignore
            const buffer = Buffer.concat([ rawBuffer.slice(0, 8), outputStream.getBuffer() ]);

            if(!Buffer.isBuffer(buffer)) return null;

            return ReadSWFBuff(new SWFBuffer(buffer), rawBuffer);
        }
    }

    return null;
};
