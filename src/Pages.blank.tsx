
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RedirectLogin from './components/RedirectLogin';

/**
 * Pages routes the application into multiple pages and handles logging and tokens.
 * 
 * @returns {JSX.Element} - Returns the page specified by the path.
 */
const Pages = (): JSX.Element => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [key, setKey] = useState<number>(0);
    const [token, setToken] = useState<string>("");
    const [isLoggedOn, setIsLoggedOn] = useState(false);
    
    if (key && token) console.log(); //Remove the unused warning from my screen 

    // Update the time every second
    useEffect(() => {
        const timerID = setInterval(() => setCurrentTime(new Date()), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);


    // Use effect to re-mount the component forcing a new token and report.
    useEffect(() => {
        const timer = setInterval(() => {
            setKey((prevKey: number) => prevKey + 1);  // changing key will re-mount the component
            console.log(`Re-mounting component at ${currentTime.toLocaleTimeString()}`);
        }, 60 * 60 * 1000); // 60 minutes

        return () => {
            clearInterval(timer) // cleanup the interval on component unmount
        };
    }, [currentTime]);

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
                    <Route path="/*" element={<RedirectLogin />} />
                </Routes>
            </Router>
        );
    }
}

export default Pages
