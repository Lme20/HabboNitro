import { CustomIterator } from '../common';
import { ReadImagesDefineBitsLossless } from './ReadImagesDefineBitsLossless';
import { ReadImagesJPEG3or4 } from './ReadImagesJPEG3or4';
import { ReadSWF } from './ReadSWF';
import { CharacterTag, DefineBinaryDataTag, ImageTag, ITag, SymbolClassTag } from './tags';

export class HabboAssetSWF
{
    private readonly _tags: Array<ITag> = [];
    private _documentClass: string | null = null;

    constructor(
        private readonly _data: Buffer
    )
    {}

    public async setupAsync()
    {
        const swf = await ReadSWF(this._data);

        if(!swf) return;

        for(const tag of swf.tags)
        {
            switch(tag.header.code)
            {
                case 76:
                    this._tags.push(new SymbolClassTag(tag.symbols));
                    break;
                case 87:
                    this._tags.push(new DefineBinaryDataTag(tag.data));
                    break;
                case 6:
                    console.log(tag);
                    break;
                case 21: {
                    const jpeg3 = await ReadImagesJPEG3or4(21, tag);
                    this._tags.push(new ImageTag(jpeg3.characterId, 21, 'jpeg', jpeg3.imgData));
                    break;
                }
                case 35: {
                    const jpeg3 = await ReadImagesJPEG3or4(35, tag);
                    this._tags.push(new ImageTag(jpeg3.characterId, jpeg3.code, jpeg3.imgType, jpeg3.imgData));
                    break;
                }
                case 36: {
                    const pngTagLossLess2: any = await ReadImagesDefineBitsLossless(tag);
                    this._tags.push(new ImageTag(pngTagLossLess2.characterId, pngTagLossLess2.code, pngTagLossLess2.imgType, pngTagLossLess2.imgData, pngTagLossLess2.bitmapWidth, pngTagLossLess2.bitmapHeight));
                    break;
                }
                case 20: {
                    const pngTagLossless: any = await ReadImagesDefineBitsLossless(tag);
                    this._tags.push(new ImageTag(pngTagLossless.characterId, pngTagLossless.code, pngTagLossless.imgType, pngTagLossless.imgData, pngTagLossless.bitmapWidth, pngTagLossless.bitmapHeight));
                    break;
                }
                default:
                    //console.log(tag.header.code);
                    break;
            }
        }

        this.assignClassesToSymbols();
    }

    public imageTags(): Array<ImageTag>
    {
        return this._tags.filter((tag: ITag) => tag instanceof ImageTag).map(x => x as ImageTag);
    }

    public symbolTags(): Array<SymbolClassTag>
    {
        return this._tags.filter((tag: ITag) => tag instanceof SymbolClassTag).map(x => x as SymbolClassTag);
    }

    private binaryTags(): Array<DefineBinaryDataTag>
    {
        return this._tags.filter((tag: ITag) => tag instanceof DefineBinaryDataTag).map(x => x as DefineBinaryDataTag);
    }

    private assignClassesToSymbols()
    {
        const classes: Map<number, string> = new Map();

        let iterator: CustomIterator<ITag> = new CustomIterator(this._tags);

        // eslint-disable-next-line no-constant-condition
        while(true)
        {
            let t: ITag;

            do
            {
                if(!iterator.hasNext())
                {
                    iterator = new CustomIterator(this._tags);

                    while(iterator.hasNext())
                    {
                        t = iterator.next();
                        if(t instanceof CharacterTag)
                        {
                            const ct = t as CharacterTag;

                            if(classes.has(ct.characterId))
                            {
                                // @ts-ignore
                                ct.className = classes.get(ct.characterId);
                            }
                        }
                    }

                    return;
                }

                t = iterator.next();
            } while(!(t instanceof SymbolClassTag));

            const sct = t as SymbolClassTag;

            for(let i = 0; i < sct.tags.length; ++i)
            {
                if(!classes.has(sct.tags[i]) && !Array.from(classes.values()).includes(sct.names[i]))
                {
                    classes.set(sct.tags[i], sct.names[i]);
                }
            }
        }
    }

    public getBinaryTagByName(name: string): DefineBinaryDataTag | null
    {
        const streamTag = this.binaryTags().filter(tag => tag.className === name)[0];

        if(streamTag === undefined) return null;

        return streamTag;
    }

    public getFullClassName(type: string, documentNameTwice: boolean, snakeCase: boolean = false): string
    {
        return this.getFullClassNameSnake(type, documentNameTwice, snakeCase);
    }

    public getFullClassNameSnake(type: string, documentNameTwice: boolean, snakeCase: boolean = false): string
    {
        let result: string = this.getDocumentClass();

        if(documentNameTwice)
        {
            if(snakeCase)
            {
                result = (result + (result.replace(/(?:^|\.?)([A-Z])/g, (x,y) => ('_' + y.toLowerCase().replace(/^_/, '')))) + '_');
            }
            else
            {
                result += '_' + this.getDocumentClass() + '_';
            }
        }
        else
        {
            result += '_';
        }

        return result + type;
    }

    public getDocumentClass(): string
    {
        if(this._documentClass !== null) return this._documentClass;

        const iterator: CustomIterator<ITag> = new CustomIterator(this._tags);

        // eslint-disable-next-line no-constant-condition
        while(true)
        {
            let t: ITag;
            do
            {
                if(!iterator.hasNext())
                {
                    return '';
                }

                t = iterator.next();
            } while(!(t instanceof SymbolClassTag));

            const sc = t as SymbolClassTag;

            for(let i = 0; i < sc.tags.length; ++i)
            {
                if(sc.tags[i] == 0)
                {
                    this._documentClass = sc.names[i];
                    return this._documentClass;
                }
            }
        }
    }
}
