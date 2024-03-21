import { useState } from 'react';
import { Box, Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from '@components/NavBar';
import DisplayGrid from '@components/DisplayGrid';
import DepartmentList from '@components/DepartmentList';
import DisplayHeading from '@components/DisplayHeading';
import { DisplayQuery } from '@hooks/useDisplays';
import { Departments } from '@src/webhooks/useDepartments';

/**
 * The home page of the application. Used to select the display.
 * 
 * @returns {JSX.Element} - Returns the Home page component.
 */
const Home = (): JSX.Element => {
    const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
        department: undefined,
        searchText: undefined
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
                    setDisplayQuery({searchText});
                  }
                }/>
            </GridItem>
            <Show above='lg'>
                <GridItem area='aside' paddingTop={5}>
                    <DepartmentList 
                        selectedDepartment={displayQuery.department} 
                        onSelectDepartment={
                          (department: Departments) => {
                            setDisplayQuery({department: department.Department});
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
