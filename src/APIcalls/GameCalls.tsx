import { Action } from "../Components/Game/GameTypes";

export const postAction = async (action: Action) => {
    console.log("sending action");
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await fetch('https://localhost:5001/Game/SendAction', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action })
            });
            if (response.ok) {
                console.log("Action sent");
            }
            else{
                const data = await response.json();
                console.log("error: ", data);
            }
        } catch (error) {
            console.error('Error sending action:', error);
        }
    }
    return "";
}