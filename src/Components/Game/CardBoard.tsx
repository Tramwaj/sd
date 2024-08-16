import React from 'react';
import { Card, Cards } from './GameTypes';
import CardView from './CardView';

const CardBoard: React.FC<{cards:Cards}> = (props) => {
    const card:Card = {
        id: 1,
        colour: 0,
        crowns: 1,
        miningPower: 1,
        points: 1,
        cardCost: [[2,1],[1,2]],
    }
    return (
        <div>
            <h1>CardBoard</h1>
            <CardView cardProps={card}/>
        </div>
    );
}
export default CardBoard;