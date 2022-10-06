export class CustomVarsXML
{
    private readonly _variables: string[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if((xml.variable !== undefined) && Array.isArray(xml.variable))
        {
            this._variables = [];

            for(const variable of xml.variable)
            {
                const attributes = variable.$;

                if(attributes !== undefined)
                {
                    if(attributes.name !== undefined) this._variables.push(attributes.name);
                }
            }
        }
    }

    public get variables(): string[]
    {
        return this._variables;
    }
}
