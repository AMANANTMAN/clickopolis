import * as React from 'react';
// @ts-ignore: no @types defintion
import { Tooltip } from 'react-tippy';

import { CONSTANTS } from 'utils';

import './Menu.scss';

export interface MenuProps {
    menuData: any;
}

export class Menu extends React.Component {
    constructor(props:MenuProps) {
        super(props);
    }

    private generateMenu() {
        return CONSTANTS.screenData.map((i:string) => {
            return (
                <li key={i}>
                    <a href={'#' + i} title={i}>
                        <Tooltip
                            title={i}
                            position={'top'}
                            followCursor={true}
                        >
                            <img alt={i} src={'./images/' + i.toLowerCase() + '.svg'} style={{ height: '2rem' }} />
                        </Tooltip>
                    </a>
                </li>
            );
        });
    }

    public render() {
        return (
            <nav className='clickopolis-menu'>
                <div>menu</div>
                <ul>
                    {
                        this.generateMenu()
                    }
                </ul>
            </nav>
        );
    }
}