import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Title from '@components/Title';
import useBackgroundEffect from '@hooks/useBackgroundEffect';
import '../styles/TwoByTwo.css';

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
    app1?: ReactNode;
    app2?: ReactNode;
    app3?: ReactNode;
    app4?: ReactNode;
}

/**
 * The page used to display 4 items in a 2x2 format.
 * 
 * @param {interface} Props - The properties of the TwoByTwo component.  
 * @returns {JSX.Element} - Returns the TwoByTwo component.  
 */
const TwoByTwo = ({ title, backgroundColor, backgroundGradient, app1, app2, app3, app4 }: Props): JSX.Element => {
    // Use webhook to set background
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="TwoByTwo">
            <Title title={title}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem className="Containers" w="100%" h="41vh">
                    {app1}
                </GridItem>
                <GridItem className="Containers" w="100%" h="41vh">
                    {app2}
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingTop={6}>
                <GridItem className="Containers" w="100%" h="41vh">
                    {app3}
                </GridItem>
                <GridItem className="Containers" w="100%" h="41vh">
                    {app4}
                </GridItem>
            </Grid>
        </div>
    );
}

export default TwoByTwo;

