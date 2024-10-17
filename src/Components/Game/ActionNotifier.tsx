import React from "react";

import { ActionStateEnum, PlayerBoard } from "./GameTypes";

const ActionNotifier: React.FC<{ actionState: ActionStateEnum, playerName: string |undefined }> = (props) => {
    const [actionState, setActionState] = React.useState<ActionStateEnum>(ActionStateEnum.Normal);
    const [playerName, setPlayerName] = React.useState<string>("");
    React.useEffect(() => {
        setActionState(props.actionState);
        setPlayerName(props.playerName??"");
        console.log("ActionNotifier: ", props.actionState, props.playerName);
    }, [props.actionState, props.playerName]);
    return (
        <div className="actionNotifier">
            {actionState === ActionStateEnum.Normal ? (
                <div>{playerName}'s turn</div>
            ) : actionState === ActionStateEnum.DropCoins ? (
                <div>{playerName}: drop coins</div>
            ) : actionState === ActionStateEnum.GetNoble ? (
                <div>{playerName}: choose a noble</div>
            ) : actionState=== ActionStateEnum.Pickup ? (
                <div>{playerName}: pick up the coin</div>
            ) : actionState === ActionStateEnum.ReserveCard ? (
                <div>{playerName}: choose a card to reserve</div>
            ) : actionState === ActionStateEnum.StealCoin ? (
                <div>{playerName}: choose coin to steal</div>
            ) : (
                <div>{playerName}'s turn</div>
            )}
        </div>
    );

    
}

export default ActionNotifier;