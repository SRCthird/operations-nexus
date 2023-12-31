import { Heading } from '@chakra-ui/react';
import { DisplayQuery } from '../pages/Home';

/**
 * Props for the DisplayHeading component.
 * 
 * @param {DisplayQuery} displayQuery - The query object used to specify displays from the backend.
 */
interface Props {
    displayQuery: DisplayQuery
}

/**
 * Heading of the Home page. This will generate a heading based on the query object.
 * 
 * @param {interface} Props - Props for the DisplayHeading component.
 * @returns {JSX.Element} - Returns the DisplayHeading component.
 */
const DisplayHeading = ({ displayQuery }:Props) => {

    const heading = `${displayQuery.department?.Department || 'All'} Displays`;

  return (
    <Heading as='h1' paddingLeft={9}>{heading}</Heading>
  )
}

export default DisplayHeading