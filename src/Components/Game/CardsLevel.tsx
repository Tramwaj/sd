import React, { useEffect } from "react";
import { CardLevel } from "./GameTypes";
import { Button} from "react-bootstrap";
import CardView from "./CardView";
import "./CardsLevel.css";

const CardsLevelView:React.FC<{levelProps:CardLevel}> = (props) => {    
    const cards = props.levelProps.exposed;
    const deckCount = props.levelProps.deckCount;
    const selectCard = (cardId:number | undefined) => {
        console.log(cardId);
    }
    return (
        <div>
            <div className="level">
            {cards.map((card) => 
                <CardView key={card.id} cardProps={card} selectCard={selectCard}/>
            )}
            </div>
        </div>
    );
}
export default CardsLevelView;