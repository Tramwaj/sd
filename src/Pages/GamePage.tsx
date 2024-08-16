import React, { ReactNode, useContext, FC, useEffect } from "react";
import { AuthContext } from "../Store/authContext";
import GameView from "../Components/Game/GameView";
import Login from "../Components/Auth/Login";
import { useParams } from "react-router-dom";
import { validateToken } from "../APIcalls/AuthCalls";


export const GamePage : React.FC = () => {
    const { id } = useParams<string>();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    useEffect(() => {
        const checkLogIn = async () =>{
             const checkResponse = await validateToken();
             if (checkResponse) {
                const token = localStorage.getItem("token")?? "";
                const user = localStorage.getItem("user")?? "";
                 authCtx.login(token, user);
             }
        };
        checkLogIn();
    }, []);
    let page: ReactNode;  
    if (isLoggedIn) {
        page = <GameView guid={id}/>;
    } else {
        page = <Login />;
    }
    return page; 

}