import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import { reportId, groupId, pageName } from './Config';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';
import ThreeOnTwo from './components/ThreeOnTwo';
import PowerBI from './components/PowerBI';
import Slideshow from './components/Slideshow';
import FullDisplay from './components/FullDisplay';

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
  const [key, setKey] = useState<number>(0);
  //const [token, setToken] = useState<string>("");
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
        setKey((prevKey: number) => prevKey + 1);  // changing key will re-mount the component
    }, 60 * 60 * 1000); // 60 minutes
  
    return () => clearInterval(timer); // cleanup the interval on component unmount
  }, []);
  
  if (isLoggedOn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SSC" element={
            <ThreeOnTwo
              title="SSC MOS Board"
              backgroundColor="#231942"
              backgroundGradiant="#e0b1cb"
              information={<Slideshow location='SSC' main={true} />}
              data1={
                <PowerBI
                  key={key}
                  type={'report'}
                  reportId={reportId[0]}
                  groupId={groupId[0]}
                  pageName={pageName[0]}
                />
              }
              data2={
                <PowerBI
                  key={key}
                  type={'report'}
                  reportId={reportId[0]}
                  groupId={groupId[0]}
                  pageName={pageName[1]}
                />
              }
              data3={
                <PowerBI
                  key={key}
                  type={'report'}
                  reportId={reportId[0]}
                  groupId={groupId[0]}
                  pageName={pageName[2]}
                />
              }
              data4={
                <PowerBI
                  key={key}
                  type={'report'}
                  reportId={reportId[0]}
                  groupId={groupId[0]}
                  pageName={pageName[3]}
                />
              }
            />
          } />
          <Route path="/Encapsulation-1" element={
            <FullDisplay
              title="Test"
              backgroundColor="#231942"
              backgroundGradiant="#e0b1cb"
              child={<Slideshow main={true}/>}
            />
          } />
          <Route path="/login" element={
            <Login
              isLoggedOn={isLoggedOn}
              onLogin={(status) => setIsLoggedOn(status)}
              onTokenReceive={(receivedToken) => receivedToken ?? console.log("Token recieved")}
              //onTokenReceive={(receivedToken) => setToken(receivedToken)} 
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
              onTokenReceive={(receivedToken) => receivedToken ?? console.log("Token recieved")}
              //onTokenReceive={(receivedToken) => setToken(receivedToken)} 
            />
          } />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App
