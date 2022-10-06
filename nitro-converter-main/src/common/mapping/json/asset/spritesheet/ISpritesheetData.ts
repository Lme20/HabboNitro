import { ISpritesheetFrame } from './ISpritesheetFrame';
import { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheetData
{
    meta?: ISpritesheetMeta;
    frames?: { [index: string]: ISpritesheetFrame };
}
