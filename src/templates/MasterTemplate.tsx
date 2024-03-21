import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import '@styles/FullDisplay.css';
import useBackgroundEffect from "@hooks/useBackgroundEffect";
import Title from "@components/Title";

/**
 * Properties for the Master component.
 * 
 * @param {string} title - The title of the FullDisplay component.
 * @param {string} backgroundColor - The color of the background.
 * @param {string} backgroundGradient - The gradient of the background if applicable.
 * @param {ReactNode} apps - The app-node displayed in the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    app1: ReactNode;
    //if your new template uses multiple apps define the amount here:
    //app2: ReactNode;
    //app3: ReactNode;
}

/**
 * The display used as a template for the other templates.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullDisplay = ({ title, app1, /*app2, app3*/ backgroundColor, backgroundGradient }: Props): JSX.Element => {
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="full-display">
            <Title title={title} />
            <Box gap={6} margin={6} className="Containers">
                {app1}
            </Box>
        </div>
    );
}

export default FullDisplay;
