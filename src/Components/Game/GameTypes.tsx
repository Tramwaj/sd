export type GameState = {
    gameId: string;
    player1Turn: boolean;
    actionState: ActionStateEnum;
    board: Board;
    lastAction: string;
    actions : string[];
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
    player2Board: PlayerBoard,
    nobles: Noble[],
}
export type CardLevel = {
    exposed: Array<Card>;
    deckCount: number;
}
export type CoinBoard = {
    coinsOnBoard: ColourEnum[][];
    scrollCount: number;
}
export type PlayerBoard = {
    player: Player;
    hiddenCards: Card[];
    scrollsCount: number;
    pointsByColour: Map<ColourEnum, number>;
    totalPoints: number;
    crowns: number;
    ownedCards: Card[];
    miningValues: Map<ColourEnum, number>;
    coins: Map<ColourEnum, number>;
    hiddenCardsCount: number;
}
export type Card = {
    id: number;
    colour: ColourEnum;
    points: number;
    miningPower: number;
    crowns: number;
    cardCost: SingleCost[];
    action?: CardActionEnum;
}
export type Noble = {    
    points: number;
    action?: CardActionEnum;
}
export type SingleCost = {
    colour: ColourEnum;
    amount: number;
}
export enum ColourEnum {
    White = "White",
    Blue = "Blue",
    Green = "Green",
    Red = "Red",
    Black = "Black",
    Pink = "Pink",
    Grey = "Grey",
    Multi = "Multi",
    Gold = "Gold"
}
export enum ColourEnumFont {
    White = "Black",
    Blue = "Black",
    Green = "Black",
    Red = "Black",
    Black = "White",
    Pink = "Black",
    Grey = "Black",
    Multi = "Black",
    Gold = "Black"
}
export enum CardActionEnum {
    ExtraTurn = 1,
    Pickup = 2,
    Steal = 3,
    Scroll = 4,
    None = 5
}
export type Action = {
    type: ActionType;
    gameId?: string | undefined;
    payload: any;
}
export enum ActionType {
    GetCoins = "getCoins",
    DropCoins = "dropCoins",
    ShuffleCoins = "shuffleCoins",
    BuyCard = "buyCard",
    TakeGoldCoin = "takeGoldCoin",
    ReserveCard = "reserveCard",
    GetNoble = "getNoble",
    TradeScroll = "tradeScroll",
    StealCoin = "stealCoin",
    PickupCoin = "pickupCoin",
}
export type CoinRequest = {
    i: number;
    j: number;
    colour: ColourEnum;
}
export type BuyCardRequest = {
    cardId: number;
    colour: ColourEnum;
}
export enum ActionStateEnum {
    Normal = "Normal",
    EndTurn = "EndTurn",
    DropCoins = "DropCoins",
    ReserveCard = "ReserveCard",
    StealCoin = "StealCoin",
    Pickup = "Pickup",
    GetNoble = "GetNoble"
}