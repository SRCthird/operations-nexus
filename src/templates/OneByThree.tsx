import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import '@styles/OneByThree.css';
import Title from '@components/Title';
import useBackgroundEffect from '@hooks/useBackgroundEffect';

/**
 * Properties for the OneByThree component.
 * 
 * @param {string} title - The title of the ThreeOnTwo component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {string} backgroundGradient - The background gradient of the component if applicable.
 * @param {ReactNode} leftPanel - The panel for information displayed in the component.
 * @param {ReactNode} data1 - The data for the first block.
 * @param {ReactNode} data2 - The data for the second block.
 * @param {ReactNode} data3 - The data for the third block.
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
 * The page used to display 3 items on the right and 1 larger items on the left of the page.
 * 
 * @param {interface} Props - The properties of the ThreeOnTwo component.  
 * @returns {JSX.Element} - Returns the ThreeOnTwo component.  
 */
const OneByThree = ({ title, backgroundColor, backgroundGradient, app1, app2, app3, app4 }: Props): JSX.Element => {
    // Use webhook to set background
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="OneByThree">
            <Title title={title} />
            <Grid
                templateRows="repeat(3, 1fr)" // Defines 3 equal rows
                templateColumns="2fr 3fr" // Defines the size of two columns, first column is smaller
                gap={6}
            >   
                <GridItem rowSpan={3} colSpan={1} className="Containers" w="70vw" h="83vh">
                    {app1}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {app2}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {app3}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {app4}
                </GridItem>
            </Grid>
        </div>
    )
}

export default OneByThree
