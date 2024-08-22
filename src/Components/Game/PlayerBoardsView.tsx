import React, { useEffect } from "react";
import { Card, ColourEnum, PlayerBoard } from "./GameTypes";
import "./PlayerBoardsView.css";
import { fontColour } from "../Globals/StyleFunctions";


const PlayerBoardsView: React.FC<{ player1board: PlayerBoard, player2Board: PlayerBoard, player1Turn: boolean }> = (props) => {
    const [player1Board, setPlayer1Board] = React.useState<PlayerBoard | null>(null);
    const [colours, setColours] = React.useState<ColourEnum[]>([]);
    const [groupedCards, setGroupedCards] = React.useState<Map<ColourEnum, Card[]>>(new Map());
    useEffect(() => {
        const cards: Card[] = [
            { id: 1, colour: ColourEnum.Black, points: 1, miningPower: 1, crowns: 1, cardCost: [{ colour: ColourEnum.Black, amount: 1 }] },
            { id: 2, colour: ColourEnum.Black, points: 0, miningPower: 2, crowns: 1, cardCost: [{ colour: ColourEnum.Red, amount: 1 }] },
            { id: 3, colour: ColourEnum.Red, points: 2, miningPower: 1, crowns: 0, cardCost: [{ colour: ColourEnum.Blue, amount: 1 }] }];
        const coins: Map<ColourEnum, number> = new Map();
        coins.set(ColourEnum.Green, 3);
        coins.set(ColourEnum.Gold, 1);
        coins.set(ColourEnum.Pink, 1);
        //const pointsByColour:{[colour:string]: number} = Map.groupBy(cards, card => card.colour).values(cards => cards.reduce((acc, card) => acc + card.points, 0));
        const crowns = cards.reduce((acc, card) => acc + card.crowns, 0);
        const groupedCards = new Map<ColourEnum, Card[]>();
        cards.forEach(card => {
            if (!groupedCards.has(card.colour)) {
                groupedCards.set(card.colour, []);
            }
            groupedCards.get(card.colour)!.push(card);
        });
        const pointsByColour: Map<ColourEnum, number> = new Map();
        groupedCards.forEach((cards, colour) => {
            pointsByColour.set(colour, cards.reduce((acc, card) => acc + card.points, 0));
        });
        const totalPoints = cards.reduce((acc, card) => acc + card.points, 0);
        const miningValues = new Map<ColourEnum, number>();
        groupedCards.forEach((cards, colour) => {
            miningValues.set(colour, cards.reduce((acc, card) => acc + card.miningPower, 0));
        });
        const player1Board: PlayerBoard = {
            hiddenCards: [],
            scrollsCount: 1,
            pointsByColour: pointsByColour,
            totalPoints: totalPoints,
            crowns: crowns,
            ownedCards: cards,
            miningValues: miningValues,
            coins: coins,
            hiddenCardsCount: 0,
        };
        const colours = [ColourEnum.White, ColourEnum.Blue, ColourEnum.Green, ColourEnum.Red, ColourEnum.Black];

        setColours(colours);
        setGroupedCards(groupedCards);
        setPlayer1Board(player1Board);
    }, [props.player1board, props.player2Board]);

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
                                {player1Board.miningValues?.get(colour) ?
                                Array.from(Array(player1Board.miningValues?.get(colour)), (_, i) =>
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
            {player1Board ? (
                <div className="playerBoard">
                    <div className="totals">
                        <div className="points">{player1Board.totalPoints} pkt</div>
                        <div className="scrolls">{player1Board.scrollsCount} scrolls</div>
                        <div className="crowns">{player1Board.crowns} crowns</div>
                    </div>
                    {colours.map(colour => (
                        <div className="colour" key={colour} style={{ backgroundColor: colour.toString(), color: fontColour(colour) }}>
                            <div className="points">{player1Board.pointsByColour.get(colour) ?? 0} pkt</div>
                            <div className="miningPower">{player1Board.miningValues.get(colour)}</div>
                            <div className="coins">{player1Board.coins.get(colour)}</div>
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