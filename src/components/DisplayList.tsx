import { List, ListItem, HStack, Image, Spinner, Button, Heading } from '@chakra-ui/react';
import { Departments } from '../webhooks/useDepartments';
import useDisplay, { Displays } from "../webhooks/useDisplays";

/**
 * Interface for the Departments List component.
 * 
 * @param onSelectDepartment - The process selected department in parent component
 * @param {Departments | null} onSelectDepartment - The selected department in parent component
 */
interface Props {
  onSelectDisplay: (department: Displays) => void;
  selectedDisplay: Departments | null;
  searchText?: string;
}

/**
 * The vertical list of all departments defined in the backend.
 * 
 * @param {interface} Props - Properties of the Departments List component 
 * @returns {JSX.Element} - Returns the Departments List component 
 */
const DepartmentList = ({ onSelectDisplay, selectedDisplay, searchText }: Props): JSX.Element => {
  const { displays, isLoading } = useDisplay({department: null, searchText: searchText});

  return (
    <>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Displays</Heading>
      <List>
        {displays.map(display => (
          <ListItem key={display.ID}>
            <Button 
              whiteSpace={'normal'} 
              textAlign={'left'} 
              fontWeight={display.Department === selectedDisplay?.Department ? 'bold' : 'noraml'} 
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

export default DepartmentList