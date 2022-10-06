import * as concatFrames from 'concat-frames';
import decoder from 'jpg-stream/decoder';
import encoder from 'png-stream/encoder';
import { PassThrough } from 'stream';
import streamToArray from 'stream-to-array';
import { promisify } from 'util';
import { unzip } from 'zlib';
import { SlicedToArray } from '../common';
import { ISWFTag } from './common';
import { RecognizeImageHeader } from './RecognizeImageHeader';

export const ReadImagesJPEG3or4 = async (code: number, tag: Partial<ISWFTag>) =>
{
    const { characterId, imgData, bitmapAlphaData } = tag;
    const imgType = RecognizeImageHeader(imgData);

    if(imgType !== 'jpeg') return { code, characterId, imgType, imgData };

    const pngEncoder = new encoder(undefined, undefined, { colorSpace: 'rgba' });
    const alphaBufPre = await promisify(unzip)(bitmapAlphaData);

    let alphaBuffer: Buffer = null;

    if(alphaBufPre.length > 0) alphaBuffer = alphaBufPre;

    const bufferStream = new PassThrough();

    bufferStream.end(imgData);

    bufferStream
        .pipe(new decoder())
        .pipe(concatFrames.default((data: any) =>
        {
            const _ref2 = SlicedToArray.slicedToArray(data, 1);
            const frame = _ref2[0];

            const input = frame.pixels;
            const pCount = frame.width * frame.height;
            const output = Buffer.alloc(pCount * 4);

            if(alphaBuffer !== null && alphaBuffer.length !== pCount)
            {
                console.error('expect alphaBuf to have size ' + pCount + ' while getting ' + alphaBuffer.length);
            }

            const getAlphaBuffer = (i: any) =>
            {
                if(!alphaBuffer) return 0xFF;

                return alphaBuffer[i];
            };

            for(let i = 0; i < pCount; ++i)
            {
                output[4 * i] = input[3 * i];
                output[4 * i + 1] = input[3 * i + 1];
                output[4 * i + 2] = input[3 * i + 2];
                output[4 * i + 3] = getAlphaBuffer(i);
            }

            pngEncoder.format.width = frame.width;
            pngEncoder.format.height = frame.height;
            pngEncoder.end(output);
        }));

    const parts = await streamToArray(pngEncoder);
    const buffers = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part));

    bufferStream.end();

    return {
        code: code,
        characterId: characterId,
        imgType: 'png',
        imgData: Buffer.concat(buffers)
    };
};
