import Login from "@pages/Login";
import { useState, ReactElement } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import RedirectLogin from "@components/RedirectLogin";

/**
 * Properties of the Authenticate Element.
 *
 * @param {ReactElement} children - the Routes to be passed in if authentication passes
 * @param {(token: string) => void} setToken - returns the token from MSAL.js 
 */
interface Props {
  children: ReactElement;
  setToken: (token: string) => void;
}

/**
 * The Authenticate Element. Authenticates user before routing
 *
 * @param {Props} child - The child element of the Authenticate element.
 */
const Authenticate = ({ children, setToken }: Props): JSX.Element => {
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  if (isLoggedOn) {
    return children
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login
              isLoggedOn={isLoggedOn}
              onLogin={setIsLoggedOn}
              onTokenReceive={setToken}
            />
          } />
          <Route path="/*" element={<RedirectLogin />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Authenticate
