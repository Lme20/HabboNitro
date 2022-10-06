import { ISWFFileAttributes } from './ISWFFileAttributes';
import { ISWFFileLength } from './ISWFFileLength';
import { ISWFFrameSize } from './ISWFFrameSize';
import { ISWFTag } from './ISWFTag';

export interface ISWF
{
    version?: number;
    fileLength?: ISWFFileLength;
    frameSize?: ISWFFrameSize;
    frameRate?: number;
    frameCount?: number;
    backgroundColor?: string;
    fileAttributes?: Partial<ISWFFileAttributes>;
    metadata?: string;
    protect?: string;
    tags?: Partial<ISWFTag>[];
}
