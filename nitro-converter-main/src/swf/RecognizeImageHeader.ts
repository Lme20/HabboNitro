const pngMagic = Buffer.from('0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A'.split(' ').map(Number));
const gifMagic = Buffer.from('0x47 0x49 0x46 0x38 0x39 0x61'.split(' ').map(Number));
const jpegMagic = Buffer.from('0xFF 0xD8'.split(' ').map(Number));

export const RecognizeImageHeader = (buffer: Buffer) =>
{
    if(pngMagic.equals(buffer.slice(0, pngMagic.length))) return 'png';
    if(gifMagic.equals(buffer.slice(0, gifMagic.length))) return 'gif';
    if(jpegMagic.equals(buffer.slice(0, jpegMagic.length))) return 'jpeg';

    console.error('Unknown format:', buffer.slice(0, 8));

    return null;
};
