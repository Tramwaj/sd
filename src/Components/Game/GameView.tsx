import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Store/authContext';
import { Cards, GameState } from './GameTypes';
import CardBoard from './CardBoard';

const GameView: React.FC<{ guid: string | undefined }> = (props) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const authCtx = useContext(AuthContext);
    const bearer = "Bearer " + authCtx.token;
    const str = `https://localhost:5001/Game/GetGameState?id=${props.guid}`;
    const cards: Cards = {
        level1: gameState?.board.level1,
        level2: gameState?.board.level2,
        level3: gameState?.board.level3,
    } 

    useEffect(() => {
        if (!props.guid) {
            return;
        }
        const fetchData = async () => {
            console.log('fetching game state');
            try {
                const response = await fetch(
                    str,{
                        method: "GET",
                        headers: {
                            "Authorization": bearer
                        }
                    });
                const data = await response.json();
                setGameState(data);
            } catch (error) {
                console.error('Error fetching game state:', error);
            }
        };

        fetchData();
    }, []);

    if (!gameState) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Game State:</h1>
            <CardBoard cards={cards}/>
            <p>{JSON.stringify(gameState)}</p>
        </div>
    );
};

export default GameView;