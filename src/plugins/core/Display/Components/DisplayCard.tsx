import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Nexus_Display } from "@core/Display"
import { useNavigate  } from "react-router-dom";

interface Props {
    display: Nexus_Display;
}

export const DisplayCard = ({ display }:Props): JSX.Element => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/' + display.display);
  }

  return (
    <Card 
      borderRadius={10} 
      onClick={handleClick}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
        <Image 
          src={display.background} 
          height={200} 
          overflow='hidden'
          borderTopRadius={10} 
          objectFit='cover'
        />
        <CardBody>
            <Heading fontSize='2xl' height={50}>{display.display}</Heading>
        </CardBody>
    </Card>
  )
}
