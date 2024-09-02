import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Store/authContext';
import { Action, CardLevel, CoinBoard, GameState, PlayerBoard } from './GameTypes';
import CardBoard from './CardBoard';
import CoinBoardView from './CoinBoardView';
import './GameView.css';
import PlayerBoardsView from './PlayerBoardsView';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from '@microsoft/signalr';
import { createPlayerBoardFromResponse, postAction } from '../../APIcalls/GameCalls';
import { fetchGameState as fetchGameState } from '../../APIcalls/GameCalls';


const GameView: React.FC<{ guid: string | undefined }> = (props) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [cards, setCards] = useState<CardLevel[]>([]);
    const [coinBoard, setCoinBoard] = useState<CoinBoard | null>(null);
    const [player1Board, setPlayer1Board] = useState<PlayerBoard | null>(null);
    const [player2Board, setPlayer2Board] = useState<PlayerBoard | null>(null);
    const [player1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const authCtx = useContext(AuthContext);
    const bearer = "Bearer " + authCtx.token;
    const str = `https://localhost:5001/Game/GetGameState?id=${props.guid}`;

    const setUpSignalRConection = () => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/gameHub", {
                accessTokenFactory: () => authCtx.token,
                withCredentials: true
            } as IHttpConnectionOptions)
            .build();

        connection.on("ReceiveMessage", (message) => {
            console.log("Message received: " + message);
        });
        connection.on("Message", (message) => {
            console.log("Message: " + message);
        });
        connection.on("ReceiveCoinBoard", (coinBoard) => {
            console.log("CoinBoard received: " + coinBoard);
            setCoinBoard(coinBoard);
        });
        connection.on("ReceiveActionStatus", (status, app) => {
            console.log("ActionStatus received: " + status + app);
        });
        connection.on("ReceivePlayerBoard", (playerBoard, playerName) => {
            console.log("PlayerBoard received: " + playerBoard);
            const board = createPlayerBoardFromResponse(playerBoard);
            if (gameState?.player1.name === playerName) {
                //setPlayer1Board(null);
                setPlayer1Board(board);
            } else {
                //setPlayer1Board(null);
                setPlayer2Board(board);
            }
        });

        connection.start().then(() => {
            console.log("Connection started");
            if (props.guid && connection.state === HubConnectionState.Connected) {
                connection.invoke("SubscribeToGame", props.guid).catch((err) => {
                    console.log("Error while subscribing to game: " + err)
                });
            }
        }).catch((err) => {
            console.log("Error while starting connection: " + err)
        });
        setConnection(connection);
    }

    const sendAction = async (action: Action) => {
        action.gameId = props.guid;
        const response = await postAction(action);

    }

    const fetchData = async () => {
        console.log('fetching game state');
        setDataFetched(true);
        try {
            const data = await fetchGameState(str, bearer);
            setGameState(data);
            const arrLvl = [data.board.level1, data.board.level2, data.board.level3];
            setCards(arrLvl);
            setCoinBoard(data.board.coinBoard);
            setPlayer1Board(data.board.player1Board);
            setPlayer2Board(data.board.player2Board);
            setPlayer1Turn(data.player1Turn);
            // console.log("cards in gameview:",cards);
            // console.log("gamestate in gameview:",gameState);
            // console.log("level1 in gameview:",gameState?.board.level1);
        } catch (error) {
            console.error('Error fetching game state:', error);
        }
    };
    useEffect(() => {
        if (!props.guid) {
            return;
        }
        if (!connection || (connection.state !== HubConnectionState.Connected && connection.state !== HubConnectionState.Connecting)) {
            setUpSignalRConection();            
        }
        if (!dataFetched) {
            fetchData();
        }
    }, [str, bearer, props.guid, gameState, player1Turn]);

    if (!gameState) {
        return <div>Loading...</div>;
    }

    let page: React.ReactNode;
    page = (
        <div id="grid">
            <div id="playerBoards">
                {(player1Board) && (player2Board) &&
                    <PlayerBoardsView player1board={player1Board} player2Board={player2Board} player1Turn={player1Turn} />
                }
            </div>
            <div id="cards">
                {(cards) && <CardBoard cardsProps={cards} />}
            </div>
            <div id="coinBoard">
                {(coinBoard) && <CoinBoardView sendAction={sendAction} coinBoardProps={coinBoard} />}
            </div>
        </div>
    );
    return page;
};

export default GameView;