import { List, ListItem, HStack, Image, Spinner, Button, Heading } from '@chakra-ui/react';
import useDepartments, { Departments } from "@hooks/useDepartments";

/**
 * Interface for the Departments List component.
 * 
 * @param onSelectDepartment - The process selected department in parent component
 * @param {String} onSelectDepartment - The selected department in parent component
 */
interface Props {
  onSelectDepartment: (department: Departments) => void;
  selectedDepartment?: string;
  searchText?: string;
}

/**
 * The vertical list of all departments defined in the backend.
 * 
 * @param {interface} Props - Properties of the Departments List component 
 * @returns {JSX.Element} - Returns the Departments List component 
 */
const DepartmentList = ({ onSelectDepartment, selectedDepartment, searchText }: Props): JSX.Element => {
  const { departments, departmentLoading } = useDepartments({department: undefined, searchText: searchText});
  return (
    <>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Departments</Heading>
      <List>
        {departmentLoading && <Spinner />}
        {departments.map(department => (
          <ListItem key={department.ID}>
            <HStack>
              <Image objectFit='cover' boxSize='32px' borderRadius={8} src={department.Background} />
              <Button 
                whiteSpace={'normal'} 
                textAlign={'left'} 
                fontWeight={department.Department === selectedDepartment ? 'bold' : 'noraml'} 
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
