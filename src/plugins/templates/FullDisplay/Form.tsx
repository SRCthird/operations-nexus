import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTemplates, Templates } from "@templates";
import {  AppFormControl, useApps, Apps } from '@apps';
import axios, { CanceledError } from "axios";
import FormControl from '@components/FormControl';
import { Template_FullDisplay, emptyFullDisplay } from "@templates/FullDisplay";

interface Props {
  pageID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  getPageID: (value: number) => void;
  parentID: number;
}

export const FullDisplayForm = ({ pageID, editMode, setEditMode, submit, setSubmit, getPageID, parentID }: Props) => {
  const { apps: pbiApps } = useApps({ app: Apps.PowerBI });
  const { apps: pptApps } = useApps({ app: Apps.PowerPoint });
  const { pages } = useTemplates({ page: Templates.FullDisplay, ids: [pageID] });
  const page = pages[0] ?? emptyFullDisplay;

  const [error, setError] = useState("");

  const [data, setData] = useState<Template_FullDisplay>({ ...emptyFullDisplay });

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

  const handleUpdate = (data: Template_FullDisplay) => {
    const controller = new AbortController();
    axios.patch(`/api/page/${Templates.FullDisplay}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: Template_FullDisplay) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/page/${Templates.FullDisplay}/`, newData)
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
      <FormControl.ID id={data.ID} />
      <FormControl.Title 
        title={data.Title} 
        editMode={editMode}
        setData={setData}
      />
      <FormControl.Background
        background={data.Background}
        editMode={editMode}
        setData={setData}
      />
      <FormControl.Gradient
        gradient={data.Gradient}
        editMode={editMode}
        setData={setData}
      />
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
        parentType={Templates.FullDisplay}
        getAppID={
          (value) => {
            setData({ ...data, App1_ID: value });
          }
        }
      />
    </Box>
  );
}
