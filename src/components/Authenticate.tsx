import Login from "@src/pages/Login";
import { cloneElement, ReactElement, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import RedirectLogin from "./RedirectLogin";

/**
 * Properties of the Authenticate Element.
 *
 * @param {ReactElement} child - the Routes to be passed in if authentication passes
 */
interface Props {
  child: ReactElement;
}

/**
 * The Authenticate Element. Authenticates user before routing
 *
 * @param {Props} child - The child element of the Authenticate element.
 */
const Authenticate = ({ child }: Props) => {
  const [token, setToken] = useState("");
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  return (
    <>
      {isLoggedOn && cloneElement(child, { token })}
      {isLoggedOn ??
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <Login
                isLoggedOn={isLoggedOn}
                onLogin={(status) => setIsLoggedOn(status)}
                onTokenReceive={(receivedToken) => setToken(receivedToken)}
              />
            } />
            <Route path="/*" element={<RedirectLogin />} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

export default Authenticate
