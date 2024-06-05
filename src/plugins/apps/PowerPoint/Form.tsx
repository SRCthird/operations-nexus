import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { useDepartments } from "@core/Department";
import { App_PowerPoint } from './types';
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { App } from "../types";
import { emptyPowerPoint } from "./empty";


interface Props {
  editMode: boolean;
  app: App_PowerPoint;
  setApp: Dispatch<SetStateAction<App>>;
}

export const PowerPointForm = ({ editMode, app, setApp }: Props) => {
  const [powerPoint, setPowerPoint] = useState<App_PowerPoint>(app || emptyPowerPoint);
  const { departments, departmentLoading } = useDepartments({});

  useEffect(() => {
    setApp(prev => ({
      ...prev,
      powerPoint: powerPoint
    }))
    // eslint-disable-next-line
  }, [powerPoint])

  return (
    <Box>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Type</FormLabel>
        <Select
          value={app?.main ? "true" : "false"}
          onChange={(value) => {
            setPowerPoint(prev => ({ ...prev, main: value.target.value === "true" }));
          }}
        >
          <option value={"true"}>true</option>
          <option value={"false"}>false</option>
        </Select>
        <FormHelperText>Do you want the main slides to show on this page?</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Department</FormLabel>
        <Select 
          value={app?.department || "All"}
          onChange={(value) => {
            setPowerPoint(prev => ({ ...prev, department: value.target.value }));
          }}
        >
          {departmentLoading && <option value={app?.department}>{app?.department}</option>}
          {departments.map(department => (
            <option key={department.id} value={department.department}>{department.department}</option>
          ))}
        </Select>
        <FormHelperText>The name of where the Slides were uploaded.</FormHelperText>
      </FormControl>
    </Box>
  );
}
