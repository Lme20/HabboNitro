export class RoomObjectItem
{
    private _id: number;
    private _category: number;
    private _name: string;

    constructor(id: number, category: number, name: string)
    {
        this._id = id;
        this._category = category;
        this._name = name;
    }

    public get id(): number
    {
        return this._id;
    }

    public get category(): number
    {
        return this._category;
    }

    public get name(): string
    {
        return this._name;
    }
}
