import React, { useReducer } from "react"
interface LoginState {
    loggedIn: boolean;
    token: string;
    name: string;
}
type LoginAction = {
    type: string,
    payload: {
        token: string,
        name: string,
    }
}
const initialState: LoginState = {
    loggedIn: false,
    token: "",
    name: "",
}
const loginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
    if (action.type == "LOGIN") {
        return {
            loggedIn: true,
            token: action.payload.token,
            name: action.payload.name
        }
    }
    else {
        return {
            loggedIn: false,
            token: "",
            name: "anonymous",
        }
    }
}
    
