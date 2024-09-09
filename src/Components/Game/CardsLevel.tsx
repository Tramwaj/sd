import React, { useEffect, useState } from "react";
import { Action, ActionType, Card, CardLevel } from "./GameTypes";
import { Button } from "react-bootstrap";
import CardView from "./CardView";
import "./CardsLevel.css";

const CardsLevelView: React.FC<{ levelProps: CardLevel, actionState: string, sendAction: (action: Action) => void }> = (props) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [deckCount, setDeckCount] = useState<number>(0);
    React.useEffect(() => {
        setCards(props.levelProps.exposed);
        setDeckCount(props.levelProps.deckCount);
        console.log("CardsLevel exposed:", props.levelProps.exposed);
    }, [props.levelProps]);

    return (
        <div>
            <div className="level">
                {cards.map((card) =>
                    <CardView key={card.id} cardProps={card} selectCard={props.sendAction} />
                )}
            </div>
        </div>
    );
}
export default CardsLevelView;