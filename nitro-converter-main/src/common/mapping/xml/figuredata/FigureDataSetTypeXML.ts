import { FigureDataSetXML } from './FigureDataSetXML';

export class FigureDataSetTypeXML
{
    private _type: string;
    private _paletteId: number;
    private _mandatory_m_0: boolean;
    private _mandatory_f_0: boolean;
    private _mandatory_m_1: boolean;
    private _mandatory_f_1: boolean;
    private _sets: FigureDataSetXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        this._type = ((attributes && attributes.type) || '');
        this._paletteId = ((attributes && parseInt(attributes.paletteid)) || 1);
        this._mandatory_m_0 = ((attributes && parseInt(attributes.mand_m_0) == 1) || false);
        this._mandatory_f_0 = ((attributes && parseInt(attributes.mand_f_0) == 1) || false);
        this._mandatory_m_1 = ((attributes && parseInt(attributes.mand_m_1) == 1) || false);
        this._mandatory_f_1 = ((attributes && parseInt(attributes.mand_f_1) == 1) || false);

        if(xml.set !== undefined)
        {
            if(Array.isArray(xml.set))
            {
                this._sets = [];

                for(const index in xml.set)
                {
                    const set = xml.set[index];

                    this._sets.push(new FigureDataSetXML(set));
                }
            }
        }
    }

    public get type(): string
    {
        return this._type;
    }

    public get paletteId(): number
    {
        return this._paletteId;
    }

    public get mandatoryM0(): boolean
    {
        return this._mandatory_m_0;
    }

    public get mandatoryM1(): boolean
    {
        return this._mandatory_m_1;
    }

    public get mandatoryF0(): boolean
    {
        return this._mandatory_f_0;
    }

    public get mandatoryF1(): boolean
    {
        return this._mandatory_f_1;
    }

    public get sets(): FigureDataSetXML[]
    {
        return this._sets;
    }
}
