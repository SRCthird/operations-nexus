import { Heading } from '@chakra-ui/react';
import { DisplayQuery } from '@core/Display';

interface Props {
    displayQuery: DisplayQuery
}

export const DisplayHeading = ({ displayQuery }:Props) => {

    const heading = `${displayQuery.department || 'All'} Displays`;

  return (
    <Heading as='h1' paddingLeft={9}>{heading}</Heading>
  )
}
