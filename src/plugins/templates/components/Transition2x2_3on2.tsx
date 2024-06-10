import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import useBackgroundEffect from "@hooks/useBackgroundEffect";
import Title from "@components/Title";
import '../styles/Transition2x2_3on2.css';

/**
 * Properties for the Transition4x4-2x3 component.
 * 
 * @param {string} title - The title of the Transition2x2_3on2 component.
 * @param {string} backgroundColor - The color of the background.
 * @param {string} backgroundGradient - The gradient of the background if applicable.
 * @param {ReactNode} child - The child-node displayed in the component.
 */
interface Props {
  title: string;
  backgroundColor: string;
  backgroundGradient?: string;
  transition: number;
  app1?: ReactNode;
  app2?: ReactNode;
  app3?: ReactNode;
  app4?: ReactNode;
  app5?: ReactNode;
  app6?: ReactNode;
  app7?: ReactNode;
  app8?: ReactNode;
  app9?: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the Transition4x4-2x3 component. 
 * @returns {JSX.Element} - Returns the Transition4x4-2x3 component.  
 */
const Transition2x2_3on2 = ({ title, app1, app2, app3, app4, app5, app6, app7, app8, app9, backgroundColor, backgroundGradient, transition }: Props): JSX.Element => {
  const [whichApp, setWhichApp] = useState<1 | 2>(1);

  // Use webhook to set background colors
  useBackgroundEffect(backgroundColor, backgroundGradient);

  // Use Effect to change the app displayed every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWhichApp((prev) => prev === 1 ? 2 : 1);
    }, transition * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="transition2x2-3on2">
      <Title title={title} />
      <Box
        id="1"
        display={whichApp === 1 ? "block" : "none"}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem
            bg={'white'}
            className="Containers" w="100%" h="30vh">
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
      </Box>
      <Box
        id="2"
        display={whichApp === 2 ? "block" : "none"}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem className="Containers" w="100%" h="40vh">
            {app6}
          </GridItem>
          <GridItem className="Containers" w="100%" h="40vh">
            {app7}
          </GridItem>
        </Grid>
        <Box height={6}/>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem className="Containers" w="100%" h="42vh">
            {app8}
          </GridItem>
          <GridItem className="Containers" w="100%" h="42vh">
            {app9}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Transition2x2_3on2;
