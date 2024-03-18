import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import Authenticate from './components/Authenticate';
import Pages from "./Pages"

/**
 * Renders the application.
 * 
 * @returns {JSX.Element} - Returns the App component.
 */
const App = (): JSX.Element => {
  const [token, setToken] = useState("");

  return (
    <Authenticate setToken={setToken}>
      <Pages token={token}/>
    </Authenticate>
  );
}

export default App
