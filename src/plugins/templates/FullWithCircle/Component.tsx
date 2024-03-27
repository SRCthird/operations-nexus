import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import useBackgroundEffect from "@hooks/useBackgroundEffect";
import Title from "@components/Title";

import './styles.css';

interface Props {
    title: string;
    backgroundColor: string;
    backgroundGradient?: string;
    app1: ReactNode;
    app2: ReactNode;
}

const FullWithCircle = ({ title, app1, app2, backgroundColor, backgroundGradient }: Props): JSX.Element => {
    // Use webhook to set background
    useBackgroundEffect(backgroundColor, backgroundGradient);
    
    return (
        <div className="full-with-circle">
            <Title title={title} />
            <Box gap={6} margin={6} className="Containers" w="100%" h="80vh" >
                {app1}
                <Box borderRadius="50%" width="45vh" height="45vh" className="Circle">
                    {app2}
                </Box>
            </Box>
        </div>
    );
}

export default FullWithCircle;

