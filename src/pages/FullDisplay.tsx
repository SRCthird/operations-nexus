import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import '../styles/FullDisplay.css';
import useBackgroundEffect from "../webhooks/useBackgroundEffect";
import Title from "./Title";

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
    child: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullDisplay = ({ title, child, backgroundColor, backgroundGradient }: Props): JSX.Element => {
    // Use webhook to set background colors
    useBackgroundEffect(backgroundColor, backgroundGradient);

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
