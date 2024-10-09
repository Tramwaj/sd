import React from 'react';
import { Action, ActionStateEnum, ActionType, Noble } from './GameTypes';
import './CardsLevel.css';
import './CardView.css';
import { parse } from 'path';
const Nobles: React.FC<{ nobles: Noble[], actionState: ActionStateEnum, sendAction: (action: Action) => void }> = (props) => {
    const getNoble = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Noble clicked: ", parseInt(event.currentTarget.id));
        const nobleNumber = parseInt(event.currentTarget.id);
        if (props.actionState === ActionStateEnum.GetNoble.toString()) {
            const action: Action = {
                type: ActionType.GetNoble,
                payload: nobleNumber
            };
            props.sendAction(action);
        };
    };
    const nobleCard = (noble: Noble | null, i: number) => {
        if (noble) {
            return (
                <button key={i} id={i.toString()} className="card-container" onClick={getNoble} disabled={props.actionState != ActionStateEnum.GetNoble.toString()}>
                    <div className="noblePoints">{noble.points}</div>
                    <div className="nobleAction"> {noble.action?.toString()}</div>
                </button>
            );
        } else {
            return (
                <div key={i} className="card-container">
                </div>
            )

        }
    }

    return (
        <div className="level">
            {props.nobles.map((noble, i) =>
                nobleCard(noble, i)
            )}
        </div>
    );
}

export default Nobles;