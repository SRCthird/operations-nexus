import { ReactNode, useEffect } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import '../styles/ThreeOnTwo.css';

/**
 * Properties for the ThreeOnTwo component.
 * 
 * @param {string} title - The title of the ThreeOnTwo component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {string} backgroundGradiant - The background gradient of the component if applicable.
 * @param {ReactNode} data1 - The data for the first block.
 * @param {ReactNode} data2 - The data for the second block.
 * @param {ReactNode} data3 - The data for the third block.
 * @param {ReactNode} data4 - The data for the fourth block.
 * @param {ReactNode} information - The information displayed in the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradiant?: string;
    data1?: ReactNode;
    data2?: ReactNode;
    data3?: ReactNode;
    data4?: ReactNode;
    information?: ReactNode;
}

/**
 * The page used to display 3 items on top and 2 larger items on the bottom of the page.
 * 
 * @param {interface} Props - The properties of the ThreeOnTwo component.  
 * @returns {JSX.Element} - Returns the ThreeOnTwo component.  
 */
const ThreeOnTwo = ({ title, backgroundColor, backgroundGradiant, data1, data2, data3, data4, information }: Props): JSX.Element => {

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
        <div className="ThreeOnTwo">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem className="Empty" w="100%" h="100px" />
                <GridItem className="Title" w="100%" h="100px">
                    <Text className='text-center my-3 title' fontSize={44}>{title}</Text>
                </GridItem>
                <GridItem className="Empty" w="100%" h="100px" />
                <GridItem className="Containers" w="100%" h="343px">
                    {data1}
                </GridItem>
                <GridItem className="Containers" w="100%" h="343px">
                    {data2}
                </GridItem>
                <GridItem className="Containers" w="100%" h="343px">
                    {data3}
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingTop={8}>
                <GridItem className="Containers" w="100%" h="530px">
                    {information}
                </GridItem>
                <GridItem className="Containers" w="100%" h="530px">
                    {data4}
                </GridItem>
            </Grid>
        </div>
    )
}

export default ThreeOnTwo