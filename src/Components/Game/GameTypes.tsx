export type GameState = {
    gameId: string;
    player1Turn: boolean;
    board: Board;
    player1: Player;
    player2: Player;
    lastAction: string;
}
export type Player = {
    name: string;
    id: string;
}
export type Board = {
    level1: CardLevel,
    level2: CardLevel,
    level3: CardLevel,
    coinBoard: CoinBoard,
    player1Board: PlayerBoard,
    player2Board: PlayerBoard
}
export type Cards = {
    level1: CardLevel | undefined,
    level2: CardLevel | undefined,
    level3: CardLevel | undefined,
}
export type CardLevel = {
    exposed: Array<Card>;
    deckCount: number;
}
export type CoinBoard = {
    CoinsOnBoard: ColourEnum[][];
    ScrollCount: number;
}
export type PlayerBoard = {
    hiddenCards: Card[];
    scrollsCount: number;
    pointsByColour: Record<ColourEnum, number>;
    totalPoints: number;
    crowns: number;
    ownedCards: Card[];
    miningValues: Record<ColourEnum, number>;
    coins: Record<ColourEnum, number>;
    hiddenCardsCount: number;
}
export type Card = {
    id: number;
    colour: ColourEnum;
    points: number;
    miningPower: number;
    crowns: number;
    cardCost: [ColourEnum, number][];
    action?: CardActionEnum;
}
export type CardCost = {
    white: number;
    blue: number;
    green: number;
    red: number;
    black: number;
    pink: number;
}
export enum ColourEnum {
    White = 0,
    Blue = 1,
    Green = 2,
    Red = 3,
    Black = 4,
    Pink = 5,
    Grey = 6,
    Multi = 7,
    Gold = 8
}
export enum CardActionEnum {
    ExtraTurn = 1,
    CoinPickup = 2,
    Steal = 3,
    Scroll = 4,
    None = 5
}
