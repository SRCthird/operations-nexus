import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Templates } from "@templates";
import axios, { CanceledError } from "axios";
import { Apps } from "@apps";
import { useDepartments } from "@core/Department";
import FormControl from "@components/FormControl";

import { emptyActionTracker } from './empty';
import { App_ActionTracker } from './types';


interface Props {
  appNumber: number;
  appID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  getAppID: (value: number) => void;
  parentID: number;
  parentType: Templates;
}

export const PowerPointForm = ({ appNumber, appID, editMode, setEditMode, submit, setSubmit, getAppID, parentID, parentType }: Props) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<App_ActionTracker>({ ...emptyActionTracker });
  const { departments, departmentLoading } = useDepartments({});

  useEffect(() => {
    const getApp = (ID: number) => {
      const controller = new AbortController();
      axios.get(`/api/app/${Apps.ActionTracker}/${ID}`)
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

  const handleUpdate = (data: App_ActionTracker) => {
    const controller = new AbortController();
    axios.patch(`/api/app/${Apps.ActionTracker}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: App_ActionTracker) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/app/${Apps.ActionTracker}/`, newData)
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
      <FormControl.ID id={data.ID} />
      <FormControl.Department
        editMode={editMode}
        isLoading={departmentLoading}
        department={data.Department}
        departments={departments}
        setData={setData}
      />
      <FormControl.Area
        editMode={editMode}
        area={data.Area || ""}
        setData={setData}
        helperText="The area of the action tracker. (Optional)"
      />
    </Box>
  );
}
