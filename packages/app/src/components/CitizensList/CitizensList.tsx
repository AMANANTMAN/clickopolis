import * as React from 'react';
import { connect } from 'react-redux';

import { addCitizen, removeCitizen, updateFoodPerSecond } from 'actions';
// @ts-ignore: importing core
import { Citizen, Contribution, Button, abbrNum, Civilization } from '@clickopolis/core';
import { Contribution as CC } from '../Contribution';

import './CitizensList.scss';

export interface CitizensListProps {
    amount?: number;
    addCitizen?: addCitizen;
    removeCitizen?: removeCitizen;
    updateFoodPerSecond?: updateFoodPerSecond;
    civilization?: Civilization;
    citizens?: Citizen[];
}

const ContributionComponent:any = CC;

const determineFoodPerSecond = (citizens: Citizen[], population: number) => {
    console.error(citizens);
    const contributionTotal = citizens.map(citizen => {
        if (citizen.name === 'ruler') return { citizenAmount: 0, contributionAmount: 0 };
        const contrib = citizen.contribution.find(c => c.resource === 'food' && c.type === 'PS');
        return {
            citizenAmount: citizen.amount,
            contributionAmount: contrib ? contrib.amount : 0
        };
    }).reduce((prev, curr) => {
        return prev + (curr.citizenAmount * curr.contributionAmount);
    }, 0);
    const consumptionTotal = population - 1;
    return contributionTotal - consumptionTotal;
};

export class CitizensListBase extends React.PureComponent<CitizensListProps> {
    constructor(props:CitizensListProps) {
        super(props);
    }

    private addCitizen (amount: number, c: Citizen) {
        this.props.addCitizen(amount, c.name);
        this.props.updateFoodPerSecond(determineFoodPerSecond(this.props.citizens, this.props.civilization.population));
    }

    private renderCitizens() {
        return this.props.citizens.map((c:Citizen, idx: number) => {
            return (
                <div className='citizens-list-item' key={idx}>
                    <div className='citizen-amount'>{c.amount}</div>
                    { c.name !== 'ruler' ? <Button
                        className='citizen-amount-button'
                        value={`-${abbrNum(this.props.amount)}`}
                        onClick={(_:any) => this.props.removeCitizen(this.props.amount, c.name)}
                    /> : null }
                    <img className='citizen-image' src={`./images/${c.name}.svg`} />
                    { c.name !== 'ruler' ? <Button
                        className='citizen-amount-button'
                        value={`+${abbrNum(this.props.amount)}`}
                        onClick={(_:any) => this.addCitizen(this.props.amount, c)}
                    /> : null }
                    <div className='citizen-description'>{c.description}</div>
                    <div className='citizen-contribution'>
                        {
                            Array.isArray(c.contribution)
                            ? c.contribution.map((contrib:Contribution, index: number) => <ContributionComponent key={index} type={contrib.type} interval={contrib.interval} amount={contrib.amount} resource={contrib.resource}  />)
                            : null
                        }
                    </div>
                </div>
            );
        });
    }

    public render() {
        return (
            <div className='citizens-list-wrapper'>
                <div className='citizens-list-bar'></div>
                <div className='citizens-list'>
                    { this.renderCitizens() }
                </div>
            </div>
        );
    }
}

export const CitizensList:any = connect(
    (state:any) => ({
        citizens: [
            state.ruler,
            state.farmer,
            state.miner,
        ],
        civilization: state.civilization
    }),
    {
        addCitizen,
        removeCitizen,
        updateFoodPerSecond
    }
)(CitizensListBase as any);
