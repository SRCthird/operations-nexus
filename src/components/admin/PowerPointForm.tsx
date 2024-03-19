import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Pages } from "@src/webhooks/usePages";
import axios, { CanceledError } from "axios";
import { Apps, PowerPointApp } from '@src/webhooks/useApps'
import useDepartment from "@src/webhooks/useDepartments";

export const emptyPowerPoint: PowerPointApp = {
  ID: 0,
  Main: false,
  Department: ""
}

interface Props {
  appNumber: number;
  appID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  getAppID: (value: number) => void;
  parentID: number;
  parentType: Pages;
}

const PowerPointForm = ({ appNumber, appID, editMode, setEditMode, submit, setSubmit, getAppID, parentID, parentType }: Props) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<PowerPointApp>({ ...emptyPowerPoint });
  const { departments, departmentLoading} = useDepartment({});

  useEffect(() => {
    const getApp = (ID: number) => {
      const controller = new AbortController();
      axios.get(`/api/app/${Apps.PowerPoint}/${ID}`)
        .then(response => {
          if (response.data) {
            setData(response.data);
          }
        })
        .catch(err => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });
      return () => controller.abort();
    }
    getApp(appID)
  }, [appID])

  const handleParentUpdate = (selfID: number) => {
    const data = { [`App${appNumber}_ID`]: selfID };
    const controller = new AbortController();
    console.log(`${parentType} ${parentID}`);
    axios.patch(`/api/page/${parentType}/${parentID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: PowerPointApp) => {
    const controller = new AbortController();
    axios.patch(`/api/app/${Apps.PowerPoint}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: PowerPointApp) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/app/${Apps.PowerPoint}/`, newData)
      .then(response => {
        getAppID(response.data.ID);
        handleParentUpdate(response.data.ID);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  useEffect(() => {
    console.log("Submit")
    if (submit && data.ID !== 0) {
      console.log("Update")
      handleUpdate(data);
      setSubmit(false);
    }

    if (submit && data.ID === 0) {
      console.log("Create")
      handleCreate(data);
      setSubmit(false);
    }
  }, [submit])

  return (
    <Box>
      <FormControl isDisabled={true}>
        <FormLabel>ID</FormLabel>
        <Input value={data.ID} />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Type</FormLabel>
        <Select
          value={data.Main ? "true" : "false"}
          onChange={(value) => {
            setData({ ...data, Main: value.target.value === "true" });
          }}
        >
          <option value={"true"}>true</option>
          <option value={"false"}>false</option>
        </Select>
        <FormHelperText>Do you want the main slides to show on this page?</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Department</FormLabel>
        <Select value={data.Department}
          onChange={(value) => {
            setData({ ...data, Department: value.target.value });
          }}
        >
          {departmentLoading && <option value={data.Department}>{data.Department}</option>}
          {departments.map(department => (
            <option key={department.ID} value={department.Department}>{department.Department}</option>
          ))}
        </Select>
        <FormHelperText>The name of where the Slides were uploaded.</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default PowerPointForm
