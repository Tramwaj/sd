import React from 'react';
import { Card, Cards, ColourEnum, SingleCost } from './GameTypes';
import CardView from './CardView';
import {ReactComponent as Crown} from "./crown.svg";
import CardsLevelView from './CardsLevel';

const CardBoard: React.FC<{cardsProps:Cards}> = (props) => {
    const [cards, setCards] = React.useState<Cards | null>(null);
    const getCards = () => {
        setCards({
            level1: props.cardsProps.level1,
            level2: props.cardsProps.level2,
            level3: props.cardsProps.level3,
        } );
    }
    React.useEffect(() => {
        getCards();
        console.log('cards:', cards);
        console.log('cardsProps:', props.cardsProps);
    }, []);
    const cost: SingleCost[] = [
        { colour: ColourEnum.Red, amount: 1 },
        { colour: ColourEnum.Blue, amount: 2 },
        { colour: ColourEnum.Green, amount: 3 }
    ];
    const card:Card = {
        id: 1,
        colour: ColourEnum.Red,
        crowns: 2,
        miningPower: 1,
        points: 1,
        cardCost: cost,
    }
    
    const CardLevel1 = {
        exposed: [card,card,card,card,card],
        deckCount: 3,
    }
    const CardLevel2 = {
        exposed: [card,card,card,card],
        deckCount: 4,
    }
    const CardLevel3 = {
        exposed: [card,card,card],
        deckCount: 5,
    }
    return (
        <div>
            {(cards?.level3) &&<div>
                <CardsLevelView levelProps={cards.level3}/></div>}
            {(cards?.level2) &&<div>
                <CardsLevelView levelProps={cards.level2}/></div>}
            {(cards?.level1) &&<div>
                <CardsLevelView levelProps={cards.level1}/></div>}            
        </div>
    );
}
export default CardBoard;