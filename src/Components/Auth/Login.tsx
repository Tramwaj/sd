import React, { useContext } from "react";
import { useState, useRef } from "react";

import {AuthContext} from '../../Store/authContext';
import { eventNames } from "process";
import classes from './AuthForm.module.css'

export const Login = () => {
    const loginInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const podajHaslo = "Podaj hasło";

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredLogin = loginInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        setIsLoading(true);

        if (isLogin) {
            var formBody = new FormData();
            formBody.set("UserName", enteredLogin);
            formBody.set("Password", enteredPassword);
            formBody.set("Audience", 'https://localhost:44347/')
            fetch(
                'https://localhost:5001/User/Login',
                {
                    method: 'POST',
                    body: formBody
                })
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            authCtx.login(data.access_token,"User");
                            console.log(data);
                            localStorage.setItem("token",data.access_token);
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                    }
                    else {
                        console.log('fail');
                    };
                });
        }
        setIsLoading(true);
    }
    return (
        <section className={classes.auth}>
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='text'
                id='email'
                required ref={loginInputRef} />
        </div>
        <div className={classes.control}>
            <label htmlFor='password'>Hasło</label>
            <input
                type='password'
                id='password'
                required ref={passwordInputRef}
            />
        </div>
                <div className={classes.actions}>
                    {!isLoading && < button > {isLogin ? 'Zaloguj' : 'Utwórz konto'}</button>}
                    {isLoading && <p>Sending request...</p>}
                    {/* <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Utwórz nowe konto' : 'Zaloguj się na istniejące konto'}
                    </button> */}
                </div>
    </form>
</section>
    )    
}
export default Login;