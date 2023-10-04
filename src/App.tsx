import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'
import NotFound from './pages/NotFound';
import Login from './pages/Login';

const App = () => {
  return (
    <Pages />
  );
}

const Pages = () => {
  const [token, setToken] = useState<string>("");
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  console.log(`Azure Token: ${token}`);

  if (isLoggedOn) {
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
