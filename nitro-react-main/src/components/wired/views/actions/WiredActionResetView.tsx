import { FC } from 'react';
import { WiredFurniType } from '../../../../api';
import { WiredActionBaseView } from './WiredActionBaseView';

export const WiredActionResetView: FC<{}> = props =>
{
    return <WiredActionBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ false } save={ null } />;
}
