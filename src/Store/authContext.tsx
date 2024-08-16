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
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
    }
    const logoutHandler = () => {
        setToken("");
        setUser("");
    }
    const refreshLogin = async () => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            // if (token && user) {
            //     loginHandler(token, user);
            // }
        }
        //todo: tutaj sprawdzenie tokena na serwerze, i w ogole troche inaczej
    }
    const contextValue: LoginData = {
        isLoggedIn: userIsLoggedIn,
        token: token,
        user: user,
        login: loginHandler,
        logout: logoutHandler,
        refreshLogin: refreshLogin,
    }
    // const validateToken = async (token: string) => {
    //     const response = await fetch('https://localhost:5001/User/ValidateToken', {
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     });
    //     if (response.ok) {
    //         return true;
    //     }
    //     return false;
    // }
    return (
        <AuthContext.Provider value={contextValue}>
            {props?.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);