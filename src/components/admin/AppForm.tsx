import { CheckIcon, CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { Apps } from '@src/webhooks/useApps'
import PowerBIForm from "./PowerBIForm";
import { Pages } from "@src/webhooks/usePages";
import PowerPointForm from "./PowerPointForm";

interface Props {
  appNumber: number
  appType?: Apps
  appID?: number
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  getAppID: (value: number)=> void;
  parentID: number;
  parentType: Pages;
}


const AppForm = ({ appNumber, appType, appID, editMode, setEditMode, getAppID, parentID, parentType}: Props) => {
  const [viewApp, setViewApp] = useState(false);
  const [submitApp, setSubmitApp] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <Box padding={2} border={'1px'} borderRadius={5}>
      {!editMode &&
        <SimpleGrid templateColumns={'1fr 34px'} >
          <Text>App Information</Text>
          {!viewApp && <ViewIcon onClick={
            () => setViewApp(true)
          } />}
          {viewApp && <ViewOffIcon onClick={
            () => setViewApp(false)
          } />}
        </SimpleGrid>
      }
      {editMode &&
        <SimpleGrid templateColumns={'1fr 34px 34px 34px'} >
          <Text>Page Information</Text>
          {!viewApp && <ViewIcon onClick={
            () => setViewApp(true)
          } />}
          {viewApp && <ViewOffIcon onClick={
            () => setViewApp(false)
          } />}
          <CheckIcon
            onClick={
              () => {
                setSubmitApp(true);
                setEditMode(false);
              }
            }
          />
          <CloseIcon
            onClick={
              () => {
                setKey(key + 1);
                setViewApp(false);
                setEditMode(false);
              }
            }
          />
        </SimpleGrid>
      }
      <Box hidden={!viewApp}>
        {appType === Apps.PowerBI &&
          <PowerBIForm
            appNumber={appNumber}
            appID={appID || 0}
            editMode={editMode}
            setEditMode={setEditMode}
            submit={submitApp}
            setSubmit={setSubmitApp}
            getAppID={
              (id)=>{getAppID(id)}
            }
            parentID={parentID}
            parentType={parentType}
          />
        }
        {appType === Apps.PowerPoint &&
          <PowerPointForm
            appNumber={appNumber}
            appID={appID || 0}
            editMode={editMode}
            setEditMode={setEditMode}
            submit={submitApp}
            setSubmit={setSubmitApp}
            getAppID={
              (id)=>{getAppID(id)}
            }
            parentID={parentID}
            parentType={parentType}
          />
        }
      </Box>
    </Box>
  )
}

export default AppForm
