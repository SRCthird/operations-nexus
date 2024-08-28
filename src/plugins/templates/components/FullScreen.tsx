import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import '../styles/FullDisplay.css';

/**
 * Properties for the FullDisplay component.
 * 
 * @param {ReactNode} child - The child-node displayed in the component.
 */
interface Props {
  app: ReactNode;
}

/**
 * The display used for a title card and one large item in the middle of the page.
 * 
 * @param {object} Props - The properties of the FullDisplay component. 
 * @returns {JSX.Element} - Returns the FullDisplay component.  
 */
const FullScreen = ({ app }: Props): JSX.Element => {

  return (
    <Box
      height="100vh"
      width="100vw"
      className="full-screen">
      {app}
    </Box>
  );
}

export default FullScreen;
