import { AddIcon, ArrowLeftIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box, FormControl, Grid, GridItem, Heading, Icon, FormLabel, Input, useMediaQuery, FormHelperText, useDisclosure, Button,
} from "@chakra-ui/react"
import { useState } from "react";
import DisplayList from "../components/DisplayList";
import SearchInput from "../components/SearchInput";
import "../styles/Admin.css"
import { Form } from "react-bootstrap";
import axios, { CanceledError } from "axios";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { DisplayQuery, Displays } from "../webhooks/useDisplays";
import AdminBody from "./AdminBody";

const AdminDisplays = () => {
  const [key, updateKey] = useState(0);
  const [itemSelected, toggleSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formID, setFormID] = useState(-1);
  const [formMain, setFormMain] = useState("");
  const [formSub, setFormSub] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formDisplay, setFormDisplay] = useState("");
  const [formBackground, setFormBackground] = useState("");
  const [error, setError] = useState('');
  const [SizeSmall, SizeMed, SizeLarge, SizeXL] = useMediaQuery(['(max-width: 600px)', '(max-width: 900px)', '(max-width: 1280px)', '(min-width: 1280px)']);
  const layout = SizeMed ? '1fr' : '30vw 1fr';
  const [displayQuery, setDisplayQuery] = useState<DisplayQuery>({
    department: null,
    searchText: ''
  });

  const handleCreate = (Data: Displays) => {
    console.log(Data);
    const { ID: _, ...newData } = Data;
    const controller = new AbortController();
    axios.post(`/api/display`, newData)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleUpdate = (Data: Displays) => {
    console.log(Data);
    if (Data.ID === -1) return;
    const controller = new AbortController();
    axios.patch(`/api/display/${Data.ID}`, Data)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }

  const handleDelete = (ID: number) => {
    if (ID === -1) return;
    const controller = new AbortController();
    axios.delete(`/api/display/${ID}`)
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    resetForm();
    return () => controller.abort();
  }

  const data = {
    ID: formID,
    Main: formMain,
    Sub: formSub,
    Department: formDepartment,
    Display: formDisplay,
    Background: formBackground,
  }

  const resetForm = () => {
    setFormID(-1);
    setFormMain("");
    setFormSub("");
    setFormDepartment("");
    setFormDisplay("");
    setFormBackground("");
  }

  const remount = () => updateKey(key + 1);

  return (
    <AdminBody
      resetForm={resetForm}
      onSearch={(searchText: string) => {
        setDisplayQuery({ ...displayQuery, department: null, searchText });
      }}
      handleCreate={handleCreate}
      handleRead={
        <DisplayList
          key={key}
          searchText={displayQuery.searchText}
          selectedDisplay={displayQuery.department}
          onSelectDisplay={
            (display) => {
              setFormID(display.ID);
              setFormMain(display.Main);
              setFormSub(display.Sub);
              setFormDepartment(display.Department);
              setFormDisplay(display.Display);
              setFormBackground(display.Background);
              toggleSelected(true);
            }
          }
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      header={formDisplay || "Select a display"}
      setEditMode={(toggle: boolean) => {
        setEditMode(toggle);
      }}
      editMode={editMode}
      toggleSelected={toggleSelected}
      itemSelected={itemSelected}
      error={error}
      data={data}
      form={
        <Form className="Admin-Form">
          <FormControl isDisabled={true}>
            <FormLabel>Id</FormLabel>
            <Input value={formID === -1 ? "" : formID} />
          </FormControl>
          <FormControl isDisabled={!editMode}>
            <FormLabel>Main</FormLabel>
            <Input value={formMain}
              onChange={(value) => {
                setFormMain(value.target.value);
              }}
            />
            <FormHelperText>The main branch this display is under.</FormHelperText>
          </FormControl>
          <FormControl isDisabled={!editMode}>
            <FormLabel>Sub</FormLabel>
            <Input value={formSub}
              onChange={(value) => {
                setFormSub(value.target.value);
              }}
            />
            <FormHelperText>The sub-department this display is under.</FormHelperText>
          </FormControl>
          <FormControl isDisabled={!editMode}>
            <FormLabel>Department</FormLabel>
            <Input value={formDepartment}
              onChange={(value) => {
                setFormDepartment(value.target.value);
              }}
            />
            <FormHelperText>The name of the area where this display will be used.</FormHelperText>
          </FormControl>
          <FormControl isDisabled={!editMode}>
            <FormLabel>Display</FormLabel>
            <Input value={formDisplay}
              onChange={(value) => {
                setFormDisplay(value.target.value);
              }}
            />
            <FormHelperText>The name of the display.</FormHelperText>
          </FormControl>
          <FormControl isDisabled={!editMode}>
            <FormLabel>Background</FormLabel>
            <Input value={formBackground}
              onChange={(value) => {
                setFormBackground(value.target.value);
              }}
            />
            <FormHelperText>The icon to be displayed next to the department.</FormHelperText>
          </FormControl>
        </Form>
      }
      remount={remount}
    />
  )

}

export default AdminDisplays
