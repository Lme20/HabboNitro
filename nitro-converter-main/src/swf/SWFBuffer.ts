export class SWFBuffer
{
    public static RECORDHEADER_LENTH_FULL: number = 0x3f;
    public static EOS: number = 0x00;
    public static STYLE_COUNT_EXT: number = 0xFF;

    public buffer: Buffer = null;
    public pointer: number = 0;
    public position: number = 1;
    public current: number = 0;
    public length: number = 0;

    constructor(buffer: Buffer)
    {
        if(!Buffer.isBuffer(buffer)) throw new Error('invalid_buffer');

        this.buffer = buffer;
        this.length = buffer.length;
    }

    public readUIntLE(bits: number): number
    {
        let value = 0;

        switch(bits)
        {
            case 16:
                value = this.buffer.readUInt16LE(this.pointer);
                break;
            case 32:
                value = this.buffer.readUInt32LE(this.pointer);
                break;
        }

        this.pointer += (bits / 8);

        return value;
    }

    public readUInt8(): number
    {
        return this.buffer.readUInt8(this.pointer++);
    }

    public readEncodedU32(): number
    {
        let i = 5;
        let result = 0;
        let nb = 0;

        do
        {
            result += (nb = this.nextByte());
        } while((nb & 128) && --i);

        return result;
    }

    public readRGB(): [ number, number, number ]
    {
        return [ this.readUInt8(), this.readUInt8(), this.readUInt8() ];
    }

    public readRGBA(): [ number, number, number, number ]
    {
        return [ ...this.readRGB(), this.readUInt8() ];
    }

    public readString(encoding: BufferEncoding = 'utf8'): string
    {
        const init = this.pointer;

        while(this.readUInt8() !== SWFBuffer.EOS);

        return this.buffer.toString((encoding || 'utf8'), init, (this.pointer - 1));
    }

    public readStyleArray(buffer: SWFBuffer, next)
    {
        let styleArrayCount = buffer.readUInt8();
        const styles = [];

        if(styleArrayCount === SWFBuffer.STYLE_COUNT_EXT) styleArrayCount = buffer.readUIntLE(16);

        for(let i = 0; i < styleArrayCount; i++) styles.push(next(buffer));

        return styles;
    }

    public readFillStyle(buffer: SWFBuffer): { fillStyleType: number, color?: [ number, number, number, number ], bitmapId?: number }
    {
        const type = buffer.readUInt8();

        const fillStyle: { fillStyleType: number, color?: [ number, number, number, number ], bitmapId?: number } = {
            fillStyleType: type
        };

        switch(type)
        {
            case 0x00:
                fillStyle.color = buffer.readRGBA();
                break;
            case 0x10:
            case 0x12:
            case 0x13:
                console.log('Gradient');
                break;
            case 0x40:
            case 0x41:
            case 0x42:
            case 0x43:
                fillStyle.bitmapId = buffer.readUIntLE(16);
                break;
        }

        return fillStyle;
    }

    public readLineStyle(buffer: SWFBuffer): { width: number, color: [ number, number, number, number ]}
    {
        return {
            width: (buffer.readUIntLE(16) / 20),
            color: buffer.readRGBA()
        };
    }

    public readShapeRecords(buffer: SWFBuffer)
    {
        let shapeRecords = null;
        const typeFlag = buffer.readBits(1);
        let eos = 0;

        while((eos = buffer.readBits(5)))
        {
            if(0 === typeFlag)
            {
                shapeRecords = {
                    type: 'STYLECHANGERECORD'
                };
            }
        }

        return shapeRecords;
    }

    public readShapeWithStyle()
    {
        return {
            fillStyles: this.readStyleArray(this, this.readFillStyle),
            lineStyles: this.readStyleArray(this, this.readLineStyle),
            numFillBits: this.readBits(4),
            numLineBits: this.readBits(4),
            shapeRecords: this.readShapeRecords(this)
        };
    }

    public readTagCodeAndLength(): { code: number, length: number }
    {
        if(this.pointer === this.length) return null;

        const n = this.readUIntLE(16);
        const tagType = (n >> 6);
        let tagLength = (n & SWFBuffer.RECORDHEADER_LENTH_FULL);

        if(n === 0) return null;

        if(tagLength === SWFBuffer.RECORDHEADER_LENTH_FULL ) tagLength = this.readUIntLE(32);

        return { code: tagType, length: tagLength };
    }

    public readRect(): { x: number, y: number, width: number, height: number }
    {
        this.start();

        const NBits = this.readBits(5);
        const Xmin = (this.readBits(NBits, true) / 20);
        const Xmax = (this.readBits(NBits, true) / 20);
        const Ymin = (this.readBits(NBits, true) / 20);
        const Ymax = (this.readBits(NBits, true) / 20);

        return {
            x: Xmin,
            y: Ymin,
            width: (Xmax > Xmin ? (Xmax - Xmin) : (Xmin - Xmax)),
            height: (Ymax > Ymin ? (Ymax - Ymin) : (Ymin - Ymax))
        };
    }

    public seek(pos: number): void
    {
        this.pointer = (pos % this.buffer.length);
    }

    public start(): void
    {
        this.current = this.nextByte();
        this.position = 1;
    }

    public nextByte(): number
    {
        return this.pointer > this.buffer.length ? null : this.buffer[ this.pointer++ ];
    }

    public readBits(b: number, signed: boolean = false): number
    {
        let n = 0;
        let r = 0;

        const sign = signed && ++n && ((this.current >> (8 - this.position++)) & 1) ? -1 : 1;

        while(n++ < b)
        {
            if( this.position > 8 ) this.start();

            r = (r << 1) + ((this.current >> (8 - this.position++)) & 1);
        }

        return (sign * r);
    }
}
