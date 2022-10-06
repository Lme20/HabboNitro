import { ContextMenuEnum, RoomObjectCategory } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { GetGroupInformation, LocalizeText } from '../../../../../api';
import { useFurnitureContextMenuWidget } from '../../../../../hooks';
import { ContextMenuHeaderView } from '../../context-menu/ContextMenuHeaderView';
import { ContextMenuListItemView } from '../../context-menu/ContextMenuListItemView';
import { ContextMenuView } from '../../context-menu/ContextMenuView';
import { EffectBoxConfirmView } from './EffectBoxConfirmView';
import { MonsterPlantSeedConfirmView } from './MonsterPlantSeedConfirmView';
import { PurchasableClothingConfirmView } from './PurchasableClothingConfirmView';

const MONSTERPLANT_SEED_CONFIRMATION: string = 'MONSTERPLANT_SEED_CONFIRMATION';
const PURCHASABLE_CLOTHING_CONFIRMATION: string = 'PURCHASABLE_CLOTHING_CONFIRMATION';
const GROUP_FURNITURE: string = 'GROUP_FURNITURE';
const EFFECTBOX_OPEN: string = 'EFFECTBOX_OPEN';

export const FurnitureContextMenuView: FC<{}> = props =>
{
    const { closeConfirm = null, processAction = null, onClose = null, objectId = -1, mode = null, confirmMode = null, confirmingObjectId = -1, groupData = null, isGroupMember = false } = useFurnitureContextMenuWidget();

    return (
        <>
            { (confirmMode === MONSTERPLANT_SEED_CONFIRMATION) &&
                <MonsterPlantSeedConfirmView objectId={ confirmingObjectId } onClose={ closeConfirm } /> }
            { (confirmMode === PURCHASABLE_CLOTHING_CONFIRMATION) &&
                <PurchasableClothingConfirmView objectId={ confirmingObjectId } onClose={ closeConfirm } /> }
            { (confirmMode === EFFECTBOX_OPEN) &&
                <EffectBoxConfirmView objectId={ confirmingObjectId } onClose={ closeConfirm } /> }
            { (objectId >= 0) && mode &&
                <ContextMenuView objectId={ objectId } category={ RoomObjectCategory.FLOOR } onClose={ onClose } fades={ true }>
                    { (mode === ContextMenuEnum.FRIEND_FURNITURE) &&
                        <>
                            <ContextMenuHeaderView>
                                { LocalizeText('friendfurni.context.title') }
                            </ContextMenuHeaderView>
                            <ContextMenuListItemView onClick={ event => processAction('use_friend_furni') }>
                                { LocalizeText('friendfurni.context.use') }
                            </ContextMenuListItemView>
                        </> }
                    { (mode === ContextMenuEnum.MONSTERPLANT_SEED) &&
                        <>
                            <ContextMenuHeaderView>
                                { LocalizeText('furni.mnstr_seed.name') }
                            </ContextMenuHeaderView>
                            <ContextMenuListItemView onClick={ event => processAction('use_monsterplant_seed') }>
                                { LocalizeText('widget.monsterplant_seed.button.use') }
                            </ContextMenuListItemView>
                        </> }
                    { (mode === ContextMenuEnum.RANDOM_TELEPORT) &&
                        <>
                            <ContextMenuHeaderView>
                                { LocalizeText('furni.random_teleport.name') }
                            </ContextMenuHeaderView>
                            <ContextMenuListItemView onClick={ event => processAction('use_random_teleport') }>
                                { LocalizeText('widget.random_teleport.button.use') }
                            </ContextMenuListItemView>
                        </> }
                    { (mode === ContextMenuEnum.PURCHASABLE_CLOTHING) &&
                        <>
                            <ContextMenuHeaderView>
                                { LocalizeText('furni.generic_usable.name') }
                            </ContextMenuHeaderView>
                            <ContextMenuListItemView onClick={ event => processAction('use_purchaseable_clothing') }>
                                { LocalizeText('widget.generic_usable.button.use') }
                            </ContextMenuListItemView>
                        </> }
                    { (mode === GROUP_FURNITURE) && groupData &&
                        <>
                            <ContextMenuHeaderView className="cursor-pointer text-truncate" onClick={ () => GetGroupInformation(groupData.guildId) }>
                                { groupData.guildName }
                            </ContextMenuHeaderView>
                            { !isGroupMember &&
                                <ContextMenuListItemView onClick={ event => processAction('join_group') }>
                                    { LocalizeText('widget.furniture.button.join.group') }
                                </ContextMenuListItemView> }
                            <ContextMenuListItemView onClick={ event => processAction('go_to_group_homeroom') }>
                                { LocalizeText('widget.furniture.button.go.to.group.home.room') }
                            </ContextMenuListItemView>
                            { groupData.guildHasReadableForum &&
                                <ContextMenuListItemView onClick={ event => processAction('open_forum') }>
                                    { LocalizeText('widget.furniture.button.open_group_forum') }
                                </ContextMenuListItemView> }
                        </> }
                </ContextMenuView> }
        </>
    )
}
