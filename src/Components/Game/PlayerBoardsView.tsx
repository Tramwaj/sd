import React, { useEffect } from "react";
import { Card, ColourEnum, PlayerBoard } from "./GameTypes";
import "./PlayerBoardsView.css";
import { fontColour } from "../Globals/StyleFunctions";
import { create } from "domain";
import createPlayerBoard from "./FakeData/FakePlayersBoards";


const PlayerBoardsView: React.FC<{ player1board: PlayerBoard, player2Board: PlayerBoard, player1Turn: boolean, actionState: string }> = (props) => {
    const [player1Board, setPlayer1Board] = React.useState<PlayerBoard | null>(null);
    const [player2Board, setPlayer2Board] = React.useState<PlayerBoard | null>(null);
    const [actionState, setActionState] = React.useState<string>("Normal");
    const [colours, setColours] = React.useState<ColourEnum[]>([]);
    const [groupedCards, setGroupedCards] = React.useState<Map<ColourEnum, Card[]>>(new Map());
    useEffect(() => {
        //const player1Board = createPlayerBoard();
        //const miningv = new Map<ColourEnum, number>(props.player1board.miningValues);
        setPlayer1Board(props.player1board);        
        setPlayer2Board(props.player2Board);
        const colours = [ColourEnum.White, ColourEnum.Blue, ColourEnum.Green, ColourEnum.Red, ColourEnum.Black];
        const colourMap = new Map<ColourEnum, number>([[ColourEnum.White,4],[ColourEnum.Blue,2]]);

        setColours(colours);
        setGroupedCards(groupedCards);
        //setPlayer1Board(player1Board);
    }, [props.player1board, props.player2Board, props.player1Turn, props.actionState]);

    return (
        <div className="playerBoards">
            {player1Board ? (
                <div className="playerBoard">
                    <div className="totals">
                        <div className="points">{player1Board.totalPoints} pkt</div>
                        <div className="scrolls">{player1Board.scrollsCount} scrolls</div>
                        <div className="crowns">{player1Board.crowns} crowns</div>
                    </div>
                    {colours.map(colour => (
                        <div className="colour" key={colour} style={{ backgroundColor: colour.toString(), color: fontColour(colour) }}>
                            <div className="miningPower">
                                {player1Board?.miningValues && player1Board?.miningValues?.get(colour) ?
                                Array.from(Array(player1Board.miningValues.get(colour)), (_, i) =>
                                    <div className="rect" key={i} style={{ backgroundColor: fontColour(colour) }}></div>)
                                : ""}
                            </div>
                            <div className="coins">
                                {player1Board.coins?.get(colour) ? 
                                Array.from(Array(player1Board.coins?.get(colour)), (_, i) =>
                                    <div className="coinDot" key={i} style={{ backgroundColor: fontColour(colour) }}></div>)
                                : ""}
                            </div>
                            <div className="points">{player1Board.pointsByColour.get(colour) ?? 0} p</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            {player2Board ? (
                <div className="playerBoard">
                    <div className="totals">
                        <div className="points">{player2Board.totalPoints} pkt</div>
                        <div className="scrolls">{player2Board.scrollsCount} scrolls</div>
                        <div className="crowns">{player2Board.crowns} crowns</div>
                    </div>
                    {colours.map(colour => (
                        <div className="colour" key={colour} style={{ backgroundColor: colour.toString(), color: fontColour(colour) }}>
                            <div className="points">{player2Board.pointsByColour.get(colour) ?? 0} pkt</div>
                            <div className="miningPower">{player2Board.miningValues.get(colour)}</div>
                            <div className="coins">{player2Board.coins.get(colour)}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
export default PlayerBoardsView;