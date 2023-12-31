import { SimpleGrid } from '@chakra-ui/react';
import useDisplays from '../webhooks/useDisplays';
import DisplayCard from './DisplayCard';
import SkeletonCard from './SkeletonCard';
import { DisplayQuery } from '../pages/Home';

/**
 * Properties for the DisplayCard component.
 * 
 * @param {DisplayQuery} displayQuery - The query object used to specify displays from the backend.
 */
interface Props {
  displayQuery: DisplayQuery;
}

/**
 * Displays 10 skeleton cards while the backend is loading.
 * 
 * @param {object} Props - Properties for the DisplayCard component. 
 * @returns {JSX.Element} - Returns the DisplayCard component.
 */
const DisplayGrid = ({ displayQuery }: Props): JSX.Element => {
  const {displays, error, isLoading} = useDisplays(displayQuery);
  const skeletons= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={10} spacing={6}>
        {error && <li>{error}</li>}
        {displays.map(display => (
          <DisplayCard key={display.ID} display={display} />
        ))}
        {isLoading && skeletons.map(skeleton => (<SkeletonCard key={skeleton}/>))}
    </SimpleGrid>
  );
}

export default DisplayGrid;