import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Store/authContext';
import { Action, ActionStateEnum, ActionType, CardLevel, CoinBoard, GameState, Noble, PlayerBoard } from './GameTypes';
import CoinBoardView from './CoinBoardView';
import './GameView.css';
import PlayerBoardsView from './PlayerBoardsView';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from '@microsoft/signalr';
import { createPlayerBoardFromResponse, postAction } from '../../APIcalls/GameCalls';
import { fetchGameState as fetchGameState } from '../../APIcalls/GameCalls';
import CardsLevelView from './CardsLevel';
import Nobles from './Nobles';


const GameView: React.FC<{ guid: string | undefined }> = (props) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [isActivePlayer, setIsActivePlayer] = useState<boolean>(false);
    const [cards, setCards] = useState<CardLevel[]>([]);
    const [coinBoard, setCoinBoard] = useState<CoinBoard | null>(null);
    const [player1Board, setPlayer1Board] = useState<PlayerBoard | null>(null);
    const player1BoardRef = useRef<PlayerBoard | null>(null);
    const player2BoardRef = useRef<PlayerBoard | null>(null);
    const cardsRef = useRef<CardLevel[]>([]);
    const messagesRef = useRef<React.ReactNode[]>([]);
    const [player2Board, setPlayer2Board] = useState<PlayerBoard | null>(null);
    const [nobles, setNobles] = useState<Noble[]>([]);
    const [player1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [actionState, setActionState] = useState<ActionStateEnum>(ActionStateEnum.Normal);
    const [messages, setMessages] = useState<React.ReactNode[]>([]);
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
        connection.on("ReceiveActionStatus", (status, message) => {
            console.log("ActionStatus received: " + status);
            updateMessages(message, status);
            if (message === "") console.log("failed action - no change in status");
            //todo: display message (temp + persistent)
            if (status) changeActionState(status);
        });
        connection.on("ReceivePersonalActionSTatus", (status, message) => {
            console.log("PersonalActionStatus received: " + status);
            updateMessages(message, status);
            if (message === "") console.log("failed action - no change in status");
            changeActionState(status);
        });
        connection.on("ReceivePlayerBoard", (playerBoard) => {
            console.log("PlayerBoard received: ", playerBoard);
            const board = createPlayerBoardFromResponse(playerBoard);
            console.log("zrobiony board: ", board);
            console.log("player1board: " + player1BoardRef.current);
            console.log("player1board: " + player2BoardRef.current);
            if (playerBoard.player.name === player1BoardRef.current?.player.name) {
                setPlayer1Board(board);
                console.log("Player1Board changed");
            }
            if (player2BoardRef.current?.player.name === playerBoard.player.name) {
                setPlayer2Board(board);
                console.log("Player2Board changed");
            }
        });
        connection.on("ReceiveCardLevel", (cardLevel, level) => {
            console.log("CardLevel received: " + level, cardLevel);
            const newCards = [cardsRef.current[0], cardsRef.current[1], cardsRef.current[2]];
            newCards[level] = cardLevel;
            setCards(newCards);
        });
        connection.on("receiveNobles", (nobles) => {
            console.log("Nobles received: " + nobles);
            setNobles(nobles);
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

    const updateMessages = (message: string, status: string) => {
        const newMessages: React.ReactNode[] = [...messagesRef.current];
        const newMessage: React.ReactNode[] = [<div key={newMessages.length}>{status + ":" + message + "(prv)"}</div>];
        setMessages(newMessage.concat(newMessages));
    }

    const changeActionState = (status: ActionStateEnum) => {
        if (status === ActionStateEnum.EndTurn) {
            setPlayer1Turn(!player1Turn);
            setIsActivePlayer(!isActivePlayer);
            setActionState(ActionStateEnum.Normal);
        }
        else {
            setActionState(status);
        }
    }


    const sendAction = async (action: Action) => {
        action.gameId = gameState?.gameId;
        if (action.type === ActionType.BuyCard && actionState === ActionStateEnum.ReserveCard) {
            action.type = ActionType.ReserveCard;
        }
        try {
            const response = await postAction(action);
        } catch (error) {
            console.error('Error sending action:', error);
        }
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
            setNobles(data.board.nobles);
            setPlayer1Turn(data.player1Turn);
            setActionState(data.actionState);
            setIsActivePlayer(authCtx.user === (data.player1Turn ? data.board.player1Board.player.name : data.board.player2Board.player.name));

            let messages: string[] = [];
            messages = data.actions.reverse();
            let messagesDisplay: React.ReactNode[] = [];
            messages.forEach((message) => {
                messagesDisplay.push(<div key={messagesDisplay.length}>{message}</div>);
            });
            setMessages(messagesDisplay);

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

        player1BoardRef.current = player1Board;
        player2BoardRef.current = player2Board;
        cardsRef.current = cards;
        messagesRef.current = messages;
    }, [str, bearer, props.guid, gameState, player1Turn, actionState, player1Board, player2Board, dataFetched, connection, coinBoard, messages]);

    if (!gameState) {
        return <div>Loading...</div>;
    }

    let page: React.ReactNode;
    page = (
        <div id="grid">
            <div id="playerBoards">
                {(player1Board) && (player2Board) &&
                    <PlayerBoardsView player1board={player1Board}
                        player2Board={player2Board}
                        player1Turn={player1Turn}
                        actionState={actionState}
                        sendAction={sendAction}
                        isActivePlayer={isActivePlayer} />
                }
            </div>
            <div id="cards">
                <Nobles nobles={nobles} sendAction={sendAction} actionState={actionState} />
                {cards?.[2] && <CardsLevelView levelProps={cards[2]} actionState={actionState} sendAction={sendAction} />}
                {cards?.[1] && <CardsLevelView levelProps={cards[1]} actionState={actionState} sendAction={sendAction} />}
                {cards?.[0] && <CardsLevelView levelProps={cards[0]} actionState={actionState} sendAction={sendAction} />}
            </div>
            <div id="coinBoardRow">
                <div id="coinBoard">
                    {(coinBoard) && <CoinBoardView sendAction={sendAction} coinBoardProps={coinBoard} actionState={actionState} />}
                </div>
                <div id="chat">
                    {messages}
                </div>
            </div>
        </div>
    );
    return page;
};

export default GameView;