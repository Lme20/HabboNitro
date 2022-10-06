import { NitroToolbarAnimateIconEvent, TextureUtils, ToolbarIconEnum } from '@nitrots/nitro-renderer';
import { FC, useCallback, useRef } from 'react';
import { GetRoomEngine } from '../../../../api';
import { LayoutRoomPreviewerView, LayoutRoomPreviewerViewProps } from '../../../../common';
import { CatalogPurchasedEvent } from '../../../../events';
import { useUiEvent } from '../../../../hooks';

export const CatalogRoomPreviewerView: FC<LayoutRoomPreviewerViewProps> = props =>
{
    const { roomPreviewer = null } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const animatePurchase = useCallback(() =>
    {
        if(!elementRef) return;
        
        const renderTexture = roomPreviewer.getRoomObjectCurrentImage();

        if(!renderTexture) return;

        const image = TextureUtils.generateImage(renderTexture);

        if(!image) return;

        const bounds = elementRef.current.getBoundingClientRect();

        const x = (bounds.x + (bounds.width / 2));
        const y = (bounds.y + (bounds.height / 2));

        const event = new NitroToolbarAnimateIconEvent(image, x, y);

        event.iconName = ToolbarIconEnum.INVENTORY;

        GetRoomEngine().events.dispatchEvent(event);
    }, [ roomPreviewer ]);

    const onCatalogPurchasedEvent = useCallback((event: CatalogPurchasedEvent) =>
    {
        animatePurchase();
    }, [ animatePurchase ]);

    useUiEvent(CatalogPurchasedEvent.PURCHASE_SUCCESS, onCatalogPurchasedEvent);

    return (
        <div ref={ elementRef }>
            <LayoutRoomPreviewerView { ...props } />
        </div>
    );
}
