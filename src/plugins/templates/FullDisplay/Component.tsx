import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import useBackgroundEffect from "@hooks/useBackgroundEffect";
import Title from "@components/Title";
import './styles.css';

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
    app: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullDisplay = ({ title, app, backgroundColor, backgroundGradient }: Props): JSX.Element => {
    // Use webhook to set background colors
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="full-display">
            <Title title={title} />
            <Box gap={6} margin={6} className="Containers">
                {app}
            </Box>
        </div>
    );
}

export default FullDisplay;
