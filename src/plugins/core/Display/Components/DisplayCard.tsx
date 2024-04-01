import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Displays } from "@core/Display"
import { useNavigate  } from "react-router-dom";

interface Props {
    display: Displays;
}

/**
 * The outline of a single display card for the Home.tsx component.
 * 
 * @param {interface} Props - Properties for the DisplayCard component.
 * @returns {JSX.Element} - Returns the DisplayCard component.
 */
export const DisplayCard = ({ display }:Props): JSX.Element => {
  const navigate = useNavigate();
  
  // Dynamically handle the URL for the display page.
  const handleClick = () => {
    navigate('/' + display.Display);
  }

  return (
    <Card 
      borderRadius={10} 
      onClick={handleClick}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
        <Image 
          src={display.Background} 
          height={200} 
          overflow='hidden'
          borderTopRadius={10} 
          objectFit='cover'
        />
        <CardBody>
            <Heading fontSize='2xl' height={50}>{display.Display}</Heading>
        </CardBody>
    </Card>
  )
}
