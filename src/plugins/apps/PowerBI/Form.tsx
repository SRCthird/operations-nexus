import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { App_PowerBI, PowerBITypes } from './types';
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { App } from "../types";
import { emptyPowerBI } from "./empty";

interface Props {
  app: App_PowerBI;
  setApp: Dispatch<SetStateAction<App>>;
  editMode: boolean;
}

export const PowerBIForm = ({ app, setApp, editMode }: Props) => {
  const [powerBI, setPowerBI] = useState<App_PowerBI>(app || emptyPowerBI);

  useEffect(() => {
    setApp(prev => ({
      ...prev,
      powerBI: powerBI
    }))
    // eslint-disable-next-line
  }, [powerBI])

  return (
    <Box>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Type</FormLabel>
        <Select
          value={app.type || ""}
          onChange={(value) => {
            setPowerBI(prev => ({ ...prev, type: value.target.value as PowerBITypes }));
          }}
        >
          {!app.type && <option value={""}></option>}
          {Object.values(PowerBITypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <FormHelperText>The type of Power BI element.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Power BI ID</FormLabel>
        <Input value={app.reportID}
          onChange={(value) => {
            setPowerBI(prev => ({ ...prev, reportID: value.target.value }));
          }}
        />
        <FormHelperText>The id of your Power BI element, found at app.powerbi.com</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Group ID</FormLabel>
        <Input value={app.groupID}
          onChange={(value) => {
            setPowerBI(prev => ({ ...prev, groupID: value.target.value }));
          }}
        />
        <FormHelperText>The id of your Power BI group, found at app.powerbi.com</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Custom Embedded link</FormLabel>
        <Input value={app.customEmbed || ""}
          onChange={(value) => {
            setPowerBI(prev => ({ ...prev, customEmbed: value.target.value }));
          }}
        />
        <FormHelperText>Optional - the custom link to your report if our auto-generated one doesn't work</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Page Name</FormLabel>
        <Input value={app.pageName || ""}
          onChange={(value) => {
            setPowerBI(prev => ({ ...prev, pageName: value.target.value }));
          }}
        />
        <FormHelperText>Optional - the name of the Report page to display if you have multiple in one Report.</FormHelperText>
      </FormControl>
    </Box>
  );
}
