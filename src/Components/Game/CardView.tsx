import React from "react";
import "./CardView.css";
import { Card, ColourEnum } from "./GameTypes";

const CardView: React.FC<{ cardProps: Card }> = (props) => {
    const cardProps = props.cardProps;
    return (
        <div className="card-container box">
            <div className="top" style={{ backgroundColor: ColourEnum[cardProps.colour] }}>
                <div className="points">{cardProps.points}</div>
                <div className="crowns">{cardProps.crowns}</div>
                <div className="miningPower">{cardProps.miningPower}</div>
            </div>
            <div className="bot">
                {cardProps.cardCost?.map((x) =>
                    <div className="dot" style={{ backgroundColor: ColourEnum[x[0]] }}>
                        {x[1]}
                    </div>)}
            </div>
        </div>
    );
}
export default CardView;