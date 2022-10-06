import { readFile } from 'fs/promises';
import { UncompressSWF } from './UncompressSWF';

export const ReadSWF = async (buffer: Buffer) =>
{
    if(Buffer.isBuffer(buffer)) return await UncompressSWF(buffer);

    buffer = await readFile(buffer);

    if(!buffer) return null;

    return await UncompressSWF(buffer);
};
