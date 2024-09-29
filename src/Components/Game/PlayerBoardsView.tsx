import React, { useEffect } from "react";
import { Action, ActionStateEnum, Card, ColourEnum, PlayerBoard } from "./GameTypes";
import "./PlayerBoardsView.css";
import { fontColour } from "../Globals/StyleFunctions";
import SinglePlayerBoard from "./SinglePlayerBoard";


const PlayerBoardsView: React.FC<{ player1board: PlayerBoard, player2Board: PlayerBoard, player1Turn: boolean, isActivePlayer:boolean, actionState: ActionStateEnum, sendAction: (action:Action) => void }> = (props) => {
    const [player1Board, setPlayer1Board] = React.useState<PlayerBoard | null>(null);
    const [player2Board, setPlayer2Board] = React.useState<PlayerBoard | null>(null);
    const [actionState, setActionState] = React.useState<ActionStateEnum>(ActionStateEnum.Normal);
    const [player1Turn, setPlayer1Turn] = React.useState<boolean>(true);
    useEffect(() => {
        setPlayer1Board(props.player1board);
        setPlayer2Board(props.player2Board);
        setPlayer1Turn(props.player1Turn);
        setActionState(props.actionState);
    }, [props.player1board, props.player2Board, props.player1Turn, props.actionState, props.player1Turn, props.sendAction]);

    
    return (
        <div className="playerBoards">
            {player1Board ? <SinglePlayerBoard pb={player1Board} actionState={actionState} playerTurn={player1Turn} isActivePlayer={props.isActivePlayer} sendAction={props.sendAction} />: (
                <div>Loading...</div>
            )}
            {player2Board ? <SinglePlayerBoard pb={player2Board} actionState={actionState} playerTurn={!player1Turn} isActivePlayer={props.isActivePlayer} sendAction={props.sendAction} />: (
                <div>Loading...</div>
            )}
        </div>
    );
}
export default PlayerBoardsView;