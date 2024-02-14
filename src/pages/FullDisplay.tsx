import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import '../styles/FullDisplay.css';
import Title from "./Title";

/**
 * Properties for the FullDisplay component.
 * 
 * @param {string} title - The title of the FullDisplay component.
 * @param {string} backgroundColor - The color of the background.
 * @param {string} backgroundGradiant - The gradient of the background if applicable.
 * @param {ReactNode} child - The child-node displayed in the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradiant?: string;
    child: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullDisplay = ({ title, child, backgroundColor, backgroundGradiant }: Props): JSX.Element => {
    // If gradiant is not provided, default to solid background.
    useEffect(() => {
        if (backgroundGradiant) {
            document.body.style.background = `linear-gradient(to right, ${backgroundColor}, ${backgroundGradiant}`;
        } else {
            document.body.style.background = backgroundColor;
        }
        return () => {
            document.body.style.background = "none";
        };
    }, [backgroundColor, backgroundGradiant]);

    return (
        <div className="full-display">
            <Title title={title} />
            <Box gap={6} margin={6} className="Containers">
                {child}
            </Box>
        </div>
    );
}

export default FullDisplay;
