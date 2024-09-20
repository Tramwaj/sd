import React, { useEffect } from "react";
import "./CardView.css";
import { Action, ActionType, BuyCardRequest, Card, ColourEnum } from "./GameTypes";
import { ReactComponent as Crown } from "./whiteCrown.svg";
import { Button } from "react-bootstrap";
import { cardDisplayColour, fontColour } from "../Globals/StyleFunctions";
import { ChooseColorModal } from "./ChooseColorModal";

//todo: insert the smaller "coin" (as on CoinBoard) in the card cost
const CardView: React.FC<{ cardProps: Card, selectCard: (action: Action) => void, enabled: boolean }> = (props) => {
    const [card, setCard] = React.useState<Card | null>(null);
    const [cardColour, setCardColour] = React.useState<ColourEnum>(ColourEnum.White);
    const [isChooseColorModalOpen, setIsChooseColorModalOpen] = React.useState<boolean>(false);
    const [isCardClickable, setIsCardClickable] = React.useState<boolean>(true);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (card !== null && card.id !== undefined) {
            if (card.colour === ColourEnum.Multi) {
                setIsChooseColorModalOpen(true);
                return;
            }
            const cardRequest: BuyCardRequest = {
                cardId: card.id,
                colour: card.colour, //todo: ask for card coolour when colour == multi
            }
            const action = {
                type: ActionType.BuyCard,
                payload: cardRequest,
            }
            props.selectCard(action);
        }
    };
    const handleColorModalClose = () => {
        setIsChooseColorModalOpen(false);
    }
    const sendMultiColouredCard = (colour: ColourEnum) => {
        if (card !== null && card.id !== undefined) {
            const cardRequest: BuyCardRequest = {
                cardId: card.id,
                colour: colour,
            }
            const action = {
                type: ActionType.BuyCard,
                payload: cardRequest,
            }
            props.selectCard(action);
        }
    };

    useEffect(() => {
        setCard(props.cardProps);
        setCardColour(props.cardProps.colour);
        //console.log("CardView mounted");
        //if (card) console.log("cardProps:", card);
    }, [props.cardProps, card, isChooseColorModalOpen]);
    return (
        <div>
            {card && <button className="card-container box" onClick={handleClick} disabled={!props.enabled}>
                <div className="top" style={{ backgroundColor: cardDisplayColour(cardColour), color: fontColour(cardColour) }}>
                    <div className="points">{card?.points}</div>
                    <div className="crowns">
                        {card?.crowns != undefined && card?.crowns > 0 ?
                            Array.from(Array(card?.crowns), (_, i) =>
                                <Crown key={i} />) : ""
                        }
                    </div>
                    <div className="miningPower" >{card?.miningPower}</div>
                </div>
                <div className="bot">
                    <div className="dots">
                        {card?.cardCost?.map((x) =>
                            <div className="dot" key={x.colour} style={{ backgroundColor: x.colour.toString() }} >
                                <div style={{ color: fontColour(x.colour) }}>{x.amount}</div>
                            </div>)}
                    </div>
                    <div className="action">
                        {card?.action}
                    </div>
                </div>
            </button>}
            { isChooseColorModalOpen && <ChooseColorModal show={isChooseColorModalOpen} handleClose={() => setIsChooseColorModalOpen(false)} sendColour={sendMultiColouredCard} />}
        </div>        
    );

}
export default CardView;