import { List, ListItem, HStack, Image, Spinner, Button, Heading } from '@chakra-ui/react';
import useDepartments, { Departments } from "../webhooks/useDepartments";

/**
 * Interface for the Departments List component.
 * 
 * @param onSelectDepartment - The process selected department in parent component
 * @param {Departments | null} onSelectDepartment - The selected department in parent component
 */
interface Props {
  onSelectDepartment: (department: Departments) => void;
  selectedDepartment: Departments | null;
  searchText?: string;
}

/**
 * The vertical list of all departments defined in the backend.
 * 
 * @param {interface} Props - Properties of the Departments List component 
 * @returns {JSX.Element} - Returns the Departments List component 
 */
const DepartmentList = ({ onSelectDepartment, selectedDepartment, searchText }: Props): JSX.Element => {
  const { departments, isLoading } = useDepartments(searchText);
  return (
    <>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Departments</Heading>
      <List>
        {isLoading && <Spinner />}
        {departments.map(department => (
          <ListItem key={department.ID}>
            <HStack>
              <Image objectFit='cover' boxSize='32px' borderRadius={8} src={department.Background} />
              <Button 
                whiteSpace={'normal'} 
                textAlign={'left'} 
                fontWeight={department.Department === selectedDepartment?.Department ? 'bold' : 'noraml'} 
                onClick={() => (onSelectDepartment(department))} 
                fontSize='lg' 
                variant='link' 
                padding={3}>{department.Department}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DepartmentList
