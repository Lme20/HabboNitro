import { readFile } from 'fs/promises';
import * as fetch from 'node-fetch';
import { File } from './File';

export class FileUtilities
{
    public static async getDirectory(path: string): Promise<File>
    {
        const folder = new File(path);

        await folder.createDirectory();

        return folder;
    }

    public static async readFileAsBuffer(url: string): Promise<Buffer>
    {
        if(!url) return null;

        let content: Buffer = null;

        if(url.startsWith('//')) url = ('https:' + url);

        if(url.startsWith('http'))
        {
            const data = await fetch.default(url);
            const arrayBuffer = await data.arrayBuffer();

            if(data.headers.get('Content-Type') !== 'application/x-shockwave-flash' && data.headers.get('Content-Type') !== 'application/octet-stream') return;

            if(arrayBuffer) content = Buffer.from(arrayBuffer);
        }
        else
        {
            content = await readFile(url);
        }

        return content;
    }

    public static async readFileAsString(url: string): Promise<string>
    {
        if(!url) return null;

        let content = null;

        if(url.startsWith('//')) url = ('https:' + url);

        if(url.startsWith('http'))
        {
            const data = await fetch.default(url);
            if(data.status === 404) return null;

            if(data) content = await data.text();
        }
        else
        {
            const data = await readFile(url);

            content = data.toString('utf-8');
        }

        return content;
    }
}
