export class FurnitureTypeXML
{
    public furniType: string;

    public id: number;
    public classname: string;
    public revision: number;
    public category: string;
    public defaultdir: number;
    public xdim: number;
    public ydim: number;
    public partcolors: { color: string[] };
    public name: string;
    public description: string;
    public adurl: string;
    public offerid: number;
    public buyout: boolean;
    public rentofferid: number;
    public rentbuyout: boolean;
    public bc: boolean;
    public excludeddynamic: boolean;
    public customparams: string;
    public specialtype: number;
    public canstandon: boolean;
    public cansiton: boolean;
    public canlayon: boolean;
    public furniline: string;
    public environment: string;
    public rare: boolean;

    constructor(type: string, xml: any)
    {
        this.furniType = type;

        const attributes = xml.$;

        this.id         = ((attributes && parseInt(attributes.id)) || 0);
        this.classname  = ((attributes && attributes.classname) || '');
        this.revision   = ((xml.revision && xml.revision[0] && parseInt(xml.revision[0])) || 0);
        this.category   = ((xml.category && xml.category[0]) || 'unknown');

        if(this.furniType === 'floor')
        {
            this.defaultdir = ((xml.defaultdir && parseInt(xml.defaultdir[0])) || 0);
            this.xdim       = ((xml.xdim && parseInt(xml.xdim[0])) || 0);
            this.ydim       = ((xml.ydim && parseInt(xml.ydim[0])) || 0);

            const colors: string[] = [];

            if(xml.partcolors)
            {
                for(const key in xml.partcolors)
                {
                    const colorData = xml.partcolors[key].color;

                    if(colorData)
                    {
                        for(const color of colorData)
                        {
                            let code = color;

                            if(code.charAt(0) !== '#') code = ('#' + code);

                            colors.push(code);
                        }
                    }
                }
            }

            this.partcolors = { color: [ ...colors ] };
        }

        this.name               = ((xml.name && xml.name[0]) || '');
        this.description        = ((xml.description && xml.description[0]) || '');
        this.adurl              = (xml.adurl && xml.adurl[0] || '');
        this.offerid            = ((xml.offerid && parseInt(xml.offerid[0])) || 0);
        this.buyout             = ((xml.buyout && parseInt(xml.buyout[0]) === 1) || false);
        this.rentofferid        = ((xml.rentofferid && parseInt(xml.rentofferid[0])) || 0);
        this.rentbuyout         = ((xml.rentbuyout && parseInt(xml.rentbuyout[0]) === 1) || false);
        this.bc                 = ((xml.bc && parseInt(xml.bc[0]) === 1) || false);
        this.excludeddynamic    = ((xml.excludeddynamic && parseInt(xml.excludeddynamic[0]) === 1) || false);
        this.customparams       = ((xml.customparams && xml.customparams[0]) || '');
        this.specialtype        = ((xml.specialtype && parseInt(xml.specialtype[0])) || 0);

        if(this.furniType === 'floor')
        {
            this.canstandon = ((xml.canstandon && parseInt(xml.canstandon[0]) === 1) || false);
            this.cansiton   = ((xml.cansiton && parseInt(xml.cansiton[0]) === 1) || false);
            this.canlayon   = ((xml.canlayon && parseInt(xml.canlayon[0]) === 1) || false);
        }

        this.furniline      = ((xml.furniline && xml.furniline[0]) || '');
        this.environment    = ((xml.environment && xml.environment[0]) || '');
        this.rare           = ((xml.rare && parseInt(xml.rare[0]) === 1) || false);
    }
}
