import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Flex, Box, Heading, Image } from '@chakra-ui/react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * The login interface properties.
 * 
 * @property {boolean} isLoggedOn - True if the user is logged in, false otherwise.
 * @property {void} onLogin - Callback function that is called when the user clicks the login button.
 * @property {void} onTokenReceive - Callback function that is called when the user receives a token.
 */
interface LoginProps {
    isLoggedOn: boolean;
    onLogin: (status: boolean) => void;
    onTokenReceive: (token: string) => void;
}

/**
 * React component for the login interface.
 * 
 * @param {Interface} LoginProps - The login interface properties.
 */
const Login = ({ isLoggedOn, onLogin, onTokenReceive }: LoginProps) => {
    const { instance } = useMsal();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the logging in of the user through Azure OAuth.
     */
    const handleOAuth = () => {
        instance.loginPopup(loginRequest)
            .then((response) => {
                if (response) {
                    onLogin(true);
                    if (response.accessToken) {
                        onTokenReceive(response.accessToken);
                    }
                    navigate('/');
                }
            })
            .catch((e) => {
                onLogin(false);
                console.error("Login failed:\n", e);
                alert("Login failed. Please try again.");
            });
    };

    /**
     * Handles the logging in of the user through the form submission.\
     * Not really used in this application, but could be used in the future.
     * 
     * @param {FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username === 'admin' && password === 'password') {
            onLogin(true); // Using admin/password will result in no token being generated. For testing purposes only.
            navigate('/');
        } else {
            alert("You are not permitted to access this page.");
        }
    };

    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop={250} >
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Login</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="username"
                                placeholder="username"
                                onChange={event => setUsername(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="*******"
                                onChange={event => setPassword(event.currentTarget.value)}
                            />
                        </FormControl>
                        <Button type="submit" variant="outline" width="full" mt={4}>
                            Sign In
                        </Button>
                        <Button
                            marginTop={4}
                            onClick={handleOAuth}
                            leftIcon={
                                <Box boxSize="20px" mr="2">
                                    <Image src="https://swimburger.net/media/ppnn3pcl/azure.png" alt="Sign in with Microsoft" />
                                </Box>
                            }
                            colorScheme="gray"
                            variant="outline"
                            width="full">
                            Sign in with Microsoft
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;