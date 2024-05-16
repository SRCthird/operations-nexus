import { List, ListItem, HStack, Image, Spinner, Button, Heading, Box } from '@chakra-ui/react';
import { useDepartments, Nexus_Department } from "@core/Department";

/**
 * Interface for the Departments List component.
 * 
 * @param onSelectDepartment - The process selected department in parent component
 * @param {String} onSelectDepartment - The selected department in parent component
 */
interface Props {
  onSelectDepartment: (department: Nexus_Department) => void;
  selectedDepartment?: string;
  searchText?: string;
}

/**
 * The vertical list of all departments defined in the backend.
 * 
 * @param {interface} Props - Properties of the Departments List component 
 * @returns {JSX.Element} - Returns the Departments List component 
 */
export const DepartmentList = ({ onSelectDepartment, selectedDepartment, searchText }: Props): JSX.Element => {
  const { departments, departmentLoading } = useDepartments({ department: undefined, searchText: searchText });
  return (
    <Box>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Departments</Heading>
      <List
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingTop: '10',
          borderRadius: '5px',
          marginLeft: '-10px',
          paddingRight: '15px',
        }}
      >
        {departmentLoading && <Spinner />}
        {departments.map(department => (
          <ListItem
            key={department.id}
          >
            <HStack>
              <Image objectFit='cover' boxSize='32px' borderRadius={8} src={department.background} />
              <Button
                whiteSpace={'normal'}
                textAlign={'left'}
                fontWeight={department.department === selectedDepartment ? 'bold' : 'noraml'}
                onClick={() => (onSelectDepartment(department))}
                fontSize='lg'
                variant='link'
                padding={3}>{department.department}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
