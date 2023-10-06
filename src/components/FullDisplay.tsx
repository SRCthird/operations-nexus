import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import '../styles/FullDisplay.css';

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
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem className="Empty" w="100%" h="100px" />
                <GridItem className="Title" w="100%" h="100px">
                    <Text className='text-center my-3 title' fontSize={44}>{title}</Text>
                </GridItem>
                <GridItem className="Empty" w="100%" h="100px" />
            </Grid>
            <Box gap={6} marginTop={6} marginLeft="6%" marginRight="6%" className="Containers">
                {child}
            </Box>
        </div>
    );
}

export default FullDisplay;