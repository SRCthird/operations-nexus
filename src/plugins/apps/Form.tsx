import { DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import { emptyIFrame, IFrameForm } from "./IFrame";
import { emptyPowerBI, PowerBIForm } from "./PowerBI";
import { emptyPowerPoint, PowerPointForm } from "./PowerPoint";
import { App, Apps } from './types';

interface Props {
  app: App;
  onDelete: () => void;
  setApp: Dispatch<SetStateAction<App>>;
  editMode: boolean;
}


export const AppForm = ({ app, onDelete, setApp, editMode }: Props) => {
  const [viewApp, setViewApp] = useState(false);

  return (
    <Box padding={2} border={'1px'} borderRadius={5}>
      <SimpleGrid templateColumns={'1fr 34px 34px'} >
        <Text>App Information</Text>
        {!viewApp && <ViewIcon onClick={
          () => setViewApp(true)
        } />}
        {viewApp && <ViewOffIcon onClick={
          () => setViewApp(false)
        } />}
        <DeleteIcon onClick={onDelete} />
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
        {app.type === Apps.IFrame &&
          <IFrameForm
            app={app.iFrame || emptyIFrame}
            setApp={setApp}
            editMode={editMode}
          />
        }
      </Box>
    </Box>
  )
}
