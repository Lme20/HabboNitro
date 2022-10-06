export class CustomIterator<TType>
{
    private idx: number;
    private readonly top: number;
    private readonly keys: Array<any>;
    private readonly arr: boolean;
    private readonly collection: Array<TType>;

    constructor(collection: Array<TType>)
    {
        if(this.dontIterate(collection))
        {
            throw new Error('Oh you nasty man, I won\'t iterate over that (' + collection + ')!');
        }

        this.arr = this.isArray(collection);
        this.idx = 0;
        this.top = 0;
        this.keys = [];
        if(this.arr)
        {
            this.top = collection.length;
        }
        else
        {
            for(const prop in collection)
            {
                this.keys.push(prop);
            }
        }

        this.collection = collection;
    }

    isArray(candidate: any)
    {
        return candidate &&
            typeof candidate === 'object' &&
            typeof candidate.length === 'number' &&
            typeof candidate.splice === 'function' &&
            // eslint-disable-next-line no-prototype-builtins
            !(candidate.propertyIsEnumerable('length'));
    }

    dontIterate(collection: any)
    {
        // put some checks chere for stuff that isn't iterable (yet)
        return (!collection || typeof collection === 'number' || typeof collection === 'boolean');
    }

    public next(): TType
    {
        if(!this.hasNext())
        {
            throw new Error('Oh you nasty man. I have no more elements.');
        }
        const elem = this.arr ? this.collection[this.idx] : this.collection[this.keys[this.idx]];
        ++this.idx;
        return elem;
    }

    public hasNext()
    {
        return this.arr ? this.idx <= this.top : this.idx <= this.keys.length;
    }
}
