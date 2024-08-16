import React, { ReactNode, useContext, useEffect, useState } from "react";
import { HomeViewModel, Invite } from "../../Pages/HomePage";
import { InvitesList } from "./InvitesList";
import { AuthContext } from "../../Store/authContext";
import { get } from "https";
import { Navigate } from "react-router-dom";


export const HomeView = () => {
    const [viewModel, setViewModel] = useState<HomeViewModel | null>(null);
    const [inviteAccepted, setInviteAccepted] = useState<boolean>(false);
    const [gameId, setGameId] = useState<string>("");
    const authCtx = useContext(AuthContext);
    const bearer = "Bearer " + authCtx.token;
    const str = 'https://localhost:5001/Home';

    useEffect(() => {
        getViewModel(authCtx.token);
    }, []);

    const getViewModel =(token: string) => {
        console.log("getting homeViewModel ");
        fetch(
            str, 
            {
            method: "GET",
            headers: {
                "Authorization": bearer

            }
        })
        .then(response=>response.json())
        .then(data=>setViewModel(data))
        .catch(console.error);
        console.log(viewModel);
        //async(...) await fetch bez .then:
        //const vmJson = await response.json();
        //setViewModel(vmJson);
    }

    const rejectInvite = (id:string) => {
        let url = str + "/rejectInvite";
        fetch(url,{
            method:"POST",
            headers: {
                "Authorization" : bearer
            },
        });
    }
    
    const acceptInvite = (id: string) => {
        let url = str + "/acceptInvite" + "?id=" + id;
        fetch(url,{
            method:"POST",
            headers: {
                "Authorization" : bearer
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then((result)=>{
            setInviteAccepted(true);
            setGameId(result);
        })
        .catch((error)=> {
            console.log("Couldn't create game. ",error);
        });
        //getViewModel(authCtx.token);
    };
    const renderNavigate = (id:string) => {
        if (inviteAccepted){
            console.log("Navigate to game - id:" + {id});
            let path = "/Game/" + id;
            console.log(path);
            return <Navigate to={path} />
        }
    }

    let page: ReactNode;
    let invites: Invite[];
    if (viewModel?.invites) invites = viewModel.invites
    else invites = [];
    let ownInvites: Invite[];
    if (viewModel?.ownInvites) ownInvites = viewModel.ownInvites
    else ownInvites = [];
    return (
        <div>
            {renderNavigate(gameId)}
            {viewModel?.userName}
            <InvitesList invites={invites} 
                        buttonAccept={"Akceptuj"} 
                        onclickAccept={acceptInvite}
                        buttonReject={"Odmów"}
                        onclickReject={rejectInvite}/>
            <InvitesList invites={ownInvites} 
                        buttonAccept={null}
                        onclickAccept={undefined}
                        buttonReject="Anuluj" 
                        onclickReject={rejectInvite} />
        </div>)
}
export default HomeView;