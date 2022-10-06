export class CreditsXML
{
    private readonly _value: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.value !== undefined) this._value = attributes.value;
        }
    }

    public get value(): string
    {
        return this._value;
    }
}
