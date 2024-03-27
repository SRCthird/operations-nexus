import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Title from '@components/Title';
import useBackgroundEffect from '@hooks/useBackgroundEffect';

import './styles.css';

/**
 * Properties for the ThreeOnTwo component.
 * 
 * @param {string} title - The title of the ThreeOnTwo component.
 * @param {string} backgroundColor - The background color of the component.
 * @param {string} backgroundGradient - The background gradient of the component if applicable.
 * @param {ReactNode} data1 - The data for the first block.
 * @param {ReactNode} data2 - The data for the second block.
 * @param {ReactNode} data3 - The data for the third block.
 * @param {ReactNode} data4 - The data for the fourth block.
 * @param {ReactNode} information - The information displayed in the component.
 */
interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    app1?: ReactNode;
    app2?: ReactNode;
    app3?: ReactNode;
    app4?: ReactNode;
    app5?: ReactNode;
}

/**
 * The page used to display 3 items on top and 2 larger items on the bottom of the page.
 * 
 * @param {interface} Props - The properties of the ThreeOnTwo component.  
 * @returns {JSX.Element} - Returns the ThreeOnTwo component.  
 */
const ThreeOnTwo = ({ title, backgroundColor, backgroundGradient, app1, app2, app3, app4, app5 }: Props): JSX.Element => {
    // Use webhook to set background colors
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="ThreeOnTwo">
            <Title title={title}/>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem className="Containers" w="100%" h="30vh">
                    {app1}
                </GridItem>
                <GridItem className="Containers" w="100%" h="30vh">
                    {app2}
                </GridItem>
                <GridItem className="Containers" w="100%" h="30vh">
                    {app3}
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingTop={6}>
                <GridItem className="Containers" w="100%" h="52vh">
                    {app4}
                </GridItem>
                <GridItem className="Containers" w="100%" h="52vh">
                    {app5}
                </GridItem>
            </Grid>
        </div>
    )
}

export default ThreeOnTwo
