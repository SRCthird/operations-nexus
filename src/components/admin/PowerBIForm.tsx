import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Pages } from "@src/webhooks/usePages";
import axios, { CanceledError } from "axios";
import { Apps, PowerBIApp } from '@src/webhooks/useApps'

export const emptyPowerBI: PowerBIApp = {
  ID: 0,
  Type: "",
  PowerBI_ID: "",
  Group_ID: "",
  Custom_Embed: undefined,
  Page_Name: undefined
}

export enum PowerBITypes {
  Report = 'report',
  Dashboard = 'dashboard',
  Title = 'tile',
  Visual = 'visual',
  QNA = 'qna'
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

const PowerBIForm = ({ appNumber, appID, editMode, setEditMode, submit, setSubmit, getAppID, parentID, parentType }: Props) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<PowerBIApp>({ ...emptyPowerBI });

  useEffect(() => {
    const getApp = ( ID: number ) => {
      const controller = new AbortController();
      axios.get(`/api/app/${Apps.PowerBI}/${ID}`)
      .then(response => {
        if (response.data){
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

  const handleParentUpdate = ( selfID: number) => {
    const data = { [`App${appNumber}_ID`] : selfID };
    const controller = new AbortController();
    axios.patch(`/api/page/${parentType}/${parentID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: PowerBIApp) => {
    const controller = new AbortController();
    axios.patch(`/api/app/${Apps.PowerBI}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: PowerBIApp) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/app/${Apps.PowerBI}/`, newData)
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

  useEffect(()=>{
    if (submit && data.ID !== 0) {
      handleUpdate(data);
      setSubmit(false);
    }

    if (submit && data.ID === 0) {
      handleCreate(data);
      setSubmit(false);
    }
  },[submit])

  return (
    <Box>
      <FormControl isDisabled={true}>
        <FormLabel>ID</FormLabel>
        <Input value={data.ID} />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Type</FormLabel>
        <Select
          value={data.Type || ""}
          onChange={(value) => {
            setData({ ...data, Type: value.target.value as PowerBITypes });
          }}
        >
          {!data.Type && <option value={""}></option>}
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
        <Input value={data.PowerBI_ID}
          onChange={(value) => {
            setData({ ...data, PowerBI_ID: value.target.value });
          }}
        />
        <FormHelperText>The id of your Power BI element, found at app.powerbi.com</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Group ID</FormLabel>
        <Input value={data.Group_ID}
          onChange={(value) => {
            setData({ ...data, Group_ID: value.target.value });
          }}
        />
        <FormHelperText>The id of your Power BI group, found at app.powerbi.com</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Custom Embedded link</FormLabel>
        <Input value={data.Custom_Embed || ""}
          onChange={(value) => {
            setData({ ...data, Custom_Embed: value.target.value });
          }}
        />
        <FormHelperText>Optional - the custom link to your report if our auto-generated one doesn't work</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Page Name</FormLabel>
        <Input value={data.Page_Name || ""}
          onChange={(value) => {
            setData({ ...data, Page_Name: value.target.value });
          }}
        />
        <FormHelperText>Optional - the name of the Report page to display if you have multiple in one Report.</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default PowerBIForm
