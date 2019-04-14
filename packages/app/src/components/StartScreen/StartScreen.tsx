import * as React from 'react';
import { connect } from 'react-redux';

// @ts-ignore: importing core
import { Button } from '@clickopolis/core';

import { turnOnFlag } from 'actions';
// import { StartScreenOptions } from 'components/StartScreenOptions';

import './StartScreen.scss';

export interface StartScreenProps {
    turnOnFlag: turnOnFlag;
}

export interface StartScreenState {
    startScreenOptions: React.ReactNode;
    isStartingNewGame: boolean;
    hasFilledInOptions: boolean;
}

export class StartScreenBase extends React.Component<StartScreenProps, StartScreenState> {
    constructor(props:StartScreenProps) {
        super(props);
        this.state = {
            startScreenOptions: null,
            isStartingNewGame: true,
            hasFilledInOptions: false,
        };
    }

    private startNewGame = (_?:any) => {
        this.props.turnOnFlag('HAS_STARTED_GAME');
    }

    private loadOptions = async () => {
        const { StartScreenOptions } = await import('components/StartScreenOptions');
        await this.setState({ startScreenOptions: <StartScreenOptions />, isStartingNewGame: true });
    }

    public componentWillMount() {
        this.loadOptions();
    }

    public render() {
        return (
            <div className='start-screen'>
                <header style={{
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    width: '100%',
                }}>
                    <h1 className='clickopolis-heading'>Clickopolis <img src='./images/icon.png' /></h1>
                </header>
                { this.state.isStartingNewGame ? null : <Button onClick={this.loadOptions} iconHeight='1rem' icon='./images/plus.svg' className='start-new-game-button' value='Start New Game' /> }
                { this.state.startScreenOptions }
                { this.state.isStartingNewGame ? <Button className='start-button' onClick={this.startNewGame} icon='./images/icon.png' value='Start!' /> : null }
            </div>
        );
    }
}

export const StartScreen = connect(
    null,
    {
        turnOnFlag
    }
)(StartScreenBase as any);
