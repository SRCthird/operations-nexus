import {Box, Grid, Heading, Button,} from "@chakra-ui/react"
import { useState } from "react";
import "../styles/Admin.css"
import AdminDisplays from "../components/AdminDisplays";

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
      <Grid className="Admin-Title" templateColumns={'1fr 200px 200px 200px'} gap={'15px'} padding={'15px'}>
        <Heading as="h1" h="max-content">{title}</Heading>
        <Button alignSelf={'center'} onClick={() => { setDisplay(0) }}> Departments</Button>
        <Button alignSelf={'center'} onClick={() => { setDisplay(1) }}> Displays</Button>
        <Button alignSelf={'center'} onClick={() => { setDisplay(2) }}> Actions</Button>
      </Grid>
      {display === 1 && <AdminDisplays />}
    </Box>
  )
}

export default Admin
