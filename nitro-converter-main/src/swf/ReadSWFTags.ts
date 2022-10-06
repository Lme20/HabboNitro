import { ISWF, ISWFFileAttributes, ISWFTag, ISWFTagHeader } from './common';
import { SWFBuffer } from './SWFBuffer';
import { SWFTags } from './SWFTags';

export const readSWFTags = (buffer: SWFBuffer, swf: Partial<ISWF>) =>
{
    const tags: Partial<ISWFTag>[] = [];

    let header: ISWFTagHeader = null;

    while((header = buffer.readTagCodeAndLength()))
    {
        const tag: Partial<ISWFTag> = { header };

        switch(header.code)
        {
            case SWFTags.FileAttributes: {
                const flag = buffer.readUIntLE(32);
                const fileAttrs: Partial<ISWFFileAttributes> = {};

                fileAttrs.useNetwork = tag.useNetwork = !!(flag & 0x1);
                fileAttrs.as3 = tag.as3 = !!(flag & 0x8);
                fileAttrs.hasMetaData = tag.hasMetaData = !!(flag & 0x10);
                fileAttrs.useGPU = tag.useGPU = !!(flag & 0x20);
                fileAttrs.useDirectBit = tag.useDirectBit = !!(flag & 0x40);

                swf.fileAttributes = fileAttrs;
                break;
            }
            case SWFTags.Metadata:
                swf.metadata = tag.metadata = buffer.readString();
                break;
            case SWFTags.SetBackgroundColor:
                tag.RGB = buffer.readRGB();
                swf.backgroundColor = ('#' + ((tag.RGB[0] * 65536) + (tag.RGB[1] * 256) + tag.RGB[0]).toString(16));
                break;
            case SWFTags.Protect:
                swf.protect = header.length && buffer.readString();
                break;
            case SWFTags.DefineSceneAndFrameLabelData: {
                let sc = tag.sceneCount = buffer.readEncodedU32();
                tag.scenes = [];

                while(sc--) tag.scenes.push({
                    offset: buffer.readEncodedU32(),
                    name: buffer.readString()
                });

                let fc = tag.frameLabelCount = buffer.readEncodedU32();
                tag.labels = [];

                while(fc--) tag.labels.push({
                    frameNum: buffer.readEncodedU32(),
                    frameLabel: buffer.readString()
                });
                break;
            }
            case SWFTags.FrameLabel: {
                tag.name = buffer.readString();
                const l = Buffer.byteLength(tag.name);
                if(l && ((header.length - 1) !== l)) tag.anchor = buffer.readUInt8();
                break;
            }
            case SWFTags.DefineSprite:
                tag.SpriteID = buffer.readUIntLE(16);
                tag.FrameCount = buffer.readUIntLE(16);
                tag.ControlTags = readSWFTags(buffer, swf);
                break;
            case SWFTags.ExportAssets: {
                tag.count = buffer.readUIntLE(16);
                tag.assets = [];

                let l = 0;

                while(l++ < tag.count) tag.assets.push({
                    id: buffer.readUIntLE(16),
                    name: buffer.readString()
                });
                break;
            }
            case SWFTags.ImportAssets: {
                tag.url = buffer.readString();
                tag.count = buffer.readUIntLE(16);
                tag.assets = [];

                let l = 0;

                while(l++ < tag.count) tag.assets.push({
                    id: buffer.readUIntLE(16),
                    name: buffer.readString()
                });
                break;
            }
            case SWFTags.ImportAssets2: {
                tag.url = buffer.readString();

                if(!((1 === buffer.readUInt8()) && (0 === buffer.readUInt8()))) throw new Error('Reserved bits for ImportAssets2 used');

                tag.count = buffer.readUIntLE(16);
                tag.assets = [];

                let l = 0;

                while(l++ < tag.count) tag.assets.push({
                    id: buffer.readUIntLE(16),
                    name: buffer.readString()
                });
                break;
            }
            case SWFTags.EnableDebugger:
                tag.password = buffer.readString();
                break;
            case SWFTags.EnableDebugger2:
                tag.password = buffer.readString();
                break;
            case SWFTags.ScriptLimits:
                tag.maxRecursionDepth = buffer.readUIntLE(16);
                tag.scriptTimeoutSeconds = buffer.readUIntLE(16);
                break;
            case SWFTags.SymbolClass: {
                tag.numSymbols = buffer.readUIntLE(16);
                tag.symbols = [];

                let l = 0;

                while(l++ < tag.numSymbols) tag.symbols.push({
                    id: buffer.readUIntLE(16),
                    name: buffer.readString()
                });
                break;
            }
            case SWFTags.DefineScalingGrid:
                tag.characterId = buffer.readUIntLE(16);
                tag.splitter = buffer.readRect();
                break;
            case SWFTags.SetTabIndex:
                tag.depth = buffer.readUIntLE(16);
                tag.tabIndex = buffer.readUIntLE(16);
                break;
            case SWFTags.JPEGTables:
                tag.jpegData = buffer.buffer.slice(buffer.pointer, buffer.pointer + header.length);
                buffer.pointer += header.length;
                break;
            case SWFTags.DefineBits:
                tag.characterId = buffer.readUIntLE(16);
                tag.jpegData = buffer.buffer.slice(buffer.pointer, buffer.pointer + header.length - 2);
                buffer.pointer += (header.length - 2);
                break;
            case SWFTags.DefineBitsJPEG2:
                tag.characterId = buffer.readUIntLE(16);
                tag.imgData = buffer.buffer.slice(buffer.pointer, buffer.pointer + header.length - 2);
                buffer.pointer += (header.length - 2);
                break;
            case SWFTags.DefineBitsJPEG3: {
                tag.characterId = buffer.readUIntLE(16);
                const alphaDataOffset = buffer.readUIntLE(32);
                tag.imgData = buffer.buffer.slice(buffer.pointer, buffer.pointer + alphaDataOffset);
                buffer.pointer += alphaDataOffset;
                const restLength = ((header.length - 6) - alphaDataOffset);
                tag.bitmapAlphaData = buffer.buffer.slice(buffer.pointer, buffer.pointer + restLength);
                buffer.pointer += restLength;
                break;
            }
            case SWFTags.DefineBitsJPEG4: {
                tag.characterId = buffer.readUIntLE(16);
                const alphaDataOffset = buffer.readUIntLE(32);
                tag.deblockParam = buffer.readUIntLE(16);
                tag.imgData = buffer.buffer.slice(buffer.pointer, buffer.pointer + alphaDataOffset);
                buffer.pointer += alphaDataOffset;
                const restLength = ((header.length - 8) - alphaDataOffset);
                tag.bitmapAlphaData = buffer.buffer.slice(buffer.pointer, buffer.pointer + restLength);
                buffer.pointer += restLength;
                break;
            }
            case SWFTags.DefineBitsLossless:
            case SWFTags.DefineBitsLossless2: {
                tag.characterId = buffer.readUIntLE(16);
                tag.bitmapFormat = buffer.readUInt8();
                tag.bitmapWidth = buffer.readUIntLE(16);
                tag.bitmapHeight = buffer.readUIntLE(16);
                let restLength = (header.length - 7);

                if(tag.bitmapFormat === 3)
                {
                    tag.bitmapColorTableSize = buffer.readUInt8();
                    restLength--;
                }

                tag.zlibBitmapData = buffer.buffer.slice(buffer.pointer, buffer.pointer + restLength);
                buffer.pointer += restLength;
                break;
            }
            default:
                tag.data = buffer.buffer.slice(buffer.pointer, buffer.pointer + header.length);
                buffer.pointer += header.length;
                break;
        }

        tags.push(tag);
    }

    return tags;
};
