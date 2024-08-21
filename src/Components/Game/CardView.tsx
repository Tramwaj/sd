import React, { useEffect } from "react";
import "./CardView.css";
import { Card, ColourEnum } from "./GameTypes";
import { ReactComponent as Crown } from "./whiteCrown.svg";
import { Button } from "react-bootstrap";

//todo: insert the smaller "coin" (as on CoinBoard) in the card cost
const CardView: React.FC<{ cardProps: Card, selectCard: (cardId: number | undefined) => void }> = (props) => {
    const [card, setCard] = React.useState<Card | null>(null);
    const [cardColour, setCardColour] = React.useState<ColourEnum>(ColourEnum.White);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (card !== null && card.id !== undefined)
            props.selectCard(card?.id);
    };
    const fontColour = (colour: ColourEnum) => {
        switch (colour.toString()) {
            case "Black":
                return "White";
            default:
                return "Black";
        }
    }
    const cardDisplayColour = (colour: ColourEnum) => {
        switch (colour.toString()) {
            case "Multi":
                return "Pink";
            default:
                return colour.toString();
        }
    };
    useEffect(() => {
        setCard(props.cardProps);
        setCardColour(props.cardProps.colour);
        console.log("CardView mounted");
        if (card) console.log("cardProps:", card);
    }, [props.cardProps]);
    return (
        { card } && <button className="card-container box" onClick={handleClick}>
            <div className="top" style={{ backgroundColor: cardDisplayColour(cardColour), color: fontColour(cardColour) }}>
                <div className="points">{card?.points}</div>
                <div className="crowns">
                    {card?.crowns != undefined && card?.crowns > 0 ? 
                    Array.from(Array(card?.crowns), (_, i) => 
                        <Crown key={i}/>) : ""
                        }
                </div>
                <div className="miningPower" >{card?.miningPower}</div>
            </div>
            <div className="bot">
                {card?.cardCost?.map((x) =>
                    <div className="dot" key={x.colour} style={{ backgroundColor: x.colour.toString() }} >
                        <div style={{ color: fontColour(x.colour) }}>{x.amount}</div>
                    </div>)}
            </div>
        </button>
    );

}
export default CardView;