import { FlatControllerAddedEvent, FlatControllerRemovedEvent, FlatControllersEvent, RemoveAllRightsMessageComposer, RoomTakeRightsComposer, RoomUsersWithRightsComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { IRoomData, LocalizeText, SendMessageComposer } from '../../../../api';
import { Button, Column, Flex, Grid, Text, UserProfileIconView } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';

interface NavigatorRoomSettingsTabViewProps
{
    roomData: IRoomData;
    handleChange: (field: string, value: string | number | boolean) => void;
}

export const NavigatorRoomSettingsRightsTabView: FC<NavigatorRoomSettingsTabViewProps> = props =>
{
    const { roomData = null } = props;
    const [ usersWithRights, setUsersWithRights ] = useState<Map<number, string>>(new Map());

    useMessageEvent<FlatControllersEvent>(FlatControllersEvent, event =>
    {
        const parser = event.getParser();

        if(!roomData || (roomData.roomId !== parser.roomId)) return;

        setUsersWithRights(parser.users);
    });

    useMessageEvent<FlatControllerAddedEvent>(FlatControllerAddedEvent, event =>
    {
        const parser = event.getParser();

        if(!roomData || (roomData.roomId !== parser.roomId)) return;

        setUsersWithRights(prevValue =>
        {
            const newValue = new Map(prevValue);

            newValue.set(parser.data.userId, parser.data.userName);

            return newValue;
        });
    });

    useMessageEvent<FlatControllerRemovedEvent>(FlatControllerRemovedEvent, event =>
    {
        const parser = event.getParser();

        if(!roomData || (roomData.roomId !== parser.roomId)) return;

        setUsersWithRights(prevValue =>
        {
            const newValue = new Map(prevValue);

            newValue.delete(parser.userId);

            return newValue;
        }); 
    });

    useEffect(() =>
    {
        SendMessageComposer(new RoomUsersWithRightsComposer(roomData.roomId));
    }, [ roomData.roomId ]);

    return (
        <Grid>
            <Column size={ 6 }>
                <Text bold>
                    { LocalizeText('navigator.flatctrls.userswithrights', [ 'displayed', 'total' ], [ usersWithRights.size.toString(), usersWithRights.size.toString() ]) }
                </Text>
                <Flex overflow="hidden" className="bg-white rounded list-container p-2">
                    <Column fullWidth overflow="auto" gap={ 1 }>
                        { Array.from(usersWithRights.entries()).map(([ id, name ], index) =>
                        {
                            return (
                                <Flex key={ index } shrink alignItems="center" gap={ 1 } overflow="hidden">
                                    <UserProfileIconView userName={ name } />
                                    <Text pointer grow onClick={ event => SendMessageComposer(new RoomTakeRightsComposer(id)) }> { name }</Text>
                                </Flex>
                            );
                        }) }
                    </Column>
                </Flex>
            </Column>
            <Column size={ 6 } justifyContent="end">
                <Button variant="danger" disabled={ !usersWithRights.size } onClick={ event => SendMessageComposer(new RemoveAllRightsMessageComposer(roomData.roomId)) } >
                    { LocalizeText('navigator.flatctrls.clear') }
                </Button>
            </Column>
        </Grid>
    );
}
