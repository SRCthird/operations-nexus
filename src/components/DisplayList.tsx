import { List, ListItem, Button, Heading } from '@chakra-ui/react';
import useDisplay, { Displays } from "@hooks/useDisplays";

/**
 * Interface for the Departments List component.
 * 
 * @param {(Display) => void} onSelectDepartment - The process selected department in parent component
 * @param {string} selectDepartment - The selected department in parent component
 * @param {string} searchText - The text used to search for departments
 */
interface Props {
  onSelectDisplay: (department: Displays) => void;
  selectedDisplay?: string;
  searchText?: string;
}

/**
 * The vertical list of all departments defined in the backend.
 * 
 * @param {interface} Props - Properties of the Departments List component 
 * @returns {JSX.Element} - Returns the Departments List component 
 */
const DepartmentList = ({ onSelectDisplay, selectedDisplay, searchText }: Props): JSX.Element => {
  const { displays } = useDisplay({department: undefined, searchText: searchText});

  return (
    <>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Displays</Heading>
      <List>
        {displays.map(display => (
          <ListItem key={display.ID}>
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

export default DepartmentList
