import encoder from 'png-stream/encoder';
import streamToArray from 'stream-to-array';
import { promisify } from 'util';
import { unzip } from 'zlib';
import { ISWFTag } from './common';

export const ReadImagesDefineBitsLossless = async (tag: Partial<ISWFTag>) =>
{
    const { characterId, bitmapFormat, bitmapWidth, bitmapHeight, bitmapColorTableSize, zlibBitmapData } = tag;

    const pngEncoder = new encoder(bitmapWidth, bitmapHeight, { colorSpace: 'rgba' });
    const dataBuf = await promisify(unzip)(zlibBitmapData);

    if(!dataBuf) return null;
    const output = Buffer.alloc(bitmapWidth * bitmapHeight * 4);

    let index = 0;
    let ptr = 0;

    switch(bitmapFormat)
    {
        case 5: {
            for(let y = 0; y < bitmapHeight; ++y)
            {
                for(let x = 0; x < bitmapWidth; ++x)
                {
                    const alpha = dataBuf[ptr];
                    output[index] = dataBuf[ptr + 1] * (255 / alpha);
                    output[index + 1] = dataBuf[ptr + 2] * (255 / alpha);
                    output[index + 2] = dataBuf[ptr + 3] * (255 / alpha);
                    output[index + 3] = alpha;
                    index += 4;
                    ptr += 4;
                }
            }

            break;
        }
        case 3: {
            // 8-bit colormapped image
            const colorMap = [];

            for(let i = 0; i < bitmapColorTableSize + 1; ++i)
            {
                colorMap.push([dataBuf[ptr], dataBuf[ptr + 1], dataBuf[ptr + 2], dataBuf[ptr + 3]]);

                ptr += 4;
            }

            for(let _y2 = 0; _y2 < bitmapHeight; ++_y2)
            {
                for(let _x2 = 0; _x2 < bitmapWidth; ++_x2)
                {
                    const idx = dataBuf[ptr];
                    const color = idx < colorMap.length ? colorMap[idx] : [0, 0, 0, 0];
                    output[index] = color[0];
                    output[index + 1] = color[1];
                    output[index + 2] = color[2];
                    output[index + 3] = color[3];
                    ptr += 1;
                    index += 4;
                }

                // skip padding
                ptr += (4 - bitmapWidth % 4) % 4;
            }

            break;
        }
        default:
            // reject(new Error('unhandled bitmapFormat: ' + bitmapFormat));
            break;
    }

    pngEncoder.end(output);

    const parts = await streamToArray(pngEncoder);

    const buffers = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part));

    return {
        code: 36,
        characterId: characterId,
        imgType: 'png',
        imgData: Buffer.concat(buffers),
        bitmapWidth: bitmapWidth,
        bitmapHeight: bitmapHeight
    };
};
