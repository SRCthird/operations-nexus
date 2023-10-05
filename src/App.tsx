import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';

/**
 * Renders the application.
 * 
 * @returns {JSX.Element} - Returns the App component.
 */
const App = (): JSX.Element => {
  return (
    <Pages />
  );
}

/**
 * Pages routes the application into multiple pages and handles logging and tokens.
 * 
 * @returns {JSX.Element} - Returns the page specified by the path.
 */
const Pages = (): JSX.Element => {
  const [token, setToken] = useState<string>("");
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  console.log(`Azure Token: ${token}`);

  if (isLoggedOn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <Login
              isLoggedOn={isLoggedOn}
              onLogin={(status) => setIsLoggedOn(status)}
              onTokenReceive={(receivedToken) => setToken(receivedToken)}
            />
          } />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={
            <Login
              isLoggedOn={isLoggedOn}
              onLogin={(status) => setIsLoggedOn(status)}
              onTokenReceive={(receivedToken) => setToken(receivedToken)}
            />
          } />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App
