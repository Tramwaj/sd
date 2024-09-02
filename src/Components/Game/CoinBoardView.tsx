import React, { useEffect } from "react";
import { Action, ActionType, CoinBoard, ColourEnum } from "./GameTypes";
import "./CoinBoardView.css";
import { fontColour } from "../Globals/StyleFunctions";
interface coinCoords {
    x: number,
    y: number
}

const CoinBoardView: React.FC<{ coinBoardProps: CoinBoard, sendAction: (action:Action) => void }> = (props) => {
    const [coinBoard, setCoinBoard] = React.useState<CoinBoard | null>(null);
    const [selectedCoins, setSelectedCoins] = React.useState<coinCoords[]>([]);

    useEffect(() => {
        setCoinBoard(props.coinBoardProps);
    }, [props.coinBoardProps, selectedCoins]);

    const selectCoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        const coords = event.currentTarget.id;
        const colour = event.currentTarget.style.backgroundColor;
        if (colour === "grey"){
            showAlert("You can't select a grey coin");
            return;
        }
        const x = parseInt(coords.split("/")[0]);
        const y = parseInt(coords.split("/")[1]);
        if (!checkCoinPosition(x, y)) {
            showAlert("You can't select this coin");
            return;
        }
        const newSelectedCoins = [...selectedCoins];
        newSelectedCoins.push({ x: x, y: y });
        setSelectedCoins(newSelectedCoins);
        console.log(newSelectedCoins.map((coin) => coin.x + "/" + coin.y));
    }
    const checkCoinPosition = (x: number, y: number) => {
        switch (selectedCoins.length) {
            case 0:
                return true;
            case 1:
                return (Math.abs(selectedCoins[0].x - x)<=1 && Math.abs(selectedCoins[0].y - y) <= 1);
            case 2:
                const diffx = Math.abs(selectedCoins[0].x - selectedCoins[1].x);
                const diffy = Math.abs(selectedCoins[0].y - selectedCoins[1].y);
                return (Math.abs(selectedCoins[0].x - x) === diffx && Math.abs(selectedCoins[0].y - y) === diffy ||
                (Math.abs(selectedCoins[1].x - x) === diffx && Math.abs(selectedCoins[1].y - y) === diffy));
            default:
                return false;
        }
    }
    const showAlert = (msg: string) => {
        alert(msg);
    }
    
    const clearSelectedCoins = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedCoins([]);
    }
    const borderIfSelected = (x: number, y: number, coinColour: ColourEnum) => {
        if (selectedCoins.find((coin) => coin.x === x && coin.y === y)) {
            return "2px solid black";
        }
        return "none";
    }
    const sendBoardShuffleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        const action:Action = {
            type: ActionType.ShuffleCoins,
            gameId: undefined,
            payload: ""
        }
        props.sendAction(action);
    }

    return (
        <div className="coinBoardContainer">
            <div className="board">
                {props.coinBoardProps.coinsOnBoard.map((nested, y) => nested.map((coin, x) =>
                    <div key={x*100+y} className="coinSpace" style={{border: borderIfSelected(x, y, coin)}}>
                        <button key={x * 10 + y}
                            id={x.toString() + "/" + y.toString()}
                            onClick={selectCoin}
                            className="coin" style={{
                                backgroundColor: coin.toString(),
                            }}>
                        </button>
                    </div>
                ))}
            </div>
            <div className="Scrolls">{coinBoard?.scrollCount}</div>
            <div className="coinBoardFooter">
                <button className="shuffleBtn" onClick={sendBoardShuffleAction}>Shuffle</button>
                <button className="CancelBtn" onClick={clearSelectedCoins}>Cancel</button>
                <button className="ConfirmBtn" disabled={selectedCoins.length<1?true:false}>Confirm</button>
            </div>
        </div>
    );
}
export default CoinBoardView;