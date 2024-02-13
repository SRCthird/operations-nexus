import { ReactNode, useEffect } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import '../styles/OneByThree.css';
import Title from './Title';

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
    backgroundGradiant?: string;
    leftPanel?: ReactNode;
    data1?: ReactNode;
    data2?: ReactNode;
    data3?: ReactNode;
}

/**
 * The page used to display 3 items on the right and 1 larger items on the left of the page.
 * 
 * @param {interface} Props - The properties of the ThreeOnTwo component.  
 * @returns {JSX.Element} - Returns the ThreeOnTwo component.  
 */
const OneByThree = ({ title, backgroundColor, backgroundGradiant, leftPanel, data1, data2, data3 }: Props): JSX.Element => {

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
        <div className="OneByThree">
            <Title title={title} />
            <Grid
                templateRows="repeat(3, 1fr)" // Defines 3 equal rows
                templateColumns="2fr 3fr" // Defines the size of two columns, first column is smaller
                gap={6}
            >   
                <GridItem rowSpan={3} colSpan={1} className="Containers" w="70vw" h="83vh">
                    {leftPanel}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {data1}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {data2}
                </GridItem>
                <GridItem colSpan={1} className="Containers" w="100%" h="26vh">
                    {data3}
                </GridItem>
            </Grid>
        </div>
    )
}

export default OneByThree
