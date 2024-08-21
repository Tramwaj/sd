export const validateToken = async () => {
    console.log("validating token");
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://localhost:5001/User/ValidateToken', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                return true;
            }
        } catch (error) {
            console.error('Error validating token:', error);
        }
        return null;
        // if (token && user) {
        //     loginHandler(token, user);
        // }
    }
}