import { singleton } from 'tsyringe';
import { FileUtilities } from '../utils';

@singleton()
export class Configuration
{
    private readonly _config: Map<string, string>;

    constructor()
    {
        this._config = new Map<string, string>();
    }

    public async init(configuration: Object): Promise<void>
    {
        this.parseConfiguration(configuration);

        await this.loadExternalVariables();

        this.parseConfiguration(configuration);
    }

    public async loadExternalVariables(): Promise<void>
    {
        const url = this.getValue('external.variables.url');

        try
        {
            const content = await FileUtilities.readFileAsString(url);

            this.parseExternalVariables(content);
        }

        catch (error)
        {
            console.log();
            console.error(error);
        }
    }

    private parseConfiguration(content: Object): boolean
    {
        if (!content) return false;

        try
        {
            const regex = new RegExp(/\${(.*?)}/g);

            for (const key of Object.keys(content))
            {
                if (this._config.get(key))
                {
                    if (!content[key].length) continue;
                }

                this._config.set(key, this.interpolate(content[key], regex));
            }

            return true;
        }

        catch (e)
        {
            console.log();
            console.error(e);

            return false;
        }
    }

    private parseExternalVariables(content: string): boolean
    {
        if (!content || (content === '')) return false;

        try
        {
            const regex = new RegExp(/\${(.*?)}/g);
            const lines: string[] = content.split('\n');

            for (const line of lines)
            {
                const [key, value] = line.split('=');

                if (key.startsWith('landing.view')) continue;

                this._config.set(key, this.interpolate((value || ''), regex));
            }

            return true;
        }

        catch (e)
        {
            console.log();
            console.error(e);

            return false;
        }
    }

    public interpolate(value: string, regex: RegExp = null): string
    {
        if (!value || (typeof value === 'object')) return value;
        if (!regex) regex = new RegExp(/\${(.*?)}/g);

        const pieces = value.match(regex);

        if (pieces && pieces.length)
        {
            for (const piece of pieces)
            {
                const existing = this._config.get(this.removeInterpolateKey(piece));

                if (existing) (value = value.replace(piece, existing));
            }
        }

        return value;
    }

    private removeInterpolateKey(value: string): string
    {
        return value.replace('${', '').replace('}', '');
    }

    public getValue(key: string, value: string = ''): string
    {
        if (this._config.has(key)) return this._config.get(key);

        return value;
    }

    public setValue(key: string, value: string): void
    {
        this._config.set(key, value);
    }

    public getBoolean(key: string): boolean
    {
        const value = this.getValue(key);

        return ((value === 'true') || (value === '1'));
    }
}
