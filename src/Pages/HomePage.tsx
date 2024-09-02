import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Store/authContext";
import { Login } from "../Components/Auth/Login";
import HomeView from "../Components/Home/HomeView";
import { validateToken } from "../APIcalls/AuthCalls";
export type Invite = {
    id: string
    invitee: string
    inviter: string
    playerStarting: string
}
export type Duel = {
    id: string
    player1: string
    player2: string
    startingTime: string,
    endTime: string
}
export type HomeViewModel = {
    userName?: string
    ownInvites?: Invite[]
    invites?: Invite[]
    currentDuels?: Duel[]
    pastDuels?: Duel[]    
}
// const emptyHomeViewModel: HomeViewModel = {
//     userName: "", ownInvites=[], invites=[]
// }

export const HomePage = () => {    
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
    if (!isLoggedIn)
        {

        }    
    if (isLoggedIn) {
        page = <HomeView/>;
    } else {
        page = <Login />;
    }
    return page;

}