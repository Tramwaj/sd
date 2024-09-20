import React, { useEffect } from 'react';
import { Action, ActionStateEnum, ActionType, Card, ColourEnum, PlayerBoard } from './GameTypes';
import { fontColour } from '../Globals/StyleFunctions';
import "./SinglePlayerBoard.css";
import CardView from './CardView';

const SinglePlayerBoard: React.FC<{ pb: PlayerBoard, actionState: ActionStateEnum, playerTurn: boolean, sendAction: (action: Action) => void }> = (props) => {
    const [playerBoard, setPlayerBoard] = React.useState<PlayerBoard | null>(null);
    const [colours, setColours] = React.useState<ColourEnum[]>([]);
    const [playerTurn, setPlayerTurn] = React.useState<boolean>(true);
    const [actionState, setActionState] = React.useState<string>("Normal");
    const [coinsToBeDropped, setCoinsToBeDropped] = React.useState<ColourEnum[]>([]);
    useEffect(() => {
        setPlayerBoard(props.pb);
        const colours = [ColourEnum.White, ColourEnum.Blue, ColourEnum.Green, ColourEnum.Red, ColourEnum.Black];
        setColours(colours);
        setPlayerTurn(props.playerTurn);
        setActionState(props.actionState);
        console.log("SinglePlayerBoard mounted");
    }, [props.pb, props.actionState, props.sendAction, playerBoard, playerTurn]);

    const handleCoinsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Coin clicked");
        const colour = event.currentTarget.name;
        if (actionState === ActionStateEnum.DropCoins.toString()) {
            const coins = [...coinsToBeDropped];
            coins.push(colour as ColourEnum);
            setCoinsToBeDropped(coins);
            let newPB = playerBoard;
            if (newPB) {
                const oldCoins = newPB.coins?.get(colour as ColourEnum);
                const newCoins = (oldCoins ?? 0) - 1;
                newPB?.coins?.set(colour as ColourEnum, newCoins);
            }
            setPlayerBoard(newPB);
            let coinsCount = 0;
            playerBoard?.coins?.forEach((value) => {
                coinsCount += value;
            });
            if (coinsCount === 10) {
                const action: Action = {
                    type: ActionType.DropCoins,
                    gameId: undefined,
                    payload: coins
                }
                props.sendAction(action);
            }
        } else if (actionState === ActionStateEnum.StealCoin.toString()) {
            const action: Action = {
                type: ActionType.StealCoin,
                gameId: undefined,
                payload: colour
            }
            props.sendAction(action);
        }
    }
    const turnDependantBorder = () => {
        const colour = playerTurn ? "green" : "red";
        return `2px solid ${colour}`;
    }
    const isCoinDisabled = () => {
        return playerTurn ? actionState !== ActionStateEnum.DropCoins.toString() : actionState !== ActionStateEnum.StealCoin.toString();

    }

    return (
        <div>
            {playerBoard ? (
                <div className="playerBoard" style={{ border: turnDependantBorder() }}>
                    <div className="mainBoard">
                        <div className="totals">
                            <div>{playerBoard.player.name}</div>
                            <div className="points">{playerBoard.totalPoints} pkt</div>
                            <div className="scrolls">{playerBoard.scrollsCount} scrolls</div>
                            <div className="crowns">{playerBoard.crowns} crowns</div>
                        </div>
                        {colours.map(colour => (
                            <div className="colour" key={colour} style={{ backgroundColor: colour.toString(), color: fontColour(colour) }}>
                                <div className="miningPower">
                                    {playerBoard?.miningValues && playerBoard?.miningValues?.get(colour) ?
                                        Array.from(Array(playerBoard.miningValues.get(colour)), (_, i) =>
                                            <div className="rect" key={i} style={{ backgroundColor: fontColour(colour) }}></div>)
                                        : ""}
                                </div>
                                <div className="coins">
                                    {playerBoard.coins?.get(colour) ?
                                        Array.from(Array(playerBoard.coins?.get(colour)), (_, i) =>
                                            <button className="coinDot" key={i} name={colour} disabled={isCoinDisabled()} onClick={handleCoinsClick} style={{ backgroundColor: fontColour(colour) }}>

                                            </button>)
                                        : ""}
                                </div>
                                <div className="points">{playerBoard.pointsByColour.get(colour) ?? 0} p</div>
                            </div>
                        ))}
                        <div> Gold: {playerBoard.coins?.get(ColourEnum.Gold) ?? 0} Pink: {playerBoard.coins?.get(ColourEnum.Pink ?? 0)}</div>
                    </div>
                    <div className="hiddenCards">
                        {playerBoard.hiddenCards.map((card) => (
                            <CardView key={card.id} cardProps={card} selectCard={props.sendAction} enabled={props.actionState == ActionStateEnum.Normal.toString()} />
                        ))}
                    </div>

                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default SinglePlayerBoard;