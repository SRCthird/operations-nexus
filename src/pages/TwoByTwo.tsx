import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import '../styles/TwoByTwo.css';
import Title from './Title';
import useBackgroundEffect from '../webhooks/useBackgroundEffect';

/**
 * Properties for the TwoByTwo component.
 * 
 * @param {string} title - The title of the ThreeOnTwo component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {string} backgroundGradient - The background gradient of the component if applicable.
 * @param {ReactNode} topLeft - The panel for information displayed in the top left of the component.
 * @param {ReactNode} topRight - The panel for information displayed in the top right of the component.
 * @param {ReactNode} bottomLeft - The panel for information displayed in the bottom left of the component.
 * @param {ReactNode} bottomRight - The panel for information displayed in the bottom right of the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    topLeft?: ReactNode;
    topRight?: ReactNode;
    bottomLeft?: ReactNode;
    bottomRight?: ReactNode;
}

/**
 * The page used to display 4 items in a 2x2 format.
 * 
 * @param {interface} Props - The properties of the TwoByTwo component.  
 * @returns {JSX.Element} - Returns the TwoByTwo component.  
 */
const TwoByTwo = ({ title, backgroundColor, backgroundGradient, topLeft, topRight, bottomLeft, bottomRight }: Props): JSX.Element => {
    // Use webhook to set background
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="TwoByTwo">
            <Title title={title}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem className="Containers" w="100%" h="41vh">
                    {topLeft}
                </GridItem>
                <GridItem className="Containers" w="100%" h="41vh">
                    {topRight}
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingTop={6}>
                <GridItem className="Containers" w="100%" h="41vh">
                    {bottomLeft}
                </GridItem>
                <GridItem className="Containers" w="100%" h="41vh">
                    {bottomRight}
                </GridItem>
            </Grid>
        </div>
    );
}

export default TwoByTwo;

