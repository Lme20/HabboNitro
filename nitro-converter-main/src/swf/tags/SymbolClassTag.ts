import { ISymbolClass } from './ISymbolClass';
import { ITag } from './ITag';

export class SymbolClassTag implements ITag
{
    private readonly _tags: number[];
    private readonly _names: string[];

    constructor(tags: ISymbolClass[])
    {
        this._tags = [];
        this._names = [];

        for(const symbolClass of tags)
        {
            this._tags.push(symbolClass.id);
            this._names.push(symbolClass.name);
        }
    }

    public get tags(): number[]
    {
        return this._tags;
    }

    public get names(): string[]
    {
        return this._names;
    }

    public get code(): number
    {
        return 76;
    }
}
