import { useState } from 'react';
import { Box, Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from '../components/NavBar';
import DisplayGrid from '../components/DisplayGrid';
import DepartmentList from '../components/DepartmentList';
import { Departments } from '../webhooks/useDepartments';
import DisplayHeading from '../components/DisplayHeading';

/**
 * The query object used to specify displays from the backend.
 * 
 * @param {Departments | null} department - The selected department.
 * @param {string} searchText - The search text entered by the user in SearchInput.tsx.
 */
export interface DisplayQuery {
    department: Departments | null;
    searchText: string;
}

/**
 * The home page of the application. Used to select the display.
 * 
 * @returns {JSX.Element} - Returns the Home page component.
 */
const Home = (): JSX.Element => {
    const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
        department: null,
        searchText: ''
    });

    return (
        <Grid templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`
            }}
            templateColumns={{
                base: '1fr',
                lg: '200px 1fr'
            }}
        >
            <GridItem area='nav'>
                <NavBar onSearch={
                  (searchText) => {
                    setDisplayQuery({...displayQuery, department: null, searchText});
                  }
                }/>
            </GridItem>
            <Show above='lg'>
                <GridItem area='aside' paddingTop={5}>
                    <DepartmentList 
                        selectedDepartment={displayQuery.department} 
                        onSelectDepartment={
                          (department) => {
                            setDisplayQuery({ ...displayQuery, department, searchText: ''});
                          }
                        }
                      />
                </GridItem>
            </Show>
            <GridItem area='main'>
                <Box paddingLeft={5}>
                    <DisplayHeading displayQuery={displayQuery}/>
                    <DisplayGrid displayQuery={displayQuery} />
                </Box>
            </GridItem>
        </Grid>
    );
}

export default Home;
