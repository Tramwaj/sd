import React from "react";
import { Action } from "./GameTypes";
import "./CardDeckView.css";

const CardDeckView: React.FC<{ deckCount: number, enabled: boolean, level: number, sendAction: (action: Action) => void }> = (props) => {
    return (
        <button className="deck">
            <div className="deckCount">{props.deckCount}</div>
            <div className="level">Level {props.level}</div>
        </button>
    );
}
export default CardDeckView;