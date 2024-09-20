import React, { useEffect, useState } from "react";
import { Action, ActionStateEnum, ActionType, Card, CardLevel } from "./GameTypes";
import { Button } from "react-bootstrap";
import CardView from "./CardView";
import "./CardsLevel.css";
import CardDeckView from "./CardDeckView";

const CardsLevelView: React.FC<{ levelProps: CardLevel, actionState: string, sendAction: (action: Action) => void }> = (props) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [deckCount, setDeckCount] = useState<number>(0);
    const [levelNumber, setLevelNumber] = useState<number>(0);
    React.useEffect(() => {
        setCards(props.levelProps.exposed);
        setDeckCount(props.levelProps.deckCount);
        console.log("CardsLevel exposed:", props.levelProps.exposed);
        setLevelNumber(Math.ceil((cards[0]?.id+1)/100));
    }, [props.levelProps, props.actionState]);

    const cardsEnabled = () =>{
        return props.actionState == ActionStateEnum.Normal.toString() || props.actionState == ActionStateEnum.ReserveCard.toString();
    }

    return (
        <div>
            <div className="level">
                <CardDeckView deckCount={deckCount} enabled={props.actionState == ActionStateEnum.ReserveCard.toString()} level={levelNumber} sendAction={props.sendAction} />
                {cards.map((card) =>
                    <CardView key={card.id} cardProps={card} selectCard={props.sendAction} enabled={cardsEnabled()} />
                )}
            </div>
        </div>
    );
}
export default CardsLevelView;