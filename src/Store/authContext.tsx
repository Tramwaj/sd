import React, { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export type LoginData = {
    isLoggedIn: boolean,
    token: string,
    user: string,
    login: (token: string, user: string) => void;
    logout: () => void;
    refreshLogin: () => void;
}
export const AuthContext = React.createContext<LoginData>({
    isLoggedIn: false,
    token: "",
    user: "",
    login: (token, user) => { },
    logout: () => { },
    refreshLogin: () => { },
});

export const AuthContextProvider = (props: any) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    const userIsLoggedIn = !!token;

    const loginHandler = (token: string, user: string) => {
        setToken(token);
        setUser(user);        
        localStorage.setItem("token",token);
        localStorage.setItem("user",user);
    }
    const logoutHandler = () => {
        setToken("");
        setUser("");
    }
    const refreshLogin = () => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token")!);
            setUser(localStorage.getItem("user")!);
        }
        //todo: tutaj sprawdzenie tokena na serwerze
    }
    const contextValue: LoginData = {
        isLoggedIn: userIsLoggedIn,
        token: token,
        user: user,
        login: loginHandler,
        logout: logoutHandler,
        refreshLogin: refreshLogin,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props?.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);