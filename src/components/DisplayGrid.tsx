import { SimpleGrid } from '@chakra-ui/react';
import useDisplays, { DisplayQuery } from '@hooks/useDisplays';
import DisplayCard from '@components/DisplayCard';
import SkeletonCard from '@components/SkeletonCard';

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
  const {displays, error, displayLoading } = useDisplays(displayQuery);
  const skeletons= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={10} spacing={6}>
        {error && <li>{error}</li>}
        {displays.map(display => (
          <DisplayCard key={display.ID} display={display} />
        ))}
        {displayLoading && skeletons.map(skeleton => (<SkeletonCard key={skeleton}/>))}
    </SimpleGrid>
  );
}

export default DisplayGrid;
