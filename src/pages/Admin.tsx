import { Box, Grid, Heading, Button, MenuButton, Menu, MenuList, MenuItem, } from "@chakra-ui/react"
import { useState } from "react";
import "@styles/Admin.css"
import DisplaysBody from "@core/Display";
import DepartmentsBody from "@core/Department";
import SlideShowsBody from "@core/SlideShow";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TemplatesBody from "@src/plugins/templates/Component";

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
                {isOpen? 'Close views': 
                 display===0? 'Departments':
                 display===1? 'Displays': 
                 display===2? 'Templates':
                 'SlideShows'
                }
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { setDisplay(0) }}>Departments</MenuItem>
                <MenuItem onClick={() => { setDisplay(1) }}>Displays</MenuItem>
                <MenuItem onClick={() => { setDisplay(2) }}>Templates</MenuItem>
                <MenuItem onClick={() => { setDisplay(3) }}>SlideShows</MenuItem>
              </MenuList>
            </>)}
        </Menu>
      </Grid>
      {display === 0 && <DepartmentsBody />}
      {display === 1 && <DisplaysBody />}
      {display === 2 && <TemplatesBody />}
      {display === 3 && <SlideShowsBody />}
    </Box>
  )
}

export default Admin
