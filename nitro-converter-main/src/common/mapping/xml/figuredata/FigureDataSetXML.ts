import { FigureDataHiddenLayerXML } from './FigureDataHiddenLayerXML';
import { FigureDataPartXML } from './FigureDataPartXML';

export class FigureDataSetXML
{
    private _id: number;
    private _gender: string;
    private _club: number;
    private _colorable: boolean;
    private _selectable: boolean;
    private _preselectable: boolean;
    private _sellable: boolean;
    private _parts: FigureDataPartXML[];
    private _hiddenLayers: FigureDataHiddenLayerXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        this._id = ((attributes && parseInt(attributes.id)) || 0);
        this._gender = ((attributes && attributes.gender) || '');
        this._club = ((attributes && parseInt(attributes.club)) || 0);
        this._colorable = ((attributes && parseInt(attributes.colorable) === 1) || false);
        this._selectable = ((attributes && parseInt(attributes.selectable) === 1) || false);
        this._preselectable = ((attributes && parseInt(attributes.preselectable) === 1) || false);
        this._sellable = ((attributes && parseInt(attributes.sellable) === 1) || false);

        if(xml.part !== undefined)
        {
            if(Array.isArray(xml.part))
            {
                this._parts = [];

                for(const index in xml.part)
                {
                    const part = xml.part[index];

                    this._parts.push(new FigureDataPartXML(part));
                }
            }
        }

        if(xml.hiddenlayers !== undefined)
        {
            this._hiddenLayers = [];

            for(const hiddenLayer of xml.hiddenlayers)
            {
                const layers = hiddenLayer.layer;

                if(layers !== undefined)
                {
                    if(Array.isArray(layers)) for(const layer of layers) this._hiddenLayers.push(new FigureDataHiddenLayerXML(layer));
                }
            }
        }
    }

    public get id(): number
    {
        return this._id;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get club(): number
    {
        return this._club;
    }

    public get colorable(): boolean
    {
        return this._colorable;
    }

    public get selectable(): boolean
    {
        return this._selectable;
    }

    public get preselectable(): boolean
    {
        return this._preselectable;
    }

    public get sellable(): boolean
    {
        return this._sellable;
    }

    public get parts(): FigureDataPartXML[]
    {
        return this._parts;
    }

    public get hiddenLayers(): FigureDataHiddenLayerXML[]
    {
        return this._hiddenLayers;
    }
}
