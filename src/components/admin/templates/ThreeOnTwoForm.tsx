import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import usePages, { Pages } from "@hooks/usePages";
import axios, { CanceledError } from "axios";
import useApps, { Apps } from '@hooks/useApps';
import AppFormControl from "@components/admin/AppFormControl";

export interface ThreeOnTwoPage {
  ID: number;
  Title: string;
  Background: string;
  Gradient?: string;
  App1?: Apps;
  App1_ID?: number;
  App2?: Apps;
  App2_ID?: number;
  App3?: Apps;
  App3_ID?: number;
  App4?: Apps;
  App4_ID?: number;
  App5?: Apps;
  App5_ID?: number;
}

export const emptyThreeOnTwoPage: ThreeOnTwoPage = {
  ID: 0,
  Title: '',
  Background: '',
  Gradient: undefined,
  App1: undefined,
  App1_ID: undefined,
  App2: undefined,
  App2_ID: undefined,
  App3: undefined,
  App3_ID: undefined,
  App4: undefined,
  App4_ID: undefined,
  App5: undefined,
  App5_ID: undefined
};

interface Props {
  pageID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  getPageID: (value: number) => void;
  parentID: number;
}

const ThreeOnTwoForm = ({ pageID, editMode, setEditMode, submit, setSubmit, getPageID, parentID }: Props) => {
  const { apps: pbiApps } = useApps({ app: Apps.PowerBI });
  const { apps: pptApps } = useApps({ app: Apps.PowerPoint });
  const { pages } = usePages({ page: Pages.ThreeOnTwo, ids: [pageID] });
  const page = pages[0] ?? emptyThreeOnTwoPage;

  const [error, setError] = useState("");

  const [data, setData] = useState<ThreeOnTwoPage>({ ...emptyThreeOnTwoPage });

  useEffect(() => {
    if (pageID !== 0) {
      setData({
        ID: page.ID,
        Title: page.Title,
        Background: page.Background,
        Gradient: page.Gradient,
        App1: page.App1,
        App1_ID: page.App1_ID,
        App2: page.App2,
        App2_ID: page.App2_ID,
        App3: page.App3,
        App3_ID: page.App3_ID,
        App4: page.App4,
        App4_ID: page.App4_ID,
        App5: page.App5,
        App5_ID: page.App5_ID
      });
    }
  }, [pageID, page]);

  const handleParentUpdate = (parentID: number, selfID: number) => {
    const data = { Page_ID: selfID };
    const controller = new AbortController();
    axios.patch(`/api/display/${parentID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (data: ThreeOnTwoPage) => {
    const controller = new AbortController();
    axios.patch(`/api/page/${Pages.ThreeOnTwo}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: ThreeOnTwoPage) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/page/${Pages.ThreeOnTwo}/`, newData)
      .then(response => {
        getPageID(response.data.ID);
        handleParentUpdate(parentID, response.data.ID);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  if (submit && data.ID !== 0) {
    handleUpdate(data);
    setSubmit(false);
  }

  if (submit && data.ID === 0) {
    handleCreate(data);
    setSubmit(false);
  }

  return (
    <Box>
      <FormControl isDisabled={true}>
        <FormLabel>ID</FormLabel>
        <Input value={pageID === 0 ? "" : pageID} />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Title</FormLabel>
        <Input value={data.Title}
          onChange={(value) => {
            setData({ ...data, Title: value.target.value });
          }}
        />
        <FormHelperText>The title of this page.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Background</FormLabel>
        <Input value={data.Background}
          onChange={(value) => {
            setData({ ...data, Background: value.target.value });
          }}
        />
        <FormHelperText>The background color of this page, using HTML colors</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Gradient</FormLabel>
        <Input value={data.Gradient ?? ""}
          onChange={(value) => {
            setData({ ...data, Gradient: value.target.value });
          }}
        />
        <FormHelperText>The name of the area where this display will be used.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>App 1</FormLabel>
        <Select
          value={data.App1 ?? ""}
          onChange={(value) => {
            setData({ ...data, App1: value.target.value as Apps });
          }}
        >
          {data.App1 ?? <option value={""}></option>}
          {Object.values(Apps).map((pageName) => (
            <option key={pageName} value={pageName}>
              {pageName}
            </option>
          ))}
        </Select>
      </FormControl>
      <AppFormControl
        appNumber={1}
        appType={data.App1}
        appID={data.App1_ID ?? 0}
        editMode={editMode}
        setEditMode={setEditMode}
        setData={setData}
        pptApps={pptApps}
        pbiApps={pbiApps}
        parentID={data.ID}
        parentType={Pages.ThreeOnTwo}
        getAppID={
          (value) => {
            setData({ ...data, App1_ID: value });
          }
        }
      />
      <AppFormControl
        appNumber={2}
        appType={data.App2}
        appID={data.App2_ID ?? 0}
        editMode={editMode}
        setEditMode={setEditMode}
        setData={setData}
        pptApps={pptApps}
        pbiApps={pbiApps}
        parentID={data.ID}
        parentType={Pages.ThreeOnTwo}
        getAppID={
          (value) => {
            setData({ ...data, App2_ID: value });
          }
        }
      />
      <AppFormControl
        appNumber={3}
        appType={data.App3}
        appID={data.App3_ID ?? 0}
        editMode={editMode}
        setEditMode={setEditMode}
        setData={setData}
        pptApps={pptApps}
        pbiApps={pbiApps}
        parentID={data.ID}
        parentType={Pages.ThreeOnTwo}
        getAppID={
          (value) => {
            setData({ ...data, App3_ID: value });
          }
        }
      />
      <AppFormControl
        appNumber={4}
        appType={data.App4}
        appID={data.App4_ID ?? 0}
        editMode={editMode}
        setEditMode={setEditMode}
        setData={setData}
        pptApps={pptApps}
        pbiApps={pbiApps}
        parentID={data.ID}
        parentType={Pages.ThreeOnTwo}
        getAppID={
          (value) => {
            setData({ ...data, App4_ID: value });
          }
        }
      />
      <AppFormControl
        appNumber={5}
        appType={data.App5}
        appID={data.App5_ID ?? 0}
        editMode={editMode}
        setEditMode={setEditMode}
        setData={setData}
        pptApps={pptApps}
        pbiApps={pbiApps}
        parentID={data.ID}
        parentType={Pages.ThreeOnTwo}
        getAppID={
          (value) => {
            setData({ ...data, App5_ID: value });
          }
        }
      />
    </Box>
  );
}

export default ThreeOnTwoForm
