import { Box, Button, FormControl, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import { Template, Templates } from "@templates";
import { AppFormControl, useApps, Apps } from '@apps';
import { Dispatch, SetStateAction, useState } from "react";
import "@styles/Admin.css"
import { emptyApp } from "../apps/empty";

interface Props {
  template: Template;
  setTemplate: Dispatch<SetStateAction<Template>>;
  editMode: boolean;
}

export const TemplateForm = ({ template, editMode, setTemplate }: Props) => {
  const { apps: pbiApps } = useApps({ type: Apps.PowerBI });
  const { apps: pptApps } = useApps({ type: Apps.PowerPoint });

  return (
    <Box className="Admin-Form">
      <FormControl isDisabled={true}>
        <FormLabel>ID</FormLabel>
        <Input value={template.id === 0 ? "" : template.id} />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Format</FormLabel>
        <Select
          value={template.design}
          onChange={(value) => {
            setTemplate(prev => ({ ...prev, design: value.target.value as Templates }));
          }}
        >
          {!template.design && <option value={""}></option>}
          {Object.values(Templates).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <FormHelperText>The layout of the page.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Title</FormLabel>
        <Input value={template.title}
          onChange={(value) => {
            setTemplate(prev => ({ ...prev, title: value.target.value }));
          }}
        />
        <FormHelperText>The title of this page.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Background</FormLabel>
        <Input value={template.background}
          onChange={(value) => {
            setTemplate(prev => ({ ...prev, background: value.target.value }));
          }}
        />
        <FormHelperText>The background color of this page, using HTML colors</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Gradient</FormLabel>
        <Input value={template.gradient ?? ""}
          onChange={(value) => {
            setTemplate(prev => ({ ...prev, gradient: value.target.value }));
          }}
        />
        <FormHelperText>The name of the area where this display will be used.</FormHelperText>
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Transition Time</FormLabel>
        <NumberInput
          value={template.transition}
          min={30}
          max={600}
          onChange={(_, value) => {
            setTemplate(prev => ({ ...prev, transition: value }));
          }}
        >
          <NumberInputField
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>The amount of time an app will stay on the screen before transitioning</FormHelperText>
      </FormControl>
      {template.apps.map((app, index) => {
        return (
          <AppFormControl
            key={index}
            app={app}
            editMode={editMode}
            onChange={
              (value) => {
                const newApps = [...template.apps];
                newApps[index] = value;
                setTemplate(prev => ({ ...prev, apps: newApps }));
              }
            }
            pptApps={pptApps}
            pbiApps={pbiApps}
          />
        );
      })}
      <Box
        style={{
          display: "flex",
        }}
      >
        <Button
          onClick={() => {
            const newApps = [...template.apps];
            newApps.pop();
            setTemplate(prev => ({ ...prev, apps: newApps }));
          }}
        >
          Remove Last App
        </Button>
        <Button
          onClick={() => {
            const newApps = [...template.apps];
            newApps.push(emptyApp);
            setTemplate(prev => ({ ...prev, apps: newApps }));
          }}
        >
          Add New App
        </Button>
        <Button
          onClick={() => {
            const newApps = [...template.apps];
            newApps.push({ ...emptyApp, id: -1 });
            setTemplate(prev => ({ ...prev, apps: newApps }));
          }}
        >
          Add Existing App
        </Button>
      </Box>
    </Box>
  );
}
