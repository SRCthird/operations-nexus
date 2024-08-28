import { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

import { AppForm } from './Form';
import { App, Apps } from './types';
import { useApps } from './useApps';

interface Props {
  app: App;
  onDelete: () => void;
  editMode: boolean;
  onChange: (value: App) => void;
  pptApps: { name: string }[];
  pbiApps: { name: string }[];
  iFrameApps: { name: string }[];
}

export const AppFormControl = ({ app: _app, onDelete, editMode, onChange, pptApps, pbiApps, iFrameApps }: Props) => {
  const [key, updateKey] = useState(0);
  const [app, setApp] = useState<App>(_app);
  const { app: newApp } = useApps({ name: app.name });

  useEffect(() => {
    onChange(app);
    // eslint-disable-next-line
  }, [app])

  useEffect(() => {
    if (!newApp) return;
    if (newApp.id === 0) return;
    setApp({ ...newApp });
    onChange(newApp);
    updateKey(key + 1);
    console.log(app);
    // eslint-disable-next-line
  }, [newApp]);

  return (
    <Box>
      <FormControl isDisabled={!editMode}>
        <FormLabel>App Type</FormLabel>
        <Select
          value={app.type}
          onChange={(value) => {
            setApp(prev => ({
              ...prev,
              type: value.target.value as Apps,
            }));
          }}
        >
          {app.type ?? <option value={''}></option>}
          {Object.values(Apps).map((pageName) => (
            <option key={pageName} value={pageName}>
              {pageName}
            </option>
          ))}
        </Select>
      </FormControl>
      {app.id !== 0 ? (
        <FormControl isDisabled={!editMode}>
          <FormLabel>App Name</FormLabel>
          <Select
            value={app.name ?? ''}
            onChange={(value) => {
              setApp(prev => ({
                ...prev,
                name: value.target.value,
              }));
            }}
          >
            <option value={0}>Create New</option>
            {app.type === Apps.PowerPoint && (
              <>
                {pptApps.map((ppt) => (
                  <option key={ppt.name} value={ppt.name}>
                    {ppt.name}
                  </option>
                ))}
                {!pptApps.some((ppt) => ppt.name === app.name) && app.name && (
                  <option key={app.name} value={app.name}>
                    {app.name}
                  </option>
                )}
              </>
            )}
            {app.type === Apps.PowerBI && (
              <>
                {pbiApps.map((pbi) => (
                  <option key={pbi.name} value={pbi.name}>
                    {pbi.name}
                  </option>
                ))}
                {!pbiApps.some((pbi) => pbi.name === app.name) && app.name && (
                  <option key={app.name} value={app.name}>
                    {app.name}
                  </option>
                )}
              </>
            )}
            {app.type === Apps.IFrame && (
              <>
                {iFrameApps.map((iframe) => (
                  <option key={iframe.name} value={iframe.name}>
                    {iframe.name}
                  </option>
                ))}
                {!iFrameApps.some((iframe) => iframe.name === app.name) && app.name && (
                  <option key={app.name} value={app.name}>
                    {app.name}
                  </option>
                )}
              </>
            )}
          </Select>
        </FormControl>
      ) : (
        <FormControl isDisabled={!editMode}>
          <FormLabel>App Name</FormLabel>
          <Input
            placeholder="App Name"
            value={app.name}
            onChange={(value) => {
              setApp(prev => ({
                ...prev,
                name: value.target.value,
              }));
            }}
          />
        </FormControl>
      )}
      <AppForm
        key={key}
        app={app}
        onDelete={onDelete}
        setApp={setApp}
        editMode={editMode}
      />
    </Box>
  );
};

export default AppFormControl;
