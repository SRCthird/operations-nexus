import { Box, FormControl, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTemplates, Templates } from "@templates";
import { AppFormControl, useApps, Apps } from '@apps';
import axios, { CanceledError } from "axios";
import { FullDisplay3Page, emptyFullDisplay3Page } from "@templates/FullDisplay3";

interface Props {
  pageID: number;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  submit: boolean;
  setSubmit: (value: boolean) => void;
  getPageID: (value: number) => void;
  parentID: number;
}

export const FullDisplay3Form = ({ pageID, editMode, setEditMode, submit, setSubmit, getPageID, parentID }: Props) => {
  const { apps: pbiApps } = useApps({ app: Apps.PowerBI });
  const { apps: pptApps } = useApps({ app: Apps.PowerPoint });
  const { pages } = useTemplates({ page: Templates.FullDisplay3, ids: [pageID] });
  const page = pages[0] ?? emptyFullDisplay3Page;

  const [error, setError] = useState("");

  const [data, setData] = useState<FullDisplay3Page>({ ...emptyFullDisplay3Page });

  useEffect(() => {
    if (pageID !== 0) {
      setData({
        ID: page.ID,
        Title: page.Title,
        Background: page.Background,
        Gradient: page.Gradient,
        Transition: page.Transition,
        App1: page.App1,
        App1_ID: page.App1_ID,
        App2: page.App2,
        App2_ID: page.App2_ID,
        App3: page.App3,
        App3_ID: page.App3_ID,
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

  const handleUpdate = (data: FullDisplay3Page) => {
    const controller = new AbortController();
    axios.patch(`/api/page/${Templates.FullDisplay3}/${data.ID}`, data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  };

  const handleCreate = (data: FullDisplay3Page) => {
    const { ID: _, ...newData } = data;
    const controller = new AbortController();
    axios.post(`/api/page/${Templates.FullDisplay3}/`, newData)
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
        <FormLabel>Transition Time</FormLabel>
        <NumberInput
          value={data.Transition}
          min={30}
          max={600}
          onChange={(_, value) => {
            setData({ ...data, Transition: +value });
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>The amount of time an app will stay on the screen before transitioning</FormHelperText>
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
        parentType={Templates.FullDisplay3}
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
        parentType={Templates.FullDisplay3}
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
        parentType={Templates.FullDisplay3}
        getAppID={
          (value) => {
            setData({ ...data, App3_ID: value });
          }
        }
      />
    </Box>
  );
}
