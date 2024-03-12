import { Box, Grid, Heading, Button, MenuButton, Menu, MenuList, MenuItem, } from "@chakra-ui/react"
import { useState } from "react";
import "../styles/Admin.css"
import AdminDisplays from "../components/AdminDisplays";
import AdminDepartments from "../components/AdminDepartments";
import AdminPowerPoints from "../components/AdminPowerPoints";
import { ChevronDownIcon } from "@chakra-ui/icons";

/**
 * Properties for the Admin dashboard.
 *
 * @param {string} title - the title at the top of the page
 */
interface Props {
  title: string;
}

/**
 * The Admin element for CRUD methods on the database.
 *
 * @param {Props} - Properties for the Admin dashboard
 * @returns {JSX.Element} Returns the Admin element
 */
const Admin = ({ title }: Props): JSX.Element => {
  const [display, setDisplay] = useState(0);

  return (
    <Box className="Admin-Container">
      <Grid className="Admin-Title" templateColumns={'1fr 200px'} gap={'15px'} padding={'15px'}>
        <Heading as="h1" h="max-content">{title}</Heading>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton 
                isActive={isOpen} 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
              >
                {isOpen? 
                  'Close views': 
                  display===0? 'Departments':
                  display===1? 'Displays': 'SlideShows'
                }
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { setDisplay(0) }}>Departments</MenuItem>
                <MenuItem onClick={() => { setDisplay(1) }}>Displays</MenuItem>
                <MenuItem onClick={() => { setDisplay(2) }}>SlideShows</MenuItem>
              </MenuList>
            </>)}
        </Menu>
      </Grid>
      {display === 0 && <AdminDepartments />}
      {display === 1 && <AdminDisplays />}
      {display === 2 && <AdminPowerPoints />}
    </Box>
  )
}

export default Admin
