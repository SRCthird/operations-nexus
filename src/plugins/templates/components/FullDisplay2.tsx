import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import useBackgroundEffect from "@hooks/useBackgroundEffect";
import Title from "@components/Title";
import '../styles/FullDisplay2.css';

/**
 * Properties for the FullDisplay component.
 * 
 * @param {string} title - The title of the FullDisplay component.
 * @param {string} backgroundColor - The color of the background.
 * @param {string} backgroundGradient - The gradient of the background if applicable.
 * @param {ReactNode} child - The child-node displayed in the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    transition: number;
    app1: ReactNode;
    app2: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullDisplay2 = ({ title, app1, app2, backgroundColor, backgroundGradient, transition }: Props): JSX.Element => {
    const [whichApp, setWhichApp] = useState< 1 | 2 >(1);

    // Use webhook to set background colors
    useBackgroundEffect(backgroundColor, backgroundGradient);

    // Use Effect to change the app displayed every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setWhichApp((prev) => prev === 1 ? 2 : 1);
        }, transition * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="full-display2">
            <Title title={title} />
            <Box 
              id="1"
              display={whichApp === 1 ? "block" : "none"}
              gap={6} 
              margin={6} 
              className="Containers"
            >
                {app1}
            </Box>
            <Box 
              id="2"
              display={whichApp === 2 ? "block" : "none"}
              gap={6} 
              margin={6} 
              className="Containers"
            >
                {app2}
            </Box>
        </Box>
    );
}

export default FullDisplay2;
