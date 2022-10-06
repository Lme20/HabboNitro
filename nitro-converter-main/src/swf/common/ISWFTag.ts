import { ISWFTagAsset } from './ISWFTagAsset';
import { ISWFTagHeader } from './ISWFTagHeader';
import { ISWFTagLabel } from './ISWFTagLabel';
import { ISWFTagScene } from './ISWFTagScene';
import { ISWFTagSplitter } from './ISWFTagSplitter';
import { ISWFTagSymbol } from './ISWFTagSymbol';

export interface ISWFTag
{
    header: ISWFTagHeader;
    useNetwork: boolean;
    as3: boolean;
    hasMetaData: boolean;
    useGPU: boolean;
    useDirectBit: boolean;
    metadata: string;
    RGB: [ number, number, number ];
    sceneCount: number;
    scenes: ISWFTagScene[];
    frameLabelCount: number;
    labels: ISWFTagLabel[];
    name: string;
    anchor: number;
    SpriteID: number;
    FrameCount: number;
    ControlTags: Partial<ISWFTag>[];
    count: number;
    assets: ISWFTagAsset[];
    url: string;
    characterId: number;
    bitmapFormat: number;
    bitmapWidth: number;
    bitmapHeight: number;
    bitmapColorTableSize: number;
    zlibBitmapData: Buffer;
    deblockParam: number;
    imgData: Buffer;
    bitmapAlphaData: Buffer;
    jpegData: Buffer;
    data: Buffer;
    splitter: ISWFTagSplitter;
    depth: number;
    tabIndex: number;
    password: string;
    maxRecursionDepth: number;
    scriptTimeoutSeconds: number;
    numSymbols: number;
    symbols: ISWFTagSymbol[];
}
