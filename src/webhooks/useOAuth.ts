import axios from "axios";

interface Authenticate {
    getToken: (token: string) => void;
}

const useOAuth = ({ getToken }: Authenticate) => {
    const authenticate = async (username: string, password: string) => {
        try {
        const response = await axios.post(
            "/api/AzureADUserService",
            {
            username,
            password
            }
        );
        getToken(response.data.access_token);
        } catch (error) {
        console.error("Error:", error);
        }
    };

    return { authenticate };
};

export default useOAuth;
