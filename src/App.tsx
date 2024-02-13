import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import { reportId, groupId, pageName } from './Config';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';
import ThreeOnTwo from './pages/ThreeOnTwo';
import PowerBI from './components/PowerBI';
import Slideshow from './components/Slideshow';
import FullDisplay from './pages/FullDisplay';
import OneByThree from './pages/OneByThree';
import RedirectLogin from './components/RedirectLogin';

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
    const [currentTime, setCurrentTime] = useState(new Date());
    const [key, setKey] = useState<number>(0);
    const [token, setToken] = useState<string>("");
    const [isLoggedOn, setIsLoggedOn] = useState(false);

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
                                    reportId={reportId[1]}
                                    groupId={groupId[0]}
                                    pageName={pageName[4]}
                                />
                            }
                            data2={
                                <PowerBI
                                    key={key}
                                    type={'report'}
                                    reportId={reportId[1]}
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
                            child={<Slideshow main={true} />}
                        />
                    } />
                    <Route path="/Encapsulation-2" element={
                        <OneByThree
                            title="Test2"
                            backgroundColor="#231942"
                            backgroundGradiant="#e0b1cb"
                        />
                    } />
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

export default App
