import { Dispatch, SetStateAction } from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Apps } from '@src/webhooks/useApps';
import { ThreeOnTwoPage } from './ThreeOnTwoForm';
import AppForm from './AppForm';
import { Pages } from '@src/webhooks/usePages';

interface Props {
  appNumber: number;
  appType?: Apps;
  appID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  setData: Dispatch<SetStateAction<any>>;
  pptApps: { ID: number }[];
  pbiApps: { ID: number }[];
  parentID: number;
  parentType: Pages;
  getAppID: (value: number) => void;
}

type PageTypes = ThreeOnTwoPage;

const AppFormControl = ({
  appNumber,
  appType,
  appID,
  editMode,
  setEditMode,
  setData,
  pptApps,
  pbiApps,
  parentID,
  parentType,
  getAppID
}: Props) => {
  return (
    <>
      <FormControl isDisabled={!editMode}>
        <FormLabel>App {appNumber}</FormLabel>
        <Select
          value={appType ?? ''}
          onChange={(value) => {
            setData((prevData: PageTypes) => ({
              ...prevData,
              [`App${appNumber}`]: value.target.value as Apps,
            }));
          }}
        >
          {appType ?? <option value={''}></option>}
          {Object.values(Apps).map((pageName) => (
            <option key={pageName} value={pageName}>
              {pageName}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>App {appNumber} ID</FormLabel>
        <Select
          value={appID ?? ''}
          onChange={(value) => {
            setData((prevData: PageTypes) => ({
              ...prevData,
              [`App${appNumber}_ID`]: +value.target.value,
            }));
          }}
        >
          <option value={0}>Create New</option>
          {appType === Apps.PowerPoint && (
            <>
              {pptApps.map((app) => (
                <option key={app.ID} value={app.ID}>
                  {app.ID}
                </option>
              ))}
              {!pptApps.some((app) => app.ID === appID) && appID && (
                <option key={appID} value={appID}>
                  {appID}
                </option>
              )}
            </>
          )}
          {appType === Apps.PowerBI && (
            <>
              {pbiApps.map((app) => (
                <option key={app.ID} value={app.ID}>
                  {app.ID}
                </option>
              ))}
              {!pbiApps.some((app) => app.ID === appID) && appID && (
                <option key={appID} value={appID}>
                  {appID}
                </option>
              )}
            </>
          )}
        </Select>
      </FormControl>
      <AppForm
        appNumber={appNumber}
        appType={appType}
        appID={appID}
        editMode={editMode}
        setEditMode={setEditMode}
        parentID={parentID}
        parentType={parentType}
        getAppID={getAppID}
      />
    </>
  );
};

export default AppFormControl;
