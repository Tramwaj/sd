import React from 'react';
import { Card, CardLevel, ColourEnum, SingleCost } from './GameTypes';
import CardView from './CardView';
import { ReactComponent as Crown } from "./crown.svg";
import CardsLevelView from './CardsLevel';

const CardBoard: React.FC<{ cardsProps: CardLevel[], actionState:string }> = (props) => {
    const [level1, setLevel1] = React.useState<CardLevel | null>(null);
    const [level2, setLevel2] = React.useState<CardLevel | null>(null);
    const [level3, setLevel3] = React.useState<CardLevel | null>(null);
    const [actionState, setActionState] = React.useState<string>("Normal");

    const getCards = () => {
        setLevel1(props.cardsProps[0] || null);
        setLevel2(props.cardsProps[1]);
        setLevel3(props.cardsProps[2]);
        };
    React.useEffect(() => {
        getCards();
        setActionState(props.actionState);
        console.log('cardsProps:', props.cardsProps);
    }, [props.cardsProps, props.actionState]);

    return (
        <div>
            {(level3) && <div>
                <CardsLevelView levelProps={level3} /></div>}
            {(level2) && <div>
                <CardsLevelView levelProps={level2} /></div>}
            {(level1) && <div>
                <CardsLevelView levelProps={level1} /></div>}
        </div>
    );
}
export default CardBoard;