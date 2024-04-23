import { SimpleGrid } from '@chakra-ui/react';
import { useDisplays, DisplayQuery } from '@core/Display';
import { DisplayCard } from '@core/Display';
import SkeletonCard from '@components/SkeletonCard';

interface Props {
  displayQuery: DisplayQuery;
}

export const DisplayGrid = ({ displayQuery }: Props): JSX.Element => {
  const {displays, error, displayLoading } = useDisplays(displayQuery);
  const skeletons= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={10} spacing={6}>
        {error && <li>{error}</li>}
        {displays.map(display => (
          <DisplayCard key={display.id} display={display} />
        ))}
        {displayLoading && skeletons.map(skeleton => (<SkeletonCard key={skeleton}/>))}
    </SimpleGrid>
  );
}
