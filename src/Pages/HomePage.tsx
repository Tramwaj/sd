import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../Store/authContext";
import { Login } from "../Components/Auth/Login";

const Home = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const bearer = "Bearer " + authCtx.token;
    const user = authCtx.user;
    let page: ReactNode;
    if (!isLoggedIn)
        authCtx.refreshLogin();
    if (isLoggedIn)
        page = <div>{"user "+authCtx.user}</div>;
    else
        page = <Login />;
    return page;

}

export default Home;