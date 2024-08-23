import { Card, ColourEnum, PlayerBoard } from "../GameTypes";

const createPlayerBoard =() => {
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
    return player1Board;
}
export default createPlayerBoard;