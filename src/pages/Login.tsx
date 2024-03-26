import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button, Flex, Box, Heading, Image, Checkbox } from '@chakra-ui/react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@src/authConfig";
import { AccountInfo } from "@azure/msal-browser";

/**
 * The login interface properties.
 * 
 * @property {boolean} isLoggedOn - True if the user is logged in, false otherwise.
 * @property {void} onLogin - Callback function that is called when the user clicks the login button.
 * @property {void} onTokenReceive - Callback function that is called when the user receives a token.
 */
interface LoginProps {
  onLogin: (isLoggedOn: boolean) => void;
  getUser: (user: AccountInfo) => void;
  onTokenReceive: (token: string) => void;
}

/**
 * React component for the login interface.
 * 
 * @param {Interface} LoginProps - The login interface properties.
 */
const Login = ({ getUser, onLogin, onTokenReceive }: LoginProps) => {
  const { instance } = useMsal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, loadingState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';


  /**
   * Handles the logging in of the user through Azure OAuth.
   */
  const handleOAuth = useCallback(() => {
    instance.loginPopup(loginRequest)
      .then((response) => {
        getUser(response.account);
        if (response) {
          onLogin(true);
          if (response.accessToken) {
            onTokenReceive(response.accessToken);
          }
          navigate(from, { replace: true });
        }
      })
      .catch((e) => {
        onLogin(false);
        console.error("Login failed:\n", e);
        alert("Login failed. Please try again.");
      })
  }, [getUser, instance, from, navigate, onLogin, onTokenReceive]);

  useEffect(() => {
    const autoLog = localStorage.getItem('autoLog') === "true";
    if (autoLog && !isLoading) {
      const timer = setTimeout(() => {
        loadingState(true);
        handleOAuth();
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [handleOAuth, isLoading]);

  /**
   * Handles the logging in of the user through the form submission.\
   * Not really used in this application, but was usefull in development.
   * 
   * @param {FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      onLogin(true); // Using admin/password will result in no token being generated. For testing purposes only.
      navigate(from, { replace: true });
    } else {
      alert("You are not permitted to access this page.");
    }
  };

  const cacheAutoLog = (event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('autoLog', event.currentTarget.checked ? "true" : "false");
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
            <Checkbox onChange={cacheAutoLog} >Remember me?</Checkbox>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
