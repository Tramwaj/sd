import { create } from "domain";
import { Action, ColourEnum, GameState, PlayerBoard } from "../Components/Game/GameTypes";

export const postAction = async (action: Action) => {
    console.log("sending action");
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await fetch('https://localhost:5001/Game/SendAction', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action })
            });
            if (response.ok) {
                console.log("Action sent");
            }
            else{
                const data = await response.json();
                console.log("error: ", data);
            }
        } catch (error) {
            console.log("Error sending action: ", error);

            console.error('Error sending action:', error);
        }
    }
    return "";
}
export const fetchGameState = async (url: string, bearer: string): Promise<GameState> => {
    console.log('fetching game state');
    try {
        const response = await fetch(
            url, {
            method: "GET",
            headers: {
                "Authorization": bearer
            }
        });
        if (response.ok) {
            const data = await response.json();
            const gs = data as GameState;

            const player1BoardJson = data.board.player1Board;
            const player2BoardJson = data.board.player2Board;
            const player1Board: PlayerBoard = createPlayerBoardFromResponse(player1BoardJson);
            const player2Board: PlayerBoard = createPlayerBoardFromResponse(player2BoardJson);
                
            gs.board.player1Board = player1Board;
            gs.board.player2Board = player2Board;
            return gs;
        }
    } catch (error) {
        console.error('Error fetching game state:', error);
    }
    throw new Error("Error fetching game state");
}
export const createPlayerBoardFromResponse = (playerBoardJson: any): PlayerBoard => {
    return {
        hiddenCards: playerBoardJson.hiddenCards,
        scrollsCount: playerBoardJson.scrollsCount,
        pointsByColour: new Map(Object.entries(playerBoardJson.pointsByColour).map(([key, value]) => [ColourEnum[key as keyof typeof ColourEnum], value as number])),
        totalPoints: playerBoardJson.totalPoints,
        crowns: playerBoardJson.crowns,
        ownedCards: playerBoardJson.ownedCards,
        miningValues: new Map(Object.entries(playerBoardJson.miningValues).map(([key, value]) => [ColourEnum[key as keyof typeof ColourEnum], value as number])),
        coins: new Map(Object.entries(playerBoardJson.coins).map(([key, value]) => [ColourEnum[key as keyof typeof ColourEnum], value as number])),
        hiddenCardsCount: playerBoardJson.hiddenCardsCount,
    };
}