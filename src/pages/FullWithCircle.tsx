import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import '../styles/FullWithCircle.css';
import useBackgroundEffect from "../webhooks/useBackgroundEffect";
import Title from "./Title";

interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    mainChild: ReactNode;
    circleChild: ReactNode;
}

const FullWithCircle = ({ title, mainChild, circleChild, backgroundColor, backgroundGradient }: Props): JSX.Element => {
    // Use webhook to set background
    useBackgroundEffect(backgroundColor, backgroundGradient);
    
    return (
        <div className="full-with-circle">
            <Title title={title} />
            <Box gap={6} margin={6} className="Containers" w="100%" h="80vh" >
                {mainChild}
                <Box borderRadius="50%" width="45vh" height="45vh" className="Circle">
                    {circleChild}
                </Box>
            </Box>
        </div>
    );
}

export default FullWithCircle;

