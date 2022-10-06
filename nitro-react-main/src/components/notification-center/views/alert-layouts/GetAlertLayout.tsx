import { NotificationAlertItem, NotificationAlertType } from '../../../../api';
import { NitroSystemAlertView } from './NitroSystemAlertView';
import { NotificationDefaultAlertView } from './NotificationDefaultAlertView';
import { NotificationSeachAlertView } from './NotificationSearchAlertView';

export const GetAlertLayout = (item: NotificationAlertItem, onClose: () => void) =>
{
    if(!item) return null;

    const props = { key: item.id, item, onClose };

    switch(item.alertType)
    {
        case NotificationAlertType.NITRO:
            return <NitroSystemAlertView { ...props } />
        case NotificationAlertType.SEARCH:
            return <NotificationSeachAlertView { ...props } />
        default:
            return <NotificationDefaultAlertView { ...props } />
    }
}
