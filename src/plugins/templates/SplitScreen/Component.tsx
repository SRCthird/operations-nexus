import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Title from '@components/Title';
import useBackgroundEffect from '@hooks/useBackgroundEffect';

import './styles.css';

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
    app1?: ReactNode;
    app2?: ReactNode;
}

/**
 * The page used to display 2 items next to eachother.
 * 
 * @param {interface} Props - The properties of the SplitScreen component.  
 * @returns {JSX.Element} - Returns the SplitScreen component.  
 */
const SplitScreen = ({ title, backgroundColor, backgroundGradient, app1, app2 }: Props): JSX.Element => {
    // Use webhook to set background colors
    useBackgroundEffect(backgroundColor, backgroundGradient);

    return (
        <div className="SplitScreen">
            <Title title={title}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem className="Containers" w="100%" h="84vh">
                    {app1}
                </GridItem>
                <GridItem className="Containers" w="100%" h="84vh">
                    {app2}
                </GridItem>
            </Grid>
        </div>
    );
}

export default SplitScreen;

