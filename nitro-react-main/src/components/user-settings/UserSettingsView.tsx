import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ILinkEventTracker, NitroSettingsEvent, UserSettingsCameraFollowComposer, UserSettingsEvent, UserSettingsOldChatComposer, UserSettingsRoomInvitesComposer, UserSettingsSoundComposer } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { AddEventLinkTracker, DispatchMainEvent, DispatchUiEvent, LocalizeText, RemoveLinkEventTracker, SendMessageComposer } from '../../api';
import { Column, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useCatalogPlaceMultipleItems, useCatalogSkipPurchaseConfirmation, useMessageEvent } from '../../hooks';

export const UserSettingsView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ userSettings, setUserSettings ] = useState<NitroSettingsEvent>(null);
    const [ catalogPlaceMultipleObjects, setCatalogPlaceMultipleObjects ] = useCatalogPlaceMultipleItems();
    const [ catalogSkipPurchaseConfirmation, setCatalogSkipPurchaseConfirmation ] = useCatalogSkipPurchaseConfirmation();

    const processAction = useCallback((type: string, value?: boolean | number | string) =>
    {
        let doUpdate = true;

        const clone = userSettings.clone();

        switch(type)
        {
            case 'close_view':
                setIsVisible(false);
                doUpdate = false;
                return;
            case 'oldchat':
                clone.oldChat = value as boolean;
                SendMessageComposer(new UserSettingsOldChatComposer(clone.oldChat));
                break;
            case 'room_invites':
                clone.roomInvites = value as boolean;
                SendMessageComposer(new UserSettingsRoomInvitesComposer(clone.roomInvites));
                break;
            case 'camera_follow':
                clone.cameraFollow = value as boolean;
                SendMessageComposer(new UserSettingsCameraFollowComposer(clone.cameraFollow));
                break;
            case 'system_volume':
                clone.volumeSystem = value as number;
                clone.volumeSystem = Math.max(0, clone.volumeSystem);
                clone.volumeSystem = Math.min(100, clone.volumeSystem);
                break;
            case 'furni_volume':
                clone.volumeFurni = value as number;
                clone.volumeFurni = Math.max(0, clone.volumeFurni);
                clone.volumeFurni = Math.min(100, clone.volumeFurni);
                break;
            case 'trax_volume':
                clone.volumeTrax = value as number;
                clone.volumeTrax = Math.max(0, clone.volumeTrax);
                clone.volumeTrax = Math.min(100, clone.volumeTrax);
                break;
        }

        if(doUpdate) setUserSettings(clone);
        
        DispatchMainEvent(clone)
    }, [ userSettings ]);

    const saveRangeSlider = useCallback((type: string) =>
    {
        switch(type)
        {
            case 'volume':
                SendMessageComposer(new UserSettingsSoundComposer(Math.round(userSettings.volumeSystem), Math.round(userSettings.volumeFurni), Math.round(userSettings.volumeTrax)));
                break;
        }
    }, [ userSettings ]);

    useMessageEvent<UserSettingsEvent>(UserSettingsEvent, event =>
    {
        const parser = event.getParser();
        const settingsEvent = new NitroSettingsEvent();

        settingsEvent.volumeSystem = parser.volumeSystem;
        settingsEvent.volumeFurni = parser.volumeFurni;
        settingsEvent.volumeTrax = parser.volumeTrax;
        settingsEvent.oldChat = parser.oldChat;
        settingsEvent.roomInvites = parser.roomInvites;
        settingsEvent.cameraFollow = parser.cameraFollow;
        settingsEvent.flags = parser.flags;
        settingsEvent.chatType = parser.chatType;

        setUserSettings(settingsEvent);
        DispatchMainEvent(settingsEvent);
    });

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');

                if(parts.length < 2) return;
        
                switch(parts[1])
                {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'user-settings/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    useEffect(() =>
    {
        if(!userSettings) return;

        DispatchUiEvent(userSettings);
    }, [ userSettings ]);

    if(!isVisible || !userSettings) return null;

    return (
        <NitroCardView uniqueKey="user-settings" className="user-settings-window" theme="primary-slim">
            <NitroCardHeaderView headerText={ LocalizeText('widget.memenu.settings.title') } onCloseClick={ event => processAction('close_view') } />
            <NitroCardContentView className="text-black">
                <Column gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ userSettings.oldChat } onChange={ event => processAction('oldchat', event.target.checked) } />
                        <Text>{ LocalizeText('memenu.settings.chat.prefer.old.chat') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ userSettings.roomInvites } onChange={ event => processAction('room_invites', event.target.checked) } />
                        <Text>{ LocalizeText('memenu.settings.other.ignore.room.invites') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ userSettings.cameraFollow } onChange={ event => processAction('camera_follow', event.target.checked) } />
                        <Text>{ LocalizeText('memenu.settings.other.disable.room.camera.follow') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ catalogPlaceMultipleObjects } onChange={ event => setCatalogPlaceMultipleObjects(event.target.checked) } />
                        <Text>{ LocalizeText('memenu.settings.other.place.multiple.objects') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ catalogSkipPurchaseConfirmation } onChange={ event => setCatalogSkipPurchaseConfirmation(event.target.checked) } />
                        <Text>{ LocalizeText('memenu.settings.other.skip.purchase.confirmation') }</Text>
                    </Flex>
                </Column>
                <Column>
                    <Text bold>{ LocalizeText('widget.memenu.settings.volume') }</Text>
                    <Column gap={ 1 }>
                        <Text>{ LocalizeText('widget.memenu.settings.volume.ui') }</Text>
                        <Flex alignItems="center" gap={ 1 }>
                            <FontAwesomeIcon icon={ ((userSettings.volumeSystem === 0) ? 'volume-mute' : (userSettings.volumeSystem > 0) ? 'volume-down' : null) } className={ (userSettings.volumeSystem >= 50) ? 'text-muted' : '' } />
                            <input type="range" className="custom-range w-100" min="0" max="100" step="1" id="volumeSystem" value={ userSettings.volumeSystem } onChange={ event => processAction('system_volume', event.target.value) } onMouseUp={ () => saveRangeSlider('volume') }/>
                            <FontAwesomeIcon icon="volume-up" className={ (userSettings.volumeSystem < 50) ? 'text-muted' : '' } />
                        </Flex>
                    </Column>
                    <Column gap={ 1 }>
                        <Text>{ LocalizeText('widget.memenu.settings.volume.furni') }</Text>
                        <Flex alignItems="center" gap={ 1 }>
                            <FontAwesomeIcon icon={ ((userSettings.volumeFurni === 0) ? 'volume-mute' : (userSettings.volumeFurni > 0) ? 'volume-down' : null) } className={ (userSettings.volumeFurni >= 50) ? 'text-muted' : '' } />
                            <input type="range" className="custom-range w-100" min="0" max="100" step="1" id="volumeFurni" value={ userSettings.volumeFurni } onChange={ event => processAction('furni_volume', event.target.value) } onMouseUp={ () => saveRangeSlider('volume') }/>
                            <FontAwesomeIcon icon="volume-up" className={ (userSettings.volumeFurni < 50) ? 'text-muted' : '' } />
                        </Flex>
                    </Column>
                    <Column gap={ 1 }>
                        <Text>{ LocalizeText('widget.memenu.settings.volume.trax') }</Text>
                        <Flex alignItems="center" gap={ 1 }>
                            <FontAwesomeIcon icon={ ((userSettings.volumeTrax === 0) ? 'volume-mute' : (userSettings.volumeTrax > 0) ? 'volume-down' : null) } className={ (userSettings.volumeTrax >= 50) ? 'text-muted' : '' } />
                            <input type="range" className="custom-range w-100" min="0" max="100" step="1" id="volumeTrax" value={ userSettings.volumeTrax } onChange={ event => processAction('trax_volume', event.target.value) } onMouseUp={ () => saveRangeSlider('volume') }/>
                            <FontAwesomeIcon icon="volume-up" className={ (userSettings.volumeTrax < 50) ? 'text-muted' : '' } />
                        </Flex>
                    </Column>
                </Column>
            </NitroCardContentView>
        </NitroCardView>
    );
}
