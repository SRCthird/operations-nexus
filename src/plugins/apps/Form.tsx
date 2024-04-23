import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import { emptyPowerBI, PowerBIForm } from "./PowerBI";
import { emptyPowerPoint, PowerPointForm } from "./PowerPoint";
import { App, Apps } from './types';

interface Props {
  app: App;
  setApp: Dispatch<SetStateAction<App>>;
  editMode: boolean;
}


export const AppForm = ({ app, setApp, editMode }: Props) => {
  const [viewApp, setViewApp] = useState(false);

  return (
    <Box padding={2} border={'1px'} borderRadius={5}>
      <SimpleGrid templateColumns={'1fr 34px'} >
        <Text>App Information</Text>
        {!viewApp && <ViewIcon onClick={
          () => setViewApp(true)
        } />}
        {viewApp && <ViewOffIcon onClick={
          () => setViewApp(false)
        } />}
      </SimpleGrid>
      <Box hidden={!viewApp}>
        {app.type === Apps.PowerBI &&
          <PowerBIForm
            app={app.powerBI || emptyPowerBI}
            setApp={setApp}
            editMode={editMode}
          />
        }
        {app.type === Apps.PowerPoint &&
          <PowerPointForm
            app={app.powerPoint || emptyPowerPoint}
            setApp={setApp}
            editMode={editMode}
          />
        }
      </Box>
    </Box>
  )
}
