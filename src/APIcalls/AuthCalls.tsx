export const validateToken = async () => {
    console.log("validating token");
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const response = await fetch('https://localhost:5001/User/ValidateToken', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            return true;
        }
        return null;
        // if (token && user) {
        //     loginHandler(token, user);
        // }
    }
}