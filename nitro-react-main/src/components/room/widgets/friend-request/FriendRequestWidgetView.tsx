import { FC } from 'react';
import { useFriendRequestWidget, useFriends } from '../../../../hooks';
import { FriendRequestDialogView } from './FriendRequestDialogView';

export const FriendRequestWidgetView: FC<{}> = props =>
{
    const { displayedRequests = [], hideFriendRequest = null } = useFriendRequestWidget();
    const { requestResponse = null } = useFriends();

    if(!displayedRequests.length) return null;

    return (
        <>
            { displayedRequests.map((request, index) => <FriendRequestDialogView key={ index } roomIndex={ request.roomIndex } request={ request.request } hideFriendRequest={ hideFriendRequest } requestResponse={ requestResponse } />) }
        </>
    );
}
