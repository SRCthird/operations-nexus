import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { List, ListItem, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import { Nexus_Display } from "@core/Display";
import { useState } from 'react';

interface Props {
  department: string;
  displays: Nexus_Display[];
  onSelectDisplay: (department: Nexus_Display) => void;
  selectedDisplay?: string;
}

export const DisplayList = ({ department, displays, onSelectDisplay, selectedDisplay }: Props): JSX.Element => {
  const [viewList, setViewList] = useState(false);

  return (
    <>
      <SimpleGrid 
        templateColumns={'1fr 34px'} 
        gap={0} 
        padding={3} 
        borderBottomWidth={1} 
        borderBottomColor={'gray.200'}
      >
        <Heading fontSize={'2xl'} marginBottom={3}>{department}</Heading>
        {viewList ? 
          <TriangleUpIcon onClick={
            () => setViewList(!viewList)
          } /> : 
          <TriangleDownIcon onClick={
            () => setViewList(!viewList)
          }/>}
      </SimpleGrid>
      <List
        display={viewList ? 'block' : 'none'}
        padding={3}
        borderTopWidth={1}
        borderTopColor={'gray.200'}
      >
        {displays.map(display => (
          <ListItem 
            key={display.ID}
          >
            <Button
              whiteSpace={'normal'}
              textAlign={'left'}
              fontWeight={display.Department === selectedDisplay ? 'bold' : 'noraml'}
              onClick={() => (onSelectDisplay(display))}
              fontSize='lg'
              variant='link'
              padding={3}
            >
              {display.Display}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  )
}
