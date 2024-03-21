import { Box, FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import usePages, { Pages } from "@hooks/usePages";
import axios, { CanceledError } from "axios";
import useApps, { Apps } from '@hooks/useApps';
import AppFormControl from "@components/admin/AppFormControl";

export interface FullDisplayPage {
  ID: number;
  Title: string;
  Background: string;
  Gradient?: string;
  App1?: Apps;
  App1_ID?: number;
}

export const emptyFullDisplayPage: FullDisplayPage = {
  ID: 0,
  Title: '',
  Background: '',
  Gradient: undefined,
  App1: undefined,
  App1_ID: undefined,
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

const FullDisplayForm = ({ pageID, editMode, setEditMode, submit, setSubmit, getPageID, parentID }: Props) => {
  const { apps: pbiApps } = useApps({ app: Apps.PowerBI });
  const { apps: pptApps } = useApps({ app: Apps.PowerPoint });
  const { pages } = usePages({ page: Pages.FullDisplay, ids: [pageID] });
  const page = pages[0] ?? emptyFullDisplayPage;

  const [error, setError] = useState("");

  const [data, setData] = useState<FullDisplayPage>({ ...emptyFullDisplayPage });

  useEffect(() => {
    if (pageID !== 0) {
      setData({
        ID: page.ID,
        Title: page.Title,
        Background: page.Background,
        Gradient: page.Gradient,
        App1: page.App1,
        App1_ID: page.App1_ID,
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

  const handleUpdate = (data: FullDisplayPage) => {
    const controller = new AbortController();
    axios.patch(`/api/page/${Pages.FullDisplay}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: FullDisplayPage) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/page/${Pages.FullDisplay}/`, newData)
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
        parentType={Pages.FullDisplay}
        getAppID={
          (value) => {
            setData({ ...data, App1_ID: value });
          }
        }
      />
    </Box>
  );
}

export default FullDisplayForm
