import * as React from 'react';
import { connect } from 'react-redux';

import { Screen, Button, Indicator } from '../../../../core';

import { colors } from 'utils';

export interface CitizensScreenProps {

}

export class CitizensScreenBase extends React.Component<CitizensScreenProps> {
    constructor(props:CitizensScreenProps) {
        super(props);
    }

    public render() {
        return (
            <Screen
                type='Citizens'
                color={colors.get('citizens')}
            >
                Hello
            </Screen>
        );
    }
}

export const CitizensScreen = connect(
    null,
    null
)(CitizensScreenBase);
