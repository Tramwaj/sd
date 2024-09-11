import React, { useEffect } from 'react';
import { Action, ActionStateEnum, Card, ColourEnum, PlayerBoard } from './GameTypes';
import { fontColour } from '../Globals/StyleFunctions';
import "./SinglePlayerBoard.css";

const SinglePlayerBoard: React.FC<{ pb: PlayerBoard, actionState: ActionStateEnum, playerTurn:boolean, sendAction: (action: Action) => void }> = (props) => {
    const [playerBoard, setPlayerBoard] = React.useState<PlayerBoard | null>(null);
    const [colours, setColours] = React.useState<ColourEnum[]>([]);
    const [playerTurn, setPlayerTurn] = React.useState<boolean>(true);
    const [actionState, setActionState] = React.useState<string>("Normal");
    useEffect(() => {
        setPlayerBoard(props.pb);
        const colours = [ColourEnum.White, ColourEnum.Blue, ColourEnum.Green, ColourEnum.Red, ColourEnum.Black];
        setColours(colours);
        setPlayerTurn(playerTurn);
        setActionState(props.actionState);
    }, [props.pb, props.actionState, props.sendAction]);

    const handleCoinsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Coin clicked");
    }
    const turnDependantBorder = () => {
        const colour = playerTurn ? "green" : "red";
        return `2px solid ${colour}`;
    }

    return (
        <div>
            {playerBoard ? (
                <div className="playerBoard" style={{ border: turnDependantBorder() }}>
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
                                        <button className="coinDot" key={i} onClick={handleCoinsClick} style={{ backgroundColor: fontColour(colour) }}>

                                        </button>)
                                    : ""}
                            </div>
                            <div className="points">{playerBoard.pointsByColour.get(colour) ?? 0} p</div>
                        </div>
                    ))}
                    <div> Gold: {playerBoard.coins?.get(ColourEnum.Gold) ?? 0} Pink: {playerBoard.coins?.get(ColourEnum.Pink ?? 0)} </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default SinglePlayerBoard;