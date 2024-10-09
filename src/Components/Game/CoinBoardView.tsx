import React, { useEffect } from "react";
import { Action, ActionStateEnum, ActionType, CoinBoard, CoinRequest, ColourEnum } from "./GameTypes";
import "./CoinBoardView.css";
import { fontColour } from "../Globals/StyleFunctions";
type Visibility = "visible" | "hidden" | "collapse";

const CoinBoardView: React.FC<{ coinBoardProps: CoinBoard, actionState: string, sendAction: (action: Action) => void }> = (props) => {
    const [coinBoard, setCoinBoard] = React.useState<CoinBoard | null>(null);
    const [selectedCoins, setSelectedCoins] = React.useState<CoinRequest[]>([]);
    const [actionState, setActionState] = React.useState<string>("Normal");

    useEffect(() => {
        setCoinBoard(props.coinBoardProps);
        setActionState(props.actionState);
        setSelectedCoins([]);
    }, [props.coinBoardProps, props.actionState]);

    const selectCoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        const coords = event.currentTarget.id;
        const colour = event.currentTarget.style.backgroundColor;
        if (colour === "grey") {
            showAlert("There is no coin here");
            return;
        }
        const i = parseInt(coords.split("/")[1]);
        const j = parseInt(coords.split("/")[0]);
        if (!checkCoinPosition(i, j)) {
            showAlert("You can't select this coin");
            return;
        }
        if (selectedCoins.some(x=>x.i==i && x.j==j)){
            return;
        }
        const newSelectedCoins = [...selectedCoins];
        newSelectedCoins.push({ i: i, j: j, colour: colour as ColourEnum });
        setSelectedCoins(newSelectedCoins);
        console.log(newSelectedCoins.map((coin) => coin.i + "/" + coin.j + " " + coin.colour));
    }
    const checkCoinPosition = (i: number, j: number) => {
        switch (selectedCoins.length) {
            case 0:
                return true;
            case 1:
                return (Math.abs(selectedCoins[0].i - i) <= 1 && Math.abs(selectedCoins[0].j - j) <= 1);
            case 2:
                const diffx = Math.abs(selectedCoins[0].i - selectedCoins[1].i);
                const diffy = Math.abs(selectedCoins[0].j - selectedCoins[1].j);
                return (Math.abs(selectedCoins[0].i - i) === diffx && Math.abs(selectedCoins[0].j - j) === diffy ||
                    (Math.abs(selectedCoins[1].i - i) === diffx && Math.abs(selectedCoins[1].j - j) === diffy));
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

    const sendBoardShuffleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        const action: Action = {
            type: ActionType.ShuffleCoins,
            gameId: undefined,
            payload: ""
        }
        props.sendAction(action);
    }
    const sendCoinRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedCoins.some(x=>x.colour==ColourEnum.Grey.toLocaleLowerCase())){
            showAlert("You can't select empty spaces");
            return;
        }
              if (selectedCoins.some(x=>x.colour==ColourEnum.Gold.toLocaleLowerCase())){
            showAlert("You can't select gold coins");
            return;
        }
        const action: Action = {
            type: ActionType.GetCoins,
            gameId: undefined,
            payload: selectedCoins
        }
        props.sendAction(action);
        setSelectedCoins([]);
    }
    const exchangeScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedCoins[0].colour === ColourEnum.Gold.toLocaleLowerCase()) {
            showAlert("You can't trade for gold coins");
            return;
        }
        const action: Action = {
            type: ActionType.TradeScroll,
            gameId: undefined,
            payload: selectedCoins[0]
        }
        props.sendAction(action);
        setSelectedCoins([]);
    }
    const takeGoldCoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedCoins[0].colour !== ColourEnum.Gold.toLocaleLowerCase()) {
            showAlert("You can only use gold coins to reserve!");
            return;
        }
        const action: Action = {
            type: ActionType.TakeGoldCoin,
            gameId: undefined,
            payload: selectedCoins[0]
        }
        props.sendAction(action);
        setSelectedCoins([]);
    }
    const pickupCoin = (event: React.MouseEvent<HTMLButtonElement>) => {
        const action: Action = {
            type: ActionType.PickupCoin,
            gameId: undefined,
            payload: selectedCoins[0]
        }
        props.sendAction(action);
        setSelectedCoins([]);
    }
    const borderIfSelected = (i: number, j: number, coinColour: ColourEnum) => {
        if (selectedCoins.find((coin) => coin.i === i && coin.j === j)) {
            return "2px solid black";
        }
        return "none";
    }

    const areCoinsDisabled = (): boolean => {        
        return (actionState??"Normal") !== ActionStateEnum.Normal.toString() && !actionState.includes(ActionStateEnum.Pickup.toString())
    }
    const takeCoinsBtnVisiblility = (): Visibility => {
        return selectedCoins.length >= 1 ? "visible" : "collapse";
    }
    const tradeScrollBtnVisiblility = (): Visibility => {
        return selectedCoins.length === 1 ? "visible" : "collapse";
    }
    const reserveBtnVisibility = (): Visibility => {
        return selectedCoins.length === 1 && selectedCoins[0].colour===ColourEnum.Gold.toLocaleLowerCase() ?  "visible" : "collapse";
    }
    const pickupCoinBtnVisibility = (): Visibility => {
        return actionState.includes(ActionStateEnum.Pickup.toString()) ? "visible" : "collapse";
    }


    return (
        { coinBoard } && <div className="coinBoardContainer">
            <div className="board">
                {props.coinBoardProps.coinsOnBoard.map((nested, y) => nested.map((coin, x) =>
                    <div key={x * 100 + y} className="coinSpace" style={{ border: borderIfSelected(y, x, coin) }}>
                        <button key={x * 10 + y}
                            disabled= {areCoinsDisabled()}
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
            <div className="coinBoardFooter" >
                <button id="shuffleBtn" onClick={sendBoardShuffleAction}>Shuffle</button>
                <button id="CancelBtn" onClick={clearSelectedCoins}>Clear</button>
                <button id="TakeCoinsBtn" onClick={sendCoinRequest} style={{ visibility: takeCoinsBtnVisiblility()}} disabled={selectedCoins.length < 1}>Take coins</button>
                <button id="scrollBtn" onClick={exchangeScroll} style={{visibility: tradeScrollBtnVisiblility()}} disabled={selectedCoins.length !== 1}>Trade Scroll</button>
                <button id="reserveBtn" onClick={takeGoldCoin} style={{ visibility: reserveBtnVisibility()}} disabled={selectedCoins.length !== 1}>Reserve</button>  
                <button id="pickupCoin" onClick={pickupCoin} style={{visibility: pickupCoinBtnVisibility()}} disabled={!actionState.includes(ActionStateEnum.Pickup.toString()) && selectedCoins.length !== 1}>Pickup</button>          
            </div>
        </div>
    );
}
export default CoinBoardView;