import { List, Heading } from '@chakra-ui/react';
import useDisplay, { Displays } from "@hooks/useDisplays";
import DisplayList from './DisplayList';

interface Props {
  searchText?: string;
  onSelectDisplay: (department: Displays) => void;
  selectedDisplay?: string;
}

const DisplayPanel = ({ onSelectDisplay, selectedDisplay, searchText }: Props): JSX.Element => {
  const { displays } = useDisplay({ searchText: searchText });

  const groupedDisplays = displays.reduce((acc, display) => {
    if (!acc[display.Department]) {
      acc[display.Department] = [];
    }
    acc[display.Department].push(display);
    return acc;
  }, {} as Record<string, typeof displays>);

  return (
    <>
      <Heading fontSize={'2xl'} paddingLeft={8} marginBottom={3}>Displays</Heading>
      <List>
        {Object.entries(groupedDisplays).map(([department, displays]) => (
          <DisplayList
            key={department}
            department={department}
            displays={displays}
            onSelectDisplay={onSelectDisplay}
            selectedDisplay={selectedDisplay}
          />
        ))}
      </List>
    </>
  )
}

export default DisplayPanel
