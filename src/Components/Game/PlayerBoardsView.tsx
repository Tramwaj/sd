import React from "react";
import { PlayerBoard } from "./GameTypes";
const PlayerBoardsView: React.FC<{player1board:PlayerBoard,player2Board:PlayerBoard}> = (props) => {
    return (
        <div>
            <h1>PlayerBoards</h1>
        </div>
    );
}
export default PlayerBoardsView;