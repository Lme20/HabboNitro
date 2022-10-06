export class SlicedToArray
{
    public static slicedToArray(arr: any, i: any): any[]
    {
        if(Array.isArray(arr)) return arr;

        if(Symbol.iterator in Object(arr)) return this.sliceIterator(arr, i);

        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }

    private static sliceIterator(arr: any, i: any): any[]
    {
        const _arr = [];

        let _i = null;
        let _s = null;
        let _n = true;

        try
        {
            for(_i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true)
            {
                _arr.push(_s.value);

                if(i && _arr.length === i) break;
            }

            if(!_n && _i['return']) _i['return']();
        }

        catch (err)
        {
            if(!_n && _i['return']) _i['return']();

            throw err;
        }

        return _arr;
    }
}
