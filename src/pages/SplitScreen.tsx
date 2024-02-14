import { ReactNode, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import '../styles/SplitScreen.css';
import Title from './Title';

/**
 * Properties for the SplitScreen component.
 * 
 * @param {string} title - The title of the ThreeOnTwo component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {string} backgroundGradient - The background gradient of the component if applicable.
 * @param {ReactNode} leftSection - The panel for information displayed on the left of the component.
 * @param {ReactNode} rightSection - The panel for information displayed on the right of the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
}

/**
 * The page used to display 2 items next to eachother.
 * 
 * @param {interface} Props - The properties of the SplitScreen component.  
 * @returns {JSX.Element} - Returns the SplitScreen component.  
 */
const SplitScreen = ({ title, backgroundColor, backgroundGradient, leftSection, rightSection }: Props): JSX.Element => {
    useEffect(() => {
        if (backgroundGradient) {
            document.body.style.background = `linear-gradient(to right, ${backgroundColor}, ${backgroundGradient}`;
        } else {
            document.body.style.background = backgroundColor;
        }
        return () => {
            document.body.style.background = "none";
        };
    }, [backgroundColor, backgroundGradient]);

    return (
        <div className="SplitScreen">
            <Title title={title}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem className="Containers" w="100%" h="84vh">
                    {leftSection}
                </GridItem>
                <GridItem className="Containers" w="100%" h="84vh">
                    {rightSection}
                </GridItem>
            </Grid>
        </div>
    );
}

export default SplitScreen;

