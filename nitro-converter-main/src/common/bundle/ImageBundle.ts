export class ImageBundle
{
    private _images: { path: string, contents: Buffer }[] = [];

    public dispose(): void
    {
        this._images = null;
    }

    public addImage(path: string, contents: Buffer): void
    {
        if(!path || !contents) return;

        for(const image of this._images) if(image.path === path) return;

        this._images.push({ path, contents });
    }

    public get images(): { path: string, contents: Buffer }[]
    {
        return this._images;
    }
}
