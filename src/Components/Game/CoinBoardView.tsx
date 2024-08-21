import React from "react";
import { CoinBoard } from "./GameTypes";
import "./CoinBoardView.css";

const CoinBoardView: React.FC<{ coinBoardProps: CoinBoard }> = (props) => {
    return (
        <div className="board">
            
                    {props.coinBoardProps.coinsOnBoard.map(nested => nested.map((coin, x) =>
                        <button key={x} className="coin" style={{ backgroundColor: coin.toString() }}>
                            
                        </button>
                    ))}
                
        </div>
    );
}
export default CoinBoardView;