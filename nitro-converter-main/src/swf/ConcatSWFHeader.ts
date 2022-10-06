export const ConcatSWFHeader = (buff: Buffer, swf: Buffer) =>
{
    return Buffer.concat([ swf.slice(0, 8), buff ]);
};
